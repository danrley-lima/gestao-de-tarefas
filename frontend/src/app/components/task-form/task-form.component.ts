import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from 'app/services/task.service';
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
  imports: [ReactiveFormsModule, DatePickerModule, TextareaModule, FloatLabelModule, InputTextModule, SelectModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  createTaskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    assignee: new FormControl(''),
    priority: new FormControl(''),
    deadline: new FormControl(''),
    status: new FormControl(''),
  })

  @Input() edit: boolean = false;

  constructor(private taskService: TaskService) {}

  onClick (){
    if (this.edit) {
      this.updateTask()
    } else {
      this.createTask()
    }
  }

  createTask(): void {
    const { title, description, assignee, priority, deadline, status } = this.createTaskForm.value;

      this.taskService.create({
        title: title ?? '',
        description: description ?? '',
        assignee: Number(assignee) || 0,
        priority: TaskPriority[priority as keyof typeof TaskPriority] || TaskPriority.LOW,
        deadline: deadline ?? '',
        status: TaskStatus[priority as keyof typeof TaskStatus] || TaskStatus.IN_PROGRESS,
      }).subscribe({
        next: (response) => {
          console.log('Tarefa criada com sucesso:', response);
        },
        error: (err) => {
          console.error('Erro ao criar tarefa:', err);
        },
      });
}

updateTask(): void {
  const { title, description, assignee, priority, deadline, status } = this.createTaskForm.value;

    this.taskService.create({
      title: title ?? null,
      description: description ?? null,
      assignee: Number(assignee) || null,
      priority: TaskPriority[priority as keyof typeof TaskPriority] || null,
      deadline: deadline ?? '',
      status: TaskStatus[priority as keyof typeof TaskStatus] || null,
    }).subscribe({
      next: (response) => {
        console.log('Tarefa criada com sucesso:', response);
      },
      error: (err) => {
        console.error('Erro ao criar tarefa:', err);
      },
    });

}
}
