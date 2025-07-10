// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  // apiKey: process.env.REACT_APP_APIKEY,
  apiKey:"AIzaSyDG7tNEMMp3iDFR9-PkTzSoVPCOJlcmJ2k",
  authDomain: "khaijushop.firebaseapp.com",
  projectId: "khaijushop",
  storageBucket: "khaijushop.appspot.com",
  messagingSenderId: "55126067228",
  appId: "1:55126067228:web:73f3936388e2f27d4577d9",
  measurementId: "G-RDBSQF6LLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);


export{app,auth,db}