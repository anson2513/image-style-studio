import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 電影感提示詞引擎',

  description:
    'Premium cinematic AI prompt engine',

  applicationName: 'AI 電影感提示詞引擎',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AI 電影感提示詞引擎',
  },

  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },

  manifest: '/manifest.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  )
}