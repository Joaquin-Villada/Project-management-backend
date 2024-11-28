import { DataSource } from "typeorm";
import { DeveloperEntity } from "./entity/DeveloperEntity";
import { RoleEntity } from "./entity/RoleEntity";
import { ProjectEntity } from "./entity/ProjectEntity";
import { TaskEntity } from "./entity/TaskEntity";
import { TaskStatusEntity } from "./entity/TaskStatusEntity";

const dataSource = new DataSource({
  type: "postgres",
  host: "strikingly-cool-mullet.data-1.use1.tembo.io",
  port: 5432,
  username: "postgres",
  password: "tnxstXwXzubch6tZ",
  database: "postgres",
  entities: [
    DeveloperEntity,
    RoleEntity,
    ProjectEntity,
    TaskEntity,
    TaskStatusEntity,
  ],
  ssl: {
    rejectUnauthorized: false,
  },
});

export default dataSource;
