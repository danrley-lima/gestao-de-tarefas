import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { PriorityTranslatePipe } from 'app/shared/priority-translate.pipe';
import { Task } from 'domain/Task.types';
import { SortEvent } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CaptionComponent } from '../caption/caption.component';
import { DialogComponent } from '../dialog/dialog.component';
import { IconButtonComponent } from '../icon-button/iconButton.component';

@Component({
  selector: 'app-table',
  imports: [
    IconButtonComponent,
    TableModule,
    DialogComponent,
    CaptionComponent,
    CommonModule,
    PriorityTranslatePipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data: Task[] = [];
  @Output() close: Task | null = null;

  selectedTask: Task | null = null;
  isSorted: boolean = false;
  editMode: boolean = false;


  showTaskDetails(task: Task) {
    this.selectedTask = task;
    this.editMode = false;
  }

  editTaskDetails(task: Task) {
    this.selectedTask = task;
    this.editMode = true;
  }

  closeDialog() {
    this.selectedTask = null;
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = false;
      // this.products = [...this.initialValue];
      // this.dt.reset();
    }
  }

  sortTableData(event: SortEvent) {
    (event.data ?? []).sort(
      (data1: Record<string, any>, data2: Record<string, any>) => {
        let value1: any = data1[event.field as string];
        let value2: any = data2[event.field as string];
        let result: number | null = null;
        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return (event.order as number) * result;
      }
    );
  }
}
