import { Request, Response } from "express";
import { loginUser } from "../useCases/auth/loginUser.usecase";
import { handleError } from "../utils/handleError";
import { SUCCESS } from "../constants/auth.constants";
import { verifyUserSession } from "../useCases/auth/verifyUserSession.usecase";
import {
  getUserCollection,
  updateUserCollection,
} from "../useCases/auth/user.usecase";
import { CookieOptionsInterface } from "../interfaces/auth.interface";
import { signUpCollection } from "../useCases/auth/signUp.usecase";
import { STATUS_CODE } from "../constants/code.constants";

const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: CookieOptionsInterface
) => {
  res.cookie(name, value, {
    httpOnly: true,
    sameSite: "strict",
    ...options,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const response = await getUserCollection(userId);
    return res.status(STATUS_CODE.OK).json({ message: "OK", response });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const response = await updateUserCollection(req.body);
    return res
      .status(STATUS_CODE.OK)
      .json({ message: SUCCESS.USER_UPDATE, response });
  } catch (error) {
    return handleError(res, error);
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { token, sessionId, user } = await loginUser(email, password);
    console.error("user", user);

    return res.status(STATUS_CODE.OK).json({
      message: SUCCESS.AUTHENTICATION_OK,
      email,
      token,
      sessionId,
      userName: user.name,
      userId: user.id,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const response = await signUpCollection(req.body);
    return res.status(STATUS_CODE.OK).json(response);
  } catch (error) {
    return handleError(res, error);
  }
};

export const verifySession = async (req: Request, res: Response) => {
  const { token, sessionId, userId } = req.body;

  try {
    await verifyUserSession(token, sessionId, userId);
    return res.status(STATUS_CODE.OK).send({ isValid: true });
  } catch (error: any) {
    return handleError(res, error, true);
  }
};

