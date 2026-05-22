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

  const movieBasePrompt = '請根據使用者提供的主題、自動分析最適合的場景類型、人物氣質、拍攝氛圍、服裝風格、建築元素、空間層次、鏡頭語言、光影方向、色彩配置與畫面情緒，延伸設計成具有高級感的電影海報、品牌形象廣告、時尚雜誌封面或 cinematic editorial poster 風格作品。整體畫面必須完整保留原始構圖、人物位置、鏡頭角度、空間比例、透視結構、景深層次與光影方向，不可擅自改變場景配置或重新設計構圖。AI 僅可在原始畫面基礎上，自然加入適合氛圍的高級設計元素，例如大型 typography、電影標題、品牌標語、雜誌編排、幾何圖形、膠片顆粒、色彩分級、光影特效、紙張質感、霓虹光效、雙重曝光、潮流視覺元素與 cinematic atmosphere。整體需具有 premium commercial design、editorial poster aesthetic、fashion magazine layout、cinematic visual atmosphere、ultra detailed texture、8K resolution、award-winning cinematic composition 與國際精品品牌海報完成度。'

  const illustrationBasePrompt = '請根據使用者提供的照片與主題，自動分析人物氣質、生活氛圍、畫面情緒、空間關係與色彩感受，並延伸設計成具有高級感的手繪插畫、藝術繪本、生活速寫、極簡漫畫或文青視覺風格作品。整體需完整保留原始照片構圖、人物位置、空間比例與互動關係，不可擅自重新設計場景。AI 應專注於手繪筆觸、紙張紋理、插畫氛圍、留白設計、生活感與藝術觀察感，而非電影海報式 commercial poster。'

  const travelBasePrompt = '請根據使用者提供的照片，自動分析城市氛圍、街道節奏、建築特色、旅行感受、色彩記憶與空間視角，延伸設計成具有高級感的城市旅遊雜誌、旅行手帳、生活風格刊物或 urban editorial visual。整體需保留原始街景、建築位置、透視關係與人物互動，強調真實旅行感、城市空氣感、文化觀察與高級 editorial layout。'

  const spaceBasePrompt = '請根據使用者提供的照片，自動分析空間層次、地景尺度、環境光影、建築關係與視覺動線，延伸生成具有 cinematic atmosphere 的空間敘事視覺。整體需保留原始場景結構與主體位置，強調壯闊感、空間感、光影深度、HDR 氛圍、空拍敘事與電影級視覺沉浸感。'

  const categories = [
    '收藏',
    '🔥熱門',
    // 視覺企劃
    '視覺企劃',

    // 電影宇宙
    '電影宇宙',

    // 插畫宇宙
    '手繪插畫',

    // 城市旅遊
    '城市旅遊',

    // 空間敘事
    '空間敘事',

    // 食物美學
    '食物美學',
  ]

  const styles = [
    {
      category: '視覺企劃',
      cover: '/covers/visual-director.jpg',
      name: '視覺導演',
      desc: 'Creative Direction × Cinematic Visual Design',
      prompt: `請先將我上傳／選取的參考照片，
視為一個完整的商業視覺創意專案（creative direction project）進行分析。

你必須先像國際級廣告公司中的：
藝術總監（Art Director）、
品牌設計師（Brand Designer）、
商業攝影師（Commercial Photographer）、
電影美術指導（Production Designer）
與視覺創意總監（Creative Director）
一樣進行完整視覺開發流程。

不要套用固定模板。
不要重複構圖。
不要每次都產生相同風格。

每次生成時，
都必須根據「參考照片本身」的內容，
重新思考最適合的：

- 視覺世界觀
- 情緒主題
- 商業定位
- 光影語言
- 構圖方式
- 色彩系統
- 主視覺設計
- 材質風格
- 品牌感
- 排版邏輯
- 海報敘事性

請先完整分析照片中的：

【內容分析】

- 主體類型
（水果／食物／飲料／人物／建築／產品／空間／生活物件等）

- 主體特徵
（形狀、材質、紋理、比例、結構、細節）

- 色彩關係
（主色、輔色、冷暖傾向、色彩情緒）

- 光影條件
（自然光、硬光、柔光、側光、逆光、陰影層次）

- 空間感
（深度、距離、透視、空氣感）

- 情緒氛圍
（浪漫、孤獨、未來感、奢華、神秘、溫暖、黑暗、潮流等）

- 可延伸的商業氣質
（精品品牌、時尚品牌、電影感、韓系生活感、科技感、藝術感等）

接著，
請不要直接照搬原圖。

而是根據分析結果，
重新創造一張：
「更高級、更具有商業價值、更有記憶點」
的創意海報。

你必須主動思考：

這個主體，
最適合被塑造成什麼樣的品牌世界觀？

如何讓它：
看起來像真正國際品牌廣告、
精品品牌主視覺、
高端雜誌封面、
電影級商業海報、
藝術級攝影作品？

請自動建立：

【創意方向】

- 核心情緒主題
- 視覺世界觀
- 主視覺概念（Hero Visual）
- 視覺記憶點
- 商業定位
- 品牌氣質
- 色彩腳本（Color Script）
- 光影設計
- 鏡頭語言
- 排版節奏
- 留白比例
- 材質細節
- 空氣感
- 電影感
- 高級感來源

生成時請避免：

- 普通 AI 拼貼感
- 過度廉價 HDR
- 過度飽和
- 元素堆砌
- 無意義特效
- 廣告素材感
- 廉價電商風
- 制式社群模板感

請追求：

- 國際精品品牌等級
- 商業雜誌封面感
- A24 / Apple / Prada / MUJI / Nike / 精品食品廣告等級的視覺質感
- 強烈視覺記憶點
- 電影級光影
- 高級留白
- 可商用設計感
- 真實攝影質感
- 有呼吸感的構圖
- 有靈魂的畫面敘事

每次生成時，
都必須允許 AI 自主產生新的：

- 構圖
- 光影
- 排版
- 色彩
- 世界觀
- 情緒方向
- 主視覺創意

即使使用同一張參考照片，
每次也都必須生成：
不同但同樣高品質的創意商業海報方案。

最終畫面必須像：

「真正會出現在國際品牌廣告、
精品雜誌、
藝術展覽、
高端商業攝影、
電影宣傳視覺」

而不是一般 AI 圖片。`,
    },
    {
      category: '視覺企劃',
      cover: '/covers/color-mood-aesthetic.jpg',
      name: '色彩氛圍美學',
      desc: 'Color Mood × Editorial Aesthetic',
      prompt: `請作為「專業色彩與氛圍分析師（Color & Mood Analyst）」與「高級視覺風格導演（Visual Art Director）」。

當我上傳／選取任意照片後，
請自動深度分析畫面中的：

- 主色（Primary Color）
- 輔助色（Secondary Colors）
- 點綴色（Accent Colors）
- 色彩比例關係
- 明度結構
- 飽和度分布
- 冷暖色傾向
- 色彩對比關係
- 光影層次
- 空氣感
- 材質質感
- 情緒氛圍
- 視覺節奏
- 整體風格調性

並根據畫面內容，
以專業色彩理論、電影美學、商業攝影、空間氛圍設計與 editorial visual styling 的角度進行分析。

你必須清楚解析：

- 哪些顏色是畫面的核心主色
- 哪些顏色負責平衡畫面
- 哪些顏色是視覺焦點
- 各色彩的大致占比
- 色彩之間如何形成情緒張力
- 明度如何影響空間呼吸感
- 飽和度如何影響高級感
- 冷暖色如何建立畫面溫度
- 對比關係如何影響畫面節奏
- 光線如何塑造氛圍
- 材質如何提升生活感與真實感

請詳細說明這些元素如何共同構成：

- 情緒氛圍
- 視覺風格
- 空間感受
- 品牌感
- 電影感
- 生活感
- 高級感
- 治癒感
- 文藝感
- 商業感

分析完成後，
請再根據畫面實際色彩與氛圍，
自動生成一組可直接用於 AI 影像生成／AI 修圖／AI 視覺創作的「中文高級設計提示詞」。

這組提示詞必須：

- 完整保留原畫面的色彩靈魂
- 能夠復刻相同氛圍
- 能夠延伸出同風格視覺作品
- 強調相同的光影氣質
- 強調相同的情緒溫度
- 強調相同的空氣感
- 強調相同的生活感與高級感

生成的提示詞內容需包含：

- 色彩關鍵詞
- 光影描述
- 氛圍描述
- 材質描述
- 空氣感描述
- 情緒關鍵詞
- 商業攝影風格
- 電影感描述
- 構圖氣質
- 視覺美學風格
- 國家／地區美學傾向（如日系、韓系、北歐、歐系等）
- 適合的 editorial aesthetic
- 適合的 commercial photography style
- 適合的 cinematic tone

提示詞風格必須具有：

- 高級感
- 專業感
- 可直接複製使用
- AI 可理解性高
- 色彩描述精準
- 氛圍描述具畫面感
- 避免空泛形容詞
- 避免模糊描述
- 避免過度簡略

最終輸出格式需包含：

1. 色彩分析
2. 氛圍分析
3. 風格調性分析
4. 光影分析
5. 材質分析
6. 完整中文 AI 設計提示詞

整體分析方向需接近：

- 國際級廣告視覺分析
- 電影美術分析
- 高級品牌視覺企劃
- 商業攝影色彩規劃
- 空間氛圍設計
- editorial visual direction
- cinematic color grading analysis
- luxury lifestyle aesthetic`,
    },
    {
      category: '視覺企劃',
      cover: '/covers/cinematic-ticket.jpg',
      name: '電影收藏票根',
      desc: 'Luxury Movie Ticket Collector Edition',
      prompt: `請先根據【電影名稱】深度理解電影本身的：

- 故事背景
- 核心主題
- 主要人物
- 情緒基調
- 時代背景
- 經典場景
- 視覺符號
- 電影攝影風格
- 美術設計
- 光影語言
- 海報視覺調性
- 劇情隱喻元素

再根據電影世界觀，
設計一張「9:16 直式高級電影收藏票根」。

--------------------------------------------------

【使用者輸入資訊】

中文電影名稱：【填入電影名稱】
戲院名稱：【填入戲院名稱】
廳號：【填入廳號】
日期：【填入日期】
座位號：【填入座位號】

--------------------------------------------------

【生成規則】

只生成「票根本體設計」。

禁止：
- 外圍背景
- 桌面
- 陰影地台
- 展示情境
- 白色留邊
- 額外邊框
- 包裝展示
- mockup 情境

整張畫面必須完整填滿畫布，
像精品品牌正式輸出的電影票券設計稿。

--------------------------------------------------

【整體風格】

整體採用：

「現代精品電影票券 × 國際品牌視覺 × 高端商業藝術海報」

風格融合：

- contemporary cinematic luxury aesthetic
- 精品品牌平面設計
- 國際影展視覺
- 高端商業海報設計
- 精品 typography
- 電影情緒敘事
- A24 等級藝術電影氣質
- 國際精品品牌聯名感

整體需：

- 乾淨
- 俐落
- 極簡
- 高端
- 現代
- 收藏級
- 具有精品品牌感

禁止：
- 復古風
- 懷舊感
- 泛黃
- 老化紙張
- 摺痕
- 破損
- 舊化效果
- vintage theater aesthetic

--------------------------------------------------

【畫面比例】

9:16 直式構圖。

--------------------------------------------------

【票根結構】

整張為高級電影收藏票根。

版面配置：

- 左側約 3/4為電影主視覺區
- 右側約 1/4 為票據資訊區

票根需具有：

- 真實高級厚卡紙張質感
- 精品印刷細節
- 局部燙金
- UV 局部亮面
- 浮雕壓紋
- 霧面紙張
- 金屬質感細節
- 撕裂齒孔
- 虛線裁切線
- 副券區域
- 高級印刷層次
- 真實可印刷感

--------------------------------------------------

【電影主視覺】

根據電影內容，
重新構築具有電影敘事感的 cinematic composition。

畫面需融合：

- 主要角色剪影
- 關鍵人物側臉
- 群像構圖
- 經典場景
- 象徵性道具
- 電影代表性空間
- 核心情緒畫面
- 劇情隱喻元素
- 電影重要符號

重點不是角色拼貼，
而是真正具有：

- 情緒張力
- 故事感
- 留白
- 電影氛圍
- 藝術電影氣質

人物避免商業偶像感，
偏向：

- 剪影
- 背影
- 局部輪廓
- 低光源 cinematic lighting

--------------------------------------------------

【光影與情緒】

畫面光影需具有：

- 電影級打光
- 低亮度高質感光線
- 空氣感霧化光束
- 高級精品廣告式光影
- 高端 cinematic lighting
- 情緒化陰影層次

整體情緒需同時具有：

- 詩意
- 孤獨感
- 壓抑感
- 希望感
- 命運感
- 電影敘事感

--------------------------------------------------

【色彩風格】

不要固定色系。

請根據電影本身的：

- 世界觀
- 情緒
- 主題
- 場景
- 時代背景
- 視覺語言
- 海報調性

自動延伸出最符合電影的：

「高級 cinematic color palette」

色彩需具備：

- 電影級 color grading
- 高端商業海報色彩控制
- 精品品牌視覺色調
- 國際影展海報氛圍
- 強烈情緒色彩敘事

避免：

- 廉價高飽和
- 隨機配色
- 過度鮮豔
- 過度商業感

色彩需具有：

- 情緒統一性
- 電影敘事性
- 高級感
- 收藏感
- 藝術感

--------------------------------------------------

【票據資訊區】

右側票據資訊區需像真正精品電影收藏票。

內容包含：

- 中文電影名稱【使用者輸入】
- 英文副標（根據電影自動生成）
- 戲院名稱【使用者輸入】
- 廳號【使用者輸入】
- 日期【使用者輸入】
- 座位號【使用者輸入】
- 條碼
- 流水編號
- 微型文字
- 精品標誌
- 金屬壓印 Logo

排版需具有：

- 精品品牌 typography
- 國際電影節視覺
- 極簡留白
- 精準格線系統
- 高端商業設計感
- 精品票券編排感

--------------------------------------------------

【材質細節】

紙張需呈現：

- 真實厚卡材質
- 高解析纖維細節
- 微弱壓紋
- 霧面紙張反射
- 金屬燙印細節
- 精品印刷層次
- 商業展示級印刷品質

--------------------------------------------------

【最終效果】

整體需像：

- A24 × 精品品牌聯名電影收藏票券
- 國際影展限定紀念票
- 高端精品品牌電影周邊
- 藝術電影官方典藏票根

最終畫面需同時具備：

- 強烈電影感
- 高級設計感
- 收藏價值
- 精品品牌感
- 商業海報感
- 高端藝術感
- 真實印刷質感
- 國際級電影視覺美學

整體最終呈現需像：

「真正由電影美術總監與精品品牌共同設計的收藏級電影票根。」`,
    },

    // 保留原始 16 種電影風格命名
    {
      category: '🔥熱門',
      cover: '/covers/japanese-cinema.jpg',
      name: '日系電影感',
      desc: '新海誠天空 × 青春電影感',
      prompt:
        '一張高質感日系動畫電影海報風插畫，完整保留原始照片構圖、人物位置、鏡頭角度與場景結構，整體轉化為 anime cinematic illustration 與 Japanese movie poster aesthetic 的 cinematic visual。加入 soft natural volumetric lighting、dreamy realism、nostalgic anime movie poster 氛圍、細膩空氣感、藍橘電影色調、情緒化天空、超高級光影與 premium editorial layout，畫面具有濃厚青春電影感與高級動畫電影海報質感。',
    },
    {
      cover: '/covers/luxury-editorial.jpg',
      name: '精品時尚感',
      desc: 'Luxury Editorial',
      prompt:
        '一張高級精品雜誌封面風格插畫，完整保留原始照片構圖與人物姿態，加入精品品牌廣告視覺、極簡留白、莫蘭迪色調、高級時尚排版、柔和陰影與 editorial photography 氛圍，整體具有精品廣告與 Vogue 雜誌封面質感。',
    },
    {
      cover: '/covers/anime-action.jpg',
      name: '熱血動漫版',
      desc: 'Anime Action Style',
      prompt:
        '一張高張力 anime cinematic illustration 電影海報風插畫，完整保留原始照片構圖與透視結構，加入 dynamic action composition、dramatic perspective、intense rim lighting、cinematic battle atmosphere、anime movie poster aesthetic、強烈速度線與史詩級電影色彩。整體像少年漫畫最終決戰場景，具有超高級動畫電影宣傳海報質感。',
    },
    {
      category: '韓系電影',
      cover: '/covers/korean-cinema.jpg',
      name: '韓系電影感',
      desc: 'Netflix 韓劇 × 深夜情緒感',
      prompt:
        '一張高級韓系電影劇照風格海報，保留原始照片構圖與人物位置，加入 cinematic still、soft moody lighting、35mm film grain、Netflix drama atmosphere、melancholic realism、editorial photography 氛圍、霓虹燈反射與情緒化陰影。整體像高質感韓劇電影宣傳海報。',
    },
    {
      category: '吉卜力',
      cover: '/covers/ghibli-circus.jpg',
      name: '吉卜力動畫風',
      desc: '宮崎駿森林 × 奇幻療癒世界',
      prompt:
        '一張充滿吉卜力動畫氛圍的高級電影感插畫，完整保留原始照片人物、構圖與鏡頭視角，轉化為 Studio Ghibli atmosphere 與 Arrietty poster aesthetic 的 cinematic visual。加入 miniature fantasy world、soft natural volumetric lighting、hand-painted animation texture、botanical macro environment、dreamy realism、nostalgic anime movie poster 氛圍與 ultra detailed anime painting 細節。整體具有高級動畫電影海報質感、柔和空氣感與療癒幻想世界觀。',
    },
    {
      category: '賽博龐克',
      cover: '/covers/cyberpunk-future.jpg',
      name: '賽博龐克風',
      desc: 'Cyberpunk Future',
      prompt:
        '一張高級 cyberpunk 未來城市風格海報，完整保留原始照片構圖與人物位置，加入霓虹燈、未來感 UI、藍紫色調、雨夜反射、電影級科技氛圍與 Blade Runner 視覺風格。',
    },
    {
      category: '港風電影',
      cover: '/covers/hongkong-retro.jpg',
      name: '復古港風電影',
      desc: 'Hong Kong Retro Cinema',
      prompt:
        '一張 90 年代香港電影風格海報插畫，保留原始照片構圖與角色站位，加入復古霓虹、底片顆粒、暖色街燈、王家衛電影氛圍與情緒化光影，整體具有濃厚港片電影感。',
    },
    {
      cover: '/covers/minimal-poster.jpg',
      name: '極簡藝術海報',
      desc: 'Minimal Poster Design',
      prompt:
        '一張極簡高級感藝術海報風格插畫，保留原始照片主體構圖，加入大量留白、現代排版、低彩度色系、藝術展覽海報質感與高級平面設計風格。',
    },
    {
      cover: '/covers/hollywood-trailer.jpg',
      name: '歐美電影預告感',
      desc: 'Hollywood Trailer Poster',
      prompt:
        '一張 Hollywood 電影預告海報風格插畫，完整保留原始照片場景與人物比例，加入史詩級光影、煙霧粒子、電影標題排版、強烈戲劇感與 blockbuster 視覺氛圍。',
    },
    {
      cover: '/covers/fineart-monochrome.jpg',
      name: '黑白攝影展風格',
      desc: 'Fine Art Monochrome',
      prompt:
        '一張高級黑白攝影展風格海報，保留原始照片構圖與人物神韻，加入 Fine Art Photography 氛圍、黑白灰階層次、底片顆粒、極簡排版與藝廊展示感。',
    },
    {
      cover: '/covers/streetwear-campaign.jpg',
      name: '潮流街頭品牌風',
      desc: 'Streetwear Campaign',
      prompt:
        '一張潮流街頭品牌廣告風格海報，保留原始照片人物姿態與構圖，加入街頭塗鴉、潮流品牌視覺、強烈字體設計、潮流色塊與時尚 campaign 氛圍。',
    },
    {
      category: '夢幻童話',
      cover: '/covers/fantasy-fairytale.jpg',
      name: '夢幻童話風',
      desc: 'Fantasy Fairytale',
      prompt:
        '一張夢幻童話電影風格插畫，保留原始照片場景與人物構圖，加入奇幻森林、柔霧光線、夢境色彩、星光粒子與童話故事氛圍，整體像迪士尼奇幻電影海報。',
    },
    {
      cover: '/covers/watercolor-illustration.jpg',
      name: '水彩插畫風',
      desc: 'Watercolor Illustration',
      prompt: `請根據我上傳／選取的照片進行「content-preserving image-to-image style transfer」。

以原始照片內容作為唯一畫面基礎，
嚴格保留原始照片中的：

- 主體內容
- 人物辨識度
- 臉部特徵
- 服裝造型
- 動作姿態
- 表情情緒
- 構圖比例
- 鏡頭視角
- 空間透視
- 物件配置
- 場景結構
- 光影方向
- 色彩關係
- 背景內容
- 環境氛圍
- 生活感

所有物件的位置、比例、數量與空間關係，
都必須與原始照片完全一致。

這是一個「只改變藝術風格」的任務，
不是重新生成新場景。

strictly preserve original composition,
strictly preserve original objects and scene structure,
maintain identical framing and perspective,
content-preserving transformation only,
image-to-image translation instead of image generation.

禁止改變原始場景內容，
禁止重新設計畫面，
禁止新增任何原始照片中不存在的元素。

不得新增：
人物、
動物、
飛鳥、
雲朵、
天空元素、
車輛、
植物、
樹木、
家具、
建築、
街景、
招牌、
燈飾、
霧氣、
雨、
雪、
星空、
月亮、
道具、
背景裝飾、
任何額外物件。

do not add new people,
do not add extra objects,
do not redesign the environment,
do not generate cinematic props,
do not invent missing areas,
do not extend the scene,
do not modify background structure.

僅將畫面轉換為融合：

Korean emotional realism、
Japanese watercolor sketch、
urban watercolor illustration、
slice of life anime atmosphere、
contemporary editorial painting aesthetic

的高級情緒系水彩插畫風格。

整體維持原始照片的真實場景與視覺結構，
僅改變：

- 水彩渲染
- 紙張質感
- 顏料暈染
- 手繪線條
- 色彩氛圍
- 插畫材質

Only transform:
watercolor rendering,
paper grain texture,
soft pigment bleeding,
pencil sketch texture,
editorial watercolor aesthetics,
hand-painted illustration feeling.

畫面帶有：

透明水彩、
紙張顆粒、
乾刷筆觸、
淡彩暈染、
鉛筆草稿線、
輕微顏料堆積、
手繪留白、
自然水痕邊界。

不要過度精緻，
不要商業 CG 感，
不要 3D rendering，
保留自然生活感與安靜情緒。

色彩以：

低飽和奶油白、
霧灰藍、
米杏色、
深海軍藍、
煙燻灰、
冷灰紫、
局部暖橘光源

作為主色調，
形成柔和 blue hour 冷暖對比。

保留原始照片中的光線結構與環境光方向，
不要重新設計燈光。

Preserve original lighting structure,
preserve original environmental lighting,
preserve original shadows and reflections.

背景允許輕微水彩化與局部 sketch rendering，
但不得改變原始背景內容。

人物描寫自然寫實，
保留真實人物氣質與生活感，
不過度美化、
不 AI 偶像化、
不動漫臉化。

整體畫面像高級城市情緒系透明水彩插畫作品，
具有安靜、懷舊、溫柔、電影感的都市情緒。

畫面必須乾淨純粹，
僅保留原始照片內容與插畫風格轉換。

禁止出現任何：

文字、
韓文、
英文、
數字、
日期、
標題、
Logo、
watermark、
caption、
typography、
subtitle、
journal text、
diary notes、
editorial layout、
graphic design text、
poster title、
calligraphy、
labels、
stickers、
stamps。

畫面中不得出現任何可閱讀文字。

clean composition,
pure visual storytelling only,
no typography,
no handwriting,
no text overlays,
no subtitles,
no poster layout,
no graphic elements.

Negative prompt:
extra people,
additional objects,
new background elements,
clouds,
birds,
vehicles,
trees,
props,
cinematic objects,
scene extension,
environment redesign,
text,
letters,
handwriting,
Korean text,
English text,
numbers,
watermark,
logo,
typography,
caption,
poster title,
journal notes,
graphic overlays,
3D render,
CGI,
overdetailed rendering`,
    },
    {
      cover: '/covers/steampunk-world.jpg',
      name: '蒸汽龐克風',
      desc: 'Steampunk World',
      prompt:
        '一張蒸汽龐克電影風格海報，保留原始照片構圖與透視，加入齒輪機械、黃銅金屬、蒸氣煙霧、復古科技與維多利亞時代幻想氛圍。',
    },
    {
      cover: '/covers/japanese-romance.jpg',
      name: '日系戀愛劇氛圍',
      desc: 'Japanese Romance Drama',
      prompt:
        '一張日系戀愛電影劇照風格海報，保留原始照片人物位置與環境構圖，加入夕陽逆光、青春感色調、細膩情緒、柔焦空氣感與戀愛電影氛圍。',
    },
    {
      cover: '/covers/travel-magazine.jpg',
      name: '高級旅遊雜誌風',
      desc: 'Travel Magazine Cover',
      prompt:
        '一張高級旅遊雜誌封面風格海報，完整保留原始照片地景與人物構圖，加入旅遊 editorial 視覺、清新配色、雜誌標題排版與高級旅遊品牌感。',
    },
    {
      cover: '/covers/crayon-handdrawn.jpg',
      name: '彩色蠟筆手繪插畫',
      desc: 'Handdrawn Crayon × Whimsical Storybook',
      prompt:
        '一張充滿溫暖生活感與童趣氛圍的「彩色蠟筆手繪插畫」風格作品，採用直式構圖與自然生活紀錄視角，以使用者上傳照片中的人物為絕對基礎，完整保留真實臉型、五官比例、髮型特徵、眼神神韻、膚色與個人辨識度，不過度美化、不改變長相、不修成卡通臉，保留自然生活感與真實人物氣質。人物動作、姿態、服裝輪廓與肢體比例需忠實還原原照片內容，維持日常抓拍般的自然互動感。整體畫面轉化為高質感彩色蠟筆插畫風格，使用大量粗細不均的彩色鉛筆與油性蠟筆筆觸，保留手工塗抹感、紙張纖維紋理與自然不規則線條，呈現像兒童繪本、生活日記與手帳塗鴉結合的溫暖藝術感。背景場景、家具、寵物、擺設、街景或室內空間皆需完整保留原照片構圖與空間關係，不增加不存在的大型物件、不重新設計場景。畫面可加入少量手繪感裝飾元素，如彩色愛心、星星、笑臉、雲朵、旋轉線條、小花與塗鴉字樣，但需自然融入畫面周圍，不能破壞原始構圖。整體色調以奶油白、米色、木質暖棕與低飽和粉彩色系為主，搭配柔和粉紅、淺藍、黃色、紫色與綠色點綴，營造溫暖、療癒、青春感十足的日系手繪氛圍。光影柔和自然，保留生活攝影般的空間感與真實互動情緒，整體呈現高級感、文青感與可愛童趣並存的彩色蠟筆生活插畫作品。',
    },
    {
      category: '手繪插畫',
      cover: '/covers/japanese-lifestyle-sketch.jpg',
      name: '日系生活感手繪插畫',
      desc: 'Japanese Lifestyle Sketch × Cozy Daily Moments',
      prompt: `請根據我上傳／選取的照片，自動分析畫面中的：

- 主體內容
- 人物特徵
- 服裝造型
- 動作姿態
- 表情情緒
- 場景空間
- 背景元素
- 光影方向
- 色彩關係
- 構圖方式
- 視覺焦點
- 空氣感與氛圍
- 插畫風格特徵

並將照片內容重新轉化為一張「日系城市生活感手繪插畫（Japanese urban lifestyle doodle illustration）」風格的作品，整體採用簡約童趣的線條插畫表現。

-關鍵元素（人物、動物、街景、物件）
- 場景描述
- 畫面構圖
- 色彩色調
- 插畫風格
- 線條特徵
- 光影氛圍
- 背景設計
- 情緒氛圍
- 畫面材質感
- 整體視覺語言

風格方向需接近：
以細黑線勾勒輪廓，搭配淡彩塗鴉上色。構圖採留白式海報排版，上方保留大面積空白區域並加入手寫英文字標題「City Diary」，具有文青插畫海報感。色彩使用低飽和莫蘭迪色系與粉彩配色，包括淺藍、米白、淡黃、粉紅、卡其與淺灰，整體色調柔和乾淨。畫風偏向韓系／日系 editorial doodle illustration，線條隨性、不追求精緻透視，帶有手帳插畫、旅遊明信片與生活紀錄感。畫面氛圍溫暖輕鬆、青春療癒，帶有城市日常與週末慢生活氣息，適合製作成插畫海報、服飾印花、旅遊插圖或 lifestyle branding 視覺。

畫面要求：
保留原始照片中的主體關係與場景結構
- 可依照片內容自動調整人物數量與背景元素
`,
    },
    {
      cover: '/covers/urban-sketch-journal.jpg',
      name: '城市旅繪日誌',
      desc: 'Urban Sketch × Travel Journal',
      prompt:
        '一張高級感「城市旅遊雜誌封面＋水彩速寫插畫」風格作品，採用直式 9:16 構圖與大量留白設計，整體畫面必須完全比照使用者上傳照片中的原始構圖，不可擅自更改任何場景配置、建築位置、人物數量、站位、街道方向、鏡頭高度、透視關係、光影方向與空間比例，完整保留照片中的街景節奏與真實都市氛圍。畫面以台灣城市街頭為核心主題，保留原始街道、人行道、斑馬線、交通號誌、店家招牌、騎樓、機車與行人流動感，遠景地標與建築輪廓皆需忠實還原。前景人物以自然生活感呈現，不過度美化、不改變姿勢與互動狀態，保留真實日常感與街頭觀察氛圍。整體採用透明水彩、鋼筆速寫、墨線勾勒與細膩紙張紋理效果，筆觸鬆散自然但細節豐富，帶有日本旅遊手帳、歐系城市建築速寫與高級生活風格雜誌封面的融合感。色彩以低飽和莫蘭迪色系為主，包含米白、灰藍、淺咖啡、橄欖綠、柔和橘色與淡灰黑線條，光線為溫暖自然日光，帶有柔和空氣感與輕微水彩暈染。天空與背景保留大量乾淨留白，搭配精緻雜誌式排版設計，包括大型英文字城市名稱、手寫感英文副標、小段簡約介紹文字，字體纖細優雅、排版具有高級感與呼吸感。整體氛圍文青、安靜、溫暖且富有都市生活詩意，像一本高級旅遊文化刊物封面，無3D感、無厚塗、無強烈HDR、無過度寫實渲染，強調自然手繪感、水彩滲色與真實城市空氣感。',
    },
    {
      cover: '/covers/minimal-story-sketch.jpg',
      name: '極簡留白童話速寫',
      desc: 'Minimal Sketch × Quiet Fairytale',
      prompt:
        '請根據上傳照片中的主要人物特徵與畫面元素，製作一張直式9:16構圖,極簡風格的賀卡插畫。僅保留照片中人物與 1～2 個最具代表性的物件或特徵，其餘內容大幅簡化。整體採用「另類漫畫（Alternative Comic）」風格的扁平插畫表現，以極簡、低細節、略帶笨拙感的手繪線條呈現。人物需簡化成基礎幾何形狀與簡單輪廓，保留大致辨識感即可。臉部五官極度精簡：點狀眼睛、簡單鼻子、小型嘴巴，不要真實描繪。人物比例可略顯僵硬、不自然或帶點 awkward 感，但需保有刻意設計的藝術趣味。整體角色呈現冷靜、無表情、情緒壓抑的狀態，營造安靜又微妙荒謬的氛圍。畫面構圖採中央置中設計，保留大量留白，背景完全空白或僅有極少量元素，不加入任何複雜場景。線條需保持均勻、簡單、像用黑色細筆快速描繪的感覺。色彩使用低彩度 flat color 扁平色塊，僅少量使用對比色點綴，不使用漸層、陰影、光影、材質、立體感或細節刻畫。幽默感來自奇怪但平靜的情境、不合邏輯的小細節、過度認真對待無聊事物的氛圍，呈現一種冷淡、觀察式、辦公室感的荒謬幽默，而不是誇張搞笑或卡通式喜劇。整體氣質需像獨立漫畫、小眾藝術書籍、文青賀卡或日本極簡插畫作品。畫面中加入一小段位置略微隨意的手寫風文字，字體需看起來不工整、像隨手寫上的筆記，內容為：「ここに生成したい文章を入力してください。」文字不可過度整齊排版，需保留自然手寫的不規則感。禁止元素：不要寫實、不要精細描寫、不要厚塗、不要 3D、不要背景細節、不要陰影、不要材質感、不要咖啡元素、不要高飽和色彩、不要可愛卡通化。',
    },
    {
      cover: '/covers/colorwalk-city.jpg',
      name: 'Colorwalk 城市漫遊',
      desc: 'Colorwalk × Urban Mood Diary',
      prompt: `請根據使用者提供的照片，自動分析城市氛圍、街道節奏、建築特色、旅行感受、色彩記憶與空間視角，延伸設計成具有高級感的城市旅遊雜誌、旅行手帳、生活風格刊物或 urban editorial visual。整體需保留原始街景、建築位置、透視關係與人物互動，強調真實旅行感、城市空氣感、文化觀察與高級 editorial layout。

請根據我提供的真實照片，生成一張上下分區的旅行攝影海報，整體參考「小紅書城市打卡 / 建築冰箱貼 / 極簡拼貼」風格。【畫面結構】 畫面為豎版構圖，比例 3：4 ，整張圖分為上下兩個部分。上半部分占畫面約50%，為極簡純色背景;下半部分占畫面約 50%，保留原圖，不修改，自動判斷照片中的構圖主體，已主體位主要目標【上半部分：建築冰箱貼圖示】 從下半部分真實照片中提取最有識別度的主體建築元素，例如窗戶、門廊、立面、拱門、屋頂、陽臺或建築正面。 將該建築元素轉化為一個簡約的「冰箱貼式建築圖示」：1、保留建築的核心輪廓和標誌性特徵;2、造型簡潔、乾淨、像旅行紀念品冰箱貼;3、有輕微立體感和投影;4、邊緣清晰，白色或淺色描邊;5、細節適度簡化，不要畫得太複雜;6、圖示位於上半部分居中偏上位置;7、圖示尺寸較小且精緻，周圍保留大量留白。【背景顏色】 上半部分背景顏色從照片中提取一個最主要、最有記憶點的顏色。 例如建築牆面的藍色、黃色、紅色、綠色，或照片中最強烈的環境色。 背景為純色顏色要飽和、乾淨、有旅行明信片感。 不要使用漸變，不要加入複雜圖案。8、兩張圖中間用漸變色過渡，不要簡單拼接【文字排版】 在建築冰箱貼圖示下方添加一行優雅的英文文字： “{地點名稱} ， {時間}” （具體按照每一張照片的不同來向我提問具體文字）【整體氣質】 整體要像一張高級旅行攝影卡片： 真實照片 + 極簡建築冰箱貼 + 主色背景 + 輕盈文字排版。 風格清爽、乾淨、明亮、有城市漫遊感。 強調建築識別度、色彩記憶點和小紅書旅行打卡氛圍。【避免】不要做成普通拼貼。不要把上半部分畫得複雜。不要添加多餘裝飾元素。不要改變下半部分照片。不要出現亂碼文字。不要過度卡通化。不要讓建築圖示太大。不要讓文字壓住建築主體`,
    },
    {
      cover: '/covers/cinematic-landscape-hdr.jpg',
      name: '電影級風景 HDR',
      desc: 'Epic HDR × Cinematic Landscape',
      prompt:
        '在保持原始構圖與主體不變的前提下進行畫面重構。 場景由普通現實狀態被瞬間喚醒，整體光影與色彩顯著增強。 風景呈現HDR效果，環境中細節清晰可見，畫面具有震撼感與真實感。 天空層次極其豐富，色調為自然色彩，從亮雲到暗部過渡自然。 色彩整體飽和度適中。 前景到遠景形成超大動態範圍的空間層次,8K高清,高級感,9:16格式',
    },
    {
      cover: '/covers/handwritten-note-sketch.jpg',
      name: '手繪風註解日誌',
      desc: 'Handwritten Notes × Sketch Diary',
      prompt:
        '請先觀察照片中出現的每個元素，並針對這些內容加入有意義的手繪風註解。【照片中的物件】請在這裡填入照片裡出現的物品，例如：冰紅茶、甜甜圈、咖啡杯、桌子、窗邊光影。【繪製規則】・使用像白色筆畫上去的細手繪線條・線條要有隨手一筆畫出的感覺，略微粗細不均、自然隨性・沿著物體外輪廓加上手繪描邊・可搭配箭頭、虛線，讓畫面有視線引導感【文字規則】・使用手寫感的中文文字・句子要短，像自言自語一樣自然・語氣偏日記感、隨手記下心情的感覺，帶一點情緒與生活感【文字內容生成規則】・飲料：描述味道、溫度、喝下去的感覺例如：清爽、剛剛好、微甜很舒服・食物：描述口感與美味程度例如：鬆鬆軟軟、好好吃、超喜歡・空間：描述氛圍與感受例如：很放鬆、好喜歡這裡、空氣很舒服・整體畫面：最後加一句總結式的小感想例如：今天也太幸福了、這一刻很喜歡、好想停在這裡【裝飾元素】・可適度加入蒸氣、閃亮亮、小愛心、小表情符號等手繪裝飾・不要加太多，保留一些留白，讓畫面看起來輕鬆舒服【成品風格】・整體要像 Instagram 限時動態的手寫塗鴉風・也像雜誌上隨手寫下的靈感筆記・氛圍要時髦、可愛、自然，不要太刻意',
    },
    {
      cover: '/covers/aerial-storyframe.jpg',
      name: '空拍敘事視角',
      desc: 'Aerial View × Cinematic Storyframe',
      prompt:
        '請基於這張照片生成一個空拍視角...',
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

    

    if (selectedCategory === '視覺企劃') {
      return styles.filter((s) => [
        '視覺導演',
        '電影收藏票根',
        '食物海報設計',
        '色彩氛圍美學',
      ].includes(s.name))
    }

    if (selectedCategory === '電影宇宙') {
      return styles.filter((s) => [
        '日系電影感',
        '精品時尚感',
        '熱血動漫版',
        '韓系電影感',
        '吉卜力動畫風',
        '賽博龐克風',
        '復古港風電影',
        '極簡藝術海報',
        '歐美電影預告感',
        '黑白攝影展風格',
        '潮流街頭品牌風',
        '夢幻童話風',
        '蒸汽龐克風',
        '日系戀愛劇氛圍',
      ].includes(s.name))
    }

    if (selectedCategory === '手繪插畫') {
      return styles.filter((s) => [
        '水彩插畫風',
        '彩色蠟筆手繪插畫',
        '極簡留白童話速寫',
        '手繪風註解日誌',
        '日系生活感手繪插畫',
      ].includes(s.name))
    }

    if (selectedCategory === '城市旅遊') {
      return styles.filter((s) => [
        '高級旅遊雜誌風',
        '城市旅繪日誌',
        'Colorwalk 城市漫遊',
      ].includes(s.name))
    }

    if (selectedCategory === '空間敘事') {
      return styles.filter((s) => [
        '電影級風景 HDR',
        '空拍敘事視角',
      ].includes(s.name))
    }

    if (selectedCategory === '食物美學') {
      return styles.filter((s) => [
        '食物海報設計',
      ].includes(s.name))
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

    // 水彩插畫風 不套 base prompt
    if (
      styleToUse?.name === '水彩插畫風'
    ) {
      basePromptToUse = ''
    }

    // 插畫宇宙
    else if (
      [
        '彩色蠟筆手繪插畫',
        '極簡留白童話速寫',
        '手繪風註解日誌',
      ].includes(styleToUse?.name)
    ) {
      basePromptToUse = illustrationBasePrompt
    }

    // Colorwalk 城市漫遊 不套 base prompt
    else if (
      styleToUse?.name === 'Colorwalk 城市漫遊'
    ) {
      basePromptToUse = ''
    }

    // 城市旅遊宇宙
    else if (
      [
        '高級旅遊雜誌風',
        '城市旅繪日誌',
      ].includes(styleToUse?.name)
    ) {
      basePromptToUse = travelBasePrompt
    }

    // 空間敘事宇宙
    else if (
      ['電影級風景 HDR', '空拍敘事視角'].includes(
        styleToUse?.name
      )
    ) {
      basePromptToUse = spaceBasePrompt
    }

    // 視覺導演 不套 base prompt
    else if (
      styleToUse?.name === '視覺導演'
    ) {
      basePromptToUse = ''
    }

    // 電影收藏票根 不套 base prompt
    else if (
      styleToUse?.name === '電影收藏票根'
    ) {
      basePromptToUse = ''
    }

    // 色彩氛圍美學 不套 base prompt
    else if (
      styleToUse?.name === '色彩氛圍美學'
    ) {
      basePromptToUse = ''
    }

    // 食物海報設計 不套 base prompt
    else if (
      styleToUse?.name === '食物海報設計'
    ) {
      basePromptToUse = ''
    }

    // 電影宇宙
    else {
      basePromptToUse = movieBasePrompt
    }

    setIsGenerating(true)

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    )

    setGeneratedPrompt(`${basePromptToUse}

${styleToUse?.prompt || ''}`)

    setIsGenerating(false)
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
    const splashTimer = setTimeout(() => {
      setShowSplash(false)

      setTimeout(() => {
        setShowMainUI(true)
      }, 500)
    }, 3600)

    return () => clearTimeout(splashTimer)
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
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#050505] overflow-hidden transition-all duration-1000">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14),transparent_60%)]" />

          <div className="text-center animate-pulse px-8">
            <div className="w-24 h-24 mx-auto rounded-[28px] overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.25)] mb-8 border border-[#F3D98B]/20">
              <img
                src="/icon.png"
                alt="Anson Du App Icon"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>

            <p className="text-[11px] tracking-[0.55em] uppercase text-[#B08A3C] mb-4">
              AI 電影感提示詞引擎
            </p>

            <h1 className="text-4xl lg:text-6xl font-semibold italic tracking-[0.18em] bg-gradient-to-r from-[#FFF8E1] via-[#D4AF37] to-[#8B6B2E] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(212,175,55,0.45)]">
              ✦ Anson Du
            </h1>

            <p className="mt-6 text-zinc-500 text-sm tracking-[0.3em] uppercase">
              AI 電影感提示詞引擎
            </p>

            <div className="mt-20 text-center">
              <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-600">
                Prompt Engine v1.0 
              </p>
            </div>
          </div>
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
          AI 電影感提示詞引擎
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
                AI 電影感提示詞引擎
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

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600 mb-4">
            App Vision
          </p>

          <div className="space-y-2 text-sm text-zinc-300 leading-relaxed">
            <p>✓ Cinematic Prompt Explore</p>
            <p>✓ Premium Movie Cover Selection</p>
            <p>✓ Visual Inspiration Feed</p>
            <p>✓ AI Editorial Prompt Engine</p>
            <p>✓ Mobile Native Experience</p>
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
                  <img
                    src={style.cover}
                    alt={style.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
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
              <img
                src={previewStyle.cover}
                alt={previewStyle.name}
                className="absolute inset-0 w-full h-full object-cover scale-[1.08]"
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
