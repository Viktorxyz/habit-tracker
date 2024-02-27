import express from 'express'
import cors from 'cors'
import './firebase.js'

import habit from './routes/habit.js'
import user from './routes/user.js'

const port = 3000

const app = express()

app.use(express.json())
app.use(cors({
  origin: true
}))

// routes
app.use('/habit', habit)

app.use('/user', user)

app.listen(port, () => {
  console.log(`listening to port ${port}`);
})