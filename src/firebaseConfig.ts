import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "xyz",
  authDomain: "xyz",
  projectId: "xyz",
  storageBucket: "xyz",
  messagingSenderId: "xyz",
  appId: "1:1075844318135:web:eed425262388e7b7ec9e32",
  measurementId: "xyz"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
export { db };
