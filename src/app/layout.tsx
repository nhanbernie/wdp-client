import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppProvider from '@/providers/AppProvider'

// Inter font with Vietnamese support
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WDP Materials - Premium Construction Materials & Building Supplies',
  description:
    'Your trusted partner for premium construction materials and building supplies. Quality materials for every construction project.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} antialiased font-sans`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
