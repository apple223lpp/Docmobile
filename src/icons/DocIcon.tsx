export default function DocIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body — #208EFF */}
      <g transform={`translate(4, 3)`}>
        <path fillRule="evenodd" clipRule="evenodd" d="M21.3333 0H2.66667C1.2 0 0 1.1 0 2.44444V19.5556C0 20.9 1.2 22 2.66667 22H21.3333C22.8 22 24 20.9 24 19.5556V2.44444C24 1.1 22.8 0 21.3333 0Z" fill="#208EFF" />
      </g>
      {/* Bottom — #0068D3 */}
      <g transform={`translate(4, 21)`}>
        <path fillRule="evenodd" clipRule="evenodd" d="M24 0H0C0 0 0 1.2 0 2.66667V5.33334C0 6.8 1.2 8 2.66667 8H21.3333C22.8 8 24 6.8 24 5.33334V2.66667C24 1.2 24 0 24 0Z" fill="#0068D3" />
      </g>
      {/* White text lines */}
      <g transform={`translate(11, 9)`}>
        <path d="M0 0H10V2H0V0Z" fill="white" />
        <path d="M0 4H10V6H0V4Z" fill="white" />
        <path d="M0 8H7V10H0V8Z" fill="white" />
      </g>
    </svg>
  )
}
