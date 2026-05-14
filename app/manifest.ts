import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI修圖提示詞',
    short_name: 'AI修圖提示詞',
    description: 'Create cinematic AI prompts with premium visual aesthetics.',
    
    start_url: '/',
    
    display: 'standalone',
    
    background_color: '#080808',
    
    theme_color: '#080808',

    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}