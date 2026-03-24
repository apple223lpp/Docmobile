import { useRef, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  type PanInfo,
} from 'framer-motion'
import type { DocumentItem as DocItemType } from '../types/document'
import DocIcon from '../icons/DocIcon'
import TableIcon from '../icons/TableIcon'
import FileIcon from '../icons/FileIcon'
import MoreIcon from '../icons/MoreIcon'
import Checkbox from './Checkbox'

const ACTION_BTN = 48
const ACTION_GAP = 16
const ACTION_COUNT = 4
const TOTAL_ACTION_WIDTH = ACTION_BTN * ACTION_COUNT + ACTION_GAP * (ACTION_COUNT - 1) + 12

const iconMap = {
  doc: DocIcon,
  table: TableIcon,
  file: FileIcon,
}

interface DocumentItemProps {
  item: DocItemType
  mode?: 'normal' | 'select'
  isOpen: boolean
  selected?: boolean
  onSwipeOpen: (id: string) => void
  onSwipeClose: () => void
  onMore: (item: DocItemType) => void
  onDelete: (item: DocItemType) => void
  onFavorite?: (item: DocItemType) => void
  onShare?: (item: DocItemType) => void
  onTap: (item: DocItemType) => void
  onSelect?: (item: DocItemType) => void
  onLongPress?: (item: DocItemType) => void
  isLast?: boolean
}

