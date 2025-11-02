'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuoteRequests } from './hooks/useQuoteRequests'
import { QuoteRequestCard } from './components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, MessageSquareQuote } from 'lucide-react'

type QuoteStatus = 'pending' | 'quoted' | 'accepted' | 'rejected' | 'expired' | 'cancelled'

export const QuoteRequestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<QuoteStatus | 'all'>('all')
  const { quoteRequests, isLoading, refetch } = useQuoteRequests(
    activeTab === 'all' ? undefined : activeTab,
  )

  const tabs = [
    { value: 'all', label: 'Tất cả', count: quoteRequests.length },
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
            Yêu cầu báo giá
          </h1>
          <p className="text-gray-600">Quản lý các yêu cầu báo giá từ khách hàng</p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="mb-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
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
                <p className="text-gray-500">Chưa có yêu cầu báo giá nào</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quoteRequests.map((quote) => (
                  <QuoteRequestCard key={quote.id} quote={quote} onRespond={refetch} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
