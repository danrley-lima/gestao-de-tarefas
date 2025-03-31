import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseDTO } from 'domain/dto/AuthResponseDTO';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { CreateUserDTO } from 'domain/dto/CreateUserDTO';
import { LoginRequestDTO } from 'domain/dto/LoginRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly API_PATH = '/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}${this.API_PATH}`
    );
  }
}
