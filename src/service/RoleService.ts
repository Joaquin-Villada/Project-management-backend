import { RoleRepository } from "../repository/RoleRepository";
import { RoleEntity } from "../entity/RoleEntity";

const getRoles = async (): Promise<RoleEntity[]> => {
  return await RoleRepository.getRoles();
};

const addRole = async (payload: RoleEntity) => {
  return await RoleRepository.addRole(payload);
};

const deleteRole = async (id: number) => {
  return await RoleRepository.deleteRole(id);
};

export const RoleService = {
  getRoles,
  addRole,
  deleteRole,
};
