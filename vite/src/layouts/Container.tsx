import { Outlet } from 'react-router-dom';

export default function Container() {
  return (
    <div style={{
      position: 'relative',
      backgroundColor: 'black',
      height: '100%',
      overflow: 'hidden'
    }}>
      <Outlet />
    </div>
  )
}
