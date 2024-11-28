import { Developer } from "./DeveloperModel";

export interface Project {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  startDate: Date;
  endDate: Date | null;
  updateDate: Date;
  developers: Developer[];
}
