import { TaskPriority } from 'domain/TaskPriority.enum';
import { TaskStatus } from 'domain/TaskStatus.enum';

export type CreateTaskDTO = {
  title: string | null;
  description: string | null;
  assignee: number | null;
  priority: TaskPriority | null;
  deadline: string | null;
  status: TaskStatus | null;
};
