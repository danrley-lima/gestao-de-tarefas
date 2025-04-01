import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from 'app/services/auth.service';
import { LoginRequestDTO } from 'domain/dto/LoginRequestDTO';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ToastModule,
    RouterLink,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  providers: [MessageService],
})
export class SigninComponent {
  signinForm = new FormGroup({
    login: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  isLoading = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSignin(): void {
    if (this.signinForm.invalid) {
      this.showError('Preencha todos os campos corretamente');
      return;
    }

    this.isLoading = true;
    const { login, password } = this.signinForm.value;

    const loginRequest: LoginRequestDTO = {
      login: login || '',
      password: password || '',
    };

    this.authService.signin(loginRequest).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.token);
        this.authService.setUserLogged(true);
        this.router.navigate(['/tasks']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.authService.setUserLogged(false);

        if (err.error.status === 401) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Login ou senha inválidos',
          });
        }
      },
      complete: () => (this.isLoading = false),
    });
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
      life: 5000,
    });
  }
}
