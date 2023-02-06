import { collection, getDocs } from "firebase/firestore"
import { db } from "./db.js"

export const zapisz = async (req, res) => {
  const { score } = req.body
  const { game } = req.params
  console.log('ZAPISZ:', game, score)
}

export const getScore = async (req, res) => {
  const { game } = req.params
  const collectionName = 'games'

  getDocs(collection(db, collectionName)).then(snapshot => {
    snapshot.docs.forEach(doc => {
      if (doc.id === game) {
        res.json(doc.data())
      }
    });
  }).catch(error => {
    console.error(error)
    res.status(500).send('Error fetching data from Firestore');
  });
} 