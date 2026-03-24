import { motion } from 'framer-motion'

interface CheckboxProps {
  selected: boolean
  onChange?: () => void
  size?: number
}

export default function Checkbox({ selected, onChange, size = 20 }: CheckboxProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      className="shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
      onClick={(e) => {
        e.stopPropagation()
        onChange?.()
      }}
    >
      <motion.div
        animate={{
          backgroundColor: selected ? '#703EFF' : 'transparent',
          borderColor: selected ? '#703EFF' : '#CCCCCC',
        }}
        transition={{ duration: 0.15 }}
        className="rounded-full flex items-center justify-center border-[1.2px] border-solid"
        style={{ width: size, height: size }}
      >
        <motion.svg
          width={size * 0.45}
          height={size * 0.3}
          viewBox="0 0 9 6"
          fill="none"
          initial={false}
          animate={{ opacity: selected ? 1 : 0, scale: selected ? 1 : 0.5 }}
          transition={{ duration: 0.15 }}
        >
          <path
            d="M1 3L3.5 5.5L8 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </motion.button>
  )
}
