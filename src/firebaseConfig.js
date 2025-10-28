// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh79Plu-CBsbiCPGN0jvB58PVcw1rPD04",
  authDomain: "fitflow-f15ed.firebaseapp.com",
  projectId: "fitflow-f15ed",
  storageBucket: "fitflow-f15ed.firebasestorage.app",
  messagingSenderId: "277470941949",
  appId: "1:277470941949:web:0f3c4229751dffa6fbe494",
  measurementId: "G-MNQQ4V2DSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log("User signed in:", result.user);
    alert(`Welcome ${result.user.displayName}!`);
  } catch (error) {
    console.error("Facebook sign-in error:", error);
    alert("Error signing in with Facebook. Check console for details.");
  }
};
