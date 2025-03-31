import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'domain/Task.types';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { TaskFormComponent } from '../task-form/task-form.component';


@Component({
  selector: 'app-dialog',
  imports: [DialogModule, ButtonModule,InfoDialogComponent,TaskFormComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
@Input() visible: boolean = false;
@Input() edit: boolean = false;
@Input() task: Task | null = null;
@Input() header?: string  = 'Task Details';
@Output() closeDialog = new EventEmitter<void>();

onClose(): void {
  this.closeDialog.emit();
}
}
