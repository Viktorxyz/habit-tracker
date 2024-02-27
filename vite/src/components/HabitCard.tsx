import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconType } from 'react-icons'
import * as icons from 'react-icons/fi'
import { addDays, addMonths, format, formatISO, isSameMonth, isToday, startOfMonth, subMonths } from 'date-fns'
import Color from 'color'
import { useNavigate } from 'react-router-dom'
import useCheckIns from '../hooks/useCheckIns'
import { motion } from 'framer-motion'

const weekDayStyle = {
  maxHeight: '12px'
}

function Circle({ checkedColor, highlight = false, checked = false, today = false }) {
  const borderWidth = (() => {
    if (checked && !today) return '0'
    return '1.5px'
  })()
  const borderColor = (() => {
    if (today) return 'white'
    if (highlight) return '#7e7e7e'
    return '#3d3d3d'
  })()
  const backgroundColor = (() => {
    if (checked) {
      if (highlight) return checkedColor
      return Color(checkedColor).alpha(.5)
    }
    return 'transparent'
  })()
  return (
    <motion.div style={{
      width: '12px',
      height: '12px',
      borderRadius: '100vw',
      borderStyle: 'solid',
      borderWidth,
      borderColor,
      backgroundColor
    }}></motion.div>
  )
}

export default function HabitCard({ habit }) {
  const navigate = useNavigate()
  const today = new Date()
  const checkIns = useCheckIns({ habitId: habit.id, completionsPerDay: habit.completionsPerDay })
  const [currentMonth, setCurrentMonth] = useState(today)
  const [monthsChanged, setMonthsChanged] = useState(0)

  const nextMonth = useCallback(() => {
    if (monthsChanged < 4) {
      setMonthsChanged(prev => prev + 1)
      setCurrentMonth(addMonths(currentMonth, 1))
    }
    else {
      setMonthsChanged(-1)
      setCurrentMonth(subMonths(currentMonth, monthsChanged + 1))
    }
  }, [currentMonth, monthsChanged])

  const edit = useCallback(() => {
    navigate(`/habit/${habit.id}`)
  }, [habit.id])

  const calendar = useCallback(() => {
    navigate(`/habit/${habit.id}/calendar`)
  }, [habit.id])

  const Icon: IconType = useMemo(() => icons[habit.icon], [habit])

  if (!checkIns.state) return

  const renderWeeks = () => {
    const weeks = []
    let date = startOfMonth(subMonths(today, 1))

    for (let i = 0; i < 22; i++) {
      const week = []
      for (let j = 0; j < 7; j++) {
        week.push(<Circle
          checked={checkIns.has(date)}
          checkedColor={Color(habit.color).alpha(checkIns?.state[formatISO(date, { representation: 'date' })]?.length / habit.completionsPerDay)}
          highlight={isSameMonth(currentMonth, date)}
          today={isToday(date)}
          key={j}
        />)
        date = addDays(date, 1)
      }
      weeks.push(
        <div key={i} className='list' style={{
          gap: '2px'
        }}>
          {week}
        </div>
      )
    }
    return weeks
  }

  return (
    <motion.div
      initial={{
        filter: "blur(4px)",
      }}
      animate={{
        filter: "blur(0px)",
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        width: '100%',
        gap: '4px'
      }}
    >
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Icon + Title container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%'
          }} onClick={edit}>
            <Icon style={{
              minWidth: '24px',
              minHeight: '24px'
            }} />
            <h2>
              {habit.title}
            </h2>
          </div>
          {/* Description */}
          <p style={{
            color: '#7e7e7e',
            fontSize: '.75rem',
            lineHeight: '1rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}>{habit.description}</p>
        </div>
        <span style={{
          height: '100%',
          minHeight: '52px',
          aspectRatio: '1 / 1',
          borderRadius: '16px',
          border: '2px solid white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: checkIns.has(new Date()) && Color(habit.color).alpha(checkIns?.state[formatISO(today, { representation: 'date' })]?.length / habit.completionsPerDay)
        }} onClick={() => { checkIns.add(new Date()) }}>
          <icons.FiCheck style={{
            width: '32px',
            height: '32px'
          }} />
        </span>
      </header>
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2px',
      }} onClick={calendar}>
        <div className='list' style={{
          fontSize: '10px',
          justifyContent: 'space-between',
          textAlign: 'center'
        }}>
          <div style={weekDayStyle}>M</div>
          <div style={weekDayStyle}>T</div>
          <div style={weekDayStyle}>W</div>
          <div style={weekDayStyle}>T</div>
          <div style={weekDayStyle}>F</div>
          <div style={weekDayStyle}>S</div>
          <div style={weekDayStyle}>S</div>
        </div>
        {renderWeeks()}
      </main>
      <footer style={{
        textAlign: 'center'
      }} onClick={nextMonth}>
        {format(currentMonth, "MMMM")}
      </footer>
    </motion.div >
  )
}