'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Style, StyleExample } from '../lib/types'

type ExampleView = 'input' | 'output'

interface FullscreenExampleViewerProps {
  style: Style
  example: StyleExample
  exampleView: ExampleView
  onExampleViewChange: (view: ExampleView) => void
  onClose: () => void
}

export function FullscreenExampleViewer({
  style,
  example,
  exampleView,
  onExampleViewChange,
  onClose,
}: FullscreenExampleViewerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const isTextOnly = style.inputType === 'text-only'

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fullscreen-example-title"
      className="fixed inset-0 z-[1100] flex h-dvh flex-col bg-[#20211F] text-white lg:hidden"
    >
      <div className="flex items-center justify-between gap-4 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="min-w-0">
          <p id="fullscreen-example-title" className="truncate text-base font-semibold">{style.name}</p>
          <p className="mt-0.5 text-[11px] text-white/60">完整預覽 · 雙指可縮放</p>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="關閉全螢幕預覽"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl"
        >
          ✕
        </button>
      </div>

      {!isTextOnly && <div className="mx-4 grid grid-cols-2 rounded-xl border border-white/15 bg-white/10 p-1">
        <button
          type="button"
          onClick={() => onExampleViewChange('input')}
          className={`min-h-11 rounded-lg px-3 py-2 text-sm transition ${exampleView === 'input' ? 'bg-white text-[#20211F]' : 'text-white/75'}`}
        >
          原始素材
        </button>
        <button
          type="button"
          onClick={() => onExampleViewChange('output')}
          className={`min-h-11 rounded-lg px-3 py-2 text-sm transition ${exampleView === 'output' ? 'bg-white text-[#20211F]' : 'text-white/75'}`}
        >
          提示詞效果
        </button>
      </div>}

      <div className="relative min-h-0 flex-1 overflow-hidden p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]" style={{ touchAction: 'pinch-zoom' }}>
        {isTextOnly || exampleView === 'output' ? (
          <div className="relative h-full w-full">
            <Image
              src={example.outputImage}
              alt={`${style.name}${isTextOnly ? '生成範例' : '提示詞效果'}完整預覽`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        ) : example.inputImages.length === 1 ? (
          <div className="relative h-full w-full">
            <Image
              src={example.inputImages[0]}
              alt={`${style.name}原始照片完整預覽`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2">
            {example.inputImages.map((src, index) => (
              <div key={src} className="relative min-h-0 overflow-hidden rounded-xl bg-white/5">
                <Image
                  src={src}
                  alt={`${style.name}原始素材 ${index + 1} 完整預覽`}
                  fill
                  sizes="50vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
