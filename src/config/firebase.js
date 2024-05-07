// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAu3UAy5hv6L0eL4xQLhkrXh12gIKW4FY",
  authDomain: "memory-management-ae8c9.firebaseapp.com",
  projectId: "memory-management-ae8c9",
  storageBucket: "memory-management-ae8c9.appspot.com",
  messagingSenderId: "435623266234",
  appId: "1:435623266234:web:9b31b7d8c292d7489cff83",
  measurementId: "G-NZVY208KJY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
