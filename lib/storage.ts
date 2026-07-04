export const storageKeys = {
  favorites: 'image-style-studio-favorites-v1',
  recentStyles: 'image-style-studio-recent-v1',
} as const

export function readStoredStringList(key: string): string[] {
  try {
    const value = window.localStorage.getItem(key)
    if (!value) return []

    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : []
  } catch {
    return []
  }
}

export function writeStoredStringList(key: string, value: readonly string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The app remains usable when browser storage is unavailable.
  }
}
