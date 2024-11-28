import { TaskStatusService } from "../service/TaskStatusService";
import { Request, Response } from "express";

const getTaskStatus = async (req: Request, res: Response) => {
  try {
    const taskStatus = await TaskStatusService.getTaskStatus();
    return res.status(200).json(taskStatus);
  } catch (error) {
    console.error(error);
  }
};

const getTaskStatusById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const taskStatus = await TaskStatusService.getTaskStatusById(id);
    if (!taskStatus) {
      return res
        .status(404)
        .json({ message: "El estado de la tarea no existe" });
    }
    res.status(200).json(taskStatus);
  } catch (error) {
    console.error(error);
  }
};

export const TaskStatusController = {
  getTaskStatus,
  getTaskStatusById,
};
