import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { StorageReference } from "firebase/storage";
import { storage } from "../config/firebase";

export const uploadFile = async (file: File): Promise<string> => {
  console.log(file);

  const storageRef: StorageReference = ref(storage, file.name);
  const response = await uploadBytes(storageRef, file);
  const downloadURL: string = await getDownloadURL(response.ref);

  return downloadURL;
};
