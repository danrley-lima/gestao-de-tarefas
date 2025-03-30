import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './iconButton.component.html',
  styleUrl: './iconButton.component.scss'
})

export class IconButtonComponent {
onClick() {
throw new Error('Method not implemented.');
}

@Input() icon: string = 'pi pi-check';
}
