import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from 'app/services/auth.service';
import { CreateUserDTO } from 'domain/dto/CreateUserDTO';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    login: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(private authService: AuthServiceService) {}

  onSignUp(): void {
    const { name, login, password } = this.registerForm.value;

    const newUser: CreateUserDTO = {
      name: name || '',
      email: login || '',
      password: password || '',
    };

    this.authService.signup(newUser).subscribe({
      next: (response: any) => {
        console.log('Login bem-sucedido:', response);
      },
      error: (err: any) => {
        console.error('Erro no login:', err);
      },
    });
  }
}
