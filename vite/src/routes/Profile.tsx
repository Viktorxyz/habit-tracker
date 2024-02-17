import { Link } from 'react-router-dom';
import BlackAndWhiteLayout, { Black, White } from '../layouts/BlackAndWhiteLayout';
import { FiCamera } from 'react-icons/fi';
import { useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { currentUser } = useAuth()
  console.log(currentUser)

  const edit = useCallback(() => {
    console.log('edit');
  }, [])

  return (
    <BlackAndWhiteLayout>
      <White></White>
      <Black>
        {/* Profile picture */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'relative'
        }}>
          <div style={{
            width: '50%',
            aspectRatio: '1 / 1',
            borderRadius: '100vw',
            border: '2px solid #000000',
            backgroundColor: '#ffffff',
            position: 'relative',
            top: '-50%'
          }}>
          </div>
        </div>
        {/* User info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          color: '#ffffff',
        }}>
          <h2>{currentUser.displayName || "Your Username"}</h2>
          <h3 style={{ color: '#7e7e7e' }}>{currentUser.email}</h3>
        </div>
        {/* buttons */}
        <div style={{
          display: 'flex',
          minHeight: '64px'
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
          }} onClick={edit}>Edit Profile</button>
        </div>
      </Black>
    </BlackAndWhiteLayout>
  )
}
