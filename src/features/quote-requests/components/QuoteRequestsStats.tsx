'use client'

import React from 'react'
import { useGetMyQuoteRequestsQuery } from '@/services/quote-requests'
import { Card, CardContent } from '@/components/ui/card'
import {
  MessageSquareQuote,
  Clock,
  CheckCircle,
  DollarSign,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export const QuoteRequestsStats: React.FC = () => {
  const { data } = useGetMyQuoteRequestsQuery()
  const quotes = data?.data || []
  const { colors } = useTheme()

  const stats = {
    total: quotes.length,
    pending: quotes.filter((q) => q.status === 'pending').length,
    quoted: quotes.filter((q) => q.status === 'quoted').length,
    accepted: quotes.filter((q) => q.status === 'accepted').length,
    rejected: quotes.filter((q) => q.status === 'rejected').length,
  }

  const statsCards = [
    {
      title: 'Tổng số yêu cầu',
      value: stats.total,
      icon: MessageSquareQuote,
      iconColor: colors.accent,
      iconBg: `${colors.accent}15`,
    },
    {
      title: 'Chờ phản hồi',
      value: stats.pending,
      icon: Clock,
      iconColor: colors.accent,
      iconBg: `${colors.accent}15`,
    },
    {
      title: 'Đã báo giá',
      value: stats.quoted,
      icon: DollarSign,
      iconColor: colors.accent,
      iconBg: `${colors.accent}15`,
    },
    {
      title: 'Đã chấp nhận',
      value: stats.accepted,
      icon: CheckCircle,
      iconColor: colors.success,
      iconBg: `${colors.success}15`,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={index}
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            }}
          >
            <CardContent className="pt-6" style={{ backgroundColor: colors.cardBackground }}>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: colors.textSecondary }}
                  >
                    {stat.title}
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: colors.text }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: stat.iconBg,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.iconColor }} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
