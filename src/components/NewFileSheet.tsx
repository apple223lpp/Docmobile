import { motion, AnimatePresence, type PanInfo } from 'framer-motion'

interface NewFileSheetProps {
  visible: boolean
  onClose: () => void
  onCreateDocument?: () => void
  onCreateExcel?: () => void
  onCreateFolder?: () => void
  onUpload?: () => void
  onSelectTemplate?: () => void
}

function FileTypeCard({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      className="flex flex-col gap-[10px] items-center justify-center py-[15px]
        bg-white rounded-[18px] h-[80px] flex-1 min-w-0"
      onClick={onClick}
    >
      <div className="size-[20px] flex items-center justify-center">{icon}</div>
      <span className="text-[12px] font-medium text-[#1a1a1a] capitalize text-center">{label}</span>
    </motion.button>
  )
}

const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
const sheetVariants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
  exit: { y: '100%', transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
}

export default function NewFileSheet({
  visible,
  onClose,
  onCreateDocument,
  onCreateExcel,
  onCreateFolder,
  onUpload,
  onSelectTemplate,
}: NewFileSheetProps) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 80 || info.velocity.y > 300) onClose()
  }

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            variants={overlayVariants}
            initial="hidden" animate="visible" exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            variants={sheetVariants}
            initial="hidden" animate="visible" exit="exit"
            drag="y" dragConstraints={{ top: 0 }} dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute bottom-0 left-0 right-0 px-[8px] pb-[8px]"
          >
            <div
              className="rounded-[34px] border border-white overflow-hidden
                shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]"
              style={{
                backgroundColor: 'rgba(247,247,247,0.8)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex flex-col gap-[16px] px-[20px] pt-[20px] pb-[36px]">
                {/* New File section */}
                <div className="flex flex-col gap-[12px]">
                  <p className="text-[13px] font-medium text-[#808080] text-center w-full">New File</p>
                  <div className="flex gap-[8px]">
                    {/* Document */}
                    <FileTypeCard label="Document" onClick={() => { onCreateDocument?.(); onClose() }} icon={
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M20 14H0C0 14 0 14.9 0 16V18C0 19.1 1 20 2.222 20H17.778C19 20 20 19.1 20 18V16C20 14.9 20 14 20 14Z" fill="#0068D3" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.778 0H2.222C1 0 0 .9 0 2V16C0 17.1 1 18 2.222 18H17.778C19 18 20 17.1 20 16V2C20 .9 19 0 17.778 0Z" fill="#208EFF" />
                        <path d="M6 4H14V6H6V4Z" fill="white" /><path d="M6 8H14V10H6V8Z" fill="white" /><path d="M6 12H12V14H6V12Z" fill="white" />
                      </svg>
                    } />
                    {/* Excel */}
                    <FileTypeCard label="Excel" onClick={() => { onCreateExcel?.(); onClose() }} icon={
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M20 14H0C0 14 0 14.9 0 16V18C0 19.1 1 20 2.222 20H17.778C19 20 20 19.1 20 18V16C20 14.9 20 14 20 14Z" fill="#34B85D" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.778 0H2.222C1 0 0 .9 0 2V16C0 17.1 1 18 2.222 18H17.778C19 18 20 17.1 20 16V2C20 .9 19 0 17.778 0Z" fill="#08CB36" />
                        <rect x="5" y="4" width="10" height="10" fill="white" />
                        <path d="M7 6H9V8H7V6Z" fill="#08CB36" /><path d="M11 6H13V8H11V6Z" fill="#08CB36" />
                        <path d="M7 10H9V12H7V10Z" fill="#08CB36" /><path d="M11 10H13V12H11V10Z" fill="#08CB36" />
                      </svg>
                    } />
                    {/* Folder */}
                    <FileTypeCard label="Folder" onClick={() => { onCreateFolder?.(); onClose() }} icon={
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                        <path d="M0 18C0 19.104.896 20 1.999 20H17.99C19.094 20 19.99 19.104 19.99 18V4C19.99 2.896 19.094 2 17.99 2H9.409L7.703.293C7.508.098 7.252 0 6.996.002L1.999 0C.896 0 0 .896 0 2V18Z" fill="#FBBC04" />
                        <path d="M.011 4C.011 5.104 0 4 .002 5H20C20 4 20 5.104 20 4C20 2.896 19.105 2 18.001 2H9.42L7.714.293C7.519.098 7.263 0 7.007.002L2.01 0C.906 0 .011.896.011 2V4Z" fill="#FF9E4E" />
                      </svg>
                    } />
                    {/* Upload */}
                    <FileTypeCard label="Upload" onClick={() => { onUpload?.(); onClose() }} icon={
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.778 0H2.222C1 0 0 1 0 2.222V17.778C0 19 1 20 2.222 20H17.778C19 20 20 19 20 17.778V2.222C20 1 19 0 17.778 0Z" fill="#07CD00" />
                        <path d="M4 12H6.001V14H14V12H16V14.5C16 15.325 15.325 16 14.5 16H5.5C4.675 16 4 15.325 4 14.5V12ZM7.308 8.808L9 6.873V12H11V6.873L12.693 8.815L13.75 7.75L10 4L6.25 7.75L7.308 8.808Z" fill="white" />
                      </svg>
                    } />
                  </div>
                  <div className="h-px w-full bg-white" />
                </div>

                {/* Select template */}
                <div className="flex flex-col gap-[12px]">
                  <button
                    className="flex items-center justify-between w-full active:opacity-60 transition-opacity"
                    onClick={onSelectTemplate}
                  >
                    <span className="text-[14px] font-semibold text-[#1a1a1a]">Select template</span>
                    <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                      <path d="M5 3l4 4-4 4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Template preview cards — horizontal scroll */}
                  <div className="flex gap-[12px] overflow-x-auto pb-[4px] -mx-[4px] px-[4px]"
                    style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
                  >
                    {/* Card 1: New document */}
                    <div className="shrink-0 w-[140px] bg-white border-[0.59px] border-black/5 rounded-[10.5px] overflow-hidden">
                      <div className="h-[93px] bg-[#bfd4ff] rounded-t-[7px] p-[5px] relative overflow-hidden opacity-80">
                        {/* Toolbar card */}
                        <div className="bg-white rounded-[5px] h-[33px] w-[114px] mx-auto mt-[6px] px-[6px] py-[4px] flex items-center gap-[6px]">
                          <span className="text-[7px] font-bold text-[#1a1a1a]">B</span>
                          <span className="text-[7px] italic text-[#1a1a1a]">I</span>
                          <span className="text-[7px] underline text-[#1a1a1a]">U</span>
                          <span className="text-[7px] text-[#1a1a1a]">≡</span>
                          <span className="text-[7px] font-medium text-[#1a1a1a]">A</span>
                          <span className="text-[7px] text-[#1a1a1a]">+</span>
                        </div>
                        {/* Text lines card */}
                        <div className="bg-[#e6ecff] rounded-[5px] h-[25px] w-[114px] mx-auto mt-[6px] flex flex-col gap-[3px] px-[8px] py-[6px]">
                          <div className="h-[1.8px] w-[88px] bg-[#c4d4f2] rounded-full" />
                          <div className="h-[1.8px] w-[88px] bg-[#c4d4f2] rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center gap-[5px] px-[5px] py-[5px]">
                        <div className="size-[12px] bg-[#208EFF] rounded-[2.5px] flex items-center justify-center">
                          <svg width={8} height={8} viewBox="0 0 20 20" fill="none">
                            <rect width="20" height="20" rx="3" fill="#208EFF" />
                            <path d="M6 5H14V7H6V5Z" fill="white" /><path d="M6 9H14V11H6V9Z" fill="white" /><path d="M6 13H11V15H6V13Z" fill="white" />
                          </svg>
                        </div>
                        <span className="text-[12px] font-semibold text-[#1a1a1a]">New document</span>
                      </div>
                    </div>

                    {/* Card 2: Attendance sheet */}
                    <div className="shrink-0 w-[140px] bg-white border-[0.59px] border-black/5 rounded-[10.5px] overflow-hidden">
                      <div className="h-[93px] bg-[#baf1b9] rounded-t-[7px] p-[5px] relative overflow-hidden">
                        {/* Left white card with grid */}
                        <div className="absolute left-[12px] top-[21px] bg-white rounded-[5px] h-[54px] w-[84px]">
                          <div className="absolute left-[6px] bottom-[6px] bg-[#68ff60] border-[0.24px] border-[#73cb7e] rounded-[2px] px-[2px] py-[1px]">
                            <span className="text-[6px] font-medium text-black">CVS</span>
                          </div>
                        </div>
                        {/* Right white card with chart overlay */}
                        <div className="absolute right-[-12px] top-[8px] bg-white border-[0.24px] border-[#c8c8c7] rounded-[6px] shadow-[0px_2px_2px_rgba(0,0,0,0.05)] h-[77px] w-[109px]">
                          <div className="absolute right-[8px] top-[8px] bg-[#38e000] rounded-[2px] h-[8px] w-[19px] flex items-center justify-center">
                            <span className="text-[6px] font-semibold text-white">223</span>
                          </div>
                          {/* Chart line simulation */}
                          <svg className="absolute bottom-[8px] left-[4px]" width={96} height={40} viewBox="0 0 96 40" fill="none">
                            <path d="M0 35 C10 32, 15 30, 20 28 C25 26, 30 20, 38 15 C42 12, 48 25, 55 22 C60 20, 65 8, 72 5 C78 3, 82 10, 88 12 C92 13, 96 15, 96 15" stroke="#c8c8c7" strokeWidth="1.2" fill="none" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center gap-[4px] px-[5px] py-[5px]">
                        <div className="size-[12px] bg-[#7cbb72] rounded-[2.5px]" />
                        <span className="text-[13px] font-semibold text-[#1a1a1a]">Attendance sheet</span>
                      </div>
                    </div>

                    {/* Card 3: Work planning */}
                    <div className="shrink-0 w-[140px] bg-white border-[0.59px] border-black/5 rounded-[10.5px] overflow-hidden">
                      <div className="h-[93px] bg-[#ffdecc] rounded-t-[7px] p-[5px] relative overflow-hidden">
                        <p className="text-[5px] font-bold text-[#1a1a1a] mt-[4px] ml-[3px]">Browse Halo templates to start your workday.</p>
                        {/* Stacked cards */}
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 bg-white rounded-[2px] shadow-[0px_2px_2px_rgba(0,0,0,0.1)] h-[44px] w-[65px]" />
                        <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 bg-white rounded-[2px] shadow-[0px_2px_2px_rgba(0,0,0,0.05)] h-[44px] w-[70px]" />
                        <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 bg-[#ffe45f] border-[0.26px] border-[#e1c226] rounded-[5px] h-[44px] w-[77px] flex flex-col items-center justify-center gap-[4px]">
                          <div className="bg-white border-[0.26px] border-[#bdbdbd] rounded-full px-[2px] py-[1px]">
                            <span className="text-[2px] font-semibold text-[#1a1a1a]">Today's Plan</span>
                          </div>
                          <span className="text-[9px] font-semibold text-[#1a1a1a]">Start planning</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-[4px] px-[5px] py-[5px]">
                        <div className="size-[12px] bg-[#e97466] rounded-[2.5px]" />
                        <span className="text-[12px] font-medium text-[#1a1a1a]">Work planning</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cancel */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-[48px] rounded-full bg-black/[0.06]
                    flex items-center justify-center
                    text-[17px] font-semibold text-[#1a1a1a]
                    active:bg-black/10 transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
