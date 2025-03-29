type Task = {
  number: number;
  title: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  deadline: Date;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
