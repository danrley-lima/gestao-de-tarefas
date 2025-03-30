import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseDTO } from 'domain/dto/AuthResponseDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

   signin(email: string, password: string): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>('http://192.168.0.6:3000/api/auth/login', {
      login: "antonio@example.com",
      password: "123"
    });
  }
}
