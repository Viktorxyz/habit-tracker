import express from 'express'
import { getAuth } from 'firebase-admin/auth'

const router = express.Router()

router.get('/', getUsers)

const getUsers = async () => {
  const res = await getAuth().listUsers()
  res.users.forEach(user => console.log(user.toJSON()))
}

export default router 