function SwipeActionButton({
  bg,
  onClick,
  children,
}: {
  bg: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="shrink-0 size-[48px] rounded-full flex items-center justify-center"
      style={{ backgroundColor: bg }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {children}
    </motion.button>
  )
}

export default function DocumentItem({
  item,
  mode = 'normal',
  isOpen,
  selected = false,
  onSwipeOpen,
  onSwipeClose,
  onMore,
  onDelete,
  onFavorite,
  onShare,
  onTap,
  onSelect,
  onLongPress,
  isLast = false,
}: DocumentItemProps) {
  const controls = useAnimation()
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didLongPress = useRef(false)

  const actionsOpacity = useTransform(x, [-TOTAL_ACTION_WIDTH, -60, 0], [1, 0.4, 0])
  const moreButtonOpacity = useTransform(x, [-80, -30, 0], [0, 0.3, 1])

  useEffect(() => {
    if (!isOpen) {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } })
    }
  }, [isOpen, controls])

  useEffect(() => {
    if (mode === 'select' && isOpen) {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } })
    }
  }, [mode, isOpen, controls])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (mode === 'select') return
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset < -60 || velocity < -500) {
      controls.start({
        x: -TOTAL_ACTION_WIDTH,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      })
      onSwipeOpen(item.id)
    } else {
      controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      })
      onSwipeClose()
    }
  }

  const Icon = iconMap[item.type]

  const isSelectMode = mode === 'select'

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Swipe action buttons (normal mode only) */}
      {!isSelectMode && (
        <motion.div
          style={{ opacity: actionsOpacity }}
          className="absolute right-0 top-0 bottom-0 flex items-center gap-[16px] pr-[12px]"
        >
          {/* More — #CCCCCC */}
          <SwipeActionButton bg="#CCCCCC" onClick={() => onMore(item)}>
            <svg width={25} height={25} viewBox="0 0 25 25" fill="none">
              <path d="M5.19564 13.8913C6.13212 13.8913 6.89128 13.1321 6.89128 12.1956C6.89128 11.2592 6.13212 10.5 5.19564 10.5C4.25916 10.5 3.5 11.2592 3.5 12.1956C3.5 13.1321 4.25916 13.8913 5.19564 13.8913Z" fill="white" />
              <path d="M12.5003 13.8913C13.4368 13.8913 14.196 13.1321 14.196 12.1956C14.196 11.2592 13.4368 10.5 12.5003 10.5C11.5639 10.5 10.8047 11.2592 10.8047 12.1956C10.8047 13.1321 11.5639 13.8913 12.5003 13.8913Z" fill="white" />
              <path d="M20.1956 13.8913C21.1321 13.8913 21.8913 13.1321 21.8913 12.1956C21.8913 11.2592 21.1321 10.5 20.1956 10.5C19.2592 10.5 18.5 11.2592 18.5 12.1956C18.5 13.1321 19.2592 13.8913 20.1956 13.8913Z" fill="white" />
            </svg>
          </SwipeActionButton>
          {/* Favorites — #FF9D00 */}
          <SwipeActionButton bg="#FF9D00" onClick={() => onFavorite?.(item)}>
            <svg width={24} height={24} viewBox="10 10 28 28" fill="none">
              <path d="M20.5855 20.236L23.184 15.0039C23.2596 14.8525 23.3759 14.7252 23.5199 14.6362C23.6639 14.5471 23.8298 14.5 23.9991 14.5C24.1684 14.5 24.3343 14.5471 24.4783 14.6362C24.6223 14.7252 24.7386 14.8525 24.8142 15.0039L27.4127 20.236L33.2218 21.08C33.3893 21.1032 33.547 21.173 33.6767 21.2816C33.8064 21.3901 33.9031 21.5329 33.9555 21.6937C34.008 21.8545 34.0142 22.0268 33.9734 22.1909C33.9326 22.355 33.8465 22.5044 33.7248 22.622L29.5221 26.692L30.5143 32.442C30.6413 33.18 29.8611 33.742 29.194 33.394L23.9991 30.678L18.8032 33.394C18.137 33.743 17.3569 33.18 17.4839 32.441L18.4761 26.691L14.2734 22.621C14.1523 22.5033 14.0667 22.3541 14.0263 22.1903C13.9858 22.0264 13.9922 21.8545 14.0446 21.6941C14.097 21.5337 14.1934 21.3912 14.3227 21.2828C14.4521 21.1744 14.6093 21.1045 14.7764 21.081L20.5855 20.236Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </SwipeActionButton>
          {/* Share/Forward — #2F65E2 */}
          <SwipeActionButton bg="#2F65E2" onClick={() => onShare?.(item)}>
            <svg width={24} height={24} viewBox="10 10 28 28" fill="none">
              <path d="M25.1879 16.663C25.1879 16.028 25.9556 15.71 26.4046 16.159L33.5786 23.3329C33.8625 23.6169 33.8559 24.0793 33.564 24.3551L26.39 31.1305C25.9355 31.5597 25.1879 31.2375 25.1879 30.6123V27.534C25.1879 27.1404 24.8678 26.819 24.4749 26.8433C17.961 27.2472 13.9029 33.0577 13.9029 33.0577C13.9029 24.9171 17.5165 20.6681 24.4749 20.4003C24.8683 20.3852 25.1879 20.0677 25.1879 19.6741V16.663Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </SwipeActionButton>
          {/* Delete — #FF3B3B */}
          <SwipeActionButton bg="#FF3B3B" onClick={() => onDelete(item)}>
            <svg width={20} height={20} viewBox="-0.2 -0.2 20 20" fill="none">
              <path d="M7.8 8.74995V13.75" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.8 8.74995V13.75" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.31428 4.3V2.55C6.31428 2.08587 6.49866 1.64075 6.82685 1.31256C7.15503 0.984374 7.60015 0.8 8.06428 0.8H11.5643C12.0284 0.8 12.4735 0.984374 12.8017 1.31256C13.1299 1.64075 13.3143 2.08587 13.3143 2.55V4.3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.8 4.55H16.8V15.55C16.8 17.2069 15.4569 18.55 13.8 18.55H5.8C4.14315 18.55 2.8 17.2069 2.8 15.55V4.55Z" stroke="white" strokeWidth="1.6" />
              <path d="M0.8 4.55H18.8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </SwipeActionButton>
        </motion.div>
      )}

      {/* Swipeable / static content */}
      <motion.div
        drag={isSelectMode ? false : 'x'}
        dragDirectionLock
        dragConstraints={{ left: -TOTAL_ACTION_WIDTH, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={isSelectMode ? undefined : { x }}
        className={`relative ${isSelectMode ? '' : 'bg-white'}`}
      >
        <div
          className="flex flex-col gap-[12px] items-start justify-center pt-[12px] w-full"
          onTouchStart={() => {
            if (isSelectMode) return
            didLongPress.current = false
            longPressTimer.current = setTimeout(() => {
              didLongPress.current = true
              onLongPress?.(item)
            }, 500)
          }}
          onTouchEnd={() => {
            if (longPressTimer.current) clearTimeout(longPressTimer.current)
          }}
          onTouchMove={() => {
            if (longPressTimer.current) clearTimeout(longPressTimer.current)
          }}
          onMouseDown={() => {
            if (isSelectMode) return
            didLongPress.current = false
            longPressTimer.current = setTimeout(() => {
              didLongPress.current = true
              onLongPress?.(item)
            }, 500)
          }}
          onMouseUp={() => {
            if (longPressTimer.current) clearTimeout(longPressTimer.current)
          }}
          onMouseLeave={() => {
            if (longPressTimer.current) clearTimeout(longPressTimer.current)
          }}
          onClick={() => {
            if (didLongPress.current) return
            if (isSelectMode) {
              onSelect?.(item)
            } else if (x.get() === 0) {
              onTap(item)
            }
          }}
        >
          <div className="flex gap-[12px] items-center px-[12px] w-full">
            {/* Checkbox (select mode) */}
            {isSelectMode && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 20, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Checkbox
                  selected={selected}
                  onChange={() => onSelect?.(item)}
                />
              </motion.div>
            )}

            <div className="shrink-0 size-[32px]">
              <Icon size={32} />
            </div>
            <div className="flex items-center justify-between flex-1 pr-[4px]">
              <div className="flex flex-col gap-[1px] min-w-0">
                <p className="text-[16px] font-medium text-[#1a1a1a] leading-normal truncate">
                  {item.name}
                </p>
                <p className="text-[12px] font-normal text-[#808080] leading-normal">
                  {item.lastViewed}
                </p>
              </div>
              <motion.button
                style={{ opacity: isSelectMode ? 1 : moreButtonOpacity }}
                className="shrink-0 size-[24px] flex items-center justify-center
                  active:opacity-50 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  onMore(item)
                }}
              >
                <MoreIcon size={24} color="#a3a3a3" />
              </motion.button>
            </div>
          </div>

          {!isLast && (
            <div
              className="h-px w-full bg-[#f2f2f2]"
              style={{ marginLeft: isSelectMode ? 76 : 56 }}
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}
