import { ProjectRepository } from "../repository/ProjectRepository";
import { ProjectEntity } from "../entity/ProjectEntity";
import { AddProjectDto } from "../dto/AddProjectDto";
import { AddProjectDao } from "../dao/AddProjectDao";

const getProjects = (): Promise<ProjectEntity[]> => {
  return ProjectRepository.getProjects();
};

const getProjectById = (id: number): Promise<ProjectEntity | null> => {
  try {
    return ProjectRepository.getProjectById(id);
  } catch (err) {
    throw new Error(`Error al obtener el proyecto: ${err}`);
  }
};

const addProject = async (project: AddProjectDto) => {
  try {
    return await ProjectRepository.addProject(project);
  } catch (err) {
    throw new Error(`Error en service: ${err}`);
  }
};

const updateProject = (id: number, project: AddProjectDao) => {
  try {
    return ProjectRepository.updateProject(id, project);
  } catch (err) {
    throw new Error(`Error en service: ${err}`);
  }
};

const deleteProject = (id: number) => {
  try {
    return ProjectRepository.deleteProject(id);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const ProjectService = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
