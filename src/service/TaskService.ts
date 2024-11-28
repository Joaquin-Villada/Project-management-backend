import { TaskRepository } from "../repository/TaskRepository";
import { AddTaskDto } from "../dto/AddTaskDto";

const getTasks = async () => {
  return TaskRepository.getTasks();
};

const addTask = async (payload: AddTaskDto) => {
  return TaskRepository.addTask(payload);
};

export const TaskService = {
  getTasks,
  addTask,
};
