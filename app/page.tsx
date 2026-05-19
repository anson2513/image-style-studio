'use client'

import { useEffect, useMemo, useState } from 'react'

export default function AIPosterDirectorMVP() {
  const [selectedStyle, setSelectedStyle] =
    useState('日系電影感')

  const [selectedCategory, setSelectedCategory] =
    useState('🔥熱門')

  const [previewStyle, setPreviewStyle] =
    useState<any>(null)

  const [favorites, setFavorites] = useState<
    string[]
  >([])

  const [generatedPrompt, setGeneratedPrompt] =
    useState('')

  const [isGenerating, setIsGenerating] =
    useState(false)

  const [showSplash, setShowSplash] =
    useState(true)

  const [showMainUI, setShowMainUI] =
    useState(false)

  const movieBasePrompt =
    '請根據使用者提供的主題、自動分析最適合的場景類型、人物氣質、拍攝氛圍、服裝風格、建築元素、空間層次、鏡頭語言、光影方向、色彩配置與畫面情緒，延伸設計成具有高級感的電影海報、品牌形象廣告、時尚雜誌封面或 cinematic editorial poster 風格作品。整體畫面必須完整保留原始構圖、人物位置、鏡頭角度、空間比例、透視結構、景深層次與光影方向，不可擅自改變場景配置或重新設計構圖。AI 僅可在原始畫面基礎上，自然加入適合氛圍的高級設計元素，例如大型 typography、電影標題、品牌標語、雜誌編排、幾何圖形、膠片顆粒、色彩分級、光影特效、紙張質感、霓虹光效、雙重曝光、潮流視覺元素與 cinematic atmosphere。整體需具有 premium commercial design、editorial poster aesthetic、fashion magazine layout、cinematic visual atmosphere、ultra detailed texture、8K resolution、award-winning cinematic composition 與國際精品品牌海報完成度。'

  const illustrationBasePrompt =
    '請根據使用者提供的照片與主題，自動分析人物氣質、生活氛圍、畫面情緒、空間關係與色彩感受，並延伸設計成具有高級感的手繪插畫、藝術繪本、生活速寫、極簡漫畫或文青視覺風格作品。整體需完整保留原始照片構圖、人物位置、空間比例與互動關係，不可擅自重新設計場景。AI 應專注於手繪筆觸、紙張紋理、插畫氛圍、留白設計、生活感與藝術觀察感，而非電影海報式 commercial poster。'

  const travelBasePrompt =
    '請根據使用者提供的照片，自動分析城市氛圍、街道節奏、建築特色、旅行感受、色彩記憶與空間視角，延伸設計成具有高級感的城市旅遊雜誌、旅行手帳、生活風格刊物或 urban editorial visual。整體需保留原始街景、建築位置、透視關係與人物互動，強調真實旅行感、城市空氣感、文化觀察與高級 editorial layout。'

  const spaceBasePrompt =
    '請根據使用者提供的照片，自動分析空間層次、地景尺度、環境光影、建築關係與視覺動線，延伸生成具有 cinematic atmosphere 的空間敘事視覺。整體需保留原始場景結構與主體位置，強調壯闊感、空間感、光影深度、HDR 氛圍、空拍敘事與電影級視覺沉浸感。'

  const categories = [
    '收藏',
    '🔥熱門',
    '電影宇宙',
    '手繪插畫',
    '城市旅遊',
    '空間敘事',
    '食物美學',
  ]

  const styles = [
    {
      category: '🔥熱門',
      cover: '/covers/japanese-cinema.jpg',
      name: '日系電影感',
      desc: '新海誠天空 × 青春電影感',
      prompt:
        '一張高質感日系動畫電影海報風插畫，完整保留原始照片構圖、人物位置、鏡頭角度與場景結構，整體轉化為 anime cinematic illustration 與 Japanese movie poster aesthetic 的 cinematic visual。加入 soft natural volumetric lighting、dreamy realism、nostalgic anime movie poster 氛圍、細膩空氣感、藍橘電影色調、情緒化天空、超高級光影與 premium editorial layout，畫面具有濃厚青春電影感與高級動畫電影海報質感。',
    },

    {
      category: '食物美學',
      cover: '/covers/food-poster-design.jpg',
      name: '食物海報設計',
      desc: 'Lifestyle Food Editorial',
      prompt: `請根據我上傳／選取的真實食物照片，自動分析畫面中的主體內容、食物種類、甜點、飲品、咖啡、冰品、零食、餐點、器皿、托盤、餐具、配件、背景材質、桌面環境、光線方向、色彩關係、食物質感與構圖特徵，並重構為「韓系極簡生活感 × 日系 editorial food photography aesthetic」風格的高級日常食物分享海報。

整體氛圍不是商業廣告，而是：
「一般人今天吃到喜歡的食物，忍不住拍下來分享到 IG / 小紅書 / 社群」的生活感 aesthetic food post。

畫面需保留：
高級感、文青感、生活感、設計感、日常分享氛圍。

避免：
過度商業化、品牌 campaign 感、餐廳宣傳感、商品型錄感、菜單設計感。

整體風格方向：
Korean minimal lifestyle、
Japanese café aesthetic、
Muji aesthetic、
daily life photography、
Instagram food diary、
soft editorial still life、
quiet luxury daily life、
warm everyday food moment、
human-centered food photography、
contemporary lifestyle poster。

【最重要的氛圍核心】

The overall image should feel like a beautifully captured daily food moment shared by a normal person on social media, not a commercial food advertisement or restaurant campaign.

The atmosphere should feel:
warm,
quiet,
casual,
comforting,
human,
authentic,
aesthetic,
cozy,
minimal,
and naturally beautiful。

整體最終效果像：

「IG 文青食物分享 × 小紅書生活 aesthetic × 韓系生活感攝影 × 日系 editorial food magazine × 高級日常 food diary visual」。`,
    },

    {
      cover: '/covers/luxury-editorial.jpg',
      name: '精品時尚感',
      desc: 'Luxury Editorial',
      prompt:
        '一張高級精品雜誌封面風格插畫，完整保留原始照片構圖與人物姿態，加入精品品牌廣告視覺、極簡留白、莫蘭迪色調、高級時尚排版、柔和陰影與 editorial photography 氛圍，整體具有精品廣告與 Vogue 雜誌封面質感。',
    },
  ]

  const filteredStyles = useMemo(() => {
    if (selectedCategory === '🔥熱門')
      return styles

    if (selectedCategory === '收藏') {
      return styles.filter((s) =>
        favorites.includes(s.name)
      )
    }

    if (selectedCategory === '食物美學') {
      return styles.filter((s) =>
        ['食物海報設計'].includes(s.name)
      )
    }

    return styles
  }, [selectedCategory, favorites])

  const activeStyle = useMemo(
    () =>
      styles.find(
        (s) => s.name === selectedStyle
      ),
    [selectedStyle]
  )

  const handleGeneratePrompt = async (
    styleOverride?: any
  ) => {
    const styleToUse =
      styleOverride || activeStyle

    let basePromptToUse = movieBasePrompt

    // 食物海報設計 不套 base prompt
    if (
      styleToUse?.name === '食物海報設計'
    ) {
      basePromptToUse = ''
    }

    // 插畫宇宙
    else if (
      [
        '水彩插畫風',
        '彩色蠟筆手繪插畫',
        '極簡留白童話速寫',
        '手繪風註解日誌',
      ].includes(styleToUse?.name)
    ) {
      basePromptToUse =
        illustrationBasePrompt
    }

    // 城市旅遊宇宙
    else if (
      [
        '高級旅遊雜誌風',
        '城市旅繪日誌',
        'Colorwalk 城市漫遊',
      ].includes(styleToUse?.name)
    ) {
      basePromptToUse = travelBasePrompt
    }

    // 空間敘事宇宙
    else if (
      [
        '電影級風景 HDR',
        '空拍敘事視角',
      ].includes(styleToUse?.name)
    ) {
      basePromptToUse = spaceBasePrompt
    }

    else {
      basePromptToUse = movieBasePrompt
    }

    setIsGenerating(true)

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    )

    setGeneratedPrompt(
      basePromptToUse
        ? `${basePromptToUse}

${styleToUse?.prompt || ''}`
        : `${styleToUse?.prompt || ''}`
    )

    setIsGenerating(false)
  }

  useEffect(() => {
    document.documentElement.style.backgroundColor =
      '#050505'

    document.body.style.backgroundColor =
      '#050505'

    return () => {
      document.documentElement.style.backgroundColor =
        ''

      document.body.style.backgroundColor =
        ''
    }
  }, [])

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false)

      setTimeout(() => {
        setShowMainUI(true)
      }, 500)
    }, 3600)

    return () => clearTimeout(splashTimer)
  }, [])

  const toggleFavorite = (
    styleName: string
  ) => {
    setFavorites((prev) =>
      prev.includes(styleName)
        ? prev.filter(
            (name) => name !== styleName
          )
        : [...prev, styleName]
    )
  }

  const handleCopy = async () => {
    if (!generatedPrompt) return

    await navigator.clipboard.writeText(
      generatedPrompt
    )

    alert('提示詞已複製')
  }

  return <div />
}