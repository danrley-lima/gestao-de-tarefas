import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Task, TaskPriority, TaskStatus } from '../../../domain/';

@Component({
  selector: 'app-root',
  imports: [CommonModule,TableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  loading = false;

  tasks: Task[] = [
    {
      number: 1,
      title: 'Create a new project',
      description: 'Create a new project in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.HIGH,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.IN_PROGRESS,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
    {
      number: 2,
      title: 'Create a new component',
      description: 'Create a new component in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.HIGH,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.IN_PROGRESS,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
    {
      number: 3,
      title: 'Create a new service',
      description: 'Create a new service in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.LOW,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.COMPLETED,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },

  ];
}
