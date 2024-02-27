import express from 'express'
import Color from 'color'
import checkIn from './checkIn.js'
import {
  createHabit,
  deleteHabit,
  getHabit,
  getUserHabits,
  updateHabit
} from '../controllers/habit.js'
import { verifyUser } from '../middlewares/verifyUser.js'
const router = express.Router()

router.get('/', verifyUser, async (req, res) => {
  try {
    const habits = await getUserHabits(req.user.id)
    res.json(habits)
  } catch (error) {
    res.send(error.message).status(404)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const habit = await getHabit(req.params.id)
    res.json(habit)
  } catch (error) {
    res.send(error.message).status(404)
  }
})

router.post('/', verifyUser, async (req, res) => {
  const {
    habit_title,
    habit_description,
    habit_streak_goal,
    habit_completions_per_day,
    habit_color,
    habit_icon
  } = req.body
  const newHabit = await createHabit(
    req.user.id,
    habit_title,
    habit_description,
    habit_streak_goal,
    habit_completions_per_day,
    Color(habit_color).hex(),
    habit_icon
  )
  res.json(newHabit)
})

router.put('/:id', async (req, res) => {
  try {
    const updated = await updateHabit(req.params.id, req.body)
    res.json(updated)
  } catch (error) {
    res.send(error.message).status(404)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteHabit(req.params.id)
    res.json(deleted)
  } catch (error) {
    res.send(error.message).status(404)
  }
})

router.use('/:id/check-in', checkIn)

export default router