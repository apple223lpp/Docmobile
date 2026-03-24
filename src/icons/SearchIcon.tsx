export default function SearchIcon({ size = 20, color = '#a3a3a3' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="6.5" stroke={color} strokeWidth="1.8" />
      <path d="M13.5 13.5L17 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
