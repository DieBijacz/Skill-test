import express from 'express'
import { getScore, resetScore, saveScore } from './DBcontrollers.js'
const scoreRouter = express.Router()

scoreRouter
  .use('/reset/:game', resetScore)
  .post('/:game', saveScore)
  .get('/:game', getScore)

export default scoreRouter