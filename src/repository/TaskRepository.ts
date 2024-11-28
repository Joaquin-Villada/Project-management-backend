import { TaskEntity } from "./../entity/TaskEntity";
import dataSource from "../db";
import { AddTaskDao } from "../dao/AddTaskDao";
import { response } from "express";
import { DeveloperEntity } from "../entity/DeveloperEntity";
import { ProjectEntity } from "../entity/ProjectEntity";
import { AddTaskDto } from "../dto/AddTaskDto";

const _taskRepository = dataSource.getRepository(TaskEntity);
const _developerRepository = dataSource.getRepository(DeveloperEntity);
const _projectRepository = dataSource.getRepository(ProjectEntity);

const getTasks = async (): Promise<TaskEntity[] | undefined> => {
  try {
    return await _taskRepository.find({
      relations: { status: true, project: true, developer: true },
    });
  } catch (error) {
    console.error(error);
  }
};

const addTask = async (payload: AddTaskDto) => {
  try {
    const task = await _taskRepository.findOne({
      where: { tittle: payload.tittle },
    });
    if (task) {
      return response.status(400).json({ message: "La tarea ya existe" });
    }
    const project: ProjectEntity[] = await _projectRepository.find({
      where: { id: payload.idProject },
    });
    if (!project) {
      return response.status(400).json({ message: "El proyecto no existe" });
    }

    const developers: DeveloperEntity[] = await _developerRepository.find({
      where: { id: payload.developers },
    });
    if (!developers) {
      return response
        .status(400)
        .json({ message: "El desarrollador no existe" });
    }
    const newProject: AddTaskDao = {
      tittle: payload.tittle,
      description: payload.description,
      limitDate: payload.limitDate ? payload.limitDate : null,
      creationDate: new Date(),
      updateDate: new Date(),
      status: { id: 1, name: "Pendiente", task: [] },
      project: project,
      developer: developers,
    };
    return await _projectRepository.save(newProject);
  } catch (error) {
    throw new Error(`Error en repository al registrar el proyecto: ${error}`);
  }
};

export const TaskRepository = {
  getTasks,
  addTask,
};
