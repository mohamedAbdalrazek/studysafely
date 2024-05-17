// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2bFKXJxhVe4Lq5rdjKlMZosvrLC8GbP0",
  authDomain: "studysafely-6926b.firebaseapp.com",
  projectId: "studysafely-6926b",
  storageBucket: "studysafely-6926b.appspot.com",
  messagingSenderId: "986204248740",
  appId: "1:986204248740:web:dfe94778e8ea5fcc02a431",
  measurementId: "G-K52J99FLC1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const storageApp = getApp();
// export const mediaUrl = getStorage(storageApp, "");
// export const auth = getAuth();

