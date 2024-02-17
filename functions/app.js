import express from 'express'
import cors from 'cors'
import functions from 'firebase-functions'

import habit from './routes/habit.js'

const app = express()

app.use(express.json())
app.use(cors({
  origin: true
}))

app.use('/habit', habit)

export const api = functions.https.onRequest(app)