import { auth, db, signInWithEmailAndPassword } from "./config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { collection, getDoc, doc, updateDoc, setDoc } from "firebase/firestore";

async function addUser(data) {
  const usersCollection = collection(db, "users");

  try {
    const userRef = doc(usersCollection, auth.currentUser.uid);
    await setDoc(userRef, data);
    await updateDoc(userRef, { id: userRef.id });
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error writing document: ", e);
  }
}

// Function to verify email and password input
const verifyInputs = ({ email, password, setError }) => {
  if (!email || !password) {
    setError("Please fill in both email and password.");
    setTimeout(() => {
      setError(""); // Reset after 5 seconds
    }, 3000);
    return false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailPattern.test(email)) {
    setError("Please enter a valid email address.");
    setTimeout(() => {
      setError(""); // Reset after 5 seconds
    }, 3000);
    return false;
  }

  setError(""); // Clear any previous error messages
  console.log("verified");
  return true;
};

// Sign in function for manual email and password entry
export const signIn = ({ email, password, error, setError }) => {
  if (!verifyInputs({ email, password, error, setError })) {
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed in success:", user);
    })
    // in case of error
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign in error:", errorCode, errorMessage);
    });
};

export const signInWithGoogle = async ({setError}) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("Signed in with Google:", user);

    // Check if user exists in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      // If user doesn't exist, create a new user document
      const data = {
       full_name: user.displayName, // Assuming displayName is in "First Last" format
       email: user.email,
      };

      addUser(data);
      console.log("New user document created in Firestore:", data);
    }
  } catch (error) {
    const errorMessage = error.message;
    setError(errorMessage);
    setTimeout(() => {
      setError(""); // Reset after 5 seconds
    }, 3000);
  }
};

export function checkFields({
  email,
  name,
  password,
}) {
  return (
    (password &&
      email?.length > 0 &&
     name?.length > 0)
  );
}

export function signUp({
  email,
  name,
  password,
}) {
  if (checkFields({ email, name, password })) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const data = {
          full_name: name,
          email: email,
        };
        addUser(data);
        console.log("created user successfully")
      })
      .catch((error) => {
        const errorMessage = error.message;
        // ..
      });
  } else {
    console.log("hey")
  }
}
