import { useAuth } from '../contexts/AuthContext'

export default function Settings() {
  const { signOut } = useAuth()

  return (
    <div>
      <button style={{
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: '32px',
        outline: 'none',
        border: 'none',
      }} onClick={signOut}>Sign Out</button>
    </div>
  )
}
