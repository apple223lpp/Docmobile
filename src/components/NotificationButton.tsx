import { motion } from 'framer-motion'
import NotificationIcon from '../icons/NotificationIcon'

interface NotificationButtonProps {
  onClick?: () => void
}

export default function NotificationButton({ onClick }: NotificationButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="flex items-center justify-center size-[44px] rounded-full
        backdrop-blur-[3px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]
        bg-white/80 shrink-0"
      onClick={onClick}
    >
      <NotificationIcon size={20} color="#1a1a1a" />
    </motion.button>
  )
}
