import {TaskService} from "../service/TaskService";
import {Request, Response} from "express";


const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error al obtener las tareas"});
  }
}

const addTask = async (req: Request, res: Response) => {
    const payload = req.body;
    const newTask = TaskService.addTask(payload);
    res.json(newTask);
    }

export const TaskController = {
    getTasks,
    addTask,
    };
    