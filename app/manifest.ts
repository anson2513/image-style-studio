import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI 電影感提示詞引擎',

    short_name: 'AI 電影感',

    description:
      'Premium cinematic AI prompt engine',

    start_url: '/',

    display: 'standalone',

    background_color: '#050505',

    theme_color: '#050505',

    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}