import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTaskDTO } from 'domain/dto/CreateTaskDTO';
import { Task } from 'domain/Task.types';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environment';
import { UpdateTaskReqDTO } from 'domain/dto/UpdateTaskReqDTO';
import { SearchTaskDTO } from 'domain/dto/SearchTaskDTO';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API_PATH = '/tasks';

  constructor(private http: HttpClient) {}

  searchTasks (dto: SearchTaskDTO): Observable<Task[]> {
    let params = new HttpParams();
    if (dto.title) params = params.set('title', dto.title);
    if (dto.id) params = params.set('id', dto.id.toString());
    if (dto.assigneeId) params = params.set('assigneeId', dto.assigneeId.toString());
    if (dto.status) params = params.set('status', dto.status.toString());

    return this.http.get<Task[]>(environment.apiUrl + this.API_PATH + "/search", {
      params: params
    })
    .pipe(
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
      {
        title: task.title,
        description: task.description,
        assigneeId: task.assigneeId,
        priority: task.priority,
        deadline: task.deadline,
        status: task.status,
      }
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${this.API_PATH}/${id}`);
  }
}
