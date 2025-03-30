import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  imports: [],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {
  @Input() title?: any = '';
  @Input() info?: any = '';
}
