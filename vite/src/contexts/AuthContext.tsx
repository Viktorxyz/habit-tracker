import { auth } from '../firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as signOutUser,
  updateProfile
} from 'firebase/auth'

import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
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

  const signUp = async (username: string, email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, {
      displayName: username
    })
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

  const value = {
    currentUser,
    signIn,
    signUp,
    signOut
  }

  if (loading) return <Loading />

  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  )
}
