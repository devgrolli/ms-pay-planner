import { ErrorRequestHandler } from 'express';
import { ERROR } from "../constants/auth.constants";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: ERROR.CONNECT_SERVER, message: err.message });
};
