import { motion } from 'framer-motion'
import DocumentsIcon from '../icons/DocumentsIcon'
import ShareIcon from '../icons/ShareIcon'
import FavoritesIcon from '../icons/FavoritesIcon'
import RecyclingIcon from '../icons/RecyclingIcon'

interface QuickAccessItemProps {
  icon: React.ReactNode
  label: string
  bgColor: string
  onTap?: () => void
}

function QuickAccessItem({ icon, label, bgColor, onTap }: QuickAccessItemProps) {
  return (
    <button
      className="flex flex-col items-center justify-center gap-[6px] w-[70px]"
      onClick={onTap}
    >
      <motion.div
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="flex items-center justify-center size-[46px] rounded-[8px]"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </motion.div>
      <span className="text-[14px] font-medium text-[#1a1a1a] text-center whitespace-nowrap">
        {label}
      </span>
    </button>
  )
}

interface QuickAccessProps {
  onNavigate?: (target: string) => void
}

export default function QuickAccess({ onNavigate }: QuickAccessProps) {
  const items = [
    { icon: <DocumentsIcon size={28} />, label: 'Documents', bgColor: '#e6f1ff', target: 'documents' },
    { icon: <ShareIcon size={28} />, label: 'Share', bgColor: '#ffecdf', target: 'share' },
    { icon: <FavoritesIcon size={24} />, label: 'Favorites', bgColor: '#fdf9dc', target: 'favorites' },
    { icon: <RecyclingIcon size={24} />, label: 'Recycling', bgColor: '#f1eeff', target: 'recycling' },
  ]

  return (
    <div className="flex items-center justify-evenly py-[16px] bg-white rounded-[20px] w-full">
      {items.map((item) => (
        <QuickAccessItem
          key={item.target}
          icon={item.icon}
          label={item.label}
          bgColor={item.bgColor}
          onTap={() => onNavigate?.(item.target)}
        />
      ))}
    </div>
  )
}
