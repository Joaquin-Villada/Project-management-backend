import { NextFunction, Router, Request, Response } from "express";
import { DevelopersController } from "../controller/DevelopersController";

export const DeveloperRouter: Router = Router();

DeveloperRouter.get(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DevelopersController.getDevelopers(req, res);
    } catch (error) {
      next(error);
    }
  },
);

DeveloperRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DevelopersController.getDeveloperById(req, res);
    } catch (error) {
      next(error);
    }
  },
);

DeveloperRouter.post(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DevelopersController.addDeveloper(req, res);
    } catch (error) {
      next(error);
    }
  },
);

DeveloperRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DevelopersController.updateDeveloper(req, res);
    } catch (error) {
      next(error);
    }
  },
);

DeveloperRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await DevelopersController.deleteDeveloper(req, res);
    } catch (error) {
      next(error);
    }
  },
);
