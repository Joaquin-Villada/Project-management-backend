import dataSource from "../db";
import { DeveloperEntity } from "../entity/DeveloperEntity";
import { AddDeveloperDto } from "../dto/AddDeveloperDto";
import { RoleEntity } from "../entity/RoleEntity";
import { AddDeveloperDao } from "../dao/AddDeveloperDao";
import { UpdateDevDto } from "../dto/UpdateDeveloperDto";
import { UpdateDevDao } from "../dao/UpdateDeveloperDao";
import { response } from "express";
import { Developer } from "../model/DeveloperModel";

const _developerRepository = dataSource.getRepository(DeveloperEntity);
const _roleRepository = dataSource.getRepository(RoleEntity);

const getDevelopers = async (): Promise<DeveloperEntity[] | undefined> => {
  try {
    return await _developerRepository.find({
      relations: { role: true, project: true, task: true },
    });
  } catch (error) {
    response.status(404).json(error);
  }
};

const getDeveloperById = async (
  id: number,
): Promise<DeveloperEntity | undefined | null> => {
  try {
    return await _developerRepository.findOne({
      where: { id: id },
      relations: { role: true, project: true, task: true },
    });
  } catch (err) {
    response.status(404).json("Desarrollador no encontrado");
  }
};

const addDeveloper = async (payload: AddDeveloperDto): Promise<Developer> => {
  try {
    const role: RoleEntity | null = await _roleRepository.findOne({
      where: { id: payload.idRole },
    });
    if (!role) {
      throw new Error(
        `No se encontró un rol asignado al id: ${payload.idRole}`,
      );
    }
    const developer: AddDeveloperDao = {
      name: payload.name,
      mail: payload.mail,
      role: role,
      startDate: new Date(),
      creationDate: new Date(),
      updateDate: new Date(),
    };
    return await _developerRepository.save(developer);
  } catch (error) {
    throw new Error(`Error al crear el desarrollador ${error}`);
  }
};

const updateDeveloper = async (id: number, payload: UpdateDevDto) => {
  try {
    const role = await _roleRepository.findOne({
      where: { id: payload.idRole },
    });
    if (!role) {
      throw new Error(
        `No se encontró un rol asignado al id: ${payload.idRole}`,
      );
    }

    const existingDeveloper = await _developerRepository.findOne({
      where: { id: id },
    });
    if (!existingDeveloper) {
      throw new Error(`El desarrollador no fue encontrado`);
    }

    const emailExists = await _developerRepository.findOne({
      where: { mail: payload.mail },
    });
    if (emailExists && emailExists.id !== id) {
      throw new Error(
        `El correo electrónico ${payload.mail} ya está en uso por otro desarrollador`,
      );
    }

    const updateDeveloper: UpdateDevDao = {
      name: payload.name,
      mail: payload.mail,
      role: role,
      startDate: existingDeveloper.startDate,
      creationDate: existingDeveloper.creationDate,
      updateDate: new Date(),
    };

    await _developerRepository.update(id, updateDeveloper);
  } catch (err) {
    throw new Error(`Error al actualizar el desarrollador ${err}`);
  }
};

const deleteDeveloper = async (id: number) => {
  try {
    // Eliminar registros en desarrollador_x_proyecto antes de eliminar el desarrollador
    await _developerRepository.query(
      `DELETE FROM desarrollador_x_proyecto WHERE id_desarrollador = $1`,
      [id],
    );
    // Eliminar proyectos antes de eliminar el desarrollador
    await _developerRepository.query(
      `UPDATE proyectos SET id_responsable = NULL WHERE id_responsable = $1`,
      [id],
    );
    // Eliminar tareas antes de eliminar el desarrollador
    await _developerRepository.query(
      `UPDATE tareas SET id_asignado = NULL WHERE id_asignado = $1`,
      [id],
    );
    await _developerRepository.delete(id);
  } catch (error) {
    throw new Error(`Error al eliminar el desarrollador ${error}`);
  }
};

const updateExistPayloadMail = async (
  payload: UpdateDevDto,
): Promise<boolean> => {
  try {
    const existmail: DeveloperEntity | null =
      await _developerRepository.findOne({
        where: { mail: payload.mail },
      });
    if (existmail && existmail.mail !== payload.mail) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(`Error al verificar el mail ${error}`);
  }
};

const addExistPayloadMail = async (
  payload: AddDeveloperDto,
): Promise<boolean> => {
  try {
    const existmail: DeveloperEntity | null =
      await _developerRepository.findOne({
        where: { mail: payload.mail },
      });
    return !!existmail;
  } catch (error) {
    throw new Error(`Error al verificar el mail ${error}`);
  }
};

export const DevelopersRepository = {
  getDevelopers,
  getDeveloperById,
  addDeveloper,
  updateDeveloper,
  deleteDeveloper,
  updateExistPayloadMail,
  addExistPayloadMail,
};
