import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function ProtectedRoutes() {
  const { currentUser } = useAuth()

  if (currentUser) return <Outlet />
  else return <Navigate to='sign-up' />

}
