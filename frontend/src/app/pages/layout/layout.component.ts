import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'app/components/header/header.component';
import { CreateTaskPageComponent } from '../create-task-page/create-task-page.component';
import { ManagerTaskPageComponent } from '../manager-task-page/manager-task-page.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, ManagerTaskPageComponent, CreateTaskPageComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  currentPage: string = 'app-task-manager';
  constructor(private route: ActivatedRoute) {}

  onInit(): void {
    this.route.url.subscribe((segments) => {
      this.currentPage = segments.map((segment) => segment.path).join('/');
      console.log('Segmento da URL:', this.currentPage);
    });
  }

  headerPages = {
    manager: {
      breadcrumbs: [
        { label: 'Página Inicial', url: '/' },
        { label: 'Tarefas', url: '/tasks' },
      ],
      title: 'Tarefas',
      subtitle: 'Revise ou gerencie as tarefas cadastradas.',
      buttonText: 'Cadastrar nova tarefa',
      subtitleButton: 'Clique abaixo para cadastrar uma nova tarefa',
    },
    create: {
      breadcrumbs: [
        { label: 'Página Inicial', url: '/' },
        { label: 'Tarefas', url: '/tasks' },
      ],
      title: 'Adicionar Tarefa',
      subtitle: 'Preencha os campos abaixo para adicionar uma nova tarefa.',
      buttonText: null,
      subtitleButton: null,
    },
  };

  ngOnInit() {
    this.currentPage = this.getCurrentPage();
  }

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
