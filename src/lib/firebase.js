import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlUPjWBJ-wTnUVqQ2Yuj6H9k3xtX6ENto",
  authDomain: "finalprojectsaleshub.firebaseapp.com",
  projectId: "finalprojectsaleshub",
  storageBucket: "finalprojectsaleshub.appspot.com",
  messagingSenderId: "794366780586",
  appId: "1:794366780586:web:e0825166dcf723c3cb1cd3",
  measurementId: "G-RYDJJNT1NE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);

