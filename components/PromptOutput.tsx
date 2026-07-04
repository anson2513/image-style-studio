import type { RefObject } from 'react'

interface PromptOutputProps {
  containerRef: RefObject<HTMLDivElement | null>
  prompt: string
  isGenerating: boolean
  onCopy: () => void
}

export function PromptOutput({ containerRef, prompt, isGenerating, onCopy }: PromptOutputProps) {
  return (
    <section className="lg:hidden">
      <p className="mb-2 text-xs font-medium tracking-[0.18em] text-[#7C8B72]">PROMPT OUTPUT</p>
      <h2 className="mb-4 text-2xl font-semibold leading-tight text-[#20211F]">完整提示詞</h2>

      <div ref={containerRef} className="relative min-h-[220px] w-full scroll-mt-24 overflow-hidden rounded-3xl border border-[#DEDCD5] bg-white p-4">
        {isGenerating ? (
          <div role="status" aria-live="polite" className="flex min-h-[180px] items-center justify-center text-center">
            <div>
              <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-[#DEDCD5] border-t-[#7C8B72]" />
              <p className="mt-4 text-sm text-[#74766F]">正在準備完整提示詞…</p>
            </div>
          </div>
        ) : !prompt ? (
          <div className="flex h-full min-h-[180px] items-center justify-center px-4 text-center text-base text-[#9A9C96]">選擇風格後，完整提示詞會顯示在這裡</div>
        ) : (
          <>
            <pre aria-live="polite" className="w-full overflow-x-auto whitespace-pre-wrap break-words text-xs leading-7 text-[#454742]">{prompt}</pre>
            <button onClick={onCopy} className="mt-6 w-full rounded-2xl bg-[#7C8B72] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#64725C]">複製提示詞</button>
          </>
        )}
      </div>
    </section>
  )
}
