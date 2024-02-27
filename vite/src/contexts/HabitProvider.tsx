import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'

const HabitContext = createContext({})

export const useHabit = () => {
  return useContext(HabitContext)
}

const defaultHabit = {
  title: 'Habit Title',
  description: '',
  streakGoal: 'Daily',
  completionsPerDay: 1,
  color: '#ccb3db',
  icon: 'FiBox'
}

export function HabitProvider() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { request, loading } = useAxios()
  const [habit, setHabit] = useState(defaultHabit)

  const formatHabit = useMemo(() => ({
    habit_title: habit.title,
    habit_description: habit.description,
    habit_streak_goal: habit.streakGoal,
    habit_completions_per_day: habit.completionsPerDay,
    habit_color: habit.color,
    habit_icon: habit.icon
  }), [habit])

  const fetchHabit = async () => {
    const res = await request({
      method: 'get',
      url: `/habit/${id}`
    })
    setHabit({
      title: res.habit_title,
      description: res.habit_description,
      streakGoal: res.habit_streak_goal,
      completionsPerDay: res.habit_completions_per_day,
      color: res.habit_color,
      icon: res.habit_icon
    })
  }

  const updateHabit = useCallback(async () => {
    await request({
      method: 'put',
      url: `/habit/${id}`,
      data: formatHabit
    })
    navigate('..')
  }, [formatHabit])

  const createHabit = useCallback(async () => {
    await request({
      method: 'post',
      url: '/habit',
      data: formatHabit
    })
    navigate('..')
  }, [formatHabit])

  useEffect(() => {
    if (id !== 'new') fetchHabit()
  }, [])

  const value = {
    habit,
    setHabit,
    createHabit,
    updateHabit
  }

  if (id !== 'new' && loading) return <Loading />

  return (
    <HabitContext.Provider value={value}>
      <Outlet />
    </HabitContext.Provider>
  )
}
