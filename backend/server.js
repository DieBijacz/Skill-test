import express from 'express'
import cors from 'cors'
import { db, saveScore } from './db.js'
import { doc as docFromDB, collection, getDocs, updateDoc } from 'firebase/firestore'

const app = express()
const PORT = 5000

app.use(cors({ origin: "http://localhost:3000", }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/getstats', (req, res) => {
  // TODO get game name from url
  const gameTitle = req.query.gameTitle || 'memory'; //get game title from URL query parameter or set a default value
  const collectionName = 'games'

  getDocs(collection(db, collectionName)).then(snapshot => {
    snapshot.docs.forEach(doc => {
      if (doc.id === gameTitle) {
        console.log(doc.data())
        res.json(doc.data())
      }
    });
  }).catch(error => {
    console.error(error)
    res.status(500).send('Error fetching data from Firestore');
  });
});

app.post('/save-score', (req, res) => {
  // TODO get game name from url
  const gameTitle = req.query.gameTitle || 'memory'; //get game title from URL query parameter or set a default value
  const collectionName = 'games'

  // GET SCORE FROM CLIENT
  const { score } = req.body

  // GET DATA FROM DB
  getDocs(collection(db, collectionName)).then(snapshot => {
    snapshot.docs.forEach(doc => {
      if (doc.id === gameTitle) { //validate doc

        // UPDATE SCORE
        const updatedScore = doc.data()[score] + 1

        // UPDATE DATA
        const dataFromDB = docFromDB(db, collectionName, gameTitle)
        updateDoc(dataFromDB, { [score]: updatedScore })
          .then(console.log('Score successfully updated!'))
          .catch(error => console.log('Error:', error))
      }
    });
  }).catch(error => {
    console.error(error)
    res.status(500).send('Error fetching data from Firestore')
  });
});

// Listening to the port
app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log("Server listening on PORT", PORT)
});
