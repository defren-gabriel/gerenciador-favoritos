// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpV4FKDAHroTm4JCcgG9bu67YR6hMJ32g",
  authDomain: "gerenciador-favoritos.firebaseapp.com",
  projectId: "gerenciador-favoritos",
  storageBucket: "gerenciador-favoritos.firebasestorage.app",
  messagingSenderId: "557296662174",
  appId: "1:557296662174:web:7f7fc95acbb2e49fba2d8f",
  measurementId: "G-1S80X4PWM1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };