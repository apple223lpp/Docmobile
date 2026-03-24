import { motion, AnimatePresence } from 'framer-motion'
import Checkbox from './Checkbox'

interface SelectionBarProps {
  visible: boolean
  allSelected: boolean
  selectedCount: number
  onSelectAll: () => void
  onDelete: () => void
}

export default function SelectionBar({
  visible,
  allSelected,
  selectedCount,
  onSelectAll,
  onDelete,
}: SelectionBarProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-start justify-between
            px-[16px] pt-[16px] pb-[26px]"
          style={{ paddingBottom: 'max(26px, env(safe-area-inset-bottom, 26px))' }}
        >
          {/* Select All pill */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="flex items-center gap-[10px] p-[10px] rounded-full
              bg-white/50 backdrop-blur-[3px] border border-white
              shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]"
            onClick={onSelectAll}
          >
            <Checkbox selected={allSelected} onChange={onSelectAll} />
            <span className="text-[15px] font-semibold text-[#1a1a1a] pr-[2px]">
              {selectedCount > 0 ? `Selected ${selectedCount}` : 'Select All'}
            </span>
          </motion.button>

          {/* Delete pill */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="flex items-center justify-center p-[10px] rounded-full
              bg-white/50 backdrop-blur-[3px] border border-white
              shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]"
            style={{ opacity: selectedCount > 0 ? 1 : 0.4 }}
            onClick={onDelete}
            disabled={selectedCount === 0}
          >
            <div className="size-[24px] flex items-center justify-center">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <path d="M7 4h10M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 7h14l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7z" fill="#FF3B3B" fillOpacity="0.15" />
                <path d="M5 7h14l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7z" stroke="#FF3B3B" strokeWidth="1.4" />
                <path d="M10 11v6M14 11v6" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
