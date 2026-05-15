import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 電影感提示詞引擎',

  description: 'Premium cinematic AI prompt engine',

  manifest: '/manifest.webmanifest',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AI 電影感提示詞引擎',
  },

  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body className="bg-[#050505] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}