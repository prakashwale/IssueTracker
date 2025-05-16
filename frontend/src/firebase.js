// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM5mvooz2XGlTteXiskBOAvNVMp26N-D0",
  authDomain: "issue-tracker-a50bb.firebaseapp.com",
  projectId: "issue-tracker-a50bb",
  storageBucket: "issue-tracker-a50bb.appspot.com",
  messagingSenderId: "474583975039",
  appId: "1:474583975039:web:48f8a7caeab2fb8782eb4a",
  measurementId: "G-CMGWK3C4G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
