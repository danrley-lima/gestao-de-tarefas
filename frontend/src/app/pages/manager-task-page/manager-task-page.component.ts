import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from 'app/components/header/header.component';
import { InputComponent } from 'app/components/input/input.component';
import { TaskService } from 'app/services/task.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Task } from '../../../domain/Task.types';
import { TableComponent } from '../../components/table/table.component';
import { UsersService } from 'app/services/users.service';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchTaskDTO } from 'domain/dto/SearchTaskDTO';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-manager-page',
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    TableComponent,
    HeaderComponent,
    ProgressSpinnerModule,
    TextareaModule,
    FloatLabelModule,
    InputTextModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './manager-task-page.component.html',
  styleUrl: './manager-task-page.component.scss',
})
export class ManagerTaskPageComponent implements OnInit {

  taskForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    assignee: new FormControl(''),
    status: new FormControl(''),
  });

  loading = false;
  errorMessage: string | null = null;
  tasks: Task[] = [];
  assignees: {name: string, value: string}[] = []

  constructor(private router: Router,
    private taskService: TaskService,
    private userService: UsersService,
  private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadAssignees();
  }

   onSubmit () {
    const validated = this.validateForm();

    if (!validated) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha pelo menos um campo para buscar',
      });
    }

    const taskData: SearchTaskDTO = {
      title: this.taskForm.value.title ?? null,
      id: this.taskForm.value.id ? Number(this.taskForm.value.id) : null,
      assigneeId: this.taskForm.value.assignee ? Number(this.taskForm.value.assignee) : null,
      status: this.taskForm.value.status ?? null
    }

    this.taskService.searchTasks(taskData).subscribe({
      next: (response: any) => {
        this.tasks = response;
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar tarefas',
        });
      },
    });
  }

  private validateForm(): boolean {
    if (this.taskForm.value.title == '' &&
      this.taskForm.value.id == '' &&
      this.taskForm.value.assignee == '' &&
      this.taskForm.value.status == '') {
      return false;
    }
    return true;
  }

  private loadAssignees(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.assignees = users.map((user: any) => ({
          name: user.name,
          value: user.id.toString(),
        }));
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar usuários',
        });
      },
    });
  }

   loadTasks(): void {
    this.taskForm.reset();
    this.loading = true;
    this.errorMessage = null;

    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;

        if (this.validateForm()) {
          this.tasks = tasks.filter((task) => task.status === 'COMPLETED');
        }

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
