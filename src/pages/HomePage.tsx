import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { DocumentItem as DocItemType } from '../types/document'
import Search from '../components/Search'
import NotificationButton from '../components/NotificationButton'
import QuickAccess from '../components/QuickAccess'
import SectionHeader from '../components/SectionHeader'
import DocumentList from '../components/DocumentList'
import FloatingButton from '../components/FloatingButton'
import SelectionBar from '../components/SelectionBar'
import MoreActionSheet from '../components/MoreActionSheet'
import FilterSheet, { type FilterState } from '../components/FilterSheet'
import NewFileSheet from '../components/NewFileSheet'
import bridge from '../bridge'

const mockDocuments: DocItemType[] = [
  { id: '1', name: 'Skyline Technologies ✍️.docx', type: 'doc', lastViewed: 'Last viewed Nov 17, 09:17' },
  { id: '2', name: 'Skyline Technologies ✍️.docx', type: 'doc', lastViewed: 'Last viewed Nov 17, 09:17' },
  { id: '3', name: 'Skyline Technologies ✍️.docx', type: 'file', lastViewed: 'Last viewed Nov 17, 09:17' },
  { id: '4', name: 'Quarterly Financial 📊 Q3.xlsx', type: 'table', lastViewed: 'Last viewed Nov 17, 09:17' },
  { id: '5', name: 'Skyline Technologies ✍️.docx', type: 'doc', lastViewed: 'Last viewed Nov 17, 09:17' },
  { id: '6', name: 'Skyline Technologies ✍️.docx', type: 'doc', lastViewed: 'Last viewed Nov 17, 09:17' },
  { id: '7', name: 'Skyline Technologies ✍️.docx', type: 'doc', lastViewed: 'Last viewed Nov 17, 09:17' },
  { id: '8', name: 'Skyline Technologies ✍️.docx', type: 'doc', lastViewed: 'Last viewed Nov 17, 09:17' },
  { id: '9', name: 'Skyline Technologies ✍️.docx', type: 'doc', lastViewed: 'Last viewed Nov 17, 09:17' },
  { id: '10', name: 'Marketing Strategy 📋.docx', type: 'doc', lastViewed: 'Last viewed Nov 16, 14:30' },
  { id: '11', name: 'Team Budget 💰 2024.xlsx', type: 'table', lastViewed: 'Last viewed Nov 16, 11:45' },
  { id: '12', name: 'Design Assets v2.zip', type: 'file', lastViewed: 'Last viewed Nov 15, 16:20' },
  { id: '13', name: 'Product Roadmap 🗺️.docx', type: 'doc', lastViewed: 'Last viewed Nov 15, 10:00' },
  { id: '14', name: 'Sales Report 📈 Oct.xlsx', type: 'table', lastViewed: 'Last viewed Nov 14, 15:33' },
  { id: '15', name: 'Meeting Notes 📝.docx', type: 'doc', lastViewed: 'Last viewed Nov 14, 09:00' },
  { id: '16', name: 'Brand Guidelines.zip', type: 'file', lastViewed: 'Last viewed Nov 13, 17:10' },
  { id: '17', name: 'User Research 🔍.docx', type: 'doc', lastViewed: 'Last viewed Nov 13, 14:22' },
  { id: '18', name: 'Sprint Planning 🏃.docx', type: 'doc', lastViewed: 'Last viewed Nov 12, 11:00' },
  { id: '19', name: 'Revenue Analysis 📊.xlsx', type: 'table', lastViewed: 'Last viewed Nov 12, 08:45' },
  { id: '20', name: 'App Screenshots.zip', type: 'file', lastViewed: 'Last viewed Nov 11, 16:55' },
  { id: '21', name: 'Onboarding Flow ✨.docx', type: 'doc', lastViewed: 'Last viewed Nov 11, 13:30' },
  { id: '22', name: 'API Documentation 📄.docx', type: 'doc', lastViewed: 'Last viewed Nov 10, 10:15' },
  { id: '23', name: 'Inventory Tracker 📦.xlsx', type: 'table', lastViewed: 'Last viewed Nov 10, 08:00' },
  { id: '24', name: 'Release Notes v3.2.docx', type: 'doc', lastViewed: 'Last viewed Nov 09, 17:40' },
  { id: '25', name: 'Client Proposal 🤝.docx', type: 'doc', lastViewed: 'Last viewed Nov 09, 14:05' },
  { id: '26', name: 'Expense Report 💳 Q3.xlsx', type: 'table', lastViewed: 'Last viewed Nov 08, 11:30' },
  { id: '27', name: 'Wireframes Final.zip', type: 'file', lastViewed: 'Last viewed Nov 08, 09:20' },
  { id: '28', name: 'Competitor Analysis 🏢.docx', type: 'doc', lastViewed: 'Last viewed Nov 07, 15:50' },
  { id: '29', name: 'Training Materials 📚.docx', type: 'doc', lastViewed: 'Last viewed Nov 07, 10:00' },
]

