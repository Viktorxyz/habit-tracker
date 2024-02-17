import express from 'express'
import pool from '../db.js'
import { verifyUser } from '../middlewares/verifyUser.js'
import { formatISO, formatISO9075 } from 'date-fns'
import { getHabit } from '../controllers/habit.js'
const router = express.Router({ mergeParams: true })

router.get('/', verifyUser, async (req, res) => {
  try {
    const checkIns = await getCheckIns(req.params.id)
    res.json(checkIns)
  } catch (error) {
    res.send({ message: error.message }).status(404)
  }
})

router.post('/', async (req, res) => {
  try {
    const checkedIn = await checkIn(req.params.id, req.body)
    res.send(checkedIn)
  } catch (error) {
    res.send({ message: error.message }).status(404)
  }
})

router.delete('/', async (req, res) => {
  try {
    const deleted = await deleteCheckIns(req.params.id)
    res.send(deleted)
  } catch (error) {
    res.send({ message: error.message }).status(404)
  }
})

const getCheckIns = async (habitId) => {
  const conn = await pool.getConnection()
  const [res] = await conn.query(`
  SELECT check_in_date FROM CheckIn WHERE habit_id = ?
  `, [habitId])
  const checkIns = res.map(r => r.check_in_date)
  conn.destroy()
  return checkIns
}

const countCheckInsOfDate = async (habitId, date) => {
  const conn = await pool.getConnection()
  const [res] = await conn.query(`
  SELECT COUNT(*) FROM CheckIn WHERE habit_id = ? and check_in_date = ?
  `, [habitId, date])
  conn.destroy()
  return res[0]['COUNT(*)']
}

const checkIn = async (habitId, checkIns) => {
  const conn = await pool.getConnection()
  const habit = await getHabit(habitId)
  let valuesToInsert = []
  let valuesToDelete = []
  Object.entries(checkIns).forEach(([key, arr]) => {
    if (arr.length > 0) valuesToInsert = valuesToInsert.concat(arr)
    else valuesToDelete.push(key)
  })
  valuesToInsert = valuesToInsert.map(v => {
    const datetime = formatISO9075(v).split(' ')
    return [habitId, datetime[0], datetime[1]]
  })
  let resInsert, resDelete
  if (valuesToInsert.length > 0) {
    const [res] = await conn.query(`
    INSERT IGNORE INTO CheckIn(habit_id, check_in_date, check_in_time)
    VALUES ?
    `, [valuesToInsert])
    resInsert = res
  }
  if (valuesToDelete.length > 0) {
    const [res] = await conn.query(`
    DELETE FROM CheckIn WHERE check_in_date IN (?)
    `, [valuesToDelete])
    resDelete = res
  }
  conn.destroy()
  return (resInsert || resDelete) && true
}

const deleteCheckIns = async (habitId) => {
  const conn = await pool.getConnection()
  const [res] = await conn.query(`
  DELETE FROM CheckIn WHERE habit_id = ?
  `, [habitId])
  conn.destroy()
  return res && true
}

export default router