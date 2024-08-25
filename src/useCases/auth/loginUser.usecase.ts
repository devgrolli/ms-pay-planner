import jwt from "jsonwebtoken";
import admin from "../../config/firebase.config";
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from "../../utils/customError";
import { ERROR } from "../../constants/auth.constants";

const createJwtToken = (id: string, email: string) => {
  const secret = process.env.SECRET_FIREBASE as string;
  return jwt.sign({ userId: id, email: email }, secret, { expiresIn: "24h" });
};

const createSessionId = async (userId: string) => {
  const sessionId = uuidv4();
  await admin.firestore().collection('Sessions').doc(userId).set({
    userId,
    sessionId,
    createdAt: new Date().toISOString(),
  });
  return sessionId;
};

const validateUser = async (email: string) => {
  try {
    return await admin.auth().getUserByEmail(email);
  } catch (error) {
    throw new CustomError(ERROR.USER_NOT_FOUND, 404);
  }
}

export const loginUser = async (email: string, password: string) => {
  const user = await validateUser(email);

  if (!user.email) {
    throw new CustomError(ERROR.EMAIL_NOT_FOUND, 404);
  }

  const token = createJwtToken(user.uid, user.email);
  const sessionId = await createSessionId(user.uid);

  return { token, sessionId, user: { email: user.email, id: user.uid, name: user.displayName } };
};