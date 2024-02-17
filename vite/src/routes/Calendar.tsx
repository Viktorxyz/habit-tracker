import { Link, useNavigate, useParams } from 'react-router-dom';
import { useHabit } from '../contexts/HabitProvider';
import BlackAndWhiteLayout, { Black, White } from '../layouts/BlackAndWhiteLayout';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Color from 'color';
import { addDays, addMonths, eachDayOfInterval, format, formatISO, getDay, getHours, getMinutes, getSeconds, isSameDay, isSameMonth, isToday, setDate, setHours, setMinutes, setSeconds, startOfMonth, subDays, subMonths, toDate } from 'date-fns';
import { DetailedHTMLProps, HTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import useCheckIns from '../hooks/useCheckIns';

const weekDays = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
]

type DateType = {
  hl?: boolean,
  today?: boolean,
  checked?: boolean,
  checkedColor?: string,
  date?: Date,
  onClick?: any
}

function CalendarDate({ hl = true, today = false, checked = false, checkedColor, date, onClick }: DateType) {
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

export default function Calendar() {
  const { id } = useParams()
  const { habit } = useHabit()
  const navigate = useNavigate()
  const checkIns = useCheckIns({ habitId: id, completionsPerDay: habit.completionsPerDay })
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))

  const firstDayOfCalendar = useMemo(() => subDays(currentMonth, getDay(currentMonth) - 1), [currentMonth])
  const lastDayOfCalendar = useMemo(() => addDays(firstDayOfCalendar, 7 * 6 - 1), [currentMonth])
  const calendarDates = useMemo(() => eachDayOfInterval({ start: firstDayOfCalendar, end: lastDayOfCalendar }), [currentMonth])

  const edit = () => {
    navigate('..')
  }

  if (!checkIns.state) return <Loading />

  return (
    <BlackAndWhiteLayout>
      <White>
        <h1>{habit.title}</h1>
      </White>
      <Black>
        {/* calendar-container */}
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
              }} onClick={() => { setCurrentMonth(subMonths(currentMonth, 1)) }} />
              <h2>{format(currentMonth, 'MMMM')}</h2>
              <FiChevronRight style={{
                height: '50%',
                width: 'auto'
              }} onClick={() => { setCurrentMonth(addMonths(currentMonth, 1)) }} />
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
            <div style={{
              display: 'grid',
              gridTemplateRows: 'repeat(6, 1fr)',
              gridTemplateColumns: 'repeat(7, 1fr)'
            }}>
              {calendarDates.map((date, i) => <CalendarDate
                key={i}
                date={date}
                today={isToday(date)}
                onClick={() => { checkIns.add(date) }}
                checked={checkIns.has(date)}
                checkedColor={Color(habit.color).alpha(checkIns?.state[formatISO(date, { representation: 'date' })]?.length / habit.completionsPerDay)}
                hl={isSameMonth(currentMonth, date)}
              />)}
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          height: '64px'
        }}>
          <Link to='/' style={{
            color: 'white',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none'
          }}>Back</Link>
          <button style={{
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: '32px',
            outline: 'none',
            border: 'none',
          }} onClick={edit}>Edit</button>
        </div>
      </Black>
    </BlackAndWhiteLayout>
  )
}
