import { useState } from 'react';
import InputText from '../components/InputText';
import BlackAndWhiteLayout, { Black, White } from '../layouts/BlackAndWhiteLayout';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function SignUp() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("password")

  const handleSubmit = () => {
    signIn(email, password)
  }

  return (
    <BlackAndWhiteLayout>
      <White>
        <h1>Hi!</h1>
      </White>
      <Black>
        <div className='list' style={{
          gap: '20px',
          justifyContent: 'center',
          paddingInline: '20px',
          height: '100%',
        }}>
          <InputText onChange={setEmail} placeholder='email' />
          <InputText onChange={setPassword} placeholder='password' type='password' />
        </div>
        <div style={{
          display: 'flex',
          height: '64px'
        }}>
          <Link to='/sign-up' style={{
            color: 'white',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none'
          }}>Sign Up</Link>
          <button style={{
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: '32px',
            outline: 'none',
            border: 'none',
          }} onClick={handleSubmit}>Sign In</button>
        </div>
      </Black>
    </BlackAndWhiteLayout >
  )
}