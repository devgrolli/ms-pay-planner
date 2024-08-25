
import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { STATUS_CODE } from "../constants/code.constants";
import { createExpensesUseCase } from "../useCases/expenses/index.usecase";

export const createExpenses = async (req: Request, res: Response) => {
  try {
    const response = await createExpensesUseCase(req.body);
    return res.status(STATUS_CODE.OK).json({ message: "OK", response });
  } catch (error) {
    return handleError(res, error);
  }
};