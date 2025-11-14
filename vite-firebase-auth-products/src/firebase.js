import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAysdQ5eRciAD4UxpqtcQ3xTWXJtQLuIik",
  authDomain: "product-43e71.firebaseapp.com",
  projectId: "product-43e71",
  storageBucket: "product-43e71.firebasestorage.app",
  messagingSenderId: "41058320434",
  appId: "1:41058320434:web:83691ab48aae82d4aebc2b"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
