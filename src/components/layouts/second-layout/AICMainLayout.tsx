'use client'

import { userNavigationItems } from '@/common/constants/navigate.constant'
import Header from '../Header'
import Footer from '../Footer'
import { Chatbot } from '@/features/chat-bot'

interface AICMainLayoutProps {
  children: React.ReactNode
  navigationItems?: typeof userNavigationItems
  fullWidth?: boolean
}

export default function AICMainLayout({
  children,
  navigationItems = userNavigationItems,
  fullWidth = false,
}: AICMainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main
        className={
          fullWidth
            ? 'w-full pt-[var(--header-height)]'
            : 'max-w-8xl mx-auto pt-[var(--header-height)]'
        }
      >
        {children}
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
