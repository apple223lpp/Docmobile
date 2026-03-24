import { motion } from 'framer-motion'
import PlusIcon from '../icons/PlusIcon'

interface FloatingButtonProps {
  onClick?: () => void
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="fixed right-[20px] bottom-[76px] size-[52px] rounded-full
        bg-[#703EFF] flex items-center justify-center
        shadow-[0px_4px_20px_rgba(112,62,255,0.35)]
        z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      onClick={onClick}
    >
      <PlusIcon size={24} color="#ffffff" />
    </motion.button>
  )
}
