import { Request, Response } from "express";
import { DevelopersService } from "../service/DevelopersService";
import { DeveloperEntity } from "../entity/DeveloperEntity";
import { AddDeveloperDto } from "../dto/AddDeveloperDto";
import { UpdateDevDto } from "../dto/UpdateDeveloperDto";
import { Developer } from "../model/DeveloperModel";
/*
const getDevelopers = async (request: Request, response: Response) => {
    const developers: DeveloperEntity[] | undefined = await DevelopersService.getDevelopers();
    response.status(200).json(developers)
}*/
const getDevelopers = async (request: Request, response: Response) => {
  try {
    const developers: DeveloperEntity[] | undefined =
      await DevelopersService.getDevelopers();
    if (developers) {
      const validDevs = developers.filter(
        (dev) =>
          dev.name &&
          dev.mail &&
          dev.role &&
          dev.startDate &&
          dev.creationDate &&
          dev.updateDate,
      );
      response.status(200).json(validDevs);
    } else {
      response.status(404).json("No developers found");
    }
  } catch (err) {
    response.status(500).json(err);
  }
};

const getDeveloperById = async (request: Request, response: Response) => {
  const { id } = request.params;
  const developer: DeveloperEntity | null | undefined =
    await DevelopersService.getDeveloperById(+id);
  if (!developer) {
    response.status(404).json("Desarrollador no encontrado");
    return;
  }
  response.status(200).json(developer);
};

const addDeveloper = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const payload: AddDeveloperDto = request.body;
    const developer: Developer = await DevelopersService.addDeveloper(payload);
    return response.status(201).json(developer);
  } catch (error) {
    return response
      .status(400)
      .json(`Error al crear el desarrollador: ${error}`);
  }
};

const updateDeveloper = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const payload: UpdateDevDto = request.body;
    await DevelopersService.updateDeveloper(Number(id), payload);
    return response.json(`Se actualizo con exito a: ${payload.name}`);
  } catch (error) {
    throw error;
  }
};

const deleteDeveloper = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await DevelopersService.deleteDeveloper(+id);
    return response.status(200).json("Desarrollador eliminado");
  } catch (error) {
    return response
      .status(404)
      .json(`Error al eliminar el desarrollador: ${error}`);
  }
};

export const DevelopersController = {
  getDevelopers,
  getDeveloperById,
  addDeveloper,
  updateDeveloper,
  deleteDeveloper,
};
