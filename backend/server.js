const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors({ origin: "http://localhost:3000", }))
app.use(express.json())

const data = {
  1: 1,
  2: 0,
  3: 0,
  4: 0,
  5: 1,
  6: 4,
  7: 0,
  8: 0,
  9: 0,
  10: 10,
  11: 20,
  12: 20,
  13: 23,
  14: 25,
  15: 18,
  16: 10,
  17: 8,
  18: 0,
  19: 1,
}

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/getstats', (req, res) => {
  res.json(data)
})

app.post('/save-score', (req, res) => {
  const { score } = req.body
  const newData = data
  newData[score] += 1
  //TODO SAVE NEW SCORE TABLE TO DB
  res.json(newData)
});

// Listening to the port
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
