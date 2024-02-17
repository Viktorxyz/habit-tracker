import { useCallback, useMemo, useState } from 'react'
import { IconType } from 'react-icons'
import * as icons from 'react-icons/fi'
import { addDays, addMonths, format, formatISO, isSameMonth, isToday, startOfMonth, subMonths } from 'date-fns'
import Color from 'color'
import { useNavigate } from 'react-router-dom'
import useCheckIns from '../hooks/useCheckIns'

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
    <div style={{
      width: '12px',
      height: '12px',
      borderRadius: '100vw',
      borderStyle: 'solid',
      borderWidth,
      borderColor,
      backgroundColor
    }}></div>
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      width: 'min-content',
      gap: '4px'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between'
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
        <span style={{
          height: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '8px',
          border: '2px solid white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: checkIns.has(new Date()) && Color(habit.color).alpha(checkIns?.state[formatISO(today, { representation: 'date' })]?.length / habit.completionsPerDay)
        }} onClick={() => { checkIns.add(new Date()) }}>
          <icons.FiCheck style={{
            width: '24px',
            height: '24px'
          }} />
        </span>
      </header>
      <main style={{
        display: 'flex',
        maxHeight: '96px',
        gap: '2px',
      }} onClick={calendar}>
        <div className='list' style={{
          fontSize: '10px',
          justifyContent: 'space-between',
          textAlign: 'center'
        }}>
          <div style={{
            maxHeight: '12px'
          }}>M</div>
          <div style={{
            maxHeight: '12px'
          }}>T</div>
          <div style={{
            maxHeight: '12px'
          }}>W</div>
          <div style={{
            maxHeight: '12px'
          }}>T</div>
          <div style={{
            maxHeight: '12px'
          }}>F</div>
          <div style={{
            maxHeight: '12px'
          }}>S</div>
          <div style={{
            maxHeight: '12px'
          }}>S</div>
        </div>
        {renderWeeks()}
      </main>
      <footer style={{
        textAlign: 'center'
      }} onClick={nextMonth}>
        {format(currentMonth, "MMMM")}
      </footer>
    </div >
  )
}