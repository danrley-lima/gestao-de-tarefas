import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from 'app/services/task.service';
import { UsersService } from 'app/services/users.service';
import { Task } from 'domain/Task.types';
import { TaskPriority } from 'domain/TaskPriority.enum';
import { TaskStatus } from 'domain/TaskStatus.enum';
import { MessageService } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    TextareaModule,
    FloatLabelModule,
    InputTextModule,
    SelectModule,
    ToastModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  constructor(
    private taskService: TaskService,
    private userService: UsersService,
    private messageService: MessageService
  ) {}

  @Input() task: Task | null = null;
  @Input() edit: boolean = false;
  @Output() closeDialog = new EventEmitter<void>();

  fetchUsers: { name: string; value: string }[] = [];

  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    assignee: new FormControl(''),
    priority: new FormControl(''),
    status: new FormControl(''),
    deadline: new FormControl(new Date()),
  });

  ngOnInit(): void {
    if (this.task) {
      let data = this.task?.deadline;

      if (this.edit) {
        data = this.task?.deadline ?? new Date(this.task.deadline);
      }
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        assignee: this.task.assignee?.id?.toString() || '',
        priority: this.task.priority,
        status: this.task.status,
        deadline: data,
      });
    }

    this.userService.getAllUsers().subscribe((response) => {
      this.fetchUsers = response.map((user: any) => ({
        name: user.name,
        value: user.id.toString(),
      }));
    });
  }

  onClick() {
    if (this.edit) {
      console.log(this.task);
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  createTask(): void {
    const { title, description, assignee, priority, deadline, status } =
      this.taskForm.value;

    this.taskService
      .create({
        title: title ?? '',
        description: description ?? '',
        assigneeId: Number(assignee) || null,
        priority:
          TaskPriority[priority as keyof typeof TaskPriority] ||
          TaskPriority.LOW,
        deadline: deadline ? deadline.toISOString().split('T')[0] : null,
        status:
          TaskStatus[status as keyof typeof TaskStatus] ||
          TaskStatus.IN_PROGRESS,
      })
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'Success',
            summary: 'Sucesso',
            detail: 'Tarefa criada com sucesso',
          });
          this.taskForm.reset();
        },
        error: (err) => {
          if (err.error.status === 400 && Array.isArray(err.error.errors)) {
            err.error.errors.forEach((errorMessage: string) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: errorMessage,
              });
            });
          }
        },
      });
  }

  updateTask(): void {
    const { title, description, assignee, priority, deadline, status } =
      this.taskForm.value;

    console.log(this.task!.id.toString());

    this.taskService
      .updateTask({
        id: this.task!.id.toString(),
        title: title ?? null,
        description: description ?? null,
        assigneeId: Number(assignee) ?? null,
        priority: TaskPriority[priority as keyof typeof TaskPriority] || null,
        deadline: deadline ? new Date(deadline) : null,
        status: TaskStatus[status as keyof typeof TaskStatus] || null,
      })
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'Success',
            summary: 'Sucesso',
            detail: 'Tarefa atualizada com sucesso',
          });

          this.closeDialog.emit();
        },
        error: (err) => {
          console.error('Erro ao atualizar tarefa:', err);
        },
      });
  }
}
