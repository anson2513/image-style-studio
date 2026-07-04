'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { DesktopStyleInspector } from '../components/DesktopStyleInspector'
import { MobileBottomNav } from '../components/MobileBottomNav'
import type { MobileLibraryView } from '../components/MobileBottomNav'
import { MobileStyleDetailSheet } from '../components/MobileStyleDetailSheet'
import { PromptOutput } from '../components/PromptOutput'
import { StyleCard } from '../components/StyleCard'
import { categories, filterStyles } from '../lib/categories'
import type { Category } from '../lib/categories'
import { buildPrompt } from '../lib/promptRouter'
import { readStoredStringList, storageKeys, writeStoredStringList } from '../lib/storage'
import { styles } from '../lib/styles'
import type { Style } from '../lib/types'

export default function AIPosterDirectorMVP() {
  const [selectedStyle, setSelectedStyle] = useState('日系電影感')
  const [selectedCategory, setSelectedCategory] = useState<Category>('🔥熱門')
  const [previewStyle, setPreviewStyle] = useState<Style | null>(null)
  const [exampleView, setExampleView] = useState<'input' | 'output'>('output')
  const [favorites, setFavorites] = useState<string[]>([])
  const [recentStyles, setRecentStyles] = useState<string[]>([])
  const [mobileLibraryView, setMobileLibraryView] = useState<MobileLibraryView>('library')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [storageReady, setStorageReady] = useState(false)
  
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [showMainUI, setShowMainUI] = useState(false)
  const promptOutputRef = useRef<HTMLDivElement>(null)

  const filteredStyles = useMemo(
    () => filterStyles(styles, selectedCategory, favorites),
    [selectedCategory, favorites]
  )

  const displayedStyles = useMemo(() => {
    const baseStyles = mobileLibraryView === 'favorites'
      ? styles.filter((style) => favorites.includes(style.name))
      : mobileLibraryView === 'recent'
        ? recentStyles
            .map((name) => styles.find((style) => style.name === name))
            .filter((style): style is Style => Boolean(style))
        : filteredStyles

    const normalizedQuery = searchQuery.trim().toLocaleLowerCase('zh-Hant')
    if (!normalizedQuery) return baseStyles

    return baseStyles.filter((style) =>
      [style.name, style.summary, style.desc, ...style.tags]
        .join(' ')
        .toLocaleLowerCase('zh-Hant')
        .includes(normalizedQuery)
    )
  }, [favorites, filteredStyles, mobileLibraryView, recentStyles, searchQuery])

  const activeStyle = useMemo(
    () => styles.find((s) => s.name === selectedStyle),
    [selectedStyle]
  )
  const inspectorStyle = previewStyle || activeStyle

  const handleGeneratePrompt = async (styleOverride?: Style) => {
    const styleToUse = styleOverride || activeStyle
    if (!styleToUse) return

    setRecentStyles((previous) => [
      styleToUse.name,
      ...previous.filter((name) => name !== styleToUse.name),
    ].slice(0, 12))
    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    setGeneratedPrompt(buildPrompt(styleToUse))
    setIsGenerating(false)

    window.requestAnimationFrame(() => {
      promptOutputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
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
    const hydrationTimer = window.setTimeout(() => {
      const validStyleNames = new Set(styles.map((style) => style.name))
      setFavorites(readStoredStringList(storageKeys.favorites).filter((name) => validStyleNames.has(name)))
      setRecentStyles(readStoredStringList(storageKeys.recentStyles).filter((name) => validStyleNames.has(name)))
      setStorageReady(true)
    }, 0)

    return () => window.clearTimeout(hydrationTimer)
  }, [])

  useEffect(() => {
    if (!storageReady) return
    writeStoredStringList(storageKeys.favorites, favorites)
  }, [favorites, storageReady])

  useEffect(() => {
    if (!storageReady) return
    writeStoredStringList(storageKeys.recentStyles, recentStyles)
  }, [recentStyles, storageReady])

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
        <div className="min-h-screen w-full bg-[#070707] pb-20 text-white overflow-x-hidden lg:pb-0">
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <p className="text-[10px] tracking-[0.45em] uppercase text-[#8B6B2E] mb-1">
          AI 修圖風格工作台
        </p>

        <p className="text-2xl font-semibold tracking-[0.18em] bg-gradient-to-r from-[#FFF8E1] via-[#D4AF37] to-[#8B6B2E] bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(212,175,55,0.42)]">
          影像風格室
        </p>
      </div>

      <div className="flex min-h-screen w-full flex-col overflow-x-hidden pt-20 lg:grid lg:grid-cols-[260px_minmax(0,1fr)_380px] lg:pt-24">
      <div className="hidden border-r border-white/10 bg-black p-5 lg:flex lg:h-[calc(100vh-6rem)] lg:flex-col lg:overflow-y-auto">
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

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600 mb-4">
            Style Library
          </p>

          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setMobileLibraryView(category === '收藏' ? 'favorites' : 'library')
                  setSelectedCategory(category)
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${selectedCategory === category ? 'bg-white/10 text-white' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}
              >
                {category}
                {category === '收藏' && <span className="text-xs">{favorites.length}</span>}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setMobileLibraryView('recent')}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${mobileLibraryView === 'recent' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}
            >
              最近使用
              <span className="text-xs">{recentStyles.length}</span>
            </button>
          </div>
        </div>
      </div>

      <main className="w-full min-w-0 bg-[#0d0d0d] p-4 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto lg:p-7">
        <div className="w-full max-w-6xl mx-auto">
          <PromptOutput containerRef={promptOutputRef} prompt={generatedPrompt} isGenerating={isGenerating} onCopy={handleCopy} />
                  <div className="mt-8 border-t border-white/10 pt-5 lg:mt-0 lg:border-t-0 lg:pt-0">
            <div className="flex gap-6 overflow-x-auto pb-4 text-sm text-zinc-400 whitespace-nowrap lg:hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setMobileLibraryView(category === '收藏' ? 'favorites' : 'library')
                    setSelectedCategory(category)
                  }}
                  className={`transition-all ${selectedCategory === category ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-sm text-zinc-400">
                {mobileLibraryView === 'favorites' ? '我的收藏' : mobileLibraryView === 'recent' ? '最近使用' : selectedCategory}
                <span className="ml-2 text-xs text-zinc-600">{displayedStyles.length}</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen((open) => !open)
                  if (searchOpen) setSearchQuery('')
                }}
                aria-expanded={searchOpen}
                aria-controls="style-search-panel"
                className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs text-zinc-300 transition hover:bg-white/10"
              >
                <span aria-hidden="true">⌕</span>
                搜尋
              </button>
            </div>

            {searchOpen && (
              <div id="style-search-panel" className="mt-3">
                <label htmlFor="style-search" className="sr-only">搜尋風格</label>
                <input
                  id="style-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="搜尋名稱、標籤或風格描述"
                  autoFocus
                  className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#D4AF37]/50"
                />
              </div>
            )}

            <div aria-live="polite" className="sr-only">目前顯示 {displayedStyles.length} 個風格</div>

            {displayedStyles.length === 0 ? (
              <div className="mt-5 rounded-[24px] border border-dashed border-white/10 px-6 py-12 text-center">
                <p className="text-sm text-zinc-400">
                  {searchQuery ? '找不到符合的風格' : mobileLibraryView === 'favorites' ? '尚未收藏任何風格' : '尚無最近使用紀錄'}
                </p>
              </div>
            ) : (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:gap-5">
              {displayedStyles.map((style) => (
                <StyleCard
                  key={style.name}
                  style={style}
                  isFavorite={favorites.includes(style.name)}
                  onOpen={(nextStyle) => {
                    setExampleView(nextStyle.examples.length > 0 ? 'output' : 'input')
                    setPreviewStyle(nextStyle)
                  }}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
            )}
          </div>
        </div>
      </main>

      <DesktopStyleInspector
        style={inspectorStyle}
        exampleView={exampleView}
        isFavorite={inspectorStyle ? favorites.includes(inspectorStyle.name) : false}
        isGenerating={isGenerating}
        generatedPrompt={generatedPrompt}
        onExampleViewChange={setExampleView}
        onToggleFavorite={toggleFavorite}
        onGenerate={(style) => {
          setSelectedStyle(style.name)
          handleGeneratePrompt(style)
        }}
        onCopy={handleCopy}
      />

      {previewStyle && (
        <MobileStyleDetailSheet
          style={previewStyle}
          exampleView={exampleView}
          isFavorite={favorites.includes(previewStyle.name)}
          isGenerating={isGenerating}
          onClose={() => setPreviewStyle(null)}
          onExampleViewChange={setExampleView}
          onToggleFavorite={toggleFavorite}
          onGenerate={(style) => {
            setSelectedStyle(style.name)
            setPreviewStyle(null)
            handleGeneratePrompt(style)
          }}
        />
      )}

      <MobileBottomNav
        activeView={mobileLibraryView}
        onChange={(view) => {
          setMobileLibraryView(view)
          setSearchQuery('')
          setSearchOpen(false)
          if (view === 'library' && selectedCategory === '收藏') setSelectedCategory('🔥熱門')
        }}
      />
    </div>
  </div>
</div>
    </>
  )
}
