import pool from '../db.js'

export const updateHabit = async (id, props) => {
  const conn = await pool.getConnection()

  const [habit] = await conn.query(`
  SELECT 
  habit_title,
  habit_description,
  habit_streak_goal,
  habit_completions_per_day,
  habit_color,
  habit_icon,
  habit_id
  FROM Habit WHERE habit_id = ? LIMIT 1`, [id])
  const values = Object.values(Object.assign(habit[0], props));

  const [res] = await conn.query(`
  UPDATE Habit
  SET
  habit_title = ?,
  habit_description = ?,
  habit_streak_goal = ?,
  habit_completions_per_day = ?,
  habit_color = ?,
  habit_icon = ?
  WHERE habit_id = ?
  `, values)
  conn.destroy()
  return res && true
}

export const deleteHabit = async (id) => {
  const conn = await pool.getConnection()
  const [res] = await conn.query(`DELETE FROM Habit WHERE habit_id = ?`, [id])
  conn.destroy()
  return res && true
}

export const getHabit = async (id) => {
  const conn = await pool.getConnection()
  const [res] = await conn.query(`SELECT
  habit_id,
  habit_title,
  habit_description,
  habit_streak_goal,
  habit_completions_per_day,
  habit_color,
  habit_icon FROM Habit WHERE habit_id = ?`, [id])
  conn.destroy()
  return res[0]
}

export const getHabits = async () => {
  const conn = await pool.getConnection()
  const [res] = await conn.query('SELECT * FROM Habit')
  conn.destroy()
  return res
}

export const getUserHabits = async (userId) => {
  const conn = await pool.getConnection()
  const [res] = await conn.query(`SELECT
  habit_id,
  habit_title,
  habit_description,
  habit_streak_goal,
  habit_completions_per_day,
  habit_color,
  habit_icon
  FROM Habit WHERE user_id = ?`, [userId])
  conn.destroy()
  return res
}

export const createHabit = async (userId, title, description, streakGoal, completionsPerDay, color, icon) => {
  const conn = await pool.getConnection()
  const values = [userId, title, description, streakGoal, completionsPerDay, color, icon]
  const [res] = await conn.query(`
  INSERT INTO Habit(
    user_id,
    habit_title,
    habit_description,
    habit_streak_goal,
    habit_completions_per_day,
    habit_color,
    habit_icon
  )
  VALUES(?,?,?,?,?,?,?)`, values)
  conn.destroy()
  return res
}