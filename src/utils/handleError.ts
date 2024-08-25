import { Response } from "express";
import { CustomError } from "./customError";
import { ERROR } from "../constants/auth.constants";
import { STATUS_CODE } from "../constants/code.constants";

export const handleError = (res: Response, error: any, isSessionError: boolean = false) => {
  console.error('ERROR', error);
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (isSessionError) {
    return res.status(STATUS_CODE.UNAUTHORIZED).json({ isValid: false, error: error?.message });
  }

  return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: ERROR.INTERNAL_SERVER });
};