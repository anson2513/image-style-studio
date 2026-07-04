'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Style } from '../lib/types'

type ExampleView = 'input' | 'output'

interface MobileStyleDetailSheetProps {
  style: Style
  exampleView: ExampleView
  isFavorite: boolean
  isGenerating: boolean
  onClose: () => void
  onExampleViewChange: (view: ExampleView) => void
  onToggleFavorite: (styleName: string) => void
  onGenerate: (style: Style) => void
}

export function MobileStyleDetailSheet({
  style,
  exampleView,
  isFavorite,
  isGenerating,
  onClose,
  onExampleViewChange,
  onToggleFavorite,
  onGenerate,
}: MobileStyleDetailSheetProps) {
  const example = style.examples[0]
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="mobile-style-detail-title" className="fixed inset-0 z-[999] flex items-end justify-center overflow-y-auto bg-black/90 p-3 backdrop-blur-xl sm:items-center lg:hidden">
      <div className="mb-safe relative max-h-[94vh] w-full max-w-md overflow-y-auto rounded-t-[32px] border border-white/10 bg-[#0b0b0b] sm:rounded-[32px]">
        <button ref={closeButtonRef} onClick={onClose} aria-label="關閉風格詳情" className="absolute right-5 top-5 z-20 h-10 w-10 rounded-full bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-[#E7C76A]">✕</button>

        <div className="relative aspect-[3/4] max-h-[58vh] overflow-hidden bg-black">
          {example ? (
            exampleView === 'output' ? (
              <Image src={example.outputImage} alt={`${style.name}提示詞效果`} fill sizes="(max-width: 640px) 100vw, 448px" className="object-cover" />
            ) : example.inputImages.length === 1 ? (
              <Image src={example.inputImages[0]} alt={`${style.name}原始照片`} fill sizes="(max-width: 640px) 100vw, 448px" className="object-cover" />
            ) : (
              <div className="absolute inset-0 grid grid-cols-2 gap-1 bg-black p-1">
                {example.inputImages.map((src, index) => (
                  <div key={src} className="relative overflow-hidden bg-zinc-900">
                    <Image src={src} alt={`${style.name}原始素材 ${index + 1}`} fill sizes="224px" className="object-cover" />
                  </div>
                ))}
              </div>
            )
          ) : (
            <Image src={style.cover} alt={style.name} fill sizes="(max-width: 640px) 100vw, 448px" className="object-cover scale-[1.04]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />

          {example && (
            <div className="absolute left-4 right-16 top-4 z-10 grid grid-cols-2 rounded-full border border-white/15 bg-black/55 p-1 backdrop-blur-xl">
              <button onClick={() => onExampleViewChange('input')} className={`rounded-full px-3 py-2 text-xs transition ${exampleView === 'input' ? 'bg-white text-black' : 'text-white/70'}`}>原始素材</button>
              <button onClick={() => onExampleViewChange('output')} className={`rounded-full px-3 py-2 text-xs transition ${exampleView === 'output' ? 'bg-white text-black' : 'text-white/70'}`}>提示詞效果</button>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs text-white/65">{example ? exampleView === 'input' ? '原始素材' : '提示詞效果' : '風格封面'}</p>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p id="mobile-style-detail-title" className="text-3xl font-bold leading-tight">{style.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{style.summary}</p>
              </div>
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-zinc-400">{style.inputType === 'multi-image' ? '多張照片' : '單張照片'}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {style.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-zinc-300">{tag}</span>)}
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">示範結果會依原始照片與使用的 AI 模型而異。</p>
          </div>

          <button onClick={() => onToggleFavorite(style.name)} className="w-full rounded-2xl border border-[#F3D98B]/30 bg-gradient-to-br from-[#FFF8E1]/10 via-[#D4AF37]/10 to-[#8B6B2E]/10 py-4 text-sm uppercase tracking-[0.18em] text-[#E7C76A] backdrop-blur-xl">
            {isFavorite ? '已加入收藏庫' : '加入收藏庫'}
          </button>
          <button onClick={() => onGenerate(style)} disabled={isGenerating} className="w-full rounded-2xl bg-lime-400 py-4 text-base font-bold text-black shadow-[0_0_40px_rgba(163,230,53,0.25)] transition-all active:scale-[0.98] disabled:opacity-60">
            {isGenerating ? '正在準備…' : '生成提示詞'}
          </button>
        </div>
      </div>
    </div>
  )
}
