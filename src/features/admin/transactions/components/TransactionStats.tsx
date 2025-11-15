'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
} from 'lucide-react'
import type { TransactionStats as TransactionStatsType } from '../types/transactions.types'

interface TransactionStatsProps {
  stats: TransactionStatsType | undefined
}

export const TransactionStats: React.FC<TransactionStatsProps> = ({ stats }) => {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    )
  }
  const StatCard = ({
    title,
    value,
    icon,
    trend,
    color,
  }: {
    title: string
    value: string | number
    icon: React.ReactNode
    trend?: number
    color: string
  }) => (
    <Card className="p-6 transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-2" style={{ color }}>
            {typeof value === 'number' ? value.toLocaleString('vi-VN') : value}
          </p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {trend >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {Math.abs(trend).toFixed(2)}%
              </span>
            </div>
          )}
        </div>
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
      </div>
    </Card>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Tổng giao dịch"
        value={stats.totalTransactions}
        icon={<BarChart3 className="w-6 h-6" style={{ color: '#3b82f6' }} />}
        color="#3b82f6"
      />
      <StatCard
        title="Tổng số tiền"
        value={`${stats.totalAmount.toLocaleString('vi-VN')} VND`}
        icon={<DollarSign className="w-6 h-6" style={{ color: '#10b981' }} />}
        trend={stats.growth}
        color="#10b981"
      />
      <StatCard
        title="Giao dịch thành công"
        value={stats.successfulTransactions}
        icon={<CheckCircle className="w-6 h-6" style={{ color: '#10b981' }} />}
        color="#10b981"
      />
      <StatCard
        title="Số tiền thành công"
        value={`${stats.successfulAmount.toLocaleString('vi-VN')} VND`}
        icon={<DollarSign className="w-6 h-6" style={{ color: '#10b981' }} />}
        color="#10b981"
      />
      <StatCard
        title="Giao dịch đang chờ"
        value={stats.pendingTransactions}
        icon={<Clock className="w-6 h-6" style={{ color: '#f59e0b' }} />}
        color="#f59e0b"
      />
      <StatCard
        title="Số tiền đang chờ"
        value={`${stats.pendingAmount.toLocaleString('vi-VN')} VND`}
        icon={<DollarSign className="w-6 h-6" style={{ color: '#f59e0b' }} />}
        color="#f59e0b"
      />
      <StatCard
        title="Giao dịch thất bại"
        value={stats.failedTransactions}
        icon={<XCircle className="w-6 h-6" style={{ color: '#ef4444' }} />}
        color="#ef4444"
      />
      <StatCard
        title="Tỷ lệ thành công"
        value={`${stats.successRate.toFixed(2)}%`}
        icon={<TrendingUp className="w-6 h-6" style={{ color: '#8b5cf6' }} />}
        color="#8b5cf6"
      />
    </div>
  )
}

