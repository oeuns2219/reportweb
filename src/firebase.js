// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbLYbaT-kTSGZpVj6ffN9Xxv_ltWObHZM",
  authDomain: "project-f3b79.firebaseapp.com",
  projectId: "project-f3b79",
  storageBucket: "project-f3b79.appspot.com",
  messagingSenderId: "111686263956",
  appId: "1:111686263956:web:29c3537e453c55913ac081",
  measurementId: "G-WLVTZ344MF",
  databaseURL: "https://project-f3b79-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };