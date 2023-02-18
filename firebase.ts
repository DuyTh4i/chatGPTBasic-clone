import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkONvibEyXquk17xzz4FalPumUnozgOgg",
  authDomain: "chatgpt-clone-d2668.firebaseapp.com",
  projectId: "chatgpt-clone-d2668",
  storageBucket: "chatgpt-clone-d2668.appspot.com",
  messagingSenderId: "428948496636",
  appId: "1:428948496636:web:0977f0a854226386eeb779"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}