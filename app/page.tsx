'use client'

import { useEffect, useMemo, useState } from 'react'

export default function AIPosterDirectorMVP() {
  const [selectedStyle, setSelectedStyle] = useState('日系電影感')
  
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [showMainUI, setShowMainUI] = useState(false)

  const basePrompt = '請根據使用者提供的主題、自動分析最適合的場景類型、人物氣質、拍攝氛圍、服裝風格、建築元素、空間層次、鏡頭語言、光影方向、色彩配置與畫面情緒，延伸設計成具有高級感的電影海報、品牌形象廣告、時尚雜誌封面或 cinematic editorial poster 風格作品。整體畫面必須完整保留原始構圖、人物位置、鏡頭角度、空間比例、透視結構、景深層次與光影方向，不可擅自改變場景配置或重新設計構圖。AI 僅可在原始畫面基礎上，自然加入適合氛圍的高級設計元素，例如大型 typography、電影標題、品牌標語、雜誌編排、幾何圖形、膠片顆粒、色彩分級、光影特效、紙張質感、霓虹光效、雙重曝光、潮流視覺元素與 cinematic atmosphere。整體需具有 premium commercial design、editorial poster aesthetic、fashion magazine layout、cinematic visual atmosphere、ultra detailed texture、8K resolution、award-winning cinematic composition 與國際精品品牌海報完成度。'

  const styles = [
    {
      name: '日系電影感',
      desc: '新海誠電影氛圍',
      prompt:
        '一張高質感日系動畫電影海報風插畫，完整保留原始照片構圖、人物位置、鏡頭角度與場景結構，整體轉化為 anime cinematic illustration 與 Japanese movie poster aesthetic 的 cinematic visual。加入 soft natural volumetric lighting、dreamy realism、nostalgic anime movie poster 氛圍、細膩空氣感、藍橘電影色調、情緒化天空、超高級光影與 premium editorial layout，畫面具有濃厚青春電影感與高級動畫電影海報質感。',
    },
    {
      name: '精品時尚感',
      desc: 'Luxury Editorial',
      prompt:
        '一張高級精品雜誌封面風格插畫，完整保留原始照片構圖與人物姿態，加入精品品牌廣告視覺、極簡留白、莫蘭迪色調、高級時尚排版、柔和陰影與 editorial photography 氛圍，整體具有精品廣告與 Vogue 雜誌封面質感。',
    },
    {
      name: '熱血動漫版',
      desc: 'Anime Action Style',
      prompt:
        '一張高張力 anime cinematic illustration 電影海報風插畫，完整保留原始照片構圖與透視結構，加入 dynamic action composition、dramatic perspective、intense rim lighting、cinematic battle atmosphere、anime movie poster aesthetic、強烈速度線與史詩級電影色彩。整體像少年漫畫最終決戰場景，具有超高級動畫電影宣傳海報質感。',
    },
    {
      name: '韓系電影感',
      desc: 'Korean Cinema Mood',
      prompt:
        '一張高級韓系電影劇照風格海報，保留原始照片構圖與人物位置，加入 cinematic still、soft moody lighting、35mm film grain、Netflix drama atmosphere、melancholic realism、editorial photography 氛圍、霓虹燈反射與情緒化陰影。整體像高質感韓劇電影宣傳海報。',
    },
    {
      name: '吉卜力動畫風',
      desc: 'Studio Ghibli Mood',
      prompt:
        '一張充滿吉卜力動畫氛圍的高級電影感插畫，完整保留原始照片人物、構圖與鏡頭視角，轉化為 Studio Ghibli atmosphere 與 Arrietty poster aesthetic 的 cinematic visual。加入 miniature fantasy world、soft natural volumetric lighting、hand-painted animation texture、botanical macro environment、dreamy realism、nostalgic anime movie poster 氛圍與 ultra detailed anime painting 細節。整體具有高級動畫電影海報質感、柔和空氣感與療癒幻想世界觀。',
    },
    {
      name: '賽博龐克風',
      desc: 'Cyberpunk Future',
      prompt:
        '一張高級 cyberpunk 未來城市風格海報，完整保留原始照片構圖與人物位置，加入霓虹燈、未來感 UI、藍紫色調、雨夜反射、電影級科技氛圍與 Blade Runner 視覺風格。',
    },
    {
      name: '復古港風電影',
      desc: 'Hong Kong Retro Cinema',
      prompt:
        '一張 90 年代香港電影風格海報插畫，保留原始照片構圖與角色站位，加入復古霓虹、底片顆粒、暖色街燈、王家衛電影氛圍與情緒化光影，整體具有濃厚港片電影感。',
    },
    {
      name: '極簡藝術海報',
      desc: 'Minimal Poster Design',
      prompt:
        '一張極簡高級感藝術海報風格插畫，保留原始照片主體構圖，加入大量留白、現代排版、低彩度色系、藝術展覽海報質感與高級平面設計風格。',
    },
    {
      name: '歐美電影預告感',
      desc: 'Hollywood Trailer Poster',
      prompt:
        '一張 Hollywood 電影預告海報風格插畫，完整保留原始照片場景與人物比例，加入史詩級光影、煙霧粒子、電影標題排版、強烈戲劇感與 blockbuster 視覺氛圍。',
    },
    {
      name: '黑白攝影展風格',
      desc: 'Fine Art Monochrome',
      prompt:
        '一張高級黑白攝影展風格海報，保留原始照片構圖與人物神韻，加入 Fine Art Photography 氛圍、黑白灰階層次、底片顆粒、極簡排版與藝廊展示感。',
    },
    {
      name: '潮流街頭品牌風',
      desc: 'Streetwear Campaign',
      prompt:
        '一張潮流街頭品牌廣告風格海報，保留原始照片人物姿態與構圖，加入街頭塗鴉、潮流品牌視覺、強烈字體設計、潮流色塊與時尚 campaign 氛圍。',
    },
    {
      name: '夢幻童話風',
      desc: 'Fantasy Fairytale',
      prompt:
        '一張夢幻童話電影風格插畫，保留原始照片場景與人物構圖，加入奇幻森林、柔霧光線、夢境色彩、星光粒子與童話故事氛圍，整體像迪士尼奇幻電影海報。',
    },
    {
      name: '水彩插畫風',
      desc: 'Watercolor Illustration',
      prompt:
        '一張高級水彩插畫風格作品，完整保留原始照片構圖與人物位置，加入自然暈染、水彩紙質感、柔和色彩與藝術手繪感，整體像高級插畫書封面。',
    },
    {
      name: '蒸汽龐克風',
      desc: 'Steampunk World',
      prompt:
        '一張蒸汽龐克電影風格海報，保留原始照片構圖與透視，加入齒輪機械、黃銅金屬、蒸氣煙霧、復古科技與維多利亞時代幻想氛圍。',
    },
    {
      name: '日系戀愛劇氛圍',
      desc: 'Japanese Romance Drama',
      prompt:
        '一張日系戀愛電影劇照風格海報，保留原始照片人物位置與環境構圖，加入夕陽逆光、青春感色調、細膩情緒、柔焦空氣感與戀愛電影氛圍。',
    },
    {
      name: '高級旅遊雜誌風',
      desc: 'Travel Magazine Cover',
      prompt:
        '一張高級旅遊雜誌封面風格海報，完整保留原始照片地景與人物構圖，加入旅遊 editorial 視覺、清新配色、雜誌標題排版與高級旅遊品牌感。',
    },
  ]

  const activeStyle = useMemo(
    () => styles.find((s) => s.name === selectedStyle),
    [selectedStyle]
  )

  const handleGeneratePrompt = async () => {
    

    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    setGeneratedPrompt(`${basePrompt}

${activeStyle?.prompt || ''}`)

    setIsGenerating(false)
  }

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false)

      setTimeout(() => {
        setShowMainUI(true)
      }, 350)
    }, 2400)

    return (
    <>
      {showSplash && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#050505] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14),transparent_60%)]" />

          <div className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none">
            <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          <div className="text-center animate-[fadeIn_1.8s_ease-out] px-8">
            <div className="w-24 h-24 mx-auto rounded-[28px] bg-gradient-to-br from-[#FFF5D6] via-[#D4AF37] to-[#7B5B1A] flex items-center justify-center shadow-[0_0_80px_rgba(212,175,55,0.25)] mb-8">
              <div className="text-black text-4xl font-black tracking-tight">
                A
              </div>
            </div>

            <p className="text-[11px] tracking-[0.55em] uppercase text-[#B08A3C] mb-4">
              Visual Taste Director
            </p>

            <h1 className="text-4xl lg:text-6xl font-semibold italic tracking-[0.18em] bg-gradient-to-r from-[#FFF8E1] via-[#D4AF37] to-[#8B6B2E] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(212,175,55,0.45)]">
              ✦ Anson Du
            </h1>

            <p className="mt-6 text-zinc-500 text-sm tracking-[0.3em] uppercase animate-pulse">
              Cinematic Prompt Engine
            </p>
          </div>
        </div>
    </>
  )
}

      <div
        className={`transition-all duration-1000 ${
          showMainUI
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >) => clearTimeout(splashTimer)
  }, [])

  const handleCopy = async () => {
    if (!generatedPrompt) return

    await navigator.clipboard.writeText(generatedPrompt)

    alert('提示詞已複製')
  }

  

  return (
    <div className="min-h-screen w-full bg-[#070707] text-white overflow-x-hidden">
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <p className="text-[10px] tracking-[0.45em] uppercase text-[#8B6B2E] mb-1">
          Visual Taste Director
        </p>

        <p className="text-2xl font-semibold italic tracking-[0.18em] bg-gradient-to-r from-[#FFF8E1] via-[#D4AF37] to-[#8B6B2E] bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(212,175,55,0.42)]">
          ✦ Anson Du
        </p>
      </div>

      <div className="flex flex-col lg:flex-row pt-20 lg:pt-24 w-full overflow-x-hidden min-h-screen">
      <div className="w-full lg:w-[360px] lg:min-w-[360px] lg:h-screen border-b lg:border-b-0 lg:border-r border-white/10 bg-black p-4 lg:p-6 flex flex-col overflow-y-auto shrink-0">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] tracking-[0.42em] uppercase bg-gradient-to-r from-[#C7D2FE] via-[#A5B4FC] to-[#818CF8] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(129,140,248,0.18)]">
                AI Visual Taste Engine
              </p>

              <p className="text-sm mt-2 tracking-[0.18em] text-zinc-500">
                <span className="bg-gradient-to-r from-[#E5E7EB] via-[#CBD5E1] to-[#94A3B8] bg-clip-text text-transparent">
                  電影級 Prompt Studio
                </span>
              </p>
            </div>

            </div>

          <h1 className="text-2xl lg:text-4xl font-semibold leading-tight mt-4">
            把創意靈感
            <span className="text-zinc-500 block">
              生成電影級提示詞
            </span>
          </h1>
        </div>

        <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.03] p-5 lg:p-6">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-2xl mb-5">
            ✦
          </div>

          <p className="text-lg font-medium mb-2">
            電影級提示詞引擎
          </p>

          <p className="text-sm text-zinc-500 leading-relaxed">
            選擇你想要的電影風格後，系統將直接生成高質感 AI 電影級提示詞。你可以自由搭配任何照片、角色、動漫、品牌或主題進行創作。
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-600">
              風格模組
            </p>

            <p className="text-xs text-zinc-700">MVP v2</p>
          </div>

          <div className="space-y-3">
            {styles.map((style) => (
              <button
                key={style.name}
                onClick={() => setSelectedStyle(style.name)}
                className={`w-full rounded-2xl border p-5 text-left transition-all ${
                  selectedStyle === style.name
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <p className="font-medium">{style.name}</p>

                <p
                  className={`text-sm mt-1 ${
                    selectedStyle === style.name
                      ? 'text-black/70'
                      : 'text-zinc-500'
                  }`}
                >
                  {style.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600 mb-4">
            Prompt Engine
          </p>

          <div className="space-y-2 text-sm text-zinc-300">
            <p>✓ Cinematic Prompt Engine</p>
            <p>✓ 16 種電影風格模組</p>
            <p>✓ Premium Editorial Aesthetic</p>
            <p>✓ Luxury Commercial Visual</p>
            <p>✓ 8K Prompt Output System</p>
          </div>
        </div>

        <button
          onClick={handleGeneratePrompt}
          disabled={isGenerating}
          className="mt-8 rounded-2xl bg-white text-black py-4 font-semibold hover:opacity-90 transition"
        >
          {isGenerating ? '生成中...' : '生成提示詞'}
        </button>
      </div>

      <div className="w-full flex-1 bg-[#0d0d0d] p-4 lg:p-10 overflow-x-hidden">
        <div className="w-full max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-zinc-600 mb-4">
            Prompt Output
          </p>

          <h2 className="text-2xl lg:text-5xl font-semibold mb-6 lg:mb-8 leading-tight">
            AI 電影感提示詞生成器
          </h2>

          <div className="w-full rounded-[28px] lg:rounded-[36px] border border-white/10 bg-black/40 backdrop-blur-xl p-4 lg:p-8 min-h-[300px] lg:min-h-[600px] relative overflow-hidden">
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
                  className="mt-6 lg:absolute lg:top-6 lg:right-6 rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:opacity-90 w-full lg:w-auto"
                >
                  複製提示詞
                </button>
              </>
            )}
          </div>
        </div>
      </div>
          </div>
    </div>
  )
}
