import express from 'express'
import { getAuth } from 'firebase-admin/auth'
import distance from '../utils/stringDistance.js'

const router = express.Router()

const getUsers = async () => {
  const res = await getAuth().listUsers()
  const users = res.users.map(user => ({
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  }))
  return users
}

const getUserById = async (id) => {
  const res = await getAuth().getUser(id)
  const user = {
    uid: res.uid,
    displayName: res.displayName,
    photoURL: res.photoURL
  }
  return user
}

const getUsersByDisplayName = async (displayName) => {
  const res = await getAuth().listUsers()
  let users = res.users.map(user => ({
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  }))
  users = users.sort((a, b) => distance(a.displayName, displayName) - distance(b.displayName, displayName))
  return users
}

router.get('/:id', async (req, res) => {
  try {
    res.send(await getUserById(req.params.id))
  } catch (error) {
    res.send(error.message).status(404)
  }
})

router.get('/', async (req, res) => {
  try {
    if (req.query.displayName) res.send(await getUsersByDisplayName(req.query.displayName))
    else res.send(await getUsers())
  } catch (error) {
    res.send(error.message).status(404)
  }
})

export default router 