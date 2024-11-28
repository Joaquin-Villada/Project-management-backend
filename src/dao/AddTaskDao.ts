import { DeveloperEntity } from "../entity/DeveloperEntity";
import { ProjectEntity } from "../entity/ProjectEntity";
import { TaskStatusEntity } from "../entity/TaskStatusEntity";

export interface AddTaskDao {
  tittle: string;
  description: string;
  project: ProjectEntity[];
  developer: DeveloperEntity[];
  status: TaskStatusEntity;
  creationDate: Date;
  limitDate: Date | null;
  updateDate: Date;
}
