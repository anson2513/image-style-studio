'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { DesktopStyleInspector } from '../components/DesktopStyleInspector'
import { MobileBottomNav } from '../components/MobileBottomNav'
import type { MobileLibraryView } from '../components/MobileBottomNav'
import { MobileStyleDetailSheet } from '../components/MobileStyleDetailSheet'
import { PromptOutput } from '../components/PromptOutput'
import { SplashScreen } from '../components/SplashScreen'
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
    document.documentElement.style.backgroundColor = '#F6F4EF'
    document.body.style.backgroundColor = '#F6F4EF'

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
        <SplashScreen />
      )}

      <div
        className={`transition-opacity duration-700 ${
          showMainUI
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="min-h-screen w-full overflow-x-hidden bg-[#F6F4EF] pb-20 text-[#20211F] lg:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between border-b border-[#DEDCD5] bg-[#F6F4EF] px-5 lg:px-7">
        <div>
          <p className="text-xl font-semibold tracking-[0.12em]">影像風格室</p>
          <p className="mt-0.5 hidden text-[10px] font-medium tracking-[0.18em] text-[#7C8B72] sm:block">AI 修圖風格工作台</p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="搜尋風格" onClick={() => setSearchOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center rounded-full text-2xl text-[#3E403C] hover:bg-[#ECEAE4]">⌕</button>
          <button type="button" aria-label="查看收藏" onClick={() => setMobileLibraryView('favorites')} className="flex h-11 w-11 items-center justify-center rounded-full text-2xl text-[#3E403C] hover:bg-[#ECEAE4]">♡</button>
        </div>
      </header>

      <div className="flex min-h-screen w-full flex-col overflow-x-hidden pt-[72px] lg:grid lg:grid-cols-[240px_minmax(0,1fr)_380px]">
      <div className="hidden border-r border-[#DEDCD5] bg-[#F6F4EF] p-5 lg:flex lg:h-[calc(100vh-4.5rem)] lg:flex-col lg:overflow-y-auto">
        <p className="mb-3 text-xs font-medium tracking-[0.16em] text-[#8B8D87]">瀏覽</p>
        <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setMobileLibraryView(category === '收藏' ? 'favorites' : 'library')
                  setSelectedCategory(category)
                }}
                className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${selectedCategory === category && mobileLibraryView !== 'recent' ? 'bg-[#E4E2DB] font-medium text-[#20211F]' : 'text-[#6F726C] hover:bg-[#ECEAE4]'}`}
              >
                {category}
                {category === '收藏' && <span className="text-xs">{favorites.length}</span>}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setMobileLibraryView('recent')}
              className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${mobileLibraryView === 'recent' ? 'bg-[#E4E2DB] font-medium text-[#20211F]' : 'text-[#6F726C] hover:bg-[#ECEAE4]'}`}
            >
              最近使用
              <span className="text-xs">{recentStyles.length}</span>
            </button>
        </div>
        <p className="mt-auto pt-8 text-xs tracking-[0.1em] text-[#8B8D87]">開發者 By ANSON</p>
        </div>

      <main className="w-full min-w-0 bg-[#F6F4EF] p-4 lg:h-[calc(100vh-4.5rem)] lg:overflow-y-auto lg:p-7">
        <div className="w-full max-w-6xl mx-auto">
          <PromptOutput containerRef={promptOutputRef} prompt={generatedPrompt} isGenerating={isGenerating} onCopy={handleCopy} />
                  <div className="mt-8 pt-2 lg:mt-0 lg:pt-0">
            <div className="flex gap-2 overflow-x-auto pb-4 text-sm whitespace-nowrap lg:hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setMobileLibraryView(category === '收藏' ? 'favorites' : 'library')
                    setSelectedCategory(category)
                  }}
                  className={`min-h-11 rounded-full border px-4 transition-all ${selectedCategory === category ? 'border-[#7C8B72] bg-[#7C8B72] text-white' : 'border-[#DEDCD5] bg-white text-[#5F625D]'}`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-[#454742]">
                {mobileLibraryView === 'favorites' ? '我的收藏' : mobileLibraryView === 'recent' ? '最近使用' : selectedCategory}
                <span className="ml-2 text-xs text-[#9A9C96]">{displayedStyles.length}</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen((open) => !open)
                  if (searchOpen) setSearchQuery('')
                }}
                aria-expanded={searchOpen}
                aria-controls="style-search-panel"
                className="flex h-11 items-center gap-2 rounded-full border border-[#DEDCD5] bg-white px-4 text-xs text-[#5F625D] transition hover:bg-[#ECEAE4]"
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
                  className="w-full rounded-2xl border border-[#D8D6CF] bg-white px-4 py-3 text-sm text-[#20211F] outline-none placeholder:text-[#A0A29C] focus:border-[#7C8B72]"
                />
              </div>
            )}

            <div aria-live="polite" className="sr-only">目前顯示 {displayedStyles.length} 個風格</div>

            {displayedStyles.length === 0 ? (
              <div className="mt-5 rounded-3xl border border-dashed border-[#D8D6CF] bg-white/50 px-6 py-12 text-center">
                <p className="text-sm text-[#74766F]">
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
