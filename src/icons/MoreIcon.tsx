export default function MoreIcon({ size = 24, color = '#a3a3a3' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="6" r="1.5" fill={color} />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <circle cx="12" cy="18" r="1.5" fill={color} />
    </svg>
  )
}
