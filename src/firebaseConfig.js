import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithEmailAndPassword,  
} from "firebase/auth";

// Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD1p0fkPJXzzkuWfhC5K4PHoNxVGpbqGKY",
//   authDomain: "oswald-io.firebaseapp.com",
//   projectId: "oswald-io",
//   storageBucket: "oswald-io.firebasestorage.app",
//   messagingSenderId: "1085607163447",
//   appId: "1:1085607163447:web:629649771351349a7671b2",
//   measurementId: "G-LYH4PT369M",
// };
// 

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
console.log('firebaseConfig',firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

// Export the necessary Firebase services and methods
export {
  app,
  auth,
  googleProvider,
  analytics,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithEmailAndPassword,  // Export this function
};
