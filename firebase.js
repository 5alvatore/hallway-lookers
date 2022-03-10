// Import the functions you need from the SDKs you need
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCyMEqZkkBudDfFPhL5lfliS-tUPQLYRsw",
  authDomain: "hallwaylookers123.firebaseapp.com",
  projectId: "hallwaylookers123",
  storageBucket: "hallwaylookers123.appspot.com",
  messagingSenderId: "814075161276",
  appId: "1:814075161276:web:1080396cc995c9ff6b7eb9 "
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
export {auth};