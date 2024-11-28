import { RoleDao } from "./RoleDao";

export interface AddDeveloperDao {
  mail: string;
  name: string;
  startDate: Date;
  creationDate: Date;
  updateDate: Date;
  role: RoleDao;
}
