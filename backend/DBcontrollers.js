import { doc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from "./db.js"

export const saveScore = async (req, res) => {
  const { score } = req.body
  const { game } = req.params
  const collectionName = 'games'

  // GET DATA FROM DB
  getDocs(collection(db, collectionName)).then(snapshot => {
    snapshot.docs.forEach(document => {
      // VALIDATE GAME
      // as games have diffrent data format
      if (game === 'memory' && document.id === 'memory') saveMemory(document)
      if (game === 'reaction-time' && document.id === 'reaction-time') saveReactionTime(document)
    })
  }).catch(error => {
    console.error(error)
    res.status(500).send('Error fetching data from Firestore')
  });

  const saveMemory = (document) => {
    // UPDATE SCORE
    const updatedScore = document.data()[score] + 1

    // UPDATE DATA
    const docRef = doc(db, collectionName, game)
    updateDoc(docRef, { [score]: updatedScore })
      .then(res.json('Memory score saved successfully'))
      .catch(error => console.log('Error:', error))
  }

  const saveReactionTime = (document) => {
    const dataFromDB = document.data().all
    const updatedData = [...dataFromDB, score]
    const docRef = doc(db, collectionName, game)
    updateDoc(docRef, { all: [...updatedData] })
      .then(res.json('Reaction Time score saved successfully'))
      .catch(error => console.log('Error:', error))
  }
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