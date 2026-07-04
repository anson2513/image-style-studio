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
  if (!style) return <aside className="hidden border-l border-[#DEDCD5] bg-[#F6F4EF] lg:block" />

  const example = style.examples[0]

  return (
    <aside className="hidden border-l border-[#DEDCD5] bg-[#F6F4EF] text-[#20211F] lg:flex lg:h-[calc(100vh-4.5rem)] lg:flex-col lg:overflow-y-auto">
      <div className="flex min-h-full flex-col">
        <div className="relative aspect-[4/3] bg-[#E8E5DE]">
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

          {example && example.inputImages.length > 1 && (
            <div className="absolute left-4 right-4 top-4 grid grid-cols-2 rounded-xl border border-[#D8D6CF] bg-white p-1 shadow-sm">
              <button onClick={() => onExampleViewChange('input')} className={`rounded-lg px-3 py-2 text-xs ${exampleView === 'input' ? 'bg-[#7C8B72] text-white' : 'text-[#5F625D]'}`}>原始素材</button>
              <button onClick={() => onExampleViewChange('output')} className={`rounded-lg px-3 py-2 text-xs ${exampleView === 'output' ? 'bg-[#7C8B72] text-white' : 'text-[#5F625D]'}`}>提示詞效果</button>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-2xl font-semibold">{style.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6F726C]">{style.summary}</p>
            </div>
            <button onClick={() => onToggleFavorite(style.name)} aria-label={isFavorite ? `取消收藏${style.name}` : `收藏${style.name}`} className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-[#C38A2E] hover:bg-[#EEECE6]">{isFavorite ? '♥' : '♡'}</button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {style.tags.map((tag) => <span key={tag} className="rounded-full bg-[#E6E9E1] px-3 py-1 text-xs text-[#64725C]">{tag}</span>)}
          </div>

          <p className="mt-4 text-[11px] text-[#8B8D87]">示範結果會依原始照片與使用的 AI 模型而異。</p>

          <button onClick={() => onGenerate(style)} disabled={isGenerating} className="mt-5 w-full rounded-2xl bg-[#7C8B72] py-3.5 font-bold text-white transition hover:bg-[#64725C] disabled:opacity-60">
            {isGenerating ? '正在準備…' : '取得完整提示詞'}
          </button>

          <div className="mt-5 min-h-0 flex-1 rounded-2xl border border-[#DEDCD5] bg-white p-4">
            {generatedPrompt ? (
              <pre className="max-h-56 overflow-y-auto whitespace-pre-wrap break-words text-xs leading-6 text-[#454742]">{generatedPrompt}</pre>
            ) : (
              <p className="text-sm leading-relaxed text-[#9A9C96]">選擇風格後，完整提示詞會顯示在這裡。</p>
            )}
          </div>

          {generatedPrompt && <button onClick={onCopy} className="mt-3 w-full rounded-2xl bg-[#7C8B72] py-3.5 text-sm font-bold text-white transition hover:bg-[#64725C]">複製提示詞</button>}
        </div>
      </div>
    </aside>
  )
}
