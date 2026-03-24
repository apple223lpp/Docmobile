import { useState, useCallback } from 'react'
import type { DocumentItem as DocItemType } from '../types/document'
import DocumentItem from './DocumentItem'

interface DocumentListProps {
  documents: DocItemType[]
  mode?: 'normal' | 'select'
  selectedIds?: Set<string>
  onMore: (item: DocItemType) => void
  onDelete: (item: DocItemType) => void
  onFavorite?: (item: DocItemType) => void
  onShare?: (item: DocItemType) => void
  onTap: (item: DocItemType) => void
  onSelect?: (item: DocItemType) => void
  onLongPress?: (item: DocItemType) => void
}

export default function DocumentList({
  documents,
  mode = 'normal',
  selectedIds,
  onMore,
  onDelete,
  onFavorite,
  onShare,
  onTap,
  onSelect,
  onLongPress,
}: DocumentListProps) {
  const [openSwipeId, setOpenSwipeId] = useState<string | null>(null)

  const handleSwipeOpen = useCallback((id: string) => {
    setOpenSwipeId(id)
  }, [])

  const handleSwipeClose = useCallback(() => {
    setOpenSwipeId(null)
  }, [])

  return (
    <div
      className="bg-white rounded-[26px] overflow-hidden"
      onClick={() => {
        if (openSwipeId) setOpenSwipeId(null)
      }}
    >
      {documents.map((doc, index) => (
        <DocumentItem
          key={doc.id}
          item={doc}
          mode={mode}
          isOpen={openSwipeId === doc.id}
          selected={selectedIds?.has(doc.id) ?? false}
          onSwipeOpen={handleSwipeOpen}
          onSwipeClose={handleSwipeClose}
          onMore={onMore}
          onDelete={onDelete}
          onFavorite={onFavorite}
          onShare={onShare}
          onTap={onTap}
          onSelect={onSelect}
          onLongPress={onLongPress}
          isLast={index === documents.length - 1}
        />
      ))}
    </div>
  )
}
