import { TaskPriority } from "./TaskPriority.enum";
import { TaskStatus } from "./TaskStatus.enum";

export type Task = {
  id: number;
  title?: string;
  description?: string;
  assignee?: {
    id: number;
    name: string;
    email: string;
  };
  priority: TaskPriority;
  deadline: Date;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
