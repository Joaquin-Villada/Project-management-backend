import express, { Express, json } from "express";
import { ROUTES } from "./routes";
import cors from "cors";

const app: Express = express();

const morgan = require("morgan");

app.use(
  cors({
    origin: "http://localhost:4200",
  }),
);

app.use(json());

ROUTES.forEach(({ path, router }) => {
  app.use(path, router);
});

export default app;
