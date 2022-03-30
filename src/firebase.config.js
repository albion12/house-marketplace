import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDUtrLeKcURiFFlnWUaoZwPpNY9Qu0FkUU",
  authDomain: "house-marketplace-app-a4c74.firebaseapp.com",
  projectId: "house-marketplace-app-a4c74",
  storageBucket: "house-marketplace-app-a4c74.appspot.com",
  messagingSenderId: "827484285229",
  appId: "1:827484285229:web:d7754c3873cc3650a80ba4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()