import { Task } from './../model/TaskModel';
import dataSource from "../db";
import { TaskStatusEntity } from "../entity/TaskStatusEntity";
import { response } from 'express';

const _taskStatusRepository = dataSource.getRepository(TaskStatusEntity);

const getTaskStatus = async (): Promise<TaskStatusEntity[] | undefined> => {    
  try {
    return await _taskStatusRepository.find();
  } catch (error) {
    console.error(error);
  }
};

const getTaskStatusById = async (id: number): Promise<TaskStatusEntity | undefined> => {
    try {
        const task =  await _taskStatusRepository.findOne({where: {id: id}});
        if (!task) {
          response.status(404).json({message: "El estado de la tarea no existe"});
          return;
         }
        return task;
    } catch (error) {
        console.error(error);
    }
    }

export const TaskStatusRepository = {
    getTaskStatus,
    getTaskStatusById,
    };