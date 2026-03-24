import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { DocumentItem as DocItemType } from '../types/document'
import type { ActionSheetOption } from '../components/ActionSheet'
import SearchBar from '../components/SearchBar'
import Search from '../components/Search'
import Checkbox from '../components/Checkbox'
import NotificationButton from '../components/NotificationButton'
import QuickAccess from '../components/QuickAccess'
import SectionHeader from '../components/SectionHeader'
import DocumentList from '../components/DocumentList'
import DocumentItem from '../components/DocumentItem'
import FloatingButton from '../components/FloatingButton'
import ActionSheet from '../components/ActionSheet'

const mockDocuments: DocItemType[] = [
  { id: '1', name: 'Skyline Technologies ✍️.docx', type: 'doc', lastViewed: 'Last viewed Nov 17, 09:17' },
  { id: '2', name: 'Quarterly Financial 📊 Q3.xlsx', type: 'table', lastViewed: 'Last viewed Nov 16, 14:30' },
  { id: '3', name: 'Project Assets.zip', type: 'file', lastViewed: 'Last viewed Nov 15, 11:00' },
]

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center gap-[8px]">
        <div className="h-px flex-1 bg-[#703EFF]/10" />
        <span className="text-[12px] font-medium text-[#703EFF] shrink-0 uppercase tracking-wider">
          {title}
        </span>
        <div className="h-px flex-1 bg-[#703EFF]/10" />
      </div>
      <div className="rounded-[14px] bg-white p-[12px]">{children}</div>
    </div>
  )
}

