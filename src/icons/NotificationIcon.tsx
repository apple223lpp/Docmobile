export default function NotificationIcon({ size = 20, color = '#1a1a1a' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2a5 5 0 00-5 5v3l-1.3 2.6a.6.6 0 00.5.9h11.6a.6.6 0 00.5-.9L15 10V7a5 5 0 00-5-5z" stroke={color} strokeWidth="1.5" />
      <path d="M8 15a2 2 0 004 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
