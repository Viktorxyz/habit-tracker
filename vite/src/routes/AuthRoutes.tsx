import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AuthRoutes() {
  const { currentUser } = useAuth()

  if (currentUser) return <Navigate to='/' />
  return <Outlet />
}
