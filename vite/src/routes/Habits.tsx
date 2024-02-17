import { Link, useNavigate } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Loading from '../components/Loading'
import HabitCard from '../components/HabitCard'
import { motion } from 'framer-motion'

function Guesture({ children, defaultActive = false }) {
  const [active, setActive] = useState(false)

  const ref = useRef()

  const height = useMemo(() => ref?.current?.clientHeight || 0, [active])

  const toggleActive = useCallback(() => {
    setActive(!active)
  }, [active])

  const onDragEnd = useCallback((event, info) => {
    if (Math.abs(info.offset.y) > height / 2) {
      if (info.offset.y > 0) setActive(false)
      else setActive(true)
    } else {

    }
  }, [height])

  const variants = useMemo(() => ({
    inactive: { top: "-32px", backgroundColor: "#000000" },
    active: { top: `-${height}px`, backgroundColor: "#ffffff" }
  }), [height])

  const barVariants = useMemo(() => ({
    inactive: { backgroundColor: "#ffffff" },
    active: { backgroundColor: "#000000" }
  }), [])

  useEffect(() => {
    console.log(active, height);
    if (defaultActive) setActive(defaultActive)
  }, [])

  return (
    // container
    <motion.div style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      borderTopLeftRadius: '32px',
      borderTopRightRadius: '32px'
    }}
      ref={ref}
      drag="y"
      dragConstraints={{ bottom: active ? height - 32 : 0, top: active ? 0 : height - 32 }}
      dragElastic={0}
      onDragEnd={onDragEnd}
      animate={active ? 'active' : 'inactive'}
      variants={variants}
      transition={{ ease: 'easeOut', duration: .2 }}
      onClick={toggleActive}
    >
      {/* bar container */}
      <div style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '32px'
      }}>
        {/* bar */}
        <motion.div style={{
          display: 'block',
          width: '55%',
          height: '8px',
          borderRadius: '100vw',
          transitionProperty: 'background-color',
          transitionDuration: '.2',
          transitionTimingFunction: 'ease-in-out',
        }}
          variants={barVariants}
        ></motion.div>
      </div>
      {children}
    </motion.div>
  )
}

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
    <>
      {habits.length > 0
        &&
        <div className='list' style={{
          paddingInline: '20px',
          paddingTop: '40px',
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
          <Link to='/profile' style={listItemStyle}>
            Profile
          </Link>
          <Link to='/settings' style={listItemStyle}>
            Settings
          </Link>
        </div>
      </Guesture>
    </>
  )
}
