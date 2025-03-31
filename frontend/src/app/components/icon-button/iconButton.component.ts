import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './iconButton.component.html',
  styleUrl: './iconButton.component.scss',
})
export class IconButtonComponent {
  @Output() clickEvent = new EventEmitter<void>();

  @Input() icon: string = 'pi pi-check';

  onClick() {
    this.clickEvent.emit();
  }
}
