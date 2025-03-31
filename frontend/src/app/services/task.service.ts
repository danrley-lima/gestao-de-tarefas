import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTaskDTO } from 'domain/dto/CreateTaskDTO';
import { Task } from 'domain/Task.types';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environment';
import { UpdateTaskReqDTO } from 'domain/dto/UpdateTaskReqDTO';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API_PATH = '/tasks';

  constructor(private http: HttpClient) {}

  create(dto: CreateTaskDTO): Observable<CreateTaskDTO> {
    return this.http.post<CreateTaskDTO>(
      environment.apiUrl + this.API_PATH,
      dto
    );
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl + this.API_PATH).pipe(
      map((tasks) =>
        tasks.map((task) => ({
          ...task,
          deadline: new Date(task.deadline),
          createdAt: task.createdAt ? new Date(task.createdAt) : undefined,
          updatedAt: task.updatedAt ? new Date(task.updatedAt) : undefined,
        }))
      )
    );
  }

  updateTask(task: UpdateTaskReqDTO): Observable<UpdateTaskReqDTO> {
    return this.http.put<UpdateTaskReqDTO>(
      `${environment.apiUrl}${this.API_PATH}/${task.id}`,
      task
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${this.API_PATH}/${id}`);
  }
}
