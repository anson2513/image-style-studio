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

  const basePrompt = '請根據使用者提供的主題、自動分析最適合的場景類型、人物氣質、拍攝氛圍、服裝風格、建築元素、空間層次、鏡頭語言、光影方向、色彩配置與畫面情緒，延伸設計成具有高級感的電影海報、品牌形象廣告、時尚雜誌封面或 cinematic editorial poster 風格作品。整體畫面必須完整保留原始構圖、人物位置、鏡頭角度、空間比例、透視結構、景深層次與光影方向，不可擅自改變場景配置或重新設計構圖。AI 僅可在原始畫面基礎上，自然加入適合氛圍的高級設計元素，例如大型 typography、電影標題、品牌標語、雜誌編排、幾何圖形、膠片顆粒、色彩分級、光影特效、紙張質感、霓虹光效、雙重曝光、潮流視覺元素與 cinematic atmosphere。整體需具有 premium commercial design、editorial poster aesthetic、fashion magazine layout、cinematic visual atmosphere、ultra detailed texture、8K resolution、award-winning cinematic composition 與國際精品品牌海報完成度。'

  const categories = [
    '收藏',
    '🔥熱門',

    // 電影宇宙
    '電影宇宙',

    // 插畫宇宙
    '手繪插畫',

    // 城市旅遊
    '城市旅遊',

    // 空間敘事
    '空間敘事',
  ]

  const styles = [
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
      prompt:
        '一張高級水彩插畫風格作品，完整保留原始照片構圖與人物位置，加入自然暈染、水彩紙質感、柔和色彩與藝術手繪感，整體像高級插畫書封面。',
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
      prompt:
        '請根據我提供的真實照片，生成一張上下分區的旅行攝影海報，整體參考「小紅書城市打卡 / 建築冰箱貼 / 極簡拼貼」風格。【畫面結構】 畫面為豎版構圖，比例 3：4 ，整張圖分為上下兩個部分。上半部分占畫面約50%，為極簡純色背景;下半部分占畫面約 50%，保留原圖，不修改，自動判斷照片中的構圖主體，已主體位主要目標【上半部分：建築冰箱貼圖示】 從下半部分真實照片中提取最有識別度的主體建築元素，例如窗戶、門廊、立面、拱門、屋頂、陽臺或建築正面。 將該建築元素轉化為一個簡約的「冰箱貼式建築圖示」：1、保留建築的核心輪廓和標誌性特徵;2、造型簡潔、乾淨、像旅行紀念品冰箱貼;3、有輕微立體感和投影;4、邊緣清晰，白色或淺色描邊;5、細節適度簡化，不要畫得太複雜;6、圖示位於上半部分居中偏上位置;7、圖示尺寸較小且精緻，周圍保留大量留白。【背景顏色】 上半部分背景顏色從照片中提取一個最主要、最有記憶點的顏色。 例如建築牆面的藍色、黃色、紅色、綠色，或照片中最強烈的環境色。 背景為純色顏色要飽和、乾淨、有旅行明信片感。 不要使用漸變，不要加入複雜圖案。【文字排版】 在建築冰箱貼圖示下方添加一行優雅的英文文字： “{地點名稱} ， {時間}” （具體按照每一張照片的不同來向我提問具體文字）【整體氣質】 整體要像一張高級旅行攝影卡片： 真實照片 + 極簡建築冰箱貼 + 主色背景 + 輕盈文字排版。 風格清爽、乾淨、明亮、有城市漫遊感。 強調建築識別度、色彩記憶點和小紅書旅行打卡氛圍。【避免】不要做成普通拼貼。不要把上半部分畫得複雜。不要添加多餘裝飾元素。不要改變下半部分照片。不要出現亂碼文字。不要過度卡通化。不要讓建築圖示太大。不要讓文字壓住建築主體',
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
        '請基於這張照片生成一個空拍視角,請提供更寛廣的廣角視野,且位置要比原圖更高,更遠,以捕捉更壯闊的周邊環境 Orbit (環繞運鏡) English: "Perform a smooth, 360-degree orbital flight around the central subject at a constant altitude, maintaining the subject in the center of the frame to reveal it from all angles." 中文： 「以恆定的高度繞著中心主體進行 360 度平穩環繞飛行，保持主體位於畫面中心，全方位展現其細節。」 Push In (推鏡/聚焦) English: "Slowly fly the drone forward directly toward the primary subject, narrowing the field of view to draw the viewer’s attention deep into the specific details of the scene." 中文： 「無人機緩慢筆直地向前飛向主要主體，縮小視野，將觀眾的注意力引導至場景的具體細節中。」 Pull Out (拉鏡/揭曉) English: "Starting with a close-up on the subject, move the drone backward and upward to reveal the surrounding landscape and establish the context and scale of the environment." 中文： 「從主體的特寫開始，無人機向後並向上移動，揭示周圍的地景，建立環境的宏觀視覺與規模感。」 圖幀轉影片 English: Execute a fluid crane-like motion that connects the initial frame to the final frame. The camera should ascend and pull away in a single continuous path, revealing the broader environment while maintaining the exact location and subject consistency. 中文： 執行一個流暢的搖臂式動作，將初始幀（原圖）與最終幀（空拍照）連結。攝影機應在單一連續路徑中上升並拉遠，在保持地點與主體一致性的同時，揭示更廣闊的環境。',
    },
  ]

  const filteredStyles = useMemo(() => {
    if (selectedCategory === '🔥熱門') return styles

    if (selectedCategory === '收藏') {
      return styles.filter((s) => favorites.includes(s.name))
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

    return styles
  }, [selectedCategory, favorites])

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
      }, 350)
    }, 2400)

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
            <div className="w-24 h-24 mx-auto rounded-[28px] bg-gradient-to-br from-[#FFF8E1] via-[#D4AF37] to-[#8B6B2E] flex items-center justify-center shadow-[0_0_80px_rgba(212,175,55,0.25)] mb-8">
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

            <p className="mt-6 text-zinc-500 text-sm tracking-[0.3em] uppercase">
              Cinematic Prompt Engine
            </p>
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
                  ? '已收藏 · 長按可取消'
                  : '長按電影封面即可收藏'}
              </button>
              <button
                onClick={() => {
                  setSelectedStyle(previewStyle.name)
                  setPreviewStyle(null)
                  handleGeneratePrompt()
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
