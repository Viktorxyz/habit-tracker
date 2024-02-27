import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Guesture({ children, defaultActive = false }) {
  const [active, setActive] = useState(false)

  const ref = useRef()

  const height = useMemo(() => ref?.current?.clientHeight || 0, [active])

  const toggleActive = useCallback(() => {
    setActive(!active)
  }, [active])

  const variants = useMemo(() => ({
    inactive: { top: "-32px", backgroundColor: "#000000" },
    active: { top: `-${height}px`, backgroundColor: "#ffffff" }
  }), [height])

  const barVariants = useMemo(() => ({
    inactive: { backgroundColor: "#ffffff" },
    active: { backgroundColor: "#000000" },
    base: { backgroundColor: '#3d3d3d' }
  }), [])

  useEffect(() => {
    if (defaultActive) setActive(defaultActive)
  }, [])

  return (
    // container
    <motion.div style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      borderTopLeftRadius: '32px',
      borderTopRightRadius: '32px'
    }}
      ref={ref}
      animate={(active ? 'active' : 'inactive')}
      variants={variants}
      transition={{ ease: 'easeOut', duration: .2 }}
      onClick={toggleActive}
    >
      {/* bar container */}
      <div style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '32px'
      }}>
        {/* bar */}
        <motion.div style={{
          display: 'block',
          width: '55%',
          height: '8px',
          borderRadius: '100vw'
        }}
          animate={'base'}
          whileTap={active ? 'active' : 'inactive'}
          whileFocus={active ? 'active' : 'inactive'}
          variants={barVariants}
        ></motion.div>
      </div>
      {children}
    </motion.div>
  )
}