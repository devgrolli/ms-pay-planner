import jwt from "jsonwebtoken";
import admin from "../../config/firebase.config";
import { ERROR } from "../../constants/auth.constants";
import { CustomError} from "../../utils/customError"
import { DecodedTokenInterface } from "../../interfaces/verify.Interface"

export const verifyUserSession = async (token: string, sessionId: string, userId: string) => {
  const secret = process.env.SECRET_FIREBASE as string;
  
  let decoded: DecodedTokenInterface;

  try {
    decoded = jwt.verify(token, secret) as DecodedTokenInterface;
  } catch (error) {
    throw new CustomError(ERROR.TOKEN_INVALID, 401);
  }

  if (decoded.userId !== userId) {
    throw new CustomError(ERROR.TOKEN_INVALID, 401);
  }

  const sessionDoc = await admin.firestore().collection('Sessions').doc(userId).get();

  if (!sessionDoc.exists) {
    throw new CustomError(ERROR.SESSION_NOT_FOUND, 401);
  }

  const sessionData = sessionDoc.data();
  if (!sessionData || sessionData.sessionId !== sessionId) {
    throw new CustomError(ERROR.INVALID_SESSION, 401);
  }

  return { isValid: true };
};