import './style.css'

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <span className='loader'></span>
    </div>
  )
}
