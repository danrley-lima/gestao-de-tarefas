import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilterSelectComponent } from 'app/components/filter-select/filter-select.component';
import { Task } from '../../../domain/Task.types';
import { TaskPriority } from '../../../domain/TaskPriority.enum';
import { TaskStatus } from '../../../domain/TaskStatus.enum';
import { InputComponent } from 'app/components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from "../../components/table/table.component";
import { HeaderComponent } from 'app/components/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-manager-page',
  imports: [
    CommonModule,
    FilterSelectComponent,
    InputComponent,
    ReactiveFormsModule,
    TableComponent,
    HeaderComponent
],
  templateUrl: './manager-task-page.component.html',
  styleUrl: './manager-task-page.component.scss',
})
export class ManagerTaskPageComponent {
  loading = false;
  taskForm = new FormGroup({
    number: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    assignee: new FormControl(''),
    priority: new FormControl(''),
    deadline: new FormControl(''),
    status: new FormControl(''),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
  })

  manager = {
    breadcrumbs:  [{ label: 'Página Inicial', url: '/' },
    { label: 'Tarefas', url: '/tasks' }],
    title: 'Tarefas',
    subtitle: 'Revise ou gerencie as tarefas cadastradas.',
    buttonText: 'Cadastrar nova tarefa',
    subtitleButton: 'Clique abaixo para cadastrar uma nova tarefa',
  }

  constructor(private router: Router) {}

  onClickCreateTask = () => {
    this.router.navigate(['/tasks/create']);
  }

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
    {
      number: 4,
      title: 'Create a new module',
      description: 'Create a new module in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.MEDIUM,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.COMPLETED,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
    {
      number: 5,
      title: 'Create a new pipe',
      description: 'Create a new pipe in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.HIGH,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.IN_PROGRESS,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
    {
      number: 6,
      title: 'Create a new directive',
      description: 'Create a new directive in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.LOW,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.COMPLETED,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
    {
      number: 7,
      title: 'Create a new guard',
      description: 'Create a new guard in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.MEDIUM,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.IN_PROGRESS,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
    {
      number: 8,
      title: 'Create a new interceptor',
      description: 'Create a new interceptor in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.HIGH,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.COMPLETED,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
    {
      number: 9,
      title: 'Create a new resolver',
      description: 'Create a new resolver in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.LOW,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.IN_PROGRESS,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
    {
      number: 10,
      title: 'Create a new environment variable',
      description: 'Create a new environment variable in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.MEDIUM,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.COMPLETED,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
    {
      number: 11,
      title: 'Create a new configuration file',
      description: 'Create a new configuration file in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.HIGH,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.IN_PROGRESS,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
    {
      number: 12,
      title: 'Create a new environment file',
      description: 'Create a new environment file in the Angular CLI',
      assignee: 'John Doe',
      priority: TaskPriority.LOW,
      deadline: new Date('2021-01-01'),
      status: TaskStatus.COMPLETED,
      createdAt: new Date('2020-12-01'),
      updatedAt: new Date('2020-12-01'),
    },
  ];
}
