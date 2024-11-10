// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUjsAlIY9Gu0u_n5BePhH6fhR3roSvUvM",
  authDomain: "naar-c0c39.firebaseapp.com",
  projectId: "naar-c0c39",
  storageBucket: "naar-c0c39.firebasestorage.app",
  messagingSenderId: "1099462998566",
  appId: "1:1099462998566:web:f3381af3ec5238443784e7",
  measurementId: "G-LY8LL13VTV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup };
