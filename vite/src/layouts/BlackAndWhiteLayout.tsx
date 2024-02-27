export function White({ children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flex: '1',
    }}>
      {children}
    </div>
  )
}

export function Black({ children }) {
  return (
    <div style={{
      borderTopLeftRadius: '32px',
      borderTopRightRadius: '32px',
      backgroundColor: 'black',
      height: '75%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {children}
    </div>
  )
}

export default function BlackAndWhiteLayout({ children }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%',
      width: '100%',
      flexDirection: 'column',
      backgroundColor: 'white',
    }}>
      {children}
    </div >
  )
}
