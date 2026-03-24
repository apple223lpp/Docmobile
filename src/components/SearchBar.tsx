import SearchIcon from '../icons/SearchIcon'

interface SearchBarProps {
  onFocus?: () => void
}

export default function SearchBar({ onFocus }: SearchBarProps) {
  return (
    <div
      className="flex items-center gap-[8px] h-[44px] flex-1 rounded-full
        bg-white/50 border border-white
        backdrop-blur-[3px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.02)]
        px-[16px] py-[10px]"
      onClick={onFocus}
    >
      <SearchIcon size={20} color="#a3a3a3" />
      <span className="text-[16px] font-medium text-[#a3a3a3]">Search</span>
    </div>
  )
}
