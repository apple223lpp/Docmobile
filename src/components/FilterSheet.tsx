import { motion, AnimatePresence } from 'framer-motion'
import type { DocType } from '../types/document'
import DocIcon from '../icons/DocIcon'
import TableIcon from '../icons/TableIcon'

export interface FilterState {
  type: DocType | null
  proprietor: 'all' | 'my' | 'others'
  sort: 'viewed' | 'edited'
}

interface FilterSheetProps {
  visible: boolean
  filter: FilterState
  onChange: (filter: FilterState) => void
  onClose: () => void
  onConfirm: () => void
}

function Chip({
  selected,
  onClick,
  children,
  wide,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`flex gap-[4px] items-center justify-center py-[10px] px-[20px] rounded-[6px]
        text-[14px] font-medium transition-colors
        ${wide ? 'flex-1' : ''}
        ${selected
          ? 'bg-[#703EFF]/10 text-[#703EFF] border border-[#703EFF]/30'
          : 'bg-white text-[#1a1a1a]'
        }`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const sheetVariants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
  exit: { y: '100%', transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
}

export default function FilterSheet({
  visible,
  filter,
  onChange,
  onClose,
  onConfirm,
}: FilterSheetProps) {
  const setType = (t: DocType | null) => onChange({ ...filter, type: filter.type === t ? null : t })
  const setProprietor = (p: FilterState['proprietor']) => onChange({ ...filter, proprietor: p })
  const setSort = (s: FilterState['sort']) => onChange({ ...filter, sort: s })

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />

          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-0 left-0 right-0 px-[8px] pb-[8px]"
          >
            <div
              className="rounded-[34px] border border-white overflow-hidden
                shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]"
              style={{
                backgroundColor: 'rgba(247,247,247,0.8)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex flex-col gap-[20px] px-[20px] pb-[36px]">
                {/* Header */}
                <div className="flex items-center justify-between h-[48px] pt-[16px] pb-[14px]
                  border-b border-[#e0e0e0]">
                  <div className="flex-1 flex items-center justify-center">
                    <span className="text-[16px] font-semibold text-[#1a1a1a]">Filter</span>
                  </div>
                  <button
                    className="absolute right-[28px] size-[20px] flex items-center justify-center
                      active:opacity-50 transition-opacity p-[5px]"
                    onClick={onClose}
                  >
                    <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
                      <path d="M1 1l8 8M9 1l-8 8" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[16px] font-medium text-[#1a1a1a]">Type</p>
                  <div className="flex gap-[8px]">
                    <Chip
                      selected={filter.type === 'doc'}
                      onClick={() => setType('doc')}
                      wide
                    >
                      <DocIcon size={20} />
                      <span>Document</span>
                    </Chip>
                    <Chip
                      selected={filter.type === 'table'}
                      onClick={() => setType('table')}
                      wide
                    >
                      <TableIcon size={20} />
                      <span>Table</span>
                    </Chip>
                  </div>
                </div>

                {/* Proprietor */}
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[16px] font-medium text-[#1a1a1a]">Proprietor</p>
                  <div className="flex gap-[8px]">
                    <Chip selected={filter.proprietor === 'all'} onClick={() => setProprietor('all')} wide>
                      All
                    </Chip>
                    <Chip selected={filter.proprietor === 'my'} onClick={() => setProprietor('my')} wide>
                      Creations
                    </Chip>
                    <Chip selected={filter.proprietor === 'others'} onClick={() => setProprietor('others')} wide>
                      Others
                    </Chip>
                  </div>
                </div>

                {/* Sort */}
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[16px] font-medium text-[#1a1a1a]">Sort</p>
                  <div className="flex gap-[8px]">
                    <Chip selected={filter.sort === 'viewed'} onClick={() => setSort('viewed')}>
                      Recently Viewed
                    </Chip>
                    <Chip selected={filter.sort === 'edited'} onClick={() => setSort('edited')}>
                      Recently Edited
                    </Chip>
                  </div>
                </div>

                {/* Confirm */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-[48px] rounded-full bg-black/[0.06]
                    flex items-center justify-center
                    text-[17px] font-semibold text-[#703EFF]
                    active:bg-black/10 transition-colors"
                  onClick={onConfirm}
                >
                  Confirm
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
