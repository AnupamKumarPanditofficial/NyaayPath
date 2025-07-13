import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ6kMGB3VFahhP9Dt0WhTWgxF85LHrRAc",
  authDomain: "nambapath-16c7b.firebaseapp.com",
  projectId: "nambapath-16c7b",
  storageBucket: "nambapath-16c7b.appspot.com",
  messagingSenderId: "1075844318135",
  appId: "1:1075844318135:web:eed425262388e7b7ec9e32",
  measurementId: "G-6BW1P79JSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
export { db };