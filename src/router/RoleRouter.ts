import { Router, Request, Response } from "express";
import { RoleController } from "../controller/RoleController";

export const RolesRouter: Router = Router();

RolesRouter.get("", (req: Request, res: Response): any => {
  RoleController.getRoles(req, res);
});

RolesRouter.post("", (req: Request, res: Response) => {
  RoleController.addRole(req, res);
});

RolesRouter.delete("/:id", (req: Request, res: Response) => {
  RoleController.deleteRole(req, res);
});
