import { Outlet } from 'react-router-dom';

export default function Container() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      overflow: 'hidden'
    }}>
      <Outlet />
    </div>
  )
}
