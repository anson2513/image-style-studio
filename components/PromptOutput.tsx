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
      <p className="mb-4 text-xs uppercase tracking-[0.4em] text-zinc-600">Prompt Output</p>
      <h2 className="mb-4 text-2xl font-semibold leading-tight">AI 電影感提示詞生成器</h2>

      <div ref={containerRef} className="relative min-h-[220px] w-full scroll-mt-24 overflow-hidden rounded-[28px] border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
        {isGenerating ? (
          <div role="status" aria-live="polite" className="flex min-h-[180px] items-center justify-center text-center">
            <div>
              <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[#D4AF37]" />
              <p className="mt-4 text-sm text-zinc-400">正在準備完整提示詞…</p>
            </div>
          </div>
        ) : !prompt ? (
          <div className="flex h-full min-h-[180px] items-center justify-center px-4 text-center text-base text-zinc-600">你的 AI 電影級提示詞將顯示在這裡</div>
        ) : (
          <>
            <pre aria-live="polite" className="w-full overflow-x-auto whitespace-pre-wrap break-words text-xs leading-7 text-zinc-200">{prompt}</pre>
            <button onClick={onCopy} className="relative mt-6 w-full overflow-hidden rounded-2xl border border-[#F3D98B]/40 bg-gradient-to-br from-[#FFF8E1] via-[#D4AF37] to-[#8B6B2E] px-5 py-4 text-sm font-bold text-black shadow-[0_0_38px_rgba(212,175,55,0.38)] transition-all before:absolute before:inset-0 before:translate-x-[-120%] before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)] before:transition-transform before:duration-1000 hover:scale-[1.01] hover:before:translate-x-[120%]">複製提示詞</button>
          </>
        )}
      </div>
    </section>
  )
}
