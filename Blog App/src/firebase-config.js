// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhf2CN3Fn8CKq__C1shMmfQN9iIp7YWF4",
  authDomain: "login-practice-70db0.firebaseapp.com",
  projectId: "login-practice-70db0",
  storageBucket: "login-practice-70db0.appspot.com",
  messagingSenderId: "365283923558",
  appId: "1:365283923558:web:ed49f2e345c8ef5ddaffa7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);