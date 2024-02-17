import express from 'express'
import cors from 'cors'

import habit from './routes/habit.js'

const port = 3000

const app = express()

app.use(express.json())
app.use(cors({
  origin: true
}))

// routes
app.use('/habit', habit)

app.listen(port, () => {
  console.log(`listening to port ${port}`);
})