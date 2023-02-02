import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import * as dotenv from 'dotenv'

dotenv.config()

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function saveScore(game, score) {
  try {
    const docRef = await addDoc(collection(db, `${game}`), { score });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getDataForGame(game) {
  const querySnapshot = await getDocs(collection(db, 'games'));
  querySnapshot.forEach((doc) => {
    if (doc.id === `${game}`) {
      const data = doc.data()
      console.log(Object.keys(data), Object.values(data), data)
    }
  });
}
