import { Link, useNavigate, useParams } from 'react-router-dom';
import { useHabit } from '../contexts/HabitProvider';
import BlackAndWhiteLayout, { Black, White } from '../layouts/BlackAndWhiteLayout';
import Loading from '../components/Loading';
import useCheckIns from '../hooks/useCheckIns';
import Transition from '../layouts/Transition';
import Calendar from '../components/Calendar';

export default function CalendarRoute() {
  const { id } = useParams()
  const { habit } = useHabit()
  const navigate = useNavigate()
  const checkIns = useCheckIns({ habitId: id, completionsPerDay: habit.completionsPerDay })

  const edit = () => {
    navigate('..')
  }

  if (!checkIns.state) return <Loading />

  return (
    <Transition enter='right' exit='right'>
      <BlackAndWhiteLayout>
        <White>
          <h1>{habit.title}</h1>
        </White>
        <Black>
          <Calendar checkIns={checkIns} color={habit.color} completionsPerDay={habit.completionsPerDay} />
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
    </Transition>
  )
}
