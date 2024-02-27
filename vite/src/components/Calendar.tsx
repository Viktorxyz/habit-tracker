import Color from 'color'
import { addDays, addMonths, eachDayOfInterval, format, formatISO, getDay, getMonth, isSameMonth, isToday, startOfMonth, subDays, subMonths } from 'date-fns'
import { useMemo, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function CalendarDate({ hl = true, today = false, checked = false, checkedColor, date, onClick }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '65%',
      aspectRatio: '1 / 1',
      color: hl && 'white' || '#3d3d3d',
      border: today && '1.5px solid white',
      borderRadius: '100vw',
      backgroundColor: checked && (hl && checkedColor || Color(checkedColor).alpha(.5)) || 'transparent',
      margin: 'auto',
    }} onClick={onClick}>
      {format(date, 'd')}
    </div>
  )
}

const variants = {
  next: { left: '-100vw' },
  previous: { left: '100vw' }
}

export default function Calendar({ checkIns, color, completionsPerDay }) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))
  const next = useRef()

  const firstDayOfCalendar = useMemo(() => subDays(currentMonth, getDay(currentMonth) - 1), [currentMonth])
  const lastDayOfCalendar = useMemo(() => addDays(firstDayOfCalendar, 7 * 6 - 1), [currentMonth])
  const calendarDates = useMemo(() => eachDayOfInterval({ start: firstDayOfCalendar, end: lastDayOfCalendar }), [currentMonth])

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* calendar */}
      <div style={{
        display: 'grid',
        aspectRatio: '7 / 8',
        gridTemplateRows: '1fr 1fr 6fr',
        width: '100%',
      }}>
        {/* header */}
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white'
        }}>
          <FiChevronLeft style={{
            height: '50%',
            width: 'auto'
          }} onClick={() => {
            setCurrentMonth(subMonths(currentMonth, 1))
            next.current = false
          }} />
          <h2>{format(currentMonth, 'MMMM')}</h2>
          <FiChevronRight style={{
            height: '50%',
            width: 'auto'
          }} onClick={() => {
            setCurrentMonth(addMonths(currentMonth, 1))
            next.current = true
          }} />
        </div>
        {/* week days */}
        <div style={{
          display: 'flex',
          color: '#7e7e7e'
        }}>
          {weekDays.map((dayInWeek, i) => <div style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }} key={i}>{dayInWeek}</div>)}
        </div>
        {/* dates */}
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            key={getMonth(currentMonth)}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateRows: 'repeat(6, 1fr)',
              gridTemplateColumns: 'repeat(7, 1fr)'
            }}
            initial={(next.current) ? 'previous' : 'next'}
            animate={{ left: 'unset' }}
            transition={{ duration: .25, type: 'spring', delay: 0 }}
            exit={(next.current) ? 'next' : 'previous'}
            variants={variants}
          >
            {calendarDates.map((date, i) => <CalendarDate
              key={i}
              date={date}
              today={isToday(date)}
              onClick={() => { checkIns.add(date) }}
              checked={checkIns.has(date)}
              checkedColor={Color(color).alpha(checkIns?.state[formatISO(date, { representation: 'date' })]?.length / completionsPerDay)}
              hl={isSameMonth(currentMonth, date)}
            />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
