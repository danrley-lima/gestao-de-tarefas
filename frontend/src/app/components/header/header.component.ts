import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() breadcrumbs: { label: string; url: string }[] = [];
  @Input() title: string = 'Title';
  @Input() subtitle: string = 'Subtitle';
  @Input() subtitleButton: string | null = 'pi pi-check';
  @Input() buttonLabel: string | null = 'Subtitle Button';
  @Input() onClick : () => void = () => {};
}
