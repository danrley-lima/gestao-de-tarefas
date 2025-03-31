import { Routes } from '@angular/router';
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';
import { ManagerTaskPageComponent } from './pages/manager-task-page/manager-task-page.component';
import { SigninComponent } from './pages/signin/signin.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: SigninComponent },
  {path: 'register', component: RegisterComponent},
  { path: 'tasks', component: ManagerTaskPageComponent },
  { path: 'tasks/create', component: CreateTaskPageComponent },
  { path: '**', redirectTo: '' },
];
