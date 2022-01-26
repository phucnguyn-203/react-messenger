// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9n7yLwbr1RWD2va-JGc34I9firaYlBZY",
  authDomain: "chat-application-3fd1b.firebaseapp.com",
  projectId: "chat-application-3fd1b",
  storageBucket: "chat-application-3fd1b.appspot.com",
  messagingSenderId: "1093658479532",
  appId: "1:1093658479532:web:646be537b30c572171c809",
  measurementId: "G-3NEKEHB3D3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const database = getFirestore(app);
const storage = getStorage(app);

export { authentication, database, storage };
