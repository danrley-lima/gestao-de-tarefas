import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'app/components/input/input.component';
import { FilterSelectComponent } from 'app/components/filter-select/filter-select.component';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TaskService } from 'app/services/task-service.service';
import { HeaderComponent } from 'app/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, DatePickerModule, TextareaModule, FloatLabelModule, InputTextModule, SelectModule, HeaderComponent],
  templateUrl: './create-task-page.component.html',
  styleUrl: './create-task-page.component.scss'
})
export class CreateTaskPageComponent {
  createTaskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    assignee: new FormControl(''),
    priority: new FormControl(''),
    deadline: new FormControl(''),
    status: new FormControl(''),
  })

  create = {
      breadcrumbs:  [{ label: 'Página Inicial', url: '/tasks' },
      { label: 'Tarefas', url: '/tasks' },
      { label: 'Criar tarefa', url: '/tasks/create' }],
      title: 'Tarefas',
      subtitle: 'Revise ou gerencie as tarefas cadastradas.',
      buttonText: null,
      subtitleButton: null,
    }

  constructor(private taskService: TaskService) {}

  onCreateTask(): void {
    const { title, description, assignee, priority, deadline, status } = this.createTaskForm.value;

      this.taskService.create({
        title: title ?? '',
        description: description ?? '',
        assignee: Number(assignee) || 0,
        priority: priority ?? '',
        deadline: deadline ?? '',
        status: status ?? ''
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
