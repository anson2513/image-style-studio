export type BenchmarkGroupId =
  | 'portrait'
  | 'city-travel'
  | 'food'
  | 'architecture-space'
  | 'multi-photo-narrative'
  | 'daily-life'
  | 'aerial'

export interface BenchmarkSourcePhoto {
  id: string
  src: string
  alt: string
  sourceType: 'ai-generated' | 'personally-captured'
  creator: string
  createdAt?: string
}

export interface BenchmarkGroup {
  id: BenchmarkGroupId
  name: string
  expectedImageCount: number
  sourcePhotos: BenchmarkSourcePhoto[]
}

export const benchmarkGroups: BenchmarkGroup[] = [
  {
    id: 'portrait',
    name: '人像',
    expectedImageCount: 2,
    sourcePhotos: [
      { id: 'portrait-01', src: '/examples/sources/portrait/portrait-01.webp', alt: '窗邊自然光下的安靜人物肖像', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
      { id: 'portrait-02', src: '/examples/sources/portrait/portrait-02.webp', alt: '清水模咖啡空間中的自然人物肖像', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
    ],
  },
  {
    id: 'city-travel',
    name: '城市／旅行',
    expectedImageCount: 3,
    sourcePhotos: [
      { id: 'city-travel-01', src: '/examples/sources/city-travel/city-travel-01.webp', alt: '雨後的台北住宅街道', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
      { id: 'city-travel-02', src: '/examples/sources/city-travel/city-travel-02.webp', alt: '晨光中的地中海石造巷弄', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
      { id: 'city-travel-03', src: '/examples/sources/city-travel/city-travel-03.webp', alt: '雨夜中的現代首爾街景', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
    ],
  },
  {
    id: 'food',
    name: '食物',
    expectedImageCount: 2,
    sourcePhotos: [
      { id: 'food-01', src: '/examples/sources/food/food-01.webp', alt: '窗邊木桌上的柑橘塔', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
      { id: 'food-02', src: '/examples/sources/food/food-02.webp', alt: '午後光線中的番茄羅勒義大利麵', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
    ],
  },
  {
    id: 'architecture-space',
    name: '建築／空間',
    expectedImageCount: 2,
    sourcePhotos: [
      { id: 'architecture-space-01', src: '/examples/sources/architecture-space/architecture-space-01.webp', alt: '天窗自然光下的清水模藝廊', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
      { id: 'architecture-space-02', src: '/examples/sources/architecture-space/architecture-space-02.webp', alt: '面向庭院的日系當代客廳', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
    ],
  },
  {
    id: 'multi-photo-narrative',
    name: '多圖敘事',
    expectedImageCount: 4,
    sourcePhotos: [
      { id: 'multi-photo-narrative-01', src: '/examples/sources/multi-photo-narrative/multi-photo-narrative-01.webp', alt: '清晨渡輪接近霧中島嶼', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
      { id: 'multi-photo-narrative-02', src: '/examples/sources/multi-photo-narrative/multi-photo-narrative-02.webp', alt: '帶著海上水氣的渡輪窗景', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
      { id: 'multi-photo-narrative-03', src: '/examples/sources/multi-photo-narrative/multi-photo-narrative-03.webp', alt: '通往海邊的漁村巷道', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
      { id: 'multi-photo-narrative-04', src: '/examples/sources/multi-photo-narrative/multi-photo-narrative-04.webp', alt: '站在石造碼頭眺望遠方渡輪的人', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
    ],
  },
  {
    id: 'daily-life',
    name: '日常生活',
    expectedImageCount: 3,
    sourcePhotos: [
      { id: 'daily-life-01', src: '/examples/sources/daily-life/daily-life-01.webp', alt: '木桌上整理白色花束的雙手', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
      { id: 'daily-life-02', src: '/examples/sources/daily-life/daily-life-02.webp', alt: '晨光床面上的書、眼鏡與咖啡', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
      { id: 'daily-life-03', src: '/examples/sources/daily-life/daily-life-03.webp', alt: '午後樹蔭下散步的人與狗', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-04' },
    ],
  },
  {
    id: 'aerial',
    name: '空拍地景',
    expectedImageCount: 1,
    sourcePhotos: [
      { id: 'aerial-01', src: '/examples/sources/aerial/aerial-01.webp', alt: '陰天晨光下的海岸聚落空拍地景', sourceType: 'ai-generated', creator: 'OpenAI image generation', createdAt: '2026-07-05' },
    ],
  },
]

export const pilotStyleNames = [
  '攝影書敘事',
  '水彩插畫風',
  '高級旅遊雜誌風',
  '食物海報設計',
  '日系電影感',
] as const

export const expectedBenchmarkImageCount = benchmarkGroups.reduce(
  (total, group) => total + group.expectedImageCount,
  0,
)

export function getIncompleteBenchmarkGroups() {
  return benchmarkGroups.filter(
    (group) => group.sourcePhotos.length !== group.expectedImageCount,
  )
}
