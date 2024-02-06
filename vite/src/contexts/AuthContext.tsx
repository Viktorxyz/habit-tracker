import { auth } from '../firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as signOutUser,
} from 'firebase/auth'

import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '../components/Loading'

const AuthContext = createContext(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider() {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const signOut = async () => {
    await signOutUser(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) return <Loading />

  const value = {
    currentUser,
    signIn,
    signUp,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  )
}
