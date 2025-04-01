import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseDTO } from 'domain/dto/AuthResponseDTO';
import { CreateUserDTO } from 'domain/dto/CreateUserDTO';
import { LoginRequestDTO } from 'domain/dto/LoginRequestDTO';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly API_PATH_LOGIN = '/auth/login';
  private readonly API_PATH_REGISTER = '/auth/register';

  constructor(private http: HttpClient) {}

  userLogged: boolean = false;

  setUserLogged(logged: boolean) {
    this.userLogged = logged;
  }

  getUserLogged() {
    return this.userLogged;
  }
  signin(dto: LoginRequestDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(
      `${environment.apiUrl}${this.API_PATH_LOGIN}`,
      dto
    );
  }

  signup(dto: CreateUserDTO): Observable<CreateUserDTO> {
    return this.http.post<CreateUserDTO>(
      `${environment.apiUrl}${this.API_PATH_REGISTER}`,
      dto
    );
  }
}
