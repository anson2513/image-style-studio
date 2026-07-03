'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { categories, filterStyles } from '../lib/categories'
import type { Category } from '../lib/categories'
import { buildPrompt } from '../lib/promptRouter'
import { styles } from '../lib/styles'
import type { Style } from '../lib/types'


export default function AIPosterDirectorMVP() {
  const [selectedStyle, setSelectedStyle] = useState('日系電影感')
  const [selectedCategory, setSelectedCategory] = useState<Category>('🔥熱門')
  const [previewStyle, setPreviewStyle] = useState<Style | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [showSplash, setShowSplash] = useState(true)
  const [showMainUI, setShowMainUI] = useState(false)

  const filteredStyles = useMemo(
    () => filterStyles(styles, selectedCategory, favorites),
    [selectedCategory, favorites]
  )

  const activeStyle = useMemo(
    () => styles.find((s) => s.name === selectedStyle),
    [selectedStyle]
  )

  const handleGeneratePrompt = async (styleOverride?: Style) => {
    const styleToUse = styleOverride || activeStyle

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    )

    setGeneratedPrompt(buildPrompt(styleToUse))
  }

  useEffect(() => {
    document.documentElement.style.backgroundColor = '#050505'
    document.body.style.backgroundColor = '#050505'

    return () => {
      document.documentElement.style.backgroundColor = ''
      document.body.style.backgroundColor = ''
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = showSplash ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [showSplash])

  useEffect(() => {
    const splashStorageKey = 'image-style-studio-splash-v1'
    let hasSeenSplash = false

    try {
      hasSeenSplash = window.localStorage.getItem(splashStorageKey) === 'seen'
    } catch {
      hasSeenSplash = false
    }

    const splashDuration = hasSeenSplash ? 800 : 2200
    let mainUiTimer: ReturnType<typeof setTimeout> | undefined

    const splashTimer = setTimeout(() => {
      setShowSplash(false)

      try {
        window.localStorage.setItem(splashStorageKey, 'seen')
      } catch {
        // The splash still works when browser storage is unavailable.
      }

      mainUiTimer = setTimeout(() => {
        setShowMainUI(true)
      }, 300)
    }, splashDuration)

    return () => {
      clearTimeout(splashTimer)

      if (mainUiTimer) clearTimeout(mainUiTimer)
    }
  }, [])

  const toggleFavorite = (styleName: string) => {
    setFavorites((prev) =>
      prev.includes(styleName)
        ? prev.filter((name) => name !== styleName)
        : [...prev, styleName]
    )
  }

  const handleCopy = async () => {
    if (!generatedPrompt) return

    await navigator.clipboard.writeText(generatedPrompt)

    alert('提示詞已複製')
  }

  

  return (
    <>
      {showSplash && (
        <div className="fixed inset-0 z-[999] bg-black overflow-hidden">
          <Image
            src="/image-style-studio-splash.png"
            alt="影像風格室 — AI 修圖風格工作台，開發者 By Anson"
            fill
            preload
            sizes="100vw"
            className="object-cover lg:object-contain select-none"
          />
        </div>
      )}

      <div
        className={`transition-all duration-1000 ${
          showMainUI
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="min-h-screen w-full bg-[#070707] text-white overflow-x-hidden">
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <p className="text-[10px] tracking-[0.45em] uppercase text-[#8B6B2E] mb-1">
          AI 修圖風格工作台
        </p>

        <p className="text-2xl font-semibold tracking-[0.18em] bg-gradient-to-r from-[#FFF8E1] via-[#D4AF37] to-[#8B6B2E] bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(212,175,55,0.42)]">
          影像風格室
        </p>
      </div>

      <div className="flex flex-col lg:flex-row pt-20 lg:pt-24 w-full overflow-x-hidden min-h-screen">
      <div className="w-full lg:w-[360px] lg:min-w-[360px] lg:h-screen border-b lg:border-b-0 lg:border-r border-white/10 bg-black p-4 lg:p-6 flex flex-col overflow-y-auto shrink-0">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] tracking-[0.42em] uppercase bg-gradient-to-r from-[#C7D2FE] via-[#A5B4FC] to-[#818CF8] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(129,140,248,0.18)]">
                AI 修圖風格工作台
              </p>

              <p className="text-sm mt-2 tracking-[0.18em] text-zinc-500">
                <span className="bg-gradient-to-r from-[#E5E7EB] via-[#CBD5E1] to-[#94A3B8] bg-clip-text text-transparent">
                  開發者 By Anson
                </span>
              </p>
            </div>

            </div>

          <h1 className="text-2xl lg:text-4xl font-semibold leading-tight mt-4">
            為你的照片
            <span className="text-zinc-500 block">
              選擇下一種視覺風格
            </span>
          </h1>
        </div>

        <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.03] p-5 lg:p-6">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-2xl mb-5">
            ✦
          </div>

          <p className="text-lg font-medium mb-2">
            AI 修圖風格提示詞
          </p>

          <p className="text-sm text-zinc-500 leading-relaxed">
            選擇適合照片的視覺方向，取得完整 AI 修圖提示詞，再搭配原始照片交給 AI 使用。
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600 mb-4">
            App Vision
          </p>

          <div className="space-y-2 text-sm text-zinc-300 leading-relaxed">
            <p>✓ 影像風格探索</p>
            <p>✓ 真實提示詞效果示範</p>
            <p>✓ 原始照片與效果比較</p>
            <p>✓ 完整 AI 修圖提示詞</p>
            <p>✓ 手機與電腦響應式使用</p>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 bg-[#0d0d0d] p-4 lg:p-10 overflow-x-hidden">
        <div className="w-full max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-zinc-600 mb-4">
            Prompt Output
          </p>

          <div className="flex items-center justify-between gap-3 mb-4 lg:mb-6">
            <h2 className="text-2xl lg:text-5xl font-semibold leading-tight">
              AI 電影感提示詞生成器
            </h2>
          </div>          <div className="w-full rounded-[28px] lg:rounded-[36px] border border-white/10 bg-black/40 backdrop-blur-xl p-4 lg:p-8 min-h-[220px] lg:min-h-[320px] relative overflow-hidden">
            {!generatedPrompt ? (
              <div className="h-full flex items-center justify-center text-zinc-600 text-base lg:text-lg text-center px-4">
                你的 AI 電影級提示詞將顯示在這裡
              </div>
            ) : (
              <>
                <pre className="w-full whitespace-pre-wrap break-words text-xs lg:text-sm leading-7 lg:leading-8 text-zinc-200 overflow-x-auto">
                  {generatedPrompt}
                </pre>

                <button
                  onClick={handleCopy}
                  className="mt-6 lg:absolute lg:top-6 lg:right-6 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFF8E1] via-[#D4AF37] to-[#8B6B2E] text-black px-5 py-3 text-sm font-bold shadow-[0_0_38px_rgba(212,175,55,0.38)] hover:scale-[1.04] transition-all w-full lg:w-auto border border-[#F3D98B]/40 before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)] before:translate-x-[-120%] hover:before:translate-x-[120%] before:transition-transform before:duration-1000"
                >
                  複製提示詞
                </button>
              </>
            )}
          </div>
                  <div className="mt-8 lg:mt-10 border-t border-white/10 pt-5 lg:pt-6">
            <div className="flex gap-6 overflow-x-auto pb-4 text-sm text-zinc-400 whitespace-nowrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all ${selectedCategory === category ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-5 flex gap-4 overflow-x-scroll pb-2 snap-x snap-mandatory scrollbar-hide touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] cursor-grab active:cursor-grabbing">
              {filteredStyles.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setPreviewStyle(style)}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    toggleFavorite(style.name)
                  }}
                  onTouchStart={() => {
                    const timer = setTimeout(() => {
                      toggleFavorite(style.name)
                    }, 650)

                    const clear = () => clearTimeout(timer)

                    window.addEventListener('touchend', clear, {
                      once: true,
                    })
                  }}
                  className="relative min-w-[150px] w-[150px] sm:min-w-[170px] sm:w-[170px] lg:min-w-[220px] lg:w-[220px] aspect-[3/4] rounded-[26px] overflow-hidden border border-white/10 snap-start group shrink-0"
                >
                  <Image
                    src={style.cover}
                    alt={style.name}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 170px, 150px"
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] tracking-[0.25em] uppercase text-white/80">
                    Cinematic
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <p className="text-sm lg:text-lg font-semibold mb-1 leading-tight">{style.name}</p>
                    <p className="text-[11px] lg:text-xs text-zinc-300">{style.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {previewStyle && (
        <div className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-xl flex items-end sm:items-center justify-center p-3 lg:p-4 overflow-y-auto">
          <div className="relative w-full max-w-md rounded-[32px] lg:rounded-[36px] overflow-hidden border border-white/10 bg-[#0b0b0b] mb-safe">
            <button
              onClick={() => setPreviewStyle(null)}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/50 text-white"
            >
              ✕
            </button>

            <div className="relative h-[72vh] sm:h-[78vh] overflow-hidden bg-black">
              <Image
                src={previewStyle.cover}
                alt={previewStyle.name}
                fill
                sizes="(max-width: 640px) 100vw, 448px"
                className="object-cover scale-[1.08]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-4xl font-bold leading-tight mb-3">
                  {previewStyle.name}
                </p>

                <p className="text-zinc-300 text-sm leading-relaxed">
                  {previewStyle.desc}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <button
                onClick={() => toggleFavorite(previewStyle.name)}
                className="w-full rounded-2xl border border-[#F3D98B]/30 bg-gradient-to-br from-[#FFF8E1]/10 via-[#D4AF37]/10 to-[#8B6B2E]/10 py-4 text-sm tracking-[0.18em] uppercase text-[#E7C76A] backdrop-blur-xl"
              >
                {favorites.includes(previewStyle.name)
                  ? '已加入收藏庫'
                  : '加入收藏庫'}
              </button>
              <button
                onClick={() => {
                  setSelectedStyle(previewStyle.name)
                  setPreviewStyle(null)
                  handleGeneratePrompt(previewStyle)
                }}
                className="w-full rounded-2xl bg-lime-400 text-black py-4 lg:py-5 font-bold text-base lg:text-lg shadow-[0_0_40px_rgba(163,230,53,0.25)] active:scale-[0.98] transition-all"
              >
                生成提示詞
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
    </>
  )
}
