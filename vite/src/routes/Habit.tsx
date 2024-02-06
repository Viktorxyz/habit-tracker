import { useState } from 'react'
import BlackAndWhiteLayout from '../layouts/BlackAndWhiteLayout'
import InputText from '../components/InputText'
import { Link } from 'react-router-dom'
import {
  FiBox,
  FiEdit2,
  FiFigma,
  FiHeadphones,
  FiHeart,
  FiMinus,
  FiMoreHorizontal,
  FiPlus,
  FiStar,
} from 'react-icons/fi'
import { IconType } from 'react-icons'

// type streakGoalType = 'None' | 'Daily' | 'Week' | 'Month'

function Icon({ Icon, selected }: { Icon: IconType, selected: boolean }) {
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

function Color({ color, selected }: { color: string, selected: boolean }) {
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

export default function Root() {
  const defaultColors = [
    'hsla(278, 35%, 78%, 1)',
    'hsla(337, 100%, 89%, 1)',
    'hsla(338, 100%, 84%, 1)',
    'hsla(208, 97%, 87%, 1)',
    'hsla(209, 100%, 82%, 1)',
    'hsla(54, 91%, 86%, 1)'
  ]
  const defaultIcons = [
    FiBox,
    FiEdit2,
    FiHeart,
    FiStar,
    FiFigma,
    FiHeadphones
  ]
  const [title, setTitle] = useState("Habit Title")
  const [description, setDescription] = useState("")
  const [streakGoal, setStreakGoal] = useState()
  const [completionsPerDay, setCompletionsPerDay] = useState(1)
  const [icon, setIcon] = useState("")
  const [color, setColor] = useState("")

  const handleSubmit = () => {
    console.log(title, description, streakGoal, completionsPerDay, icon, color);

  }

  return (
    <BlackAndWhiteLayout title={<input type="text" defaultValue={title} style={{
      display: 'flex',
      width: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent'
    }} onChange={(e) => { setTitle(e.target.value) }} />}>
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
          <InputText onChange={setDescription} placeholder='description' />
          <InputText onChange={setStreakGoal} placeholder='streak goal' defaultValue={'Daily'} />
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
              }} onClick={() => { setCompletionsPerDay(prev => parseInt(prev) + 1) }}><FiPlus /></button>
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
              }} onClick={() => { setCompletionsPerDay(prev => parseInt(prev) - 1) }}><FiMinus /></button>
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
                  <Icon Icon={ic} selected={ic.name === icon} />
                  <input onClick={() => { setIcon(ic.name) }} type='button' style={{ display: 'none' }} />
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
              }}><FiMoreHorizontal /></button>
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
                  <Color color={col} selected={col === color} />
                  <input onClick={() => { setColor(col) }} type='button' style={{ display: 'none' }} />
                </label>
              )}
              <img src="./colorpicker.png" alt="" style={{
                width: '32px',
                height: '32px'
              }} />
            </div>
          </label>
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
          }}>Cancel</Link>
          <button style={{
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: '32px',
            outline: 'none',
            border: 'none',
          }} onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </BlackAndWhiteLayout>
  )
}