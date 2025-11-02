'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useMyQuoteRequests } from './hooks/useMyQuoteRequests'
import { QuoteRequestCard } from './components/QuoteRequestCard'
import { QuoteRequestsStats } from './components/QuoteRequestsStats'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Loader2, MessageSquareQuote } from 'lucide-react'

export const MyQuoteRequestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'pending' | 'quoted' | 'accepted' | 'rejected' | 'cancelled'
  >('all')
  const { quoteRequests, isLoading, refetch } = useMyQuoteRequests(
    activeTab === 'all' ? undefined : activeTab,
  )

  const tabs = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: 'Chờ phản hồi' },
    { value: 'quoted', label: 'Đã báo giá' },
    { value: 'accepted', label: 'Đã chấp nhận' },
    { value: 'rejected', label: 'Đã từ chối' },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <MessageSquareQuote className="w-8 h-8 text-blue-600" />
            Yêu cầu báo giá của tôi
          </h1>
          <p className="text-gray-600">Quản lý các yêu cầu báo giá bạn đã gửi</p>
        </div>

        {/* Stats Section */}
        <QuoteRequestsStats />

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="mb-6">
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : quoteRequests.length === 0 ? (
              <div className="text-center py-16">
                <MessageSquareQuote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {activeTab === 'all'
                    ? 'Bạn chưa có yêu cầu báo giá nào'
                    : `Không có yêu cầu nào ở trạng thái này`}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quoteRequests.map((q) => (
                  <QuoteRequestCard key={q.id} quote={q} onUpdate={refetch} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
