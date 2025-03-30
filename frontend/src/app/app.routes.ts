import { Routes } from '@angular/router';
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';
import { ManagerTaskPageComponent } from './pages/manager-task-page/manager-task-page.component';
import { SigninComponent } from './pages/signin/signin.component';

export const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'tasks', component: ManagerTaskPageComponent },
  { path: 'tasks/create', component: CreateTaskPageComponent },
  { path: '**', redirectTo: '' },
];
