import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from 'app/services/task.service';
import { PriorityTranslatePipe } from 'app/shared/priority-translate.pipe';
import { StatusTranslatePipe } from 'app/shared/status-translate.pipe';
import { UpdateTaskReqDTO } from 'domain/dto/UpdateTaskReqDTO';
import { Task } from 'domain/Task.types';
import { SortEvent } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
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
    StatusTranslatePipe,
    Dialog,
    Button,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data: Task[] = [];
  @Output() close: Task | null = null;
  @Output() loadTasks = new EventEmitter<void>();

  selectedTask: Task | null = null;
  isSorted: boolean = false;
  editMode: boolean = false;
  deleteDialog: boolean = false;
  checkTaskDialog: boolean = false;

  constructor(private taskService: TaskService) {}

  showTaskDetails(task: Task) {
    this.selectedTask = task;
    this.editMode = false;
  }

  editTaskDetails(task: Task) {
    this.selectedTask = task;
    this.editMode = true;
  }

  showDeleteTaskPopUp(task: Task) {
    this.selectedTask = task;
    this.deleteDialog = true;
  }

  showCheckTask(task: Task) {
    this.selectedTask = task;
    this.checkTaskDialog = true;
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.loadTasks.emit();
        this.deleteDialog = false;
        this.selectedTask = null;
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      },
    });
  }

  checkTask(task: Task) {
    if (!task) return;
    if (task.status === 'COMPLETED') {
      return;
    }

    const taskChecked: UpdateTaskReqDTO = {
      id: task!.id!.toString(),
      title: task!.title!,
      description: task.description!,
      assigneeId: task.assignee?.id!,
      priority: task.priority,
      deadline: task.deadline,
      status: 'COMPLETED',
    };

    this.taskService.updateTask(taskChecked).subscribe({
      next: () => {
        this.loadTasks.emit();
        this.deleteDialog = false;
        this.selectedTask = null;
        this.checkTaskDialog = false;
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      },
    });
  }

  closeDeleteDialog(): void {
    this.deleteDialog = false;
    this.checkTaskDialog = false;
    this.selectedTask = null;
  }

  closeDialog() {
    this.selectedTask = null;
    this.editMode = false;
    this.loadTasks.emit();
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
