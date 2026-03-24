import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchIcon from '../icons/SearchIcon'

type SearchType = 'search' | 'message'

interface SearchProps {
  type?: SearchType
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onClear?: () => void
}

const glassStyle =
  'backdrop-blur-[3px] bg-white/50 border border-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.02)]'
const filledStyle = 'bg-black/5'

export default function Search({
  type = 'search',
  value: controlledValue,
  placeholder = 'Search',
  onChange,
  onFocus,
  onBlur,
  onClear,
}: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [internalValue, setInternalValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [pendingFocus, setPendingFocus] = useState(false)

  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue
  const isActive = focused || currentValue.length > 0

  useEffect(() => {
    if (pendingFocus && inputRef.current) {
      // Use setTimeout to avoid synchronous setState warning
      const timer = setTimeout(() => {
        inputRef.current?.focus()
        setPendingFocus(false)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [pendingFocus])

  const activate = useCallback(() => {
    if (!isActive) {
      setFocused(true)
      setPendingFocus(true)
      onFocus?.()
    } else {
      inputRef.current?.focus()
    }
  }, [isActive, onFocus])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      if (!isControlled) setInternalValue(v)
      onChange?.(v)
    },
    [isControlled, onChange],
  )

  const handleClear = useCallback(() => {
    if (!isControlled) setInternalValue('')
    onChange?.('')
    onClear?.()
    inputRef.current?.focus()
  }, [isControlled, onChange, onClear])

  const handleFocus = useCallback(() => {
    setFocused(true)
    onFocus?.()
  }, [onFocus])

  const handleBlur = useCallback(() => {
    setFocused(false)
    onBlur?.()
  }, [onBlur])

  const baseStyle = type === 'message' && !isActive ? filledStyle : glassStyle
  const paddingStyle =
    type === 'message' && !isActive
      ? 'gap-[6px] pl-[16px] pr-[16px]'
      : 'gap-[8px] px-[16px] py-[10px]'

  return (
    <div
      className={`flex h-[44px] items-center rounded-full w-full relative ${baseStyle} ${paddingStyle} ${
        isActive ? 'justify-between' : ''
      }`}
      onClick={activate}
    >
      <div className="flex items-center gap-[8px] flex-1 min-w-0">
        <SearchIcon
          size={20}
          color={isActive ? '#1a1a1a' : '#a3a3a3'}
        />
        {isActive ? (
          <input
            ref={inputRef}
            type="text"
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="flex-1 min-w-0 text-[16px] font-medium text-[#1a1a1a] bg-transparent
              outline-none placeholder:text-[#a3a3a3] caret-[#703EFF]"
            placeholder={placeholder}
          />
        ) : (
          <span className="text-[16px] font-medium text-[#a3a3a3] whitespace-nowrap">
            {placeholder}
          </span>
        )}
      </div>

      <AnimatePresence>
        {isActive && currentValue.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            className="shrink-0 size-[24px] flex items-center justify-center rounded-full
              bg-black/10 active:bg-black/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              handleClear()
            }}
          >
            <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <path
                d="M3 3L9 9M9 3L3 9"
                stroke="#808080"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
