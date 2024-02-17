import 'normalize.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'
import { HabitProvider } from './contexts/HabitProvider'

import SignUp from './routes/SignUp'
import SignIn from './routes/SignIn'
import ProtectedRoutes from './routes/ProtectedRoutes'
import HabitRoute from './routes/HabitRoute'
import Calendar from './routes/Calendar'
import Settings from './routes/Settings'
import Habits from './routes/Habits'
import AuthRoutes from './routes/AuthRoutes'
import HabitColor from './routes/HabitColor'
import HabitIcon from './routes/HabitIcon'
import Container from './layouts/Container'
import Profile from './routes/Profile'

const router = createBrowserRouter(
  createRoutesFromElements(
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
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path='sign-up' element={<SignUp />} />
          <Route path='sign-in' element={<SignIn />} />
        </Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)