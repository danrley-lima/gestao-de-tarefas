import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterSelectComponent } from 'app/components/filter-select/filter-select.component';
import { HeaderComponent } from 'app/components/header/header.component';
import { InputComponent } from 'app/components/input/input.component';
import { TaskService } from 'app/services/task.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Task } from '../../../domain/Task.types';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-task-manager-page',
  imports: [
    CommonModule,
    FilterSelectComponent,
    InputComponent,
    ReactiveFormsModule,
    TableComponent,
    HeaderComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './manager-task-page.component.html',
  styleUrl: './manager-task-page.component.scss',
})
export class ManagerTaskPageComponent implements OnInit {
  loading = false;
  errorMessage: string | null = null;
  tasks: Task[] = [];

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.loading = true;
    this.errorMessage = null;

    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
        this.loading = false;
        this.errorMessage =
          'Erro ao carregar tarefas. Tente novamente mais tarde.';
      },
    });
  }

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
  });

  manager = {
    breadcrumbs: [
      { label: 'Página Inicial', url: '/' },
      { label: 'Tarefas', url: '/tasks' },
    ],
    title: 'Tarefas',
    subtitle: 'Revise ou gerencie as tarefas cadastradas.',
    buttonText: 'Cadastrar nova tarefa',
    subtitleButton: 'Clique abaixo para cadastrar uma nova tarefa',
  };

  onClickCreateTask = () => {
    this.router.navigate(['/tasks/create']);
  };
}
