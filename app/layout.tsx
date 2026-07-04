import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '影像風格室｜By Anson',
  description: 'AI 修圖風格工作台',

  manifest: '/manifest.webmanifest',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '影像風格室',
  },

  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },

}

export const viewport: Viewport = {
  themeColor: '#F6F4EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <title>影像風格室｜By Anson</title>

        <meta
          name="description"
          content="AI 修圖風格工作台"
        />

        <meta
          name="apple-mobile-web-app-title"
          content="影像風格室"
        />

        <meta
          name="application-name"
          content="影像風格室"
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

      <body className="min-h-screen overflow-x-hidden bg-[#F6F4EF] text-[#20211F]">
        {children}
      </body>
    </html>
  )
}
