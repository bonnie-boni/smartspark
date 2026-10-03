import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from './providers'
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
  metadataBase: new URL('https://smartsparkservices.com'),
  title: {
    default: 'SmartSpark Services',
    template: '%s | SmartSpark Services',
  },
  description:
    'SmartSpark Services combines AI technology with creative expertise for web development, design, marketing, and automation.',
  keywords: [
    'AI solutions',
    'web development',
    'graphic design',
    'digital marketing',
    'automation',
    'SmartSpark',
  ],
  openGraph: {
    title: 'SmartSpark Services',
    description:
      'AI-powered creative services for web development, design, marketing, and automation.',
    url: '/',
    siteName: 'SmartSpark Services',
    images: ['/images/logo.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartSpark Services',
    description:
      'AI-powered creative services for web development, design, marketing, and automation.',
    images: ['/images/logo.webp'],
  },
  icons: {
    icon: '/images/logo.webp',
    apple: '/images/logo.webp',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#020617',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
