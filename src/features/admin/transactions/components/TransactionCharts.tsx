'use client'

import React from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card } from '@/components/ui/card'
import type { TransactionAnalytics } from '../types'
import { useTheme } from '@/contexts/ThemeContext'

interface TransactionChartsProps {
  analytics: TransactionAnalytics | undefined
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

// Helper functions to translate values to Vietnamese
const translatePaymentType = (type: string): string => {
  const typeMap: Record<string, string> = {
    order_payment: 'Thanh toán đơn hàng',
    wallet_deposit: 'Nạp tiền vào ví',
  }
  return typeMap[type] || type
}

const translatePaymentStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    SUCCESS: 'Thành công',
    PENDING: 'Đang chờ',
    FAILED: 'Thất bại',
    CANCELLED: 'Đã hủy',
  }
  return statusMap[status] || status
}

export const TransactionCharts: React.FC<TransactionChartsProps> = ({ analytics }) => {
  const { colors } = useTheme()

  if (!analytics) {
    return (
      <div className="space-y-6">
        <Card
          className="p-6"
          style={{ background: colors.cardBackground, borderColor: colors.border }}
        >
          <div
            className="h-64 animate-pulse rounded"
            style={{ background: colors.cardBackgroundSecondary }}
          ></div>
        </Card>
      </div>
    )
  }

  const byDate = analytics.byDate || []
  const byType = analytics.byType || []
  const byStatus = analytics.byStatus || []

  // Format date for display
  const formatDate = (date: string) => {
    try {
      const d = new Date(date)
      return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
    } catch {
      return date
    }
  }

  return (
    <div className="space-y-6">
      {/* Transaction Amount Over Time */}
      <Card
        className="p-6 border-2"
        style={{ background: colors.cardBackground, borderColor: colors.border }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
          Biểu đồ giao dịch theo thời gian
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={byDate}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              style={{ fontSize: '12px', fill: colors.textSecondary }}
            />
            <YAxis
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              style={{ fontSize: '12px', fill: colors.textSecondary }}
            />
            <Tooltip
              formatter={(value: number) => `${value.toLocaleString('vi-VN')} VND`}
              labelFormatter={(label) => `Ngày: ${formatDate(label)}`}
              contentStyle={{
                background: colors.cardBackground,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                color: colors.text,
              }}
            />
            <Legend wrapperStyle={{ color: colors.text }} />
            <Line
              type="monotone"
              dataKey="successfulAmount"
              stroke="#10b981"
              strokeWidth={2}
              name="Thành công"
            />
            <Line
              type="monotone"
              dataKey="pendingAmount"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Đang chờ"
            />
            <Line
              type="monotone"
              dataKey="failedAmount"
              stroke="#ef4444"
              strokeWidth={2}
              name="Thất bại"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Transaction Count Over Time */}
      <Card
        className="p-6 border-2"
        style={{ background: colors.cardBackground, borderColor: colors.border }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
          Số lượng giao dịch theo thời gian
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={byDate}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              style={{ fontSize: '12px', fill: colors.textSecondary }}
            />
            <YAxis style={{ fontSize: '12px', fill: colors.textSecondary }} />
            <Tooltip
              formatter={(value: number) => `${value} giao dịch`}
              labelFormatter={(label) => `Ngày: ${formatDate(label)}`}
              contentStyle={{
                background: colors.cardBackground,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                color: colors.text,
              }}
            />
            <Legend wrapperStyle={{ color: colors.text }} />
            <Bar dataKey="successfulCount" fill="#10b981" name="Thành công" />
            <Bar dataKey="pendingCount" fill="#f59e0b" name="Đang chờ" />
            <Bar dataKey="failedCount" fill="#ef4444" name="Thất bại" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transactions by Payment Type */}
        <Card
          className="p-6 border-2"
          style={{ background: colors.cardBackground, borderColor: colors.border }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
            Giao dịch theo loại thanh toán
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={byType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => {
                  const paymentType = entry.paymentType || ''
                  const percent = entry.percent || 0
                  return `${translatePaymentType(paymentType)}: ${(percent * 100).toFixed(0)}%`
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {byType.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${value.toLocaleString('vi-VN')} VND`}
                contentStyle={{
                  background: colors.cardBackground,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  color: colors.text,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Transactions by Status */}
        <Card
          className="p-6 border-2"
          style={{ background: colors.cardBackground, borderColor: colors.border }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
            Giao dịch theo trạng thái
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={byStatus} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis type="number" style={{ fontSize: '12px', fill: colors.textSecondary }} />
              <YAxis
                dataKey="status"
                type="category"
                style={{ fontSize: '12px', fill: colors.textSecondary }}
                width={100}
                tickFormatter={translatePaymentStatus}
              />
              <Tooltip
                formatter={(value: number) => `${value.toLocaleString('vi-VN')} VND`}
                labelFormatter={(label) => `Trạng thái: ${translatePaymentStatus(label)}`}
                contentStyle={{
                  background: colors.cardBackground,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  color: colors.text,
                }}
              />
              <Bar dataKey="amount" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
