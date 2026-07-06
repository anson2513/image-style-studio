export type PromptMode = 'independent' | 'movie' | 'illustration' | 'travel' | 'space'

export type StyleInputType = 'single-image' | 'multi-image' | 'text-only'

export interface StyleExample {
  inputImages: string[]
  outputImage: string
}

export interface Style {
  category?: string
  cover: string
  name: string
  promptMode?: PromptMode
  desc: string
  summary: string
  tags: string[]
  inputType: StyleInputType
  examples: StyleExample[]
  prompt: string
}
