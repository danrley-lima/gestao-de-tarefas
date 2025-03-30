import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LayoutComponent } from 'app/pages/layout/layout.component';
import { SigninComponent } from 'app/pages/signin/signin.component';
import { CreateTaskPageComponent } from 'app/pages/create-task-page/create-task-page.component';
import { RootComponent } from 'app/pages/root/root.component';

bootstrapApplication(RootComponent, appConfig)
  .catch((err) => console.error(err));
