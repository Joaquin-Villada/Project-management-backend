import { ProjectService } from "../service/ProjectService";
import { Request, Response } from "express";
import { AddProjectDto } from "../dto/AddProjectDto";

const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(+id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json(`No se pudo devolver el proyecto. ${error}`);
  }
};

const addProject = async (req: Request, res: Response) => {
  try {
    const project: AddProjectDto = req.body;
    const newProject = await ProjectService.addProject(project);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: `Error al agregar el proyecto: ${error}` });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = req.body;
    await ProjectService.updateProject(+id, project);
    res.status(200).json("Projecto updateado exitosamente");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ProjectService.deleteProject(+id);
    return res.status(200).json("Project deleted successfully");
  } catch (error) {
    return res.status(500).json(`Error al eliminar el proyecto: ${error}`);
  }
};

export const ProjectController = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
