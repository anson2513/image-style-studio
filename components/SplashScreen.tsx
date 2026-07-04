export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[999] flex min-h-dvh flex-col bg-[#F6F4EF] px-6 text-[#20211F]">
      <div className="flex flex-1 items-center justify-center">
        <div className="-translate-y-8 text-center">
          <div className="mx-auto flex h-[88px] w-[88px] items-center justify-center rounded-[24px] border-2 border-[#20211F]">
            <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
              <path d="M8 18V8h10M46 8h10v10M56 46v10H46M18 56H8V46" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="19" y="21" width="29" height="23" rx="3" fill="none" stroke="#7C8B72" strokeWidth="2.5" />
              <path d="m22 39 8-9 6 6 4-4 6 7" fill="none" stroke="#7C8B72" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="41" cy="27" r="2.5" fill="none" stroke="#C38A2E" strokeWidth="2.5" />
            </svg>
          </div>

          <h1 className="mt-8 text-[32px] font-semibold tracking-[0.18em]">影像風格室</h1>
          <p className="mt-3 text-[13px] font-medium tracking-[0.28em] text-[#5F625D]">AI 修圖風格工作台</p>

          <div className="mx-auto mt-10 h-1 w-14 overflow-hidden rounded-full bg-[#E1DFD8]" aria-label="載入中">
            <div className="h-full w-2/5 animate-[splash-progress_1.2s_ease-in-out_infinite] rounded-full bg-[#7C8B72]" />
          </div>
        </div>
      </div>

      <p className="pb-[max(3.25rem,env(safe-area-inset-bottom))] text-center text-xs font-medium tracking-[0.12em] text-[#4E514C]">開發者 By ANSON</p>
    </div>
  )
}
