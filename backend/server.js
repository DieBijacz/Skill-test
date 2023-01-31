const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors({ origin: "http://localhost:3000", }))
app.use(express.json())

app.get('/data', (req, res) => {
  const data = { message: 'Hello from the server!' };
  res.json(data);
});

// Listening to the port
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
