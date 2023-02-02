import express from 'express'
import cors from 'cors'
import { db, saveScore } from './db.js'
import { collection, getDocs } from 'firebase/firestore'

const app = express()
const PORT = 5000

app.use(cors({ origin: "http://localhost:3000", }))
app.use(express.json())

// const data = {
//   1: 1,
//   2: 0,
//   3: 0,
//   4: 0,
//   5: 1,
//   6: 4,
//   7: 0,
//   8: 0,
//   9: 0,
//   10: 10,
//   11: 20,
//   12: 20,
//   13: 23,
//   14: 25,
//   15: 18,
//   16: 10,
//   17: 8,
//   18: 0,
//   19: 1,
// }

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/getstats', (req, res) => {
  const gameTitle = req.query.gameTitle || 'memory'; //get game title from URL query parameter or set a default value
  const collectionName = 'games';

  getDocs(collection(db, collectionName)).then(snapshot => {
    snapshot.docs.forEach(doc => {
      if (doc.id === gameTitle) {
        console.log(doc.data());
        res.json(doc.data());
      }
    });
  }).catch(error => {
    console.error(error);
    res.status(500).send('Error fetching data from Firestore');
  });
});


app.post('/save-score', (req, res) => {
  const { score } = req.body
  //TODO update data in database
  // fetch data, update, save in db
  console.log(score)
});

// Listening to the port
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
