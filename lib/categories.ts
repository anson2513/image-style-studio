import type { Style } from './types'

export const categories = [
  '收藏',
  '🔥熱門',
  '視覺企劃',
  '電影宇宙',
  '手繪插畫',
  '城市旅遊',
  '空間敘事',
  '食物美學',
] as const

export type Category = (typeof categories)[number]

const categoryStyleNames: Partial<Record<Category, readonly string[]>> = {
  視覺企劃: [
    '視覺導演',
    '電影收藏票根',
    '攝影書敘事',
    '食物海報設計',
    '色彩氛圍美學',
    '藝術拉絲攝影',
  ],
  電影宇宙: [
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
  ],
  手繪插畫: [
    '水彩插畫風',
    '彩色蠟筆手繪插畫',
    '極簡留白童話速寫',
    '手繪風註解日誌',
    '日系生活感手繪插畫',
  ],
  城市旅遊: [
    '高級旅遊雜誌風',
    '城市旅繪日誌',
    'Colorwalk 城市漫遊',
  ],
  空間敘事: ['電影級風景 HDR', '空拍敘事視角'],
  食物美學: ['食物海報設計'],
}

export function filterStyles(
  styles: readonly Style[],
  selectedCategory: Category,
  favorites: readonly string[]
): Style[] {
  if (selectedCategory === '🔥熱門') return [...styles]

  if (selectedCategory === '收藏') {
    return styles.filter((style) => favorites.includes(style.name))
  }

  const styleNames = categoryStyleNames[selectedCategory]

  return styleNames
    ? styles.filter((style) => styleNames.includes(style.name))
    : [...styles]
}
