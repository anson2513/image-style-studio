'use client'

import Image from 'next/image'
import { useState } from 'react'

interface BeforeAfterComparisonProps {
  beforeImage: string
  afterImage: string
  styleName: string
}

export function BeforeAfterComparison({
  beforeImage,
  afterImage,
  styleName,
}: BeforeAfterComparisonProps) {
  const [position, setPosition] = useState(50)

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <Image
        src={afterImage}
        alt={`${styleName}提示詞效果`}
        fill
        sizes="380px"
        className="object-cover"
      />

      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="relative h-full" style={{ width: `${10000 / position}%` }}>
          <Image
            src={beforeImage}
            alt={`${styleName}原始照片`}
            fill
            sizes="380px"
            className="object-cover object-left"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_12px_rgba(0,0,0,0.7)]" style={{ left: `${position}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/65 text-xs text-white backdrop-blur-xl">
          ↔
        </span>
      </div>

      <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[10px] text-white/80 backdrop-blur-xl">原始照片</span>
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/65 px-3 py-1 text-[10px] text-white/80 backdrop-blur-xl">提示詞效果</span>

      <label className="sr-only" htmlFor={`comparison-${styleName}`}>調整原始照片與提示詞效果比較範圍</label>
      <input
        id={`comparison-${styleName}`}
        type="range"
        min="5"
        max="95"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}
