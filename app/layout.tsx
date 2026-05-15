import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 電影感提示詞引擎',
  description: 'Premium cinematic AI prompt engine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <head>
        <title>AI 電影感提示詞引擎</title>

        <meta
          name="description"
          content="Premium cinematic AI prompt engine"
        />

        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <meta
          name="apple-mobile-web-app-title"
          content="AI 電影感提示詞引擎"
        />

        <meta
          name="theme-color"
          content="#050505"
        />

        <link
          rel="manifest"
          href="/manifest.webmanifest"
        />

        <link
          rel="apple-touch-icon"
          href="/apple-icon.png"
        />

        <link
          rel="icon"
          href="/icon.png"
        />
      </head>

      <body className="bg-[#050505] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}