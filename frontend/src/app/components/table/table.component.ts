import { Component, Input, Output } from '@angular/core';
import { IconButtonComponent } from '../icon-button/iconButton.component';
import { TableModule } from 'primeng/table';
import { Task } from 'domain/Task.types';
import { DialogComponent } from "../dialog/dialog.component";
import { CaptionComponent } from '../caption/caption.component';

@Component({
  selector: 'app-table',
  imports: [IconButtonComponent,
    TableModule, DialogComponent, CaptionComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() data: Task[] = [];
  @Output() close: Task | null = null;

  selectedTask: Task | null = null;

  showTaskDetails(task: Task) {
    this.selectedTask = task;
  }

  closeDialog() {
    this.selectedTask = null;
  }
}
