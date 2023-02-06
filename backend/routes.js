import express from 'express'
import { getScore, zapisz } from './DBcontrollers.js'
const scoreRouter = express.Router()

scoreRouter
  .post('/:game', zapisz)
  .get('/:game', getScore)

export default scoreRouter