import Image from 'next/image'
import type { Style } from '../lib/types'
import { BeforeAfterComparison } from './BeforeAfterComparison'

type ExampleView = 'input' | 'output'

interface DesktopStyleInspectorProps {
  style?: Style
  exampleView: ExampleView
  isFavorite: boolean
  isGenerating: boolean
  generatedPrompt: string
  onExampleViewChange: (view: ExampleView) => void
  onToggleFavorite: (styleName: string) => void
  onGenerate: (style: Style) => void
  onCopy: () => void
}

export function DesktopStyleInspector({
  style,
  exampleView,
  isFavorite,
  isGenerating,
  generatedPrompt,
  onExampleViewChange,
  onToggleFavorite,
  onGenerate,
  onCopy,
}: DesktopStyleInspectorProps) {
  if (!style) return <aside className="hidden border-l border-white/10 bg-[#090909] lg:block" />

  const example = style.examples[0]

  return (
    <aside className="hidden border-l border-white/10 bg-[#090909] lg:flex lg:h-[calc(100vh-6rem)] lg:flex-col lg:overflow-y-auto">
      <div className="flex min-h-full flex-col">
        <div className="relative aspect-[4/3] bg-black">
          {example ? (
            example.inputImages.length === 1 ? (
              <BeforeAfterComparison key={style.name} beforeImage={example.inputImages[0]} afterImage={example.outputImage} styleName={style.name} />
            ) : exampleView === 'output' ? (
              <Image src={example.outputImage} alt={`${style.name}提示詞效果`} fill sizes="380px" className="object-cover" />
            ) : (
              <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                {example.inputImages.map((src, index) => (
                  <div key={src} className="relative overflow-hidden">
                    <Image src={src} alt={`${style.name}原始素材 ${index + 1}`} fill sizes="190px" className="object-cover" />
                  </div>
                ))}
              </div>
            )
          ) : (
            <Image src={style.cover} alt={style.name} fill sizes="380px" className="object-cover" />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {example && example.inputImages.length > 1 && (
            <div className="absolute left-4 right-4 top-4 grid grid-cols-2 rounded-full border border-white/15 bg-black/60 p-1 backdrop-blur-xl">
              <button onClick={() => onExampleViewChange('input')} className={`rounded-full px-3 py-2 text-xs ${exampleView === 'input' ? 'bg-white text-black' : 'text-white/65'}`}>原始素材</button>
              <button onClick={() => onExampleViewChange('output')} className={`rounded-full px-3 py-2 text-xs ${exampleView === 'output' ? 'bg-white text-black' : 'text-white/65'}`}>提示詞效果</button>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-2xl font-semibold">{style.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{style.summary}</p>
            </div>
            <button onClick={() => onToggleFavorite(style.name)} aria-label={isFavorite ? `取消收藏${style.name}` : `收藏${style.name}`} className="text-xl text-[#E7C76A]">{isFavorite ? '♥' : '♡'}</button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {style.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-zinc-400">{tag}</span>)}
          </div>

          <p className="mt-4 text-[11px] text-zinc-600">示範結果會依原始照片與使用的 AI 模型而異。</p>

          <button onClick={() => onGenerate(style)} disabled={isGenerating} className="mt-5 w-full rounded-2xl bg-lime-400 py-3.5 font-bold text-black disabled:opacity-60">
            {isGenerating ? '正在準備…' : '生成完整提示詞'}
          </button>

          <div className="mt-5 min-h-0 flex-1 rounded-2xl border border-white/10 bg-black/40 p-4">
            {generatedPrompt ? (
              <pre className="max-h-56 overflow-y-auto whitespace-pre-wrap break-words text-xs leading-6 text-zinc-300">{generatedPrompt}</pre>
            ) : (
              <p className="text-sm leading-relaxed text-zinc-600">選擇風格並生成後，完整提示詞會顯示在這裡。</p>
            )}
          </div>

          {generatedPrompt && <button onClick={onCopy} className="mt-3 w-full rounded-2xl bg-gradient-to-r from-[#FFF8E1] via-[#D4AF37] to-[#8B6B2E] py-3.5 text-sm font-bold text-black">複製提示詞</button>}
        </div>
      </div>
    </aside>
  )
}
