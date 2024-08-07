// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCuev71Am1uRMciZ0XDWZqEQxp0PMN7pzE",
  authDomain: "scissor-b5939.firebaseapp.com",
  projectId: "scissor-b5939",
  storageBucket: "scissor-b5939.appspot.com",
  messagingSenderId: "30489714444",
  appId: "1:30489714444:web:c3e08fd082e6a954137329",
  measurementId: "G-XR2MXJ1BCW",
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { firestore, auth, analytics, collection, addDoc, getDocs };
