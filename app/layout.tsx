import type { Metadata } from 'next'
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
  title: 'AI Visual Director',

  description:
    'Premium cinematic AI prompt engine',

  manifest: '/manifest.webmanifest',

  themeColor: '#080808',

  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#050505]`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}