import { initializeApp, FirebaseApp } from "firebase/app";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZuYJmQZ_fGo5QVtVF5_cNozX9g6QU7g",
  authDomain: "vlxx-924b5.firebaseapp.com",
  projectId: "vlxx-924b5",
  storageBucket: "vlxx-924b5.appspot.com",
  messagingSenderId: "60895502361",
  appId: "1:60895502361:web:c7b449f5734e5d8b3d8a88",
  measurementId: "G-1YBTZZNDCC"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);

export { storage };
