import { Component, Input } from '@angular/core';
import { c } from '@angular/core/event_dispatcher.d-pVP0-wST';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from 'app/services/task.service';
import { UsersService } from 'app/services/users.service';
import { Task } from 'domain/Task.types';
import { TaskPriority } from 'domain/TaskPriority.enum';
import { TaskStatus } from 'domain/TaskStatus.enum';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    TextareaModule,
    FloatLabelModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  constructor(private taskService: TaskService, private userService : UsersService) {}

  @Input() task: Task | null = null;
  @Input() edit: boolean = false;

  fetchUsers: {name: string, value: string}[] = []

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
    console.log(this.task)
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
        assignee: assignee || null,
        priority:
          TaskPriority[priority as keyof typeof TaskPriority] ||
          TaskPriority.LOW,
        deadline: deadline ? deadline.toString() : null,
        status:
          TaskStatus[status as keyof typeof TaskStatus] ||
          TaskStatus.IN_PROGRESS,
      })
      .subscribe({
        next: (response) => {
          console.log('Tarefa criada com sucesso:', response);
        },
        error: (err) => {
          console.error('Erro ao criar tarefa:', err);
        },
      });
  }

  updateTask(): void {
    const { title, description, assignee, priority, deadline, status } =
      this.taskForm.value;

      console.log(this.task!.id.toString())

    this.taskService
      .updateTask({
        id: this.task!.id.toString(),
        title: title ?? null,
        description: description ?? null,
        assigneeId:  assignee ?? null,
        priority: TaskPriority[priority as keyof typeof TaskPriority] || null,
        deadline: deadline ? deadline.toString() : null,
        status: TaskStatus[status as keyof typeof TaskStatus] || null,
      })
      .subscribe({
        next: (response) => {
          console.log('Tarefa atualizada com sucesso:', response);
        },
        error: (err) => {
          console.error('Erro ao atualizar tarefa:', err);
        },
      });
  }
}
