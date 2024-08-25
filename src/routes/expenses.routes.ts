import { Application } from "express";
import {
    createExpenses
} from "../controllers/expenses.controller";
import verifyToken from "../middleware/authJwt.middleware";

const expensessRoutes = (app: Application) => {
  app.post("/expenses/create", verifyToken, createExpenses);
};

export default expensessRoutes;
