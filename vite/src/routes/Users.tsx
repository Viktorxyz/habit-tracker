import { FiArrowLeft, FiMoreVertical, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useUsers from '../hooks/useUsers'
import { useCallback, useEffect } from 'react'
import Loading from '../components/Loading'

function SearchBar({ onChange, placeholder }) {
  return (
    <label style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      minHeight: '36px',
      borderRadius: '12px',
      backgroundColor: '#1d1d1d',
      paddingInline: '.5rem',
    }}>
      <div style={{
        display: 'flex',
        height: '100%',
        aspectRatio: '1 / 1',
        padding: '.5rem'
      }}>
        <FiSearch style={{
          height: '100%',
          width: '100%',
          color: 'white'
        }} />
      </div>
      <input type="text" onChange={(e) => { onChange(e.target.value) }} placeholder={placeholder} style={{
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'white',
        width: '100%'
      }} />
    </label>
  )
}

function User({ user }) {
  return (
    <div style={{
      display: 'flex',
      height: '54px',
      alignItems: 'center',
      gap: '.5rem'
    }}>
      {/* user profile picture */}
      <div style={{
        height: '100%',
        aspectRatio: '1 / 1',
        backgroundColor: 'white',
        borderRadius: '100vw'
      }}></div>
      {/* user displayName, number of habits, mutual friends */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        {/* Username */}
        <p style={{ color: 'white' }}>{user.displayName}</p>
        <p style={{ color: '#7e7e7e', fontSize: '.75rem' }}>Number of habits: </p>
        <p style={{ color: '#7e7e7e', fontSize: '.75rem' }}>Friends with: </p>
      </div>
      {/* options */}
      <FiMoreVertical style={{ color: 'white', height: '100%' }} />
    </div>
  )
}

export default function Users() {
  const { users, fetchUsers } = useUsers()

  useEffect(() => {
    fetchUsers()
  }, [])

  console.log(users);

  return (
    <div style={{
      paddingInline: '20px',
      paddingBlock: '10px',
      height: '100%'
    }}>
      <header style={{
        display: 'flex',
        height: '36px'
      }}>
        <Link style={{
          display: 'flex',
          height: '100%',
          aspectRatio: '1 / 1',
          padding: '.5rem'
        }}
          to='..'
        >
          <FiArrowLeft style={{
            height: '100%',
            width: '100%',
            color: 'white'
          }} />
        </Link>
        <SearchBar onChange={fetchUsers} placeholder='search users' />
      </header>
      {/* users list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        paddingBlock: '1rem',
        gap: '1rem',
        height: '100%'
      }}>
        {!users && <Loading />}
        {users && users.map(user => <Link to={`/users/${user.uid}`} style={{ textDecoration: 'none' }}><User user={user} /></Link>)}
      </div>
    </div>
  )
}
