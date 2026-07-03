import {
  illustrationBasePrompt,
  movieBasePrompt,
  spaceBasePrompt,
  travelBasePrompt,
} from './basePrompts'
import type { PromptMode, Style } from './types'

const basePrompts: Record<Exclude<PromptMode, 'independent'>, string> = {
  movie: movieBasePrompt,
  illustration: illustrationBasePrompt,
  travel: travelBasePrompt,
  space: spaceBasePrompt,
}

export function getBasePrompt(style?: Style): string {
  const promptMode = style?.promptMode ?? 'movie'

  return promptMode === 'independent' ? '' : basePrompts[promptMode]
}

export function buildPrompt(style?: Style): string {
  return `${getBasePrompt(style)}

${style?.prompt || ''}`
}
