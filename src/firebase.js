// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';  // Import Firestore
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Updated Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMf6Fcx3QBEIku6za-bXN3BaSjQLB5wY0",
  authDomain: "evehub-3ac27.firebaseapp.com",
  projectId: "evehub-3ac27",
  storageBucket: "evehub-3ac27.appspot.com",
  messagingSenderId: "304350232087",
  appId: "1:304350232087:web:437d4450a1ee51f8b82652"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);  // Initialize Firestore

export { app, auth, db };  // Export both auth and db
