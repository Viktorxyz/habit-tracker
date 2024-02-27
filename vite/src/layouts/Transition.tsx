import { motion } from 'framer-motion'

const variants = {
  right: { x: '100vw' },
  left: { x: '-100vw' },
  top: { y: '100vh' },
  bottom: { y: '-100vh' },
  blur: {
    filter: 'blur(4px)',
    opacity: '0'
  }
}

export default function Transition({ children, enter, exit }) {
  return (
    <motion.div
      initial={enter}
      animate={{ x: '0', y: '0' }}
      exit={exit}
      transition={{ duration: .25, type: 'spring', delay: 0 }}
      variants={variants}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </motion.div>
  )
}
