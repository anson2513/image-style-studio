export type MobileLibraryView = 'library' | 'favorites' | 'recent'

interface MobileBottomNavProps {
  activeView: MobileLibraryView
  onChange: (view: MobileLibraryView) => void
}

const navItems = [
  ['library', '圖庫', '▦'],
  ['favorites', '收藏', '♡'],
  ['recent', '最近', '◷'],
] as const

export function MobileBottomNav({ activeView, onChange }: MobileBottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-[80] border-t border-[#DEDCD5] bg-white px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 lg:hidden" aria-label="主要導覽">
      <div className="mx-auto grid max-w-md grid-cols-3">
        {navItems.map(([view, label, icon]) => (
          <button
            key={view}
            type="button"
            onClick={() => onChange(view)}
            className={`flex min-h-11 flex-col items-center gap-1 py-1 text-[11px] transition ${activeView === view ? 'text-[#64725C]' : 'text-[#767972]'}`}
          >
            <span className="text-lg" aria-hidden="true">{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}
