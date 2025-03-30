import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseDTO } from 'domain/dto/AuthResponseDTO';
import { CreateTaskDTO } from 'domain/dto/AuthResponseDTO copy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

   create(dto: CreateTaskDTO): Observable<CreateTaskDTO> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsImlhdCI6MTc0MzM2ODYxNiwiZXhwIjoxNzQzMzgzMDE2LCJzdWIiOiJhbnRvbmlvQGV4YW1wbGUuY29tIn0._9c75GrWYo81srIslOFM-hFoolexnp65EC69AUs6dbM'

  const headers = {
    Authorization: `Bearer ${token}`,
  };


    return this.http.post<CreateTaskDTO>('http://192.168.0.6:3000/api/tasks', {
      title: "Finalizar relatório",
      description: "Relatório financeiro do 1º trimestre",
      assigneeId: "1",
      priority: "HIGH",
      deadline: "2025-04-15",
      status: "COMPLETED"
    },    { headers });
  }
}
