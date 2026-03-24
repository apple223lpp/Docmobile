import { motion, AnimatePresence, type PanInfo } from 'framer-motion'

export interface ActionSheetOption {
  label: string
  icon?: React.ReactNode
  danger?: boolean
  onTap: () => void
}

interface ActionSheetProps {
  visible: boolean
  title?: string
  options: ActionSheetOption[]
  onClose: () => void
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const sheetVariants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: {
    y: '100%',
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
}

export default function ActionSheet({ visible, title, options, onClose }: ActionSheetProps) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 80 || info.velocity.y > 300) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[100]">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute bottom-0 left-0 right-0 bg-[#f7f7f7] rounded-t-[14px]
              pb-[env(safe-area-inset-bottom,20px)]"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-[8px] pb-[4px]">
              <div className="w-[36px] h-[5px] rounded-full bg-[#e0e0e0]" />
            </div>

            {title && (
              <div className="px-[16px] py-[10px]">
                <p className="text-[13px] font-normal text-[#808080] text-center">{title}</p>
              </div>
            )}

            {/* Options */}
            <div className="mx-[8px] bg-white rounded-[14px] overflow-hidden">
              {options.map((option, i) => (
                <motion.button
                  key={i}
                  whileTap={{ backgroundColor: '#f2f2f2' }}
                  className="w-full h-[56px] flex items-center justify-center
                    text-[17px] font-normal transition-colors
                    active:bg-[#f2f2f2]"
                  style={{ color: option.danger ? '#FF3B3B' : '#007AFF' }}
                  onClick={() => {
                    option.onTap()
                    onClose()
                  }}
                >
                  {option.icon && <span className="mr-[8px]">{option.icon}</span>}
                  {option.label}
                </motion.button>
              ))}
            </div>

            {/* Cancel */}
            <div className="mx-[8px] mt-[8px]">
              <motion.button
                whileTap={{ backgroundColor: '#f2f2f2' }}
                className="w-full h-[56px] bg-white rounded-[14px] flex items-center justify-center
                  text-[17px] font-semibold text-[#007AFF]
                  active:bg-[#f2f2f2] transition-colors"
                onClick={onClose}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
