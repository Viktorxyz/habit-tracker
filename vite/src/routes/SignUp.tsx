import { useState } from 'react';
import InputText from '../components/InputText';
import BlackAndWhiteLayout from '../layouts/BlackAndWhiteLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function SignUp() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("username")
  const [password, setPassword] = useState("password")

  const handleSubmit = () => {
    try {
      signUp(email, password)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <BlackAndWhiteLayout title="Hello">
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
          <InputText onChange={setEmail} placeholder='email' />
          <InputText onChange={setUsername} placeholder='username' />
          <InputText onChange={setPassword} placeholder='password' />
        </div>
        <div style={{
          display: 'flex',
          height: '64px'
        }}>
          <Link to='/sign-in' style={{
            color: 'white',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none'
          }}>Sign In</Link>
          <button style={{
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: '32px',
            outline: 'none',
            border: 'none',
          }} onClick={handleSubmit}>Sign Up</button>
        </div>
      </div>
    </BlackAndWhiteLayout>
  )
}
