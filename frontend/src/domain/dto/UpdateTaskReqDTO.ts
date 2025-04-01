export type UpdateTaskReqDTO = {
id: string ;
  title: string | null;
  description: string | null;
  assigneeId: number | null;
  priority: string | null;
  deadline: Date | null;
  status: string | null;
}
