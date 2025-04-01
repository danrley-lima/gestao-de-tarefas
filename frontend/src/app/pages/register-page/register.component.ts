import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from 'app/services/auth.service';
import { CreateUserDTO } from 'domain/dto/CreateUserDTO';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FloatLabelModule,
    InputTextModule, ToastModule, RouterLink],
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

  constructor(private authService: AuthServiceService,
     private messageService: MessageService) {}

  onSignUp(): void {
    const { name, login, password } = this.registerForm.value;

    const newUser: CreateUserDTO = {
      name: name || '',
      email: login || '',
      password: password || '',
    };

    this.authService.signup(newUser).subscribe({
      next: (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário criado com sucesso',
          });
          this.registerForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        if (err.error.status === 409) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Usuário já existe',
          })
        }
        if (err.error.status === 400) {
         this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Dados inválidos',
          })
        }
        if (err.error.status === 500) {
          console.log('Erro interno do servidor');
        }
      },
    });
  }


}
