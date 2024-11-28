import dataSource from "../db";
import { RoleEntity } from "../entity/RoleEntity";

const _roleRepository = dataSource.getRepository(RoleEntity);

const getRoles = async (): Promise<RoleEntity[]> => {
  return await _roleRepository.find({
    relations: { developer: true },
  });
};

const addRole = async (payload: RoleEntity) => {
  try {
    return await _roleRepository.save(payload);
  } catch (error) {
    console.log(error);
  }
};

const deleteRole = async (id: number) => {
  return await _roleRepository.delete({ id: id });
};

export const RoleRepository = {
  getRoles,
  addRole,
  deleteRole,
};
