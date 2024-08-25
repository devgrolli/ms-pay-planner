import { Application } from "express";
import {
  signInUser,
  verifySession,
  getUser,
  updateUser,
  signUpUser,
} from "../controllers/auth.controller";
import verifyToken from "../middleware/authJwt.middleware";

const authRoutes = (app: Application) => {
  app.get("/protected-route", verifyToken);
  app.post("/auth/signInUser", signInUser);
  app.post("/auth/signup", signUpUser);
  app.post("/auth/verifySession", verifySession);
  app.post("/auth/getUser", getUser);
  app.post("/auth/updateUser", verifyToken, updateUser);
};

export default authRoutes;
