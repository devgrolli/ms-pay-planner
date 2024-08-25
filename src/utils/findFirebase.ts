import admin from "../config/firebase.config";
import { CustomError } from "./customError";

export const findByFieldFirebase = async (
  fieldName: string,
  fieldValue: string,
  collection: string
) => {
  return await admin
    .firestore()
    .collection(collection)
    .where(fieldName, "==", fieldValue)
    .get();
};

export const findAllInCollection = async (nameCollection: string) => {
  return await admin.firestore().collection(nameCollection).get();
};

export const findByIdFirebase = async (id: string, nameCollection: string) => {
  return await admin.firestore().collection(nameCollection).doc(id);
};

export const createCollectionFirebase = async (nameCollection: string, body: any) => {
  return await admin.firestore().collection(nameCollection).add(body);
}

export const updateFirebase = async (
  nameCollection: string,
  id: string,
  body: any
) => {
  return await admin
    .firestore()
    .collection(nameCollection)
    .doc(id)
    .update(body);
};

export const saveImageFireStorage = async (imageFile: any, imagePath: string) => {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(imagePath);

    await file.save(imageFile.buffer, {
      metadata: {
        contentType: imageFile.mimetype
      }
    });
  } catch (error) {
    throw new CustomError("error de upload image", 422);
  }
}

export const deleteImageFireStorage = async (imagePath: string) => {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(imagePath);
    await file.delete();

  } catch (error) {
    throw new CustomError("error delete image firestorage", 422);
  }
}