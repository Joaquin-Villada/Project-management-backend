export interface AddTaskDto {
  task: any;
  developers: any;
  tittle: string;
  description: string;
  idStatus: number;
  idProject: number;
  idDev: number;
  limitDate: Date;
}
