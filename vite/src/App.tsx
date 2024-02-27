import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './contexts/AuthContext'
import { HabitProvider } from './contexts/HabitProvider'

import SignUp from './routes/SignUp'
import SignIn from './routes/SignIn'
import ProtectedRoutes from './routes/ProtectedRoutes'
import HabitRoute from './routes/HabitRoute'
import Calendar from './routes/CalendarRoute'
import Settings from './routes/Settings'
import Habits from './routes/Habits'
import AuthRoutes from './routes/AuthRoutes'
import HabitColor from './routes/HabitColor'
import HabitIcon from './routes/HabitIcon'
import Profile from './routes/Profile'
import Users from './routes/Users'

import Container from './layouts/Container'

export default function App() {
  const location = useLocation()
  const locationArr = location.pathname?.split('/') ?? [];

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={locationArr[1]}>
        <Route element={<AuthProvider />}>
          <Route element={<Container />} >
            <Route path='/' element={<ProtectedRoutes />}>
              <Route index element={<Habits />} />
              <Route path='habit/:id' element={<HabitProvider />}>
                <Route index element={<HabitRoute />} />
                <Route path='icon' element={<HabitIcon />} />
                <Route path='color' element={<HabitColor />} />
                <Route path='calendar' element={<Calendar />} />
              </Route>
              <Route path='profile' element={<Profile />} />
              <Route path='settings' element={<Settings />} />
              <Route path='users' element={<Users />} />
              {/* <Route path='users/:id' element={<User />} /> */}
            </Route>
            <Route element={<AuthRoutes />}>
              <Route path='sign-up' element={<SignUp />} />
              <Route path='sign-in' element={<SignIn />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
