import Image from 'next/image'
import type { Style } from '../lib/types'

interface StyleCardProps {
  style: Style
  isFavorite: boolean
  onOpen: (style: Style) => void
  onToggleFavorite: (styleName: string) => void
}

export function StyleCard({ style, isFavorite, onOpen, onToggleFavorite }: StyleCardProps) {
  const previewImage = style.examples[0]?.outputImage ?? style.cover

  return (
    <article className="group relative min-w-0 overflow-hidden rounded-2xl border border-[#DEDCD5] bg-white shadow-[0_2px_12px_rgba(32,33,31,0.04)]">
      <button
        type="button"
        onClick={() => onOpen(style)}
        aria-label={`查看${style.name}詳情`}
        className="block w-full text-left"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E5DE]">
          <Image
            src={previewImage}
            alt=""
            fill
            sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 1024px) 50vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain transition duration-500 group-hover:scale-[1.015]"
          />
        </div>

        <div className="min-h-[68px] p-3.5 text-left lg:min-h-[82px] lg:p-4">
          <p className="pr-8 text-sm font-semibold leading-tight text-[#20211F] lg:text-base">{style.name}</p>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-[#74766F] lg:text-xs">{style.summary}</p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onToggleFavorite(style.name)}
        aria-label={isFavorite ? `取消收藏${style.name}` : `收藏${style.name}`}
        aria-pressed={isFavorite}
        className={`absolute bottom-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full text-lg transition lg:bottom-4 lg:right-4 ${
          isFavorite
            ? 'bg-[#F6EFE2] text-[#C38A2E]'
            : 'bg-transparent text-[#5F625D] hover:bg-[#F0EEE8]'
        }`}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
    </article>
  )
}
