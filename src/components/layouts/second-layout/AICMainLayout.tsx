import { Header } from '@/components/layouts/second-layout/Header'
import { Footer } from '@/components/layouts/second-layout/Footer'
import { userNavigationItems } from '@/common/constants/navigate.constant'

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
      <Header navigationItems={navigationItems} />
      <main className="max-w-8xl mx-auto px-6 py-8">{children}</main>
      <Footer />
    </div>
  )
}
