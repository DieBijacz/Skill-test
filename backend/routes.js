import express from 'express'
import { getScore, saveScore } from './DBcontrollers.js'
const scoreRouter = express.Router()

scoreRouter
  .post('/:game', saveScore)
  .get('/:game', getScore)

export default scoreRouter