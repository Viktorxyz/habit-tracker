import Wheel from '@uiw/react-color-wheel'
import { useHabit } from '../contexts/HabitProvider'
import { useState } from 'react'
import ShadeSlider from '@uiw/react-color-shade-slider'
import { Link, useNavigate } from 'react-router-dom'
import Color from 'color'

export default function HabitColor() {
  const navigate = useNavigate()
  const { habit, setHabit } = useHabit()
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 100 })

  const save = () => {
    setHabit({
      ...habit,
      color: Color({ h: hsva.h, s: hsva.s, v: hsva.v }).hex()
    })
    navigate('..')
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* color picker container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <Wheel color={hsva} onChange={(color) => { setHsva({ ...color.hsva }) }} />
        <ShadeSlider
          hsva={hsva}
          style={{
            width: '100%',
            marginTop: 20
          }}
          onChange={(newShade) => {
            setHsva({ ...hsva, ...newShade });
          }}
        />
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
