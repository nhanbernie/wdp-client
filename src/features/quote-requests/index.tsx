'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useMyQuoteRequests } from './hooks/useMyQuoteRequests'
import { useGetMyQuoteRequestsQuery } from '@/services/quote-requests'
import { QuoteRequestCard } from './components/QuoteRequestCard'
import { QuoteRequestsStats } from './components/QuoteRequestsStats'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Loader2, MessageSquareQuote, ClipboardList, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export const MyQuoteRequestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'pending' | 'quoted' | 'accepted' | 'rejected' | 'cancelled'
  >('all')
  const { quoteRequests, isLoading, refetch } = useMyQuoteRequests(
    activeTab === 'all' ? undefined : activeTab,
  )
  const { data: allQuotesData } = useGetMyQuoteRequestsQuery()
  const { colors } = useTheme()

  const tabs = [
    { value: 'all', label: 'Tất cả', icon: ClipboardList },
    { value: 'pending', label: 'Chờ phản hồi', icon: Clock },
    { value: 'quoted', label: 'Đã báo giá', icon: DollarSign },
    { value: 'accepted', label: 'Đã chấp nhận', icon: CheckCircle },
    { value: 'rejected', label: 'Đã từ chối', icon: XCircle },
  ]

  const counts = useMemo(() => {
    const allQuotes = allQuotesData?.data || []
    return {
      all: allQuotes.length,
      pending: allQuotes.filter((q: any) => q.status === 'pending').length,
      quoted: allQuotes.filter((q: any) => q.status === 'quoted').length,
      accepted: allQuotes.filter((q: any) => q.status === 'accepted').length,
      rejected: allQuotes.filter((q: any) => q.status === 'rejected').length,
    }
  }, [allQuotesData])

  useEffect(() => {
    const styleId = 'quote-tabs-theme-styles'
    let style = document.getElementById(styleId) as HTMLStyleElement

    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }

    style.textContent = `
      [data-quote-tabs-list] {
        background: ${colors.cardBackgroundSecondary} !important;
        border-color: ${colors.border} !important;
      }
      
      [data-quote-tabs-list] button[data-state="active"] {
        background: ${colors.accent} !important;
        background-image: none !important;
        background-color: ${colors.accent} !important;
        color: white !important;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
      }
      
      [data-quote-tabs-list] button[data-state="inactive"] {
        background: transparent !important;
        background-image: none !important;
        background-color: transparent !important;
        color: ${colors.textSecondary} !important;
      }
      
      [data-quote-tabs-list] button[data-state="inactive"]:hover {
        background: ${colors.hoverBackground} !important;
        background-image: none !important;
        background-color: ${colors.hoverBackground} !important;
      }
      
      [data-quote-tabs-list] button[data-state="inactive"] svg {
        color: ${colors.textSecondary} !important;
      }
      [data-quote-tabs-list] button[data-state="active"] svg {
        color: white !important;
      }
    `

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [colors])

  return (
    <div
      className="max-w-7xl mx-auto py-8 px-4"
      style={{ backgroundColor: colors.background }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2 flex items-center gap-3"
            style={{ color: colors.text }}
          >
            <MessageSquareQuote className="w-8 h-8" style={{ color: colors.accent }} />
            Yêu cầu báo giá của tôi
          </h1>
          <p style={{ color: colors.textSecondary }}>
            Quản lý các yêu cầu báo giá bạn đã gửi
          </p>
        </div>

        {/* Stats Section */}
        <QuoteRequestsStats />

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-8">
          <TabsList
            className="grid grid-cols-2 lg:grid-cols-5 gap-2 p-2 rounded-2xl h-auto border mb-6"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              borderColor: colors.border,
            }}
            data-quote-tabs-list
          >
            {tabs.map((t) => {
              const Icon = t.icon
              const count = counts[t.value as keyof typeof counts] || 0
              return (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="h-14 rounded-xl text-base font-bold transition-all"
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{count}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: colors.accent }} />
              </div>
            ) : quoteRequests.length === 0 ? (
              <div className="text-center py-16">
                <MessageSquareQuote
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: colors.textSecondary }}
                />
                <p style={{ color: colors.textSecondary }}>
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
