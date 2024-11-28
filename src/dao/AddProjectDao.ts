import { DeveloperEntity } from "../entity/DeveloperEntity";
import { TaskEntity } from "../entity/TaskEntity";
import { Developer } from "../model/DeveloperModel";

export interface AddProjectDao {
  name: string;
  description: string;
  manager: Developer;
  creationDate: Date;
  startDate: Date;
  endDate: Date | null;
  updateDate: Date;
  developers: DeveloperEntity[];
  task: TaskEntity[];
}
