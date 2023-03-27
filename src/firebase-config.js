import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDNvnsqx7tKbp9kI3RRQuBSRcTPacj9hlY",
  authDomain: "landmark-remark-app-59fa6.firebaseapp.com",
  projectId: "landmark-remark-app-59fa6",
  storageBucket: "landmark-remark-app-59fa6.appspot.com",
  messagingSenderId: "933740858577",
  appId: "1:933740858577:web:4659140486c8d0bf3f49f0"
};

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const auth = getAuth(app);