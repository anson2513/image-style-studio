'use client'

import { useEffect, useMemo, useState } from 'react'

export default function AIPosterDirectorMVP() {
  const [selectedStyle, setSelectedStyle] = useState('日系電影感')
  const [selectedCategory, setSelectedCategory] = useState('🔥熱門')
  const [previewStyle, setPreviewStyle] = useState<any>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [showMainUI, setShowMainUI] = useState(false)

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
      desc: 'Lifestyle Food Poster',
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

【主體內容分析】

自動辨識照片中的：
- 食物類型
- 主餐 / 甜點 / 咖啡 / 飲品 / 冰品 / 零食 / brunch / 下午茶
- 配料與裝飾
- 食材層次
- 餐具與器皿材質
- 桌面與背景空間
- 光影方向
- 色彩氛圍
- 生活感情境

並依據不同食物，自動切換最適合的生活風格情境，例如：

- 日常午餐 aesthetic
- 韓系咖啡廳氛圍
- 日系甜點店感
- 夏日冰品 visual
- cozy brunch mood
- afternoon tea aesthetic
- convenience food diary
- comfort food photography
- home café atmosphere
- casual dining moment

【版面結構】

整體版面採用：
「上下分割式 editorial poster layout」。

━━━━━━━━━━━━━━━
【上半部】
premium infographic / magnetic object aesthetic
━━━━━━━━━━━━━━━

將照片中的主要食物元素轉化為：
premium acrylic fridge magnet style 高級冰箱貼磁鐵小物排列。

所有物件需保持：

- 精準置中排列
- 極簡幾何構圖
- infographic 式 presentation
- 高級 editorial typography
- 規律排列
- 大量留白
- 韓系極簡設計感
- 日系雜誌排版感

每個食物物件皆具有：

- 壓克力磁鐵感
- 微立體厚度
- 白色精緻描邊
- 柔和陰影
- 微浮空懸浮感
- 霧面陶瓷質地
- 細膩材質紋理
- 真實食物細節
- 高級模型感
- 非卡通風格
- 非廉價貼紙感

搭配：

- 極簡中文文案
- 手寫 memo 感文字
- 小型 line icon
- 細線 infographic
- 韓系 typography
- 日系 editorial layout
- casual aesthetic labels
- social media diary feeling

文案方向偏向：
「生活分享」
而不是：
「商業廣告」。

避免：

- 嚴選食材
- 每日現做
- 商品介紹
- 營養宣傳
- 餐廳 slogan
- 商業 campaign wording

文案語氣應像：

中文：
- 今天吃這個。
- 小小快樂。
- 最近很喜歡。
- 下午茶時間。
- 今天的甜點。
- 咖啡救了今天。
- 夏天就是要吃冰。
- 有被療癒到。
- 簡單但很滿足。
- 日常裡的小幸福。

日系：
- 今日のおやつ。
- 今日のごはん。
- 小さな幸せ。
- 甘いもの補給。
- お疲れさま。
- ちょっと休憩。

英文：
- little things matter.
- simple food, good mood.
- today’s comfort food.
- coffee first.
- sweet little moments.
- cozy food diary.

━━━━━━━━━━━━━━━
【下半部】
editorial still life photography
━━━━━━━━━━━━━━━

保留真實食物攝影感，
以高級生活感 still life photography 方式重構。

畫面像是：
「很會拍照的人，隨手分享今天吃的東西」。

整體需有：

- 真實生活感
- 安靜日常氛圍
- 微電影感
- Instagram aesthetic
- 小紅書生活感
- cozy lifestyle mood
- casual dining atmosphere
- 溫暖療癒感
- 真實分享感

構圖方式：

- 微側拍
- 自然留白
- 微 editorial 構圖
- 不過度商業化
- 乾淨但自然
- 柔和空間感
- 安靜生活感

食物質感需呈現：

- 真實濕潤感
- 奶油質地
- 冰品融化感
- 咖啡奶泡感
- 麵包紋理
- 蛋糕層次
- 醬汁光澤
- 米飯顆粒感
- 食材真實細節
- 自然油亮感
- 高級食物紋理

【場景設定】

場景為：
韓系木質生活空間 × 日系 café atmosphere。

依據不同食物自動搭配：

- 木桌
- 米白棉麻布料
- 陶瓷餐盤
- 透明玻璃杯
- 木托盤
- 木湯匙
- 金屬叉匙
- 咖啡杯
- 書本
- 雜誌
- 植物枝葉
- 自然光影
- 窗邊 sunlight
- cozy home café setup

整體像：
「真實生活中的某個舒服時刻」。

【色彩色調】

整體使用：

- 低飽和暖色系
- 奶油米白
- 木質棕
- 焦糖色
- 奶茶色
- 柔和灰色
- 暖日光色調
- 日系淡色 palette

風格偏向：

- film photography
- soft cinematic tone
- Japanese magazine color grading
- warm neutral palette
- subtle film grain
- cozy afternoon mood
- soft shadow layering

避免：

- HDR 感
- 高飽和
- 過度銳利
- 電商商品照
- studio commercial lighting
- 外送平台感
- 超商 DM 感

【光影氛圍】

使用：

- 柔和自然窗光
- 暖色高光
- 低對比陰影
- 柔焦感
- 自然光影層次
- 下午 sunlight shadow
- 安靜療癒氛圍
- 溫暖生活感

【Typography 設計】

字體風格：

- 韓系極簡 typography
- 日系 editorial typography
- 文青雜誌感
- aesthetic social media caption
- 手寫 memo 感
- 極簡 caption layout
- clean editorial design

文字不要太像品牌廣告，
而像：
「日常分享 caption」。

【重要風格限制】

NOT commercial advertising.
NOT restaurant campaign.
NOT product marketing visual.
NOT menu design.
NOT food delivery advertisement.
NOT supermarket poster.
NOT excessive branding.
NOT e-commerce product photography.

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
and naturally beautiful.

整體最終效果像：

「IG 文青食物分享 × 小紅書生活 aesthetic × 韓系生活感攝影 × 日系 editorial food magazine × 高級日常 food diary visual」。`,
    },
  ]

  const filteredStyles = useMemo(() => {
    if (selectedCategory === '🔥熱門') return styles

    if (selectedCategory === '收藏') {
      return styles.filter((s) => favorites.includes(s.name))
    }

    if (selectedCategory === '食物美學') {
      return styles.filter((s) =>
        ['食物海報設計'].includes(s.name)
      )
    }

    return styles
  }, [selectedCategory, favorites])

  const activeStyle = useMemo(
    () => styles.find((s) => s.name === selectedStyle),
    [selectedStyle]
  )

  const handleGeneratePrompt = async (styleOverride?: any) => {
    const styleToUse = styleOverride || activeStyle

    let basePromptToUse = movieBasePrompt

    if (styleToUse?.name === '食物海報設計') {
      basePromptToUse = ''
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

  return <div />
}