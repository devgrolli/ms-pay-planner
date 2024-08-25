import { findByFieldFirebase, updateFirebase } from "../../utils/findFirebase";
import { ERROR } from "../../constants/auth.constants";
import { CustomError } from "../../utils/customError";

interface UserResponse {
  body: {
    email: string;
    name: string;
    phone: string;
    id: string;
  };
}

const nameCollection = "User";

const getUserDocument = async (userId: string) => {
  const userSnapshot = await findByFieldFirebase("id", userId, nameCollection);

  if (userSnapshot.empty) {
    throw new CustomError(ERROR.USER_NOT_FOUND, 404);
  }

  return userSnapshot.docs[0];
};

export const getUserCollection = async (userId: string) => {
  try {
    const userDoc = await getUserDocument(userId);
    const userData = userDoc.data();
    delete userData.password;

    return userData;
  } catch (error) {
    throw new CustomError(ERROR.UPDATE_FIND_USER, 500);
  }
};

export const updateUserCollection = async (response: UserResponse) => {
  const { email, name, phone, id } = response.body;

  try {
    const userDoc = await getUserDocument(id);
    const body = {
      email,
      name,
      phone,
    }
    const updateResponse = await updateFirebase(nameCollection, userDoc.id, body)

    return updateResponse;
  } catch (error) {
    throw new CustomError(ERROR.UPDATE_USER, 500);
  }
};
