import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
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

// Initialize Analytics
const analytics = getAnalytics(app);

// Export Firebase functionalities
export { db, auth, analytics, collection, addDoc, getDocs, doc, getDoc };
