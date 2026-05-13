'use client'

import { useMemo, useState } from 'react'

export default function AIPosterDirectorMVP() {
  const [selectedStyle, setSelectedStyle] = useState('日系電影感')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

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
    if (!uploadedImage) {
      alert('請先上傳照片')
      return
    }

    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    setGeneratedPrompt(activeStyle?.prompt || '')

    setIsGenerating(false)
  }

  const handleCopy = async () => {
    if (!generatedPrompt) return

    await navigator.clipboard.writeText(generatedPrompt)

    alert('提示詞已複製')
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result

      if (typeof result === 'string') {
        setUploadedImage(result)
      }
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white overflow-hidden">
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <p className="text-[10px] tracking-[0.45em] uppercase text-[#8B6B2E] mb-1">
          Visual Taste Director
        </p>

        <p className="text-2xl font-semibold italic tracking-[0.18em] bg-gradient-to-r from-[#FFF8E1] via-[#D4AF37] to-[#8B6B2E] bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(212,175,55,0.42)]">
          ✦ Anson Du
        </p>
      </div>

      <div className="flex pt-24">
      <div className="w-[360px] border-r border-white/10 bg-black p-6 flex flex-col overflow-y-auto">
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

          <h1 className="text-4xl font-semibold leading-tight mt-4">
            把日常照片
            <span className="text-zinc-500 block">
              升級成電影級提示詞
            </span>
          </h1>
        </div>

        <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-2xl mb-5">
            ↑
          </div>

          <p className="text-lg font-medium mb-2">
            {uploadedImage ? '照片上傳成功' : '上傳照片'}
          </p>

          <p className="text-sm text-zinc-500 leading-relaxed mb-5">
            {uploadedImage
              ? 'AI 已成功讀取你的照片，即將生成電影級提示詞。'
              : '系統將保留原始構圖與人物位置，只強化整體電影氛圍。'}
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="block w-full text-sm text-zinc-400 file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
          />

          {uploadedImage && (
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              <img
                src={uploadedImage}
                alt="preview"
                className="w-full h-44 object-cover"
              />
            </div>
          )}
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
            構圖鎖定
          </p>

          <div className="space-y-2 text-sm text-zinc-300">
            <p>✓ 保留人物位置</p>
            <p>✓ 保留鏡頭角度</p>
            <p>✓ 保留透視結構</p>
            <p>✓ 保留場景構圖</p>
            <p>✓ 僅強化電影氛圍</p>
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

      <div className="flex-1 bg-[#0d0d0d] p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-zinc-600 mb-4">
            Prompt Output
          </p>

          <h2 className="text-5xl font-semibold mb-8">
            AI 電影感提示詞生成器
          </h2>

          <div className="rounded-[36px] border border-white/10 bg-black/40 backdrop-blur-xl p-8 min-h-[600px] relative">
            {!generatedPrompt ? (
              <div className="h-full flex items-center justify-center text-zinc-600 text-lg">
                你的 AI 電影級提示詞將顯示在這裡
              </div>
            ) : (
              <>
                <pre className="whitespace-pre-wrap text-sm leading-8 text-zinc-200">
                  {generatedPrompt}
                </pre>

                <button
                  onClick={handleCopy}
                  className="absolute top-6 right-6 rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:opacity-90"
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
