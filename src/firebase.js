import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCMNhCA8yVAxvO7TJk_lfG4QvhzmYIY1ig",
  authDomain: "test-8919e.firebaseapp.com",
  projectId: "test-8919e",
  storageBucket: "test-8919e.appspot.com",
  messagingSenderId: "111531121644",
  appId: "1:111531121644:web:3544dab0e01f9f15487ec9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
