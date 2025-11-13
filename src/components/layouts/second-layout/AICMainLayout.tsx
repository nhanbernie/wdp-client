'use client'

import { userNavigationItems } from '@/common/constants/navigate.constant'
import Header from '../Header'
import Footer from '../Footer'
import { Chatbot } from '@/features/chat-bot'

interface AICMainLayoutProps {
  children: React.ReactNode
  navigationItems?: typeof userNavigationItems
}

export default function AICMainLayout({
  children,
  navigationItems = userNavigationItems,
}: AICMainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-8xl mx-auto pt-[var(--header-height)]">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  )
}