export default function DevPreviewPage() {
  const [actionSheetVisible, setActionSheetVisible] = useState(false)
  const [swipeOpenId, setSwipeOpenId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [listMode, setListMode] = useState<'normal' | 'select'>('normal')
  const [checkboxDemo, setCheckboxDemo] = useState([false, true])
  const [log, setLog] = useState<string[]>([])

  const pushLog = useCallback((msg: string) => {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 20))
  }, [])

  const toggleSelect = useCallback((item: DocItemType) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(item.id)) next.delete(item.id)
      else next.add(item.id)
      pushLog(`Select toggle → ${item.name} (${next.has(item.id) ? 'selected' : 'unselected'})`)
      return next
    })
  }, [pushLog])

  const demoActionSheetOptions: ActionSheetOption[] = [
    { label: 'Share', onTap: () => pushLog('ActionSheet → Share') },
    { label: 'Rename', onTap: () => pushLog('ActionSheet → Rename') },
    { label: 'Delete', danger: true, onTap: () => pushLog('ActionSheet → Delete') },
  ]

  return (
    <div className="min-h-[100dvh] bg-[#f7f7f7] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#f7f7f7] border-b border-[#f2f2f2]">
        <div className="flex items-center justify-between px-[16px] pt-[12px] pb-[10px]">
          <Link
            to="/"
            className="text-[14px] font-medium text-[#703EFF] active:opacity-60 transition-opacity"
          >
            ← Back
          </Link>
          <span className="text-[16px] font-semibold text-[#1a1a1a]">
            Dev Preview
          </span>
          <div className="w-[40px]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-[16px] py-[16px] flex flex-col gap-[20px]">

        {/* Search (new multi-variant component) */}
        <PreviewSection title="Search">
          <div className="flex flex-col gap-[16px]">
            <div>
              <p className="text-[12px] text-[#808080] mb-[6px]">type=&quot;search&quot; · 默认态（毛玻璃）</p>
              <Search
                type="search"
                onFocus={() => pushLog('Search(search) → onFocus')}
                onChange={(v) => pushLog(`Search(search) → onChange("${v}")`)}
                onClear={() => pushLog('Search(search) → onClear')}
              />
            </div>
            <div>
              <p className="text-[12px] text-[#808080] mb-[6px]">type=&quot;message&quot; · 默认态（实底）</p>
              <Search
                type="message"
                onFocus={() => pushLog('Search(message) → onFocus')}
                onChange={(v) => pushLog(`Search(message) → onChange("${v}")`)}
                onClear={() => pushLog('Search(message) → onClear')}
              />
            </div>
          </div>
        </PreviewSection>

        {/* SearchBar (legacy) */}
        <PreviewSection title="SearchBar (legacy)">
          <SearchBar onFocus={() => pushLog('SearchBar → onFocus')} />
        </PreviewSection>

        {/* NotificationButton */}
        <PreviewSection title="NotificationButton">
          <div className="flex items-center gap-[12px]">
            <NotificationButton onClick={() => pushLog('NotificationButton → onClick')} />
            <span className="text-[12px] text-[#808080]">点击触发回调</span>
          </div>
        </PreviewSection>

        {/* QuickAccess */}
        <PreviewSection title="QuickAccess">
          <QuickAccess onNavigate={(t) => pushLog(`QuickAccess → navigate(${t})`)} />
        </PreviewSection>

        {/* Checkbox */}
        <PreviewSection title="Checkbox">
          <div className="flex items-center gap-[24px]">
            <div className="flex items-center gap-[8px]">
              <Checkbox
                selected={checkboxDemo[0]}
                onChange={() => {
                  setCheckboxDemo((p) => [!p[0], p[1]])
                  pushLog(`Checkbox[0] → ${!checkboxDemo[0] ? 'selected' : 'unselected'}`)
                }}
              />
              <span className="text-[12px] text-[#808080]">
                {checkboxDemo[0] ? 'selected' : 'unselected'}
              </span>
            </div>
            <div className="flex items-center gap-[8px]">
              <Checkbox
                selected={checkboxDemo[1]}
                onChange={() => {
                  setCheckboxDemo((p) => [p[0], !p[1]])
                  pushLog(`Checkbox[1] → ${!checkboxDemo[1] ? 'selected' : 'unselected'}`)
                }}
              />
              <span className="text-[12px] text-[#808080]">
                {checkboxDemo[1] ? 'selected' : 'unselected'}
              </span>
            </div>
          </div>
        </PreviewSection>

        {/* SectionHeader */}
        <PreviewSection title="SectionHeader">
          <SectionHeader
            title="Recently"
            onFilter={() => pushLog('SectionHeader → onFilter')}
          />
        </PreviewSection>

        {/* DocumentItem — normal mode */}
        <PreviewSection title="DocumentItem · Normal">
          <div className="flex flex-col">
            <p className="text-[12px] text-[#808080] mb-[4px]">左滑可展开 4 个圆形操作按钮</p>
            {mockDocuments.map((doc, i) => (
              <DocumentItem
                key={doc.id}
                item={doc}
                mode="normal"
                isOpen={swipeOpenId === doc.id}
                onSwipeOpen={(id) => {
                  setSwipeOpenId(id)
                  pushLog(`DocumentItem → swipeOpen(${id})`)
                }}
                onSwipeClose={() => setSwipeOpenId(null)}
                onMore={(item) => pushLog(`DocumentItem → onMore(${item.name})`)}
                onDelete={(item) => pushLog(`DocumentItem → onDelete(${item.name})`)}
                onFavorite={(item) => pushLog(`DocumentItem → onFavorite(${item.name})`)}
                onShare={(item) => pushLog(`DocumentItem → onShare(${item.name})`)}
                onTap={(item) => pushLog(`DocumentItem → onTap(${item.name})`)}
                isLast={i === mockDocuments.length - 1}
              />
            ))}
          </div>
        </PreviewSection>

        {/* DocumentItem — select/delete mode */}
        <PreviewSection title="DocumentItem · Select (Delete)">
          <div className="flex flex-col">
            <p className="text-[12px] text-[#808080] mb-[4px]">点击 Checkbox 或行可多选</p>
            {mockDocuments.map((doc, i) => (
              <DocumentItem
                key={doc.id}
                item={doc}
                mode="select"
                isOpen={false}
                selected={selectedIds.has(doc.id)}
                onSwipeOpen={() => {}}
                onSwipeClose={() => {}}
                onMore={(item) => pushLog(`DocumentItem(select) → onMore(${item.name})`)}
                onDelete={(item) => pushLog(`DocumentItem(select) → onDelete(${item.name})`)}
                onTap={toggleSelect}
                onSelect={toggleSelect}
                isLast={i === mockDocuments.length - 1}
              />
            ))}
          </div>
        </PreviewSection>

        {/* DocumentList — mode toggle */}
        <PreviewSection title="DocumentList">
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[8px]">
              <button
                className={`h-[32px] px-[12px] rounded-full text-[12px] font-medium transition-colors ${
                  listMode === 'normal'
                    ? 'bg-[#703EFF] text-white'
                    : 'bg-[#f2f2f2] text-[#808080]'
                }`}
                onClick={() => {
                  setListMode('normal')
                  setSelectedIds(new Set())
                  pushLog('DocumentList mode → normal')
                }}
              >
                Normal
              </button>
              <button
                className={`h-[32px] px-[12px] rounded-full text-[12px] font-medium transition-colors ${
                  listMode === 'select'
                    ? 'bg-[#703EFF] text-white'
                    : 'bg-[#f2f2f2] text-[#808080]'
                }`}
                onClick={() => {
                  setListMode('select')
                  pushLog('DocumentList mode → select')
                }}
              >
                Select (Delete)
              </button>
              {listMode === 'select' && (
                <span className="text-[12px] text-[#808080] ml-auto">
                  已选 {selectedIds.size}/{mockDocuments.length}
                </span>
              )}
            </div>
            <DocumentList
              documents={mockDocuments}
              mode={listMode}
              selectedIds={selectedIds}
              onMore={(item) => pushLog(`DocumentList → onMore(${item.name})`)}
              onDelete={(item) => pushLog(`DocumentList → onDelete(${item.name})`)}
              onFavorite={(item) => pushLog(`DocumentList → onFavorite(${item.name})`)}
              onShare={(item) => pushLog(`DocumentList → onShare(${item.name})`)}
              onTap={(item) => pushLog(`DocumentList → onTap(${item.name})`)}
              onSelect={toggleSelect}
            />
          </div>
        </PreviewSection>

        {/* FloatingButton */}
        <PreviewSection title="FloatingButton">
          <div className="flex items-center gap-[12px]">
            <p className="text-[12px] text-[#808080] flex-1">
              固定在右下角的 FAB 按钮（全局可见 ↘）
            </p>
          </div>
        </PreviewSection>

        {/* ActionSheet */}
        <PreviewSection title="ActionSheet">
          <button
            className="w-full h-[44px] rounded-[10px] bg-[#703EFF] text-white text-[14px] font-medium
              active:opacity-80 transition-opacity"
            onClick={() => {
              setActionSheetVisible(true)
              pushLog('ActionSheet → show')
            }}
          >
            打开 ActionSheet
          </button>
        </PreviewSection>

        {/* Event Log */}
        <PreviewSection title="Event Log">
          <div className="max-h-[200px] overflow-y-auto">
            {log.length === 0 ? (
              <p className="text-[12px] text-[#a3a3a3] text-center py-[16px]">
                与上面的组件交互后，事件日志将显示在这里
              </p>
            ) : (
              <div className="flex flex-col gap-[4px]">
                {log.map((entry, i) => (
                  <p key={i} className="text-[12px] font-normal text-[#666666] font-mono leading-relaxed">
                    {entry}
                  </p>
                ))}
              </div>
            )}
          </div>
        </PreviewSection>

        <div className="h-[100px]" />
      </div>

      {/* FAB (always visible for preview) */}
      <FloatingButton onClick={() => pushLog('FloatingButton → onClick')} />

      {/* ActionSheet */}
      <ActionSheet
        visible={actionSheetVisible}
        title="Demo Action Sheet"
        options={demoActionSheetOptions}
        onClose={() => {
          setActionSheetVisible(false)
          pushLog('ActionSheet → close')
        }}
      />
    </div>
  )
}
