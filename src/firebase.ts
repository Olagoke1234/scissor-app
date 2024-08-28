// src/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuev71Am1uRMciZ0XDWZqEQxp0PMN7pzE",
  authDomain: "scissor-b5939.firebaseapp.com",
  projectId: "scissor-b5939",
  storageBucket: "scissor-b5939.appspot.com",
  messagingSenderId: "30489714444",
  appId: "1:30489714444:web:c3e08fd082e6a954137329",
  measurementId: "G-XR2MXJ1BCW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics
const analytics = getAnalytics(app);

export {
  db,
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  increment,
  analytics,
};
