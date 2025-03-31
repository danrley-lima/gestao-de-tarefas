import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class RootComponent {
  constructor(private router: Router) {}

  currentUrl: string = '';

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    console.log('URL atual:', this.currentUrl);

    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }
}
