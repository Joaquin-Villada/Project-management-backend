import { DeveloperRouter } from "./router/DeveloperRouter";
import { ProjectsRouter } from "./router/ProjectsRouter";
import { TaskRouter } from "./router/TaskRouter";
import { RolesRouter } from "./router/RoleRouter";

export const ROUTES = [
  {
    path: "/developers",
    router: DeveloperRouter,
  },
  {
    path: "/roles",
    router: RolesRouter,
  },
  {
    path: "/projects",
    router: ProjectsRouter,
  },
  {
    path: "/tasks",
    router: TaskRouter,
  },
];
