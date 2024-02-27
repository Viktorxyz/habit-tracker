import HabitForm from '../components/HabitForm'
import { useHabit } from '../contexts/HabitProvider'
import { useParams } from 'react-router-dom'
import Transition from '../layouts/Transition'

export default function HabitRoute() {
  const { id } = useParams()
  const { habit, createHabit, updateHabit, setHabit } = useHabit()

  const onSave = () => {
    if (id === 'new') createHabit()
    else updateHabit()
  }

  return (
    <Transition enter='right' exit='right'>
      <HabitForm habit={habit} setHabit={setHabit} onSave={onSave} />
    </Transition>
  )
}