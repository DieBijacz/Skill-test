import { doc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from "./db.js"

const collectionName = 'games'

// SAVE SCORE
export const saveScore = async (req, res) => {
  const { score } = req.body
  const { game } = req.params

  // VALIDATE GAME
  // as games have diffrent data format
  getDocs(collection(db, collectionName)).then(snapshot => {
    snapshot.docs.forEach(document => {
      if (game === 'memory' && document.id === 'memory') saveMemory(document)
      if (game === 'reaction-time' && document.id === 'reaction-time') saveReactionTime(document)
    })
  }).catch(error => {
    console.error(error)
    res.status(500).send('Error saving data in Firestore')
  });

  // MEMORY GAME
  const saveMemory = (document) => {
    const updatedScore = document.data()[score] + 1

    const docRef = doc(db, collectionName, game)
    updateDoc(docRef, { [score]: updatedScore })
      .then(res.json('Memory score saved successfully'))
      .catch(error => console.log('Error:', error))
  }

  // REACTION TIME GAME
  const saveReactionTime = (document) => {
    // format score
    const decimal = (score / 25).toFixed(1).split('.')[1] < 9 ? 0 : 1 // this calculates if number need to be rounded up or down
    const base = (score / 25).toFixed(0)
    const formatedScore = (+base + +decimal) * 25

    // update score
    const updatedScore = document.data()[formatedScore] + 1

    //update in DB
    const docRef = doc(db, collectionName, game)
    updateDoc(docRef, { [formatedScore]: updatedScore })
      .then(res.json('Reaction Time score saved successfully'))
      .catch(error => console.log('Error:', error))
  }
}

// GET DATA
export const getScore = async (req, res) => {
  const { game } = req.params
  getDocs(collection(db, 'games')).then(snapshot => {
    snapshot.docs.forEach(document => {
      if (document.id === game) res.json(document.data())
    });
  }).catch(error => {
    console.error(error)
    res.status(500).send('Error fetching data from Firestore');
  });
}

// RESET SCORE
export const resetScore = async (req, res) => {
  const { game } = req.params
  console.log('reset:', game)

  const temple = {
    0: 0, 100: 0, 125: 0, 150: 0, 175: 0, 200: 0, 25: 0, 225: 0, 250: 0, 275: 0, 300: 0, 325: 0, 350: 0, 375: 0, 400: 0, 425: 0, 450: 0, 475: 0, 50: 0, 75: 0
  }

  const docRef = doc(db, collectionName, game)
  updateDoc(docRef, { ...temple })
    .then(res.json('Reaction Time score reset successfully'))
    .catch(error => console.log('Error:', error))
}
