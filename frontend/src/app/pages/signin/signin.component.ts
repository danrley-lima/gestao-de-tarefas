import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  providers: [MessageService],
})
export class SigninComponent {
  signinForm = new FormGroup({
    login: new FormControl('login', {
      validators: [
        Validators.required,
        Validators.email,
      ]}),
    password: new FormControl('password', {
      validators: [
        Validators.required
      ]}),
  })


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
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.isLoading = false;
        this.showError('Credenciais inválidas ou erro na conexão');
        console.error('Erro no login:', err);
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
