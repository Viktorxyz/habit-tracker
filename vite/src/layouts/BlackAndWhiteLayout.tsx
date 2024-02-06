import { ReactNode } from 'react';

export default function BlackAndWhiteLayout({ title, children }: { title: string | ReactNode, children: ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%',
      width: '100%',
      flexDirection: 'column',
      backgroundColor: 'white',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        flex: '1',
      }}>
        <h1>{title}</h1>
      </div>
      <div style={{
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
        backgroundColor: 'black',
        height: '75%',
      }}>
        {children}
      </div>
    </div >
  )
}
