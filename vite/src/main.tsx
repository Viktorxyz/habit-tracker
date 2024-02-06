import 'normalize.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'

import SignUp from './routes/SignUp'
import SignIn from './routes/SignIn'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Root from './routes/Root'
import PhoneLayout from './layouts/PhoneLayout'
import Habit from './routes/Habit'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route element={<PhoneLayout />}>
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Root />} />
          <Route path='/habit/:id' element={<Habit />} />
          {/* <Route path='/habit/new' element={<NewHabit /> */}
          {/* <Route path='/settings' element={<Settings />} /> */}
        </Route>
        <Route path='sign-up' element={<SignUp />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)