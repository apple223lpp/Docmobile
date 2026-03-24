import FilterIcon from '../icons/FilterIcon'

interface SectionHeaderProps {
  title: string
  selectMode?: boolean
  onFilter?: () => void
}

export default function SectionHeader({
  title,
  selectMode = false,
  onFilter,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center h-[58px] pb-[12px] pt-[24px] pl-[12px]">
      <span className="flex-1 text-[16px] font-medium text-[#1a1a1a] truncate">
        {title}
      </span>
      <button
        className="flex items-center gap-[4px] active:opacity-60 transition-opacity"
        onClick={onFilter}
      >
        <span
          className={`text-[12px] font-medium transition-colors ${
            selectMode ? 'text-[#703EFF]' : 'text-[#a3a3a3]'
          }`}
        >
          {selectMode ? 'Cancel' : 'Filter'}
        </span>
        {!selectMode && <FilterIcon size={16} color="#a3a3a3" />}
      </button>
    </div>
  )
}
