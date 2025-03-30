import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from 'app/services/auth-service.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  signinForm = new FormGroup({
    login: new FormControl('login'),
    password: new FormControl('password'),
  })


  constructor(private authService: AuthServiceService) {}

  onSignin(): void {
    const { login, password } = this.signinForm.value;

    if (login && password) {
      this.authService.signin(login, password).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido:', response);

        },
        error: (err) => {
          console.error('Erro no login:', err);
        },
      });
    } else {
      console.error('Preencha todos os campos!');
    }
  }

}
