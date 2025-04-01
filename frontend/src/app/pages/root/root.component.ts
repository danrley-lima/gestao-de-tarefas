import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthServiceService } from 'app/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class RootComponent {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  currentUrl: string = '';
  userLogged = false;

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    console.log('URL atual:', this.currentUrl);
    this.userLogged = this.authService.getUserLogged();
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  logout() {
    this.authService.setUserLogged(false);
    this.router.navigate(['/']);
  }
}
