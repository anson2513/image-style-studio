'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Style } from '../lib/types'
import { FullscreenExampleViewer } from './FullscreenExampleViewer'

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
  const expandButtonRef = useRef<HTMLButtonElement>(null)
  const [fullscreenOpen, setFullscreenOpen] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(max-width: 1023px)').matches) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!fullscreenOpen) closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      if (fullscreenOpen) {
        setFullscreenOpen(false)
        window.requestAnimationFrame(() => expandButtonRef.current?.focus())
      } else {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [fullscreenOpen, onClose])

  const closeFullscreen = () => {
    setFullscreenOpen(false)
    window.requestAnimationFrame(() => expandButtonRef.current?.focus())
  }

  return (
    <>
    <div role="dialog" aria-modal="true" aria-labelledby="mobile-style-detail-title" aria-hidden={fullscreenOpen || undefined} className="fixed inset-0 z-[999] flex items-end justify-center overflow-y-auto bg-[#20211F]/35 lg:hidden">
      <div className="relative max-h-[94vh] w-full max-w-md overflow-y-auto rounded-t-[28px] border border-[#DEDCD5] bg-[#F6F4EF] pb-[max(5.5rem,env(safe-area-inset-bottom))] text-[#20211F] shadow-[0_-8px_30px_rgba(32,33,31,0.12)]">
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#B8B6AF]" />
        <button ref={closeButtonRef} onClick={onClose} aria-label="關閉風格詳情" className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full text-xl text-[#454742] hover:bg-[#ECEAE4] focus:outline-none focus:ring-2 focus:ring-[#7C8B72]">✕</button>

        <div className="px-5 pb-4 pt-6">
          <div className="pr-12">
            <p id="mobile-style-detail-title" className="text-2xl font-semibold leading-tight">{style.name}</p>
          </div>

          {example && (
            <div className="mt-4 grid grid-cols-2 rounded-xl border border-[#D8D6CF] bg-white p-1">
              <button onClick={() => onExampleViewChange('input')} className={`min-h-11 rounded-lg px-3 py-2 text-sm transition ${exampleView === 'input' ? 'bg-[#7C8B72] text-white' : 'text-[#5F625D]'}`}>原始素材</button>
              <button onClick={() => onExampleViewChange('output')} className={`min-h-11 rounded-lg px-3 py-2 text-sm transition ${exampleView === 'output' ? 'bg-[#7C8B72] text-white' : 'text-[#5F625D]'}`}>提示詞效果</button>
            </div>
          )}
        </div>

        <button
          ref={expandButtonRef}
          type="button"
          onClick={() => example && setFullscreenOpen(true)}
          disabled={!example}
          aria-label={example ? `全螢幕檢視${style.name}${exampleView === 'output' ? '提示詞效果' : '原始素材'}` : undefined}
          className="relative mx-5 block aspect-[9/16] w-[calc(100%-2.5rem)] overflow-hidden rounded-2xl border border-[#DEDCD5] bg-[#E8E5DE] disabled:cursor-default"
        >
          {example ? (
            exampleView === 'output' ? (
              <Image src={example.outputImage} alt={`${style.name}提示詞效果`} fill sizes="(max-width: 640px) 100vw, 448px" className="object-contain" />
            ) : example.inputImages.length === 1 ? (
              <Image src={example.inputImages[0]} alt={`${style.name}原始照片`} fill sizes="(max-width: 640px) 100vw, 448px" className="object-contain" />
            ) : (
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 bg-[#E8E5DE] p-1.5">
                {example.inputImages.map((src, index) => (
                  <div key={src} className="relative overflow-hidden rounded-lg bg-[#DEDCD5]">
                    <Image src={src} alt={`${style.name}原始素材 ${index + 1}`} fill sizes="224px" className="object-contain" />
                  </div>
                ))}
              </div>
            )
          ) : (
            <Image src={style.cover} alt={style.name} fill sizes="(max-width: 640px) 100vw, 448px" className="object-contain" />
          )}

          {example && (
            <span className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-[#454742] shadow-sm" aria-hidden="true">⛶</span>
          )}
        </button>

        <div className="space-y-3 px-5 pb-6 pt-5">
          <p className="text-sm leading-relaxed text-[#5F625D]">{style.summary}</p>
          <div className="flex flex-wrap gap-2">
            {style.tags.map((tag) => <span key={tag} className="rounded-full bg-[#E6E9E1] px-3 py-1.5 text-xs text-[#64725C]">{tag}</span>)}
          </div>
          <p className="text-[11px] leading-relaxed text-[#8B8D87]">示範結果會依原始照片與使用的 AI 模型而異。</p>
          <button onClick={() => onToggleFavorite(style.name)} className="w-full rounded-2xl border border-[#D8D6CF] bg-white py-3.5 text-sm font-medium text-[#64725C]">
            {isFavorite ? '已加入收藏庫' : '加入收藏庫'}
          </button>
          <button onClick={() => onGenerate(style)} disabled={isGenerating} className="w-full rounded-2xl bg-[#7C8B72] py-4 text-base font-bold text-white transition hover:bg-[#64725C] active:scale-[0.99] disabled:opacity-60">
            {isGenerating ? '正在準備…' : '取得完整提示詞'}
          </button>
        </div>
      </div>
    </div>
    {fullscreenOpen && example && (
      <FullscreenExampleViewer
        style={style}
        example={example}
        exampleView={exampleView}
        onExampleViewChange={onExampleViewChange}
        onClose={closeFullscreen}
      />
    )}
    </>
  )
}
