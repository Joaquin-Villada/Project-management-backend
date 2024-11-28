import { RoleDao } from "./RoleDao";

export interface UpdateDevDao {
  name: string;
  mail: string;
  role: RoleDao;
  startDate: Date;
  creationDate: Date;
  updateDate: Date;
}
