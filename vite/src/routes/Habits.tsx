import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'
import HabitCard from '../components/HabitCard'
import Transition from '../layouts/Transition'
import Guesture from '../components/Guesture'

const listItemStyle = {
  backgroundColor: 'transparent',
  width: '100%',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'black',
  fontWeight: '600'
}

export default function Habits() {
  const habitsAxios = useAxios()
  const [habits, setHabits] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await habitsAxios.request({
        url: '/habit',
        method: 'get'
      })
      setHabits(res.map(r => ({
        id: r.habit_id,
        title: r.habit_title,
        description: r.habit_description,
        streakGoal: r.habit_streak_goal,
        completionsPerDay: r.habit_completions_per_day,
        color: r.habit_color,
        icon: r.habit_icon
      })))
    }
    fetchData()
  }, [])

  if (habitsAxios.loading) return <Loading />

  return (
    <Transition enter='left' exit='left'>
      {habits.length > 0
        &&
        <div className='list' style={{
          paddingInline: '20px',
          paddingBlock: '40px',
          height: '100%',
          overflowY: 'auto'
        }}>
          {habits.map((habit, i) => <HabitCard key={i} habit={habit} />)}
        </div>
        ||
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          paddingInline: '20px'
        }}>
          <motion.h1 style={{
            color: '#3d3d3d',
            margin: '0'
          }} animate={{ opacity: [0, 1] }}>Make some
            <span style={{
              color: 'white',
              textDecoration: 'underline'
            }}> Habits!</span>
          </motion.h1>
        </div>
      }
      <Guesture defaultActive={habits.length < 1}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          paddingInline: '32px',
        }}>
          <Link to='/habit/new' style={listItemStyle}>
            Create New Habit
          </Link>
          <Link to='/users' style={listItemStyle}>
            Users
          </Link>
          <Link to='/profile' style={listItemStyle}>
            Profile
          </Link>
          <Link to='/settings' style={listItemStyle}>
            Settings
          </Link>
        </div>
      </Guesture>
    </Transition>
  )
}
