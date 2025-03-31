import { bootstrapApplication } from '@angular/platform-browser';
import { RootComponent } from 'app/pages/root/root.component';
import { appConfig } from './app/app.config';

bootstrapApplication(RootComponent, appConfig).catch((err) =>
  console.error(err)
);
