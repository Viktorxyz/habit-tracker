import { IconType } from 'react-icons'
import * as icons from 'react-icons/fi'
import { FiCheck } from 'react-icons/fi'

type HabitType = {
  title: string,
  description: string,
  completionsPerDay: number,
  streakGoal: string,
  icon: string,
  color: string,
}

type CircleType = {
  color: string,
  highlight?: boolean,
  checked?: boolean
}

function Circle({ color, highlight = false, checked = false }: CircleType) {
  return (
    <div style={{
      width: '12px',
      height: '12px',
      border: (checked) ? 'none' : '1px solid',
      borderColor: (highlight) ? 'white' : '#3d3d3d',
      borderRadius: '100vw',
      backgroundColor: (checked) ? color : 'transparent'
    }}></div>
  )
}

function HabitCard({ habit }: { habit: HabitType }) {
  const Icon: IconType = icons[habit.icon]

  const weeks = []
  for (let i = 0; i < 22; i++) {
    weeks.push(
      <div key={i} className='list' style={{
        gap: '2px'
      }}>
        <Circle highlight={true} color={habit.color} />
        <Circle checked={true} color={habit.color} />
        <Circle color={habit.color} />
        <Circle checked={true} color={habit.color} />
        <Circle color={habit.color} />
        <Circle color={habit.color} />
        <Circle color={habit.color} />
      </div>
    )
  }

  const toggleToday = () => {
    console.log("toggleToday");
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Icon style={{
            minWidth: '24px',
            minHeight: '24px'
          }} />
          <h2>
            {habit.title}
          </h2>
        </div>
        <label style={{
          height: '100%',
          aspectRatio: '1 / 1'
        }}>
          <span style={{
            height: '100%',
            width: '100%',
            borderRadius: '8px',
            border: '1px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FiCheck style={{
              width: '24px',
              height: '24px'
            }} />
          </span>
          <input type="checkbox" style={{
            position: 'absolute',
            width: 0,
            height: 0
          }} onClick={toggleToday} />
        </label>
      </header>
      <main style={{
        display: 'flex',
        maxHeight: '96px',
        gap: '2px',
      }}>
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
        {weeks}
      </main>
      <footer style={{
        textAlign: 'center'
      }}>
        February
      </footer>
    </div>
  )
}

export default function Root() {
  const habit = {
    title: 'Code',
    description: 'react coding',
    completionsPerDay: 1,
    streakGoal: 'daily',
    icon: 'FiCode',
    color: 'hsla(278, 35%, 78%, 1)'
  }

  return (
    <div style={{
      backgroundColor: 'black',
      height: '100%'
    }}>
      <div className='list' style={{
        paddingInline: '20px',
        height: '100%'
      }}>
        <HabitCard habit={habit} />
      </div>
    </div>
  )
}
