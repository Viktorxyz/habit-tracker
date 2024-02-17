import { Link, useNavigate } from 'react-router-dom'
import { useHabit } from '../contexts/HabitProvider'
import * as icons from 'react-icons/fi'
import { useState } from 'react'

export default function HabitIcon() {
  const navigate = useNavigate()
  const { habit, setHabit } = useHabit()
  const [icon, setIcon] = useState(habit.icon)

  const save = () => {
    console.log(icon);
    setHabit({
      ...habit,
      icon
    })
    navigate('..')
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* icons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        overflowY: 'auto',
        flex: 1
      }}>

        {Object.entries(icons).map(([key, Icon], i) =>
          <div style={{
            width: 'auto',
            aspectRatio: '1 / 1',
            margin: '20%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (key === icon) && 'white',
            borderRadius: '8px'
          }} key={i}><Icon style={{
            width: '75%',
            height: '75%',
            color: (key === icon) ? 'black' : 'white'
          }} onClick={() => { setIcon(key) }} /></div>
        )}
      </div>
      <div style={{
        display: 'flex',
        height: '64px'
      }}>
        <Link to='..' style={{
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
        }} onClick={save}>Save</button>
      </div>
    </div>
  )
}