export default function HomePage() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [listMode, setListMode] = useState<'normal' | 'select'>('normal')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [moreSheetItem, setMoreSheetItem] = useState<DocItemType | null>(null)
  const [filterVisible, setFilterVisible] = useState(false)
  const [newFileVisible, setNewFileVisible] = useState(false)
  const [filter, setFilter] = useState<FilterState>({ type: null, proprietor: 'all', sort: 'viewed' })

  const filteredDocuments = documents.filter((d) => {
    if (filter.type && d.type !== filter.type) return false
    return true
  })

  const handleDocTap = useCallback((item: DocItemType) => {
    bridge.openDocument(item.id)
  }, [])

  const handleLongPress = useCallback((item: DocItemType) => {
    if (listMode === 'select') return
    setListMode('select')
    setSelectedIds(new Set([item.id]))
  }, [listMode])

  const handleCancelSelect = useCallback(() => {
    setSelectedIds(new Set())
    setListMode('normal')
  }, [])

  const handleSelect = useCallback((item: DocItemType) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(item.id)) next.delete(item.id)
      else next.add(item.id)
      return next
    })
  }, [])

  const handleBatchDelete = useCallback(() => {
    if (selectedIds.size === 0) return
    setDocuments((prev) => prev.filter((d) => !selectedIds.has(d.id)))
    selectedIds.forEach((id) => bridge.deleteDocument(id))
    setSelectedIds(new Set())
    setListMode('normal')
  }, [selectedIds])

  const handleMore = useCallback((item: DocItemType) => {
    setMoreSheetItem(item)
  }, [])

  const handleDelete = useCallback((item: DocItemType) => {
    setDocuments((prev) => prev.filter((d) => d.id !== item.id))
    bridge.deleteDocument(item.id)
  }, [])

  const handleCreate = useCallback(() => {
    setNewFileVisible(true)
  }, [])

  const handleNavigate = useCallback((target: string) => {
    bridge.navigate(target)
  }, [])

  const handleNotification = useCallback(() => {
    bridge.showNotifications()
  }, [])

  return (
    <div className="min-h-[100dvh] bg-[#f7f7f7] flex flex-col">
      {/* Toolbar — fixed top with gradient blur */}
      <div
        className="sticky top-0 z-40 flex flex-col"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(247,247,247,0.95) 60%, rgba(247,247,247,0) 100%)',
        }}
      >
        <div className="flex items-center justify-between gap-[12px] px-[16px] pt-[12px] pb-[10px]">
          <Search type="search" />
          <NotificationButton onClick={handleNotification} />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Quick Access */}
        <div className="px-[16px] pt-[4px] shrink-0">
          <QuickAccess onNavigate={handleNavigate} />
        </div>

        {/* Section Header */}
        <div className="px-[16px] shrink-0">
          <SectionHeader
            title="Recently"
            selectMode={listMode === 'select'}
            onFilter={listMode === 'select' ? handleCancelSelect : () => setFilterVisible(true)}
          />
        </div>

        {/* Document List — fills remaining space */}
        <div className="px-[16px] pb-[100px] flex-1 flex flex-col">
          <DocumentList
            documents={filteredDocuments}
            mode={listMode}
            selectedIds={selectedIds}
            onMore={handleMore}
            onDelete={handleDelete}
            onTap={listMode === 'select' ? handleSelect : handleDocTap}
            onSelect={handleSelect}
            onLongPress={handleLongPress}
          />
        </div>
      </div>

      {/* FAB (hidden in select mode) */}
      {listMode === 'normal' && <FloatingButton onClick={handleCreate} />}

      {/* Selection Bar (bottom, select mode only) */}
      <SelectionBar
        visible={listMode === 'select'}
        allSelected={filteredDocuments.length > 0 && selectedIds.size === filteredDocuments.length}
        selectedCount={selectedIds.size}
        onSelectAll={() => {
          if (selectedIds.size === filteredDocuments.length) {
            setSelectedIds(new Set())
          } else {
            setSelectedIds(new Set(filteredDocuments.map((d) => d.id)))
          }
        }}
        onDelete={handleBatchDelete}
      />

      {/* More Action Sheet */}
      <MoreActionSheet
        visible={!!moreSheetItem}
        item={moreSheetItem}
        onClose={() => setMoreSheetItem(null)}
        onOpen={() => moreSheetItem && bridge.openDocument(moreSheetItem.id)}
        onShareToChat={() => moreSheetItem && bridge.shareDocument(moreSheetItem.id)}
        onDelete={() => {
          if (!moreSheetItem) return
          setDocuments((prev) => prev.filter((d) => d.id !== moreSheetItem.id))
          bridge.deleteDocument(moreSheetItem.id)
        }}
      />

      {/* New File Sheet */}
      <NewFileSheet
        visible={newFileVisible}
        onClose={() => setNewFileVisible(false)}
        onCreateDocument={() => bridge.createDocument('doc')}
        onCreateExcel={() => bridge.createDocument('table')}
        onCreateFolder={() => bridge.navigate('createFolder')}
        onUpload={() => bridge.navigate('upload')}
        onSelectTemplate={() => bridge.navigate('templates')}
      />

      {/* Filter Sheet */}
      <FilterSheet
        visible={filterVisible}
        filter={filter}
        onChange={setFilter}
        onClose={() => setFilterVisible(false)}
        onConfirm={() => setFilterVisible(false)}
      />

      {/* Dev Preview Entry (dev only, hidden in select mode) */}
      {import.meta.env.DEV && listMode === 'normal' && (
        <Link
          to="/dev"
          className="fixed right-[20px] bottom-[30px] z-40 h-[36px] px-[14px]
            flex items-center justify-center rounded-full
            bg-[#703EFF]/10 border border-[#703EFF]/20
            text-[12px] font-medium text-[#703EFF]
            active:bg-[#703EFF]/20 transition-colors
            backdrop-blur-[3px]"
        >
          Dev Preview
        </Link>
      )}
    </div>
  )
}
