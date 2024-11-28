import { Router } from "express";
import { ProjectController } from "../controller/ProjectController";

export const ProjectsRouter: Router = Router();
ProjectsRouter.get("", (req, res) => {
  try {
    ProjectController.getProjects(req, res);
  } catch (err) {
    throw Error(`${err}`);
  }
});
ProjectsRouter.get("/:id", (req, res) => {
  try {
    ProjectController.getProjectById(req, res);
  } catch (err) {
    throw Error(`${err}`);
  }
});
ProjectsRouter.post("", (req, res) => {
  try {
    ProjectController.addProject(req, res);
  } catch (err) {
    throw Error(`${err}`);
  }
});
ProjectsRouter.put("/:id", (req, res) => {
  try {
    ProjectController.updateProject(req, res);
  } catch (err) {
    throw Error(`${err}`);
  }
});
ProjectsRouter.delete("/:id", (req, res) => {
  try {
    ProjectController.deleteProject(req, res);
  } catch (err) {
    throw Error(`${err}`);
  }
});
