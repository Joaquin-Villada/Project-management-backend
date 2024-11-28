import { TaskStatusRepository } from "../repository/TaskStatusRepository";

const getTaskStatus = async () => {
  return await TaskStatusRepository.getTaskStatus();
};

const getTaskStatusById = async (id: number) => {
  return await TaskStatusRepository.getTaskStatusById(id);
};

export const TaskStatusService = { 
    getTaskStatus,
    getTaskStatusById,
}
