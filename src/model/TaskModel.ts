import { ProjectEntity } from "../entity/ProjectEntity";
import { DeveloperEntity } from "../entity/DeveloperEntity";
import { TaskStatusEntity } from "../entity/TaskStatusEntity";

export interface Task {
  id: number;
  developer: DeveloperEntity;
  project: ProjectEntity;
  tittle: string;
  description: string;
  status: TaskStatusEntity;
  limitDate: Date | null;
  creationDate: Date;
  updateDate: Date;
}

export interface TaskStatus {
  name: string;
  id: number;
}
