// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuKLlv626JfBCgxKqp5Hl6pmJzj1G63oQ",
  authDomain: "the-pack-ssc.firebaseapp.com",
  projectId: "the-pack-ssc",
  storageBucket: "the-pack-ssc.firebasestorage.app",
  messagingSenderId: "345950670679",
  appId: "1:345950670679:web:ab976570a091a47cdd7812",
  measurementId: "G-RXKE13948M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initializing analytics
const analytics = getAnalytics(app);

//Initializae Firebase messaging
const messaging = getMessaging(app);

// Initialize Firestore
const db = getFirestore(app); 

//Exporting
export { messaging, analytics, db, onMessage, getToken  };