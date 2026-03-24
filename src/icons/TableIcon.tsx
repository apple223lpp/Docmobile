export default function TableIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body — #08CB36 */}
      <g transform="translate(4, 3)">
        <path fillRule="evenodd" clipRule="evenodd" d="M21.3333 0H2.66667C1.2 0 0 1.15 0 2.55556V20.4444C0 21.85 1.2 23 2.66667 23H21.3333C22.8 23 24 21.85 24 20.4444V2.55556C24 1.15 22.8 0 21.3333 0Z" fill="#08CB36" />
      </g>
      {/* Bottom — #34B85D */}
      <g transform="translate(4, 21)">
        <path fillRule="evenodd" clipRule="evenodd" d="M21.3333 0H2.66667C1.2 0 0 1.2 0 2.66667V5.33334C0 6.8 1.2 8 2.66667 8H21.3333C22.8 8 24 6.8 24 5.33334V2.66667C24 1.2 22.8 0 21.3333 0Z" fill="#34B85D" />
      </g>
      {/* White square background */}
      <rect x="11" y="9" width="10" height="10" fill="white" />
      {/* Green grid squares */}
      <g transform="translate(13, 11)">
        <path d="M0 0H2V2H0V0Z" fill="#08CB36" />
        <path d="M4 0H6V2H4V0Z" fill="#08CB36" />
        <path d="M0 4H2V6H0V4Z" fill="#08CB36" />
        <path d="M4 4H6V6H4V4Z" fill="#08CB36" />
      </g>
    </svg>
  )
}
