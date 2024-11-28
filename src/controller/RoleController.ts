import { RoleService } from "../service/RoleService";
import { Request, Response } from "express";
import { RoleEntity } from "../entity/RoleEntity";

const getRoles = async (req: Request, res: Response) => {
  try {
    const roles: RoleEntity[] = await RoleService.getRoles();
    return res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los roles" });
  }
};

const addRole = async (req: Request, res: Response) => {
  const payload: RoleEntity = req.body;
  const newRole = RoleService.addRole(payload);
  res.json(newRole);
};

const deleteRole = async (req: Request, res: Response) => {
  const id = req.params.id;
  RoleService.deleteRole(+id);
  res.json({ message: "Role deleted" });
};

export const RoleController = {
  getRoles,
  addRole,
  deleteRole,
};
