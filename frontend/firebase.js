// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5iI_e10-QpuEcuP5KLAq_rx-cw4BxOTU",
  authDomain: "homechef-ae7fb.firebaseapp.com",
  projectId: "homechef-ae7fb",
  storageBucket: "homechef-ae7fb.firebasestorage.app",
  messagingSenderId: "929112899714",
  appId: "1:929112899714:web:6e692df1bac727e1ef749b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}