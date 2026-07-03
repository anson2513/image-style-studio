export type PromptMode = 'independent' | 'movie' | 'illustration' | 'travel' | 'space'

export interface Style {
  category?: string
  cover: string
  name: string
  promptMode?: PromptMode
  desc: string
  prompt: string
}
