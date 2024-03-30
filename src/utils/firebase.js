// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjCtw9G4o5Pbf26AW2M3B0-vvhRNvQ3k0",
  authDomain: "netflix-gpt-bf624.firebaseapp.com",
  projectId: "netflix-gpt-bf624",
  storageBucket: "netflix-gpt-bf624.appspot.com",
  messagingSenderId: "891353265781",
  appId: "1:891353265781:web:7e62c0d1cba33c83eb2a3c",
  measurementId: "G-1C7021KK82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();