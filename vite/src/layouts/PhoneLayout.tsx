import { Outlet } from 'react-router-dom'

export default function PhoneLayout() {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      width: '360px',
      height: '780px',
      marginInline: 'auto',
    }}>
      <Outlet />
    </div>
  )
}
