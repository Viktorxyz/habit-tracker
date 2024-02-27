import { motion } from 'framer-motion'

export default function InputText({ onChange, placeholder, ...props }: { onChange: (e: string) => void | undefined, placeholder: string }) {
  return (
    <label style={{
      width: '100%',
    }}>
      <span style={{
        color: 'white',
        fontSize: '1rem'
      }}>
        {placeholder}
      </span>
      <motion.input
        {...props}
        onChange={(e) => { onChange(e.target.value) }}
        style={{
          width: '100%',
          height: '48px',
          outline: 'none',
          backgroundColor: '#1D1D1D',
          color: 'white',
          paddingInline: '1rem',
          borderRadius: '8px',
          borderColor: '#1d1d1d',
          borderStyle: 'solid',
          borderWidth: '1.5px'
        }}
        whileFocus={{ borderColor: '#ffffff' }}
        transition={{ delay: 0, duration: .25, type: 'spring' }}
      />
    </label>
  )
}
