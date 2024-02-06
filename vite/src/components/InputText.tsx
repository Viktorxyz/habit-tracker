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
      <input
        {...props}
        onChange={(e) => { onChange(e.target.value) }}
        style={{
          width: '100%',
          height: '48px',
          outline: 'none',
          border: 'none',
          backgroundColor: '#1D1D1D',
          color: 'white',
          borderRadius: '8px',
          paddingInline: '1rem',
        }}
      />
    </label>
  )
}
