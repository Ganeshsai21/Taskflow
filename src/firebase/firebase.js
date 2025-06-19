// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgGakLTYti5KPGWKQMyNL7H7C2i0urdDw",
  authDomain: "taskflow-5473d.firebaseapp.com",
  projectId: "taskflow-5473d",
  storageBucket: "taskflow-5473d.firebasestorage.app",
  messagingSenderId: "169580357775",
  appId: "1:169580357775:web:9b181a99c0a457fe3728fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);