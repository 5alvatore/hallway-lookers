// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyDWppM_av43eut1Nvo0uRYErRMQL3xsJg4",
//   authDomain: "fir-auth-980e6.firebaseapp.com",
//   projectId: "fir-auth-980e6",
//   storageBucket: "fir-auth-980e6.appspot.com",
//   messagingSenderId: "353077836705",
//   appId: "1:353077836705:web:630d267040b4959b87a9e0"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAr9nuUihDkxP_EzBlJ-QKeDNH79LmX4Co",
  authDomain: "hallway-lookers-ff7a4.firebaseapp.com",
  projectId: "hallway-lookers-ff7a4",
  storageBucket: "hallway-lookers-ff7a4.appspot.com",
  messagingSenderId: "112453695552",
  appId: "1:112453695552:web:c38c0132ed3fca106c07a5"
};

// Initialize Firebase
let app;
//if (firebase.app.length === 0)
//{
  app = firebase.initializeApp(firebaseConfig);
//}
//else
//{
  //app = firebase.app()
//}
const auth = firebase.auth()
export {auth};