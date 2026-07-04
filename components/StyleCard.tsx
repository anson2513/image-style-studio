import Image from 'next/image'
import type { Style } from '../lib/types'

interface StyleCardProps {
  style: Style
  isFavorite: boolean
  onOpen: (style: Style) => void
  onToggleFavorite: (styleName: string) => void
}

export function StyleCard({ style, isFavorite, onOpen, onToggleFavorite }: StyleCardProps) {
  return (
    <article className="group relative aspect-[3/4] min-w-0 overflow-hidden rounded-[22px] border border-white/10 bg-black lg:rounded-[26px]">
      <button
        type="button"
        onClick={() => onOpen(style)}
        aria-label={`查看${style.name}詳情`}
        className="absolute inset-0 text-left"
      >
        <Image
          src={style.cover}
          alt=""
          fill
          sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 1024px) 50vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-3.5 text-left lg:p-5">
          <p className="text-sm font-semibold leading-tight lg:text-lg">{style.name}</p>
          <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-zinc-300 lg:text-xs">{style.summary}</p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onToggleFavorite(style.name)}
        aria-label={isFavorite ? `取消收藏${style.name}` : `收藏${style.name}`}
        aria-pressed={isFavorite}
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border text-base backdrop-blur-xl transition lg:right-4 lg:top-4 ${
          isFavorite
            ? 'border-[#E7C76A]/60 bg-[#D4AF37] text-black'
            : 'border-white/15 bg-black/45 text-white/80 hover:bg-white hover:text-black'
        }`}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
    </article>
  )
}
