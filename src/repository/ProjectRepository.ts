import dataSource from "../db";
import { ProjectEntity } from "../entity/ProjectEntity";
import { AddProjectDto } from "../dto/AddProjectDto";
import { response } from "express";
import { AddProjectDao } from "../dao/AddProjectDao";
import { Repository } from "typeorm";
import { DeveloperEntity } from "../entity/DeveloperEntity";

const _projectRepository: Repository<ProjectEntity> =
  dataSource.getRepository(ProjectEntity);
const _developerRepository: Repository<DeveloperEntity> =
  dataSource.getRepository(DeveloperEntity);

const getProjects = async (): Promise<ProjectEntity[]> => {
  try {
    return await _projectRepository.find({
      relations: { developers: true, task: true },
    });
  } catch (error) {
    throw new Error(`Error al obtener los proyectos: ${error}`);
  }
};

const getProjectById = async (id: number): Promise<ProjectEntity | null> => {
  try {
    const project = await _projectRepository.findOne({
      where: { id: id },
      relations: { developers: true, task: true },
    });
    return project;
  } catch (error) {
    throw new Error(`Error al obtener el proyecto: ${error}`);
  }
};

const addProject = async (payload: AddProjectDto) => {
  try {
    const project = await _projectRepository.findOne({
      where: { name: payload.name },
    });
    if (project) {
      return response.status(400).json({ message: "El proyecto ya existe" });
    }
    const newProject: AddProjectDao = {
      name: payload.name,
      description: payload.description,
      startDate: payload.startDate ? payload.startDate : new Date(),
      endDate: payload.endDate ? payload.endDate : null,
      creationDate: new Date(),
      manager: payload.manager,
      updateDate: new Date(),
      developers: payload.developers,
      task: payload.task,
    };
    return await _projectRepository.save(newProject);
  } catch (error) {
    throw new Error(`Error en repository al registrar el proyecto: ${error}`);
  }
};

const updateProject = async (id: number, payload: AddProjectDao) => {
  try {
    const project: ProjectEntity | null = await _projectRepository.findOneBy({
      id: id,
    });
    if (!project) {
      response.status(404).json(`El proyecto no fue encontrado`);
    }
    const updateProject: AddProjectDao = {
      name: payload.name,
      description: payload.description,
      startDate: payload.startDate,
      endDate: payload.endDate ? payload.endDate : null,
      creationDate: payload.creationDate,
      manager: payload.manager,
      updateDate: new Date(),
      developers: payload.developers,
      task: payload.task,
    };
    
    return await _projectRepository.save(updateProject);
    
  } catch (error) {
    response.status(400).json(`Error al actualizar el proyecto: ${error}`);
  }
};

const deleteProject = async (id: number) => {
  try {
    // Eliminar tareas asociadas al proyecto antes de eliminar el proyecto
    await _projectRepository.query(
      `DELETE FROM tareas WHERE id_proyecto = $1`,
      [id],
    );
    // Eliminar registros en desarrollador_x_proyecto asociados al proyecto antes de eliminar el proyecto
    await _projectRepository.query(
      `DELETE FROM desarrollador_x_proyecto WHERE id_proyecto = $1`,
      [id],
    );

    const project = await _projectRepository.findOneBy({ id: id });
    if (!project) {
      throw new Error(`El proyecto no fue encontrado`);
    }
    return await _projectRepository.remove(project);
  } catch (error) {
    throw new Error(`Error al eliminar el proyecto: ${error}`);
  }
};

export const ProjectRepository = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
