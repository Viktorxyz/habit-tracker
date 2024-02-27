import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import functions from 'firebase-functions'
import './firebase.js'

import habit from './routes/habit.js'
import user from './routes/user.js'

const app = express()

app.use(express.json())
app.use(cors({
  origin: true
}))

app.use('/habit', habit)

app.use('/user', user)

export const api = functions.https.onRequest(app)