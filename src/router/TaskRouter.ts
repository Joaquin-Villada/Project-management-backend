import { Router } from "express";
import { TaskController } from "../controller/TaskController";
export const TaskRouter: Router = Router();


TaskRouter.get("/", (req, res) => {
    TaskController.getTasks(req, res);
});
TaskRouter.post("/:id", (req, res) => {
    TaskController.addTask(req, res);
});

