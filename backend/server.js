import express from 'express'
import cors from 'cors'
import scoreRouter from './routes.js'

const app = express()
const PORT = 5000

app.use(cors({ origin: "http://localhost:3000", }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/score', scoreRouter)

// Listening to the port
app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log("Server listening on PORT", PORT)
});
