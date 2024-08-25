import admin from "firebase-admin";
import validator from "validator";
import { ERROR, SUCCESS } from "../../constants/auth.constants";
import { CustomError } from "../../utils/customError";
import { formatToE164 } from "../../utils/formats";

interface signUpInterface {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
}

const checkIfEmailExists = async (email: string) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    if (userRecord) {
      throw new CustomError(ERROR.SIGNUP.EMAIL_ALREADY_EXISTS, 400);
    }
  } catch (error: any) {
    if (error.code !== "auth/user-not-found") {
      throw error;
    }
  }
};

export const signUpCollection = async (body: signUpInterface) => {
  const { fullName , email, password, repeatPassword, phone } = body;

  if (!validator.isEmail(email)) {
    throw new CustomError(ERROR.SIGNUP.EMAIL_INVALID, 400);
  }

  await checkIfEmailExists(email);

  if (password.length < 8) {
    throw new CustomError(ERROR.SIGNUP.FEW_CHARACTERS, 400);
  }

  if (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[\W_]/.test(password)
  ) {
    throw new CustomError(ERROR.SIGNUP.NO_SPECIAL_CHARACTER, 400);
  }

  if (password !== repeatPassword) {
    throw new CustomError(ERROR.SIGNUP.PASSWORDS_DIFFERENTS, 400);
  }

  const formattedPhone = formatToE164(phone);

  try {
    await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
      phoneNumber: formattedPhone,
    });

    // Armazena informações adicionais no Firestore
    // const userRef = await findByIdFirebase("User", userRecord.uid);
    // await userRef.set({
    //   id,
    //   name: fullName,
    //   phone,
    //   email,
    //   isValidated: false,
    // });

    return { message: SUCCESS.SIGNUP.OK };
  } catch (error) {
    console.log(ERROR.SIGNUP.ANY_REGISTER, error);
    throw new CustomError(ERROR.SIGNUP.ANY_REGISTER, 500);
  }
};