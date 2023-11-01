// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: "devtree-79d6e.firebaseapp.com",
  projectId: "devtree-79d6e",
  storageBucket: "devtree-79d6e.appspot.com",
  messagingSenderId: "514183629719",
  appId: "1:514183629719:web:a6443e2403fc3fc13e92d2",
  measurementId: "G-6BZLRFZZ4L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
