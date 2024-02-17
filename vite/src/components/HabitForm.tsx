import * as icons from 'react-icons/fi'
import InputText from './InputText'
import { useEffect, useMemo, useState } from 'react'
import BlackAndWhiteLayout, { Black, White } from '../layouts/BlackAndWhiteLayout'
import { Link, useNavigate } from 'react-router-dom'

function Icon({ Icon, selected }) {
  return (
    <div style={{
      minWidth: '32px',
      minHeight: '32px',
      borderRadius: '8px',
      backgroundColor: selected ? '#FFFFFF' : '',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Icon style={{
        minWidth: '24px',
        minHeight: '24px',
        color: selected ? 'black' : ''
      }} />
    </div>
  )
}

function ColorCircle({ color, selected }: { color: string, selected: boolean }) {
  return (
    <span style={{
      width: '32px',
      height: '32px',
      backgroundColor: selected ? 'black' : color,
      borderRadius: '100vw',
      border: `8px solid ${color}`,
    }}></span>
  )
}

export default function HabitForm({ habit, setHabit, onSave }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState(habit.title)
  const [description, setDescription] = useState(habit.description)
  const [streakGoal, setStreakGoal] = useState(habit.streakGoal)
  const [completionsPerDay, setCompletionsPerDay] = useState(habit.completionsPerDay)
  const [icon, setIcon] = useState(habit.icon)
  const [color, setColor] = useState(habit.color)

  const defaultColors = useMemo(() => {
    const defaultColors = ['#ccb3db', '#ffc7dc', '#ffadcb', '#bee0fe', '#a3d3ff', '#fcf5bb']
    if (defaultColors.includes(habit.color)) return defaultColors
    else {
      defaultColors[0] = habit.color
      return defaultColors
    }
  }, [])
  const defaultIcons = useMemo(() => {
    const defaultIcons = ['FiBox', 'FiEdit2', 'FiHeart', 'FiStar', 'FiFigma', 'FiHeadphones']
    if (defaultIcons.includes(habit.icon)) return defaultIcons
    else {
      defaultIcons[0] = habit.icon
      return defaultIcons
    }
  }, [])

  useEffect(() => {
    setHabit({ title, description, streakGoal, completionsPerDay, icon, color })
  }, [title, description, streakGoal, completionsPerDay, icon, color])

  return (
    <BlackAndWhiteLayout>
      <White>
        <h1>
          <input type="text" defaultValue={title} style={{
            display: 'flex',
            width: '100%',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent'
          }} onChange={(e) => { setTitle(e.target.value) }} />
        </h1>
      </White>
      <Black>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div className='list' style={{
            gap: '20px',
            justifyContent: 'center',
            paddingInline: '20px',
            height: '100%',
          }}>
            <InputText onChange={setDescription} placeholder='description' defaultValue={description} />
            <InputText onChange={setStreakGoal} placeholder='streak goal' defaultValue={streakGoal} />
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <InputText onChange={setCompletionsPerDay} placeholder='completions per day' value={completionsPerDay} type='number' />
              <div style={{
                display: 'flex',
                gap: '2px',
                alignItems: 'end'
              }}>
                <button style={{
                  width: '100%',
                  height: '48px',
                  aspectRatio: '1 / 1',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }} onClick={() => { setCompletionsPerDay(prev => parseInt(prev) + 1) }}><icons.FiPlus /></button>
                <button style={{
                  width: '100%',
                  height: '48px',
                  aspectRatio: '1 / 1',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }} onClick={() => { setCompletionsPerDay(prev => parseInt(prev) - 1) }}><icons.FiMinus /></button>
              </div>
            </div>
            <label style={{
              color: 'white'
            }}>
              icon
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px'
              }}>
                {defaultIcons.map((ic, i) =>
                  <label key={i}>
                    <Icon Icon={icons[ic]} selected={ic === icon} />
                    <input onClick={() => { setIcon(ic) }} type='button' style={{ display: 'none' }} />
                  </label>
                )}
                <button style={{
                  width: '32px',
                  padding: '0',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }} onClick={() => { navigate('icon') }}><icons.FiMoreHorizontal /></button>
              </div>
            </label>
            <label style={{
              color: 'white'
            }}>
              color
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px'
              }}>
                {defaultColors.map((col, i) =>
                  <label key={i} style={{ display: 'flex' }}>
                    <ColorCircle color={col} selected={col === color} />
                    <input onClick={() => { setColor(col) }} type='button' style={{ display: 'none' }} />
                  </label>
                )}
                <img src="../colorpicker.png" alt="" style={{
                  width: '32px',
                  height: '32px'
                }} onClick={() => { navigate('color') }} />
              </div>
            </label>
          </div>
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
          }}>Cancel</Link>
          <button style={{
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: '32px',
            outline: 'none',
            border: 'none',
          }} onClick={onSave}>Save</button>
        </div>
      </Black>
    </BlackAndWhiteLayout>
  )
}