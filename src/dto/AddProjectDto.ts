import { DeveloperEntity } from "../entity/DeveloperEntity";
import { TaskEntity } from "../entity/TaskEntity";
import { Developer } from "../model/DeveloperModel";

export interface AddProjectDto {
  name: string;
  description: string;
  manager: Developer;
  idStatus: TaskEntity;
  startDate: Date;
  endDate: Date | null;
  developers: DeveloperEntity[];
  task: TaskEntity[];
}
