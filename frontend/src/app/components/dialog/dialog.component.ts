import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'domain/Task.types';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';


@Component({
  selector: 'app-dialog',
  imports: [DialogModule, ButtonModule,InfoDialogComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
@Input() visible: boolean = false;
@Input() task: Task | null = null;
@Input() header?: string  = 'Task Details';
@Output() closeDialog = new EventEmitter<void>();

onClose(): void {
  this.closeDialog.emit();
}
}
