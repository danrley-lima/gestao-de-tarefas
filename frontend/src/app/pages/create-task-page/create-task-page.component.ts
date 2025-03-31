import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'app/components/header/header.component';
import { TaskFormComponent } from 'app/components/task-form/task-form.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    TextareaModule,
    FloatLabelModule,
    InputTextModule,
    SelectModule,
    HeaderComponent,
    TaskFormComponent,
  ],
  templateUrl: './create-task-page.component.html',
  styleUrl: './create-task-page.component.scss',
})
export class CreateTaskPageComponent {
  create = {
    breadcrumbs: [
      { label: 'Página Inicial', url: '/tasks' },
      { label: 'Tarefas', url: '/tasks' },
      { label: 'Criar tarefa', url: '/tasks/create' },
    ],
    title: 'Tarefas',
    subtitle: 'Revise ou gerencie as tarefas cadastradas.',
    buttonText: null,
    subtitleButton: null,
  };
}
