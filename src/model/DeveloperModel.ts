import { Role } from "./RoleModel";

export interface Developer {
  id: number;
  name: string;
  mail: string;
  role: Role;
  startDate: Date;
  creationDate: Date;
  updateDate: Date;
}
