export type UpdateTaskReqDTO = {
id: string ;
  title: string | null;
  description: string | null;
  assigneeId: string | null;
  priority: string | null;
  deadline: string | null;
  status: string | null;
}
