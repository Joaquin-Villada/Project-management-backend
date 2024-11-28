import { DevelopersRepository } from "../repository/DevelopersRepository";
import { DeveloperEntity } from "../entity/DeveloperEntity";
import { AddDeveloperDto } from "../dto/AddDeveloperDto";
import { UpdateDevDto } from "../dto/UpdateDeveloperDto";
import { AddDeveloperDao } from "../dao/AddDeveloperDao";
import { Developer } from "../model/DeveloperModel";
import { response } from "express";

const getDevelopers = () => {
  try {
    return DevelopersRepository.getDevelopers();
  } catch (err) {
    throw err;
  }
};

const getDeveloperById = (id: number) => {
  try {
    return DevelopersRepository.getDeveloperById(id);
  } catch (err) {
    throw err;
  }
};

const addDeveloper = async (developer: AddDeveloperDto): Promise<Developer> => {
  try {
    const emailExists: boolean =
      await DevelopersRepository.addExistPayloadMail(developer);
    if (emailExists) {
      throw new Error(`El correo electrónico ${developer.mail} ya está en uso`);
    }
    return await DevelopersRepository.addDeveloper(developer);
  } catch (err) {
    throw err;
  }
};

const updateDeveloper = async (id: number, payload: UpdateDevDto) => {
  try {
    return await DevelopersRepository.updateDeveloper(id, payload);
  } catch (err) {
    throw err;
  }
};

const deleteDeveloper = (id: number) => {
  try {
    return DevelopersRepository.deleteDeveloper(id);
  } catch (err) {
    throw err;
  }
};

export const DevelopersService = {
  getDevelopers,
  getDeveloperById,
  addDeveloper,
  updateDeveloper,
  deleteDeveloper,
};
