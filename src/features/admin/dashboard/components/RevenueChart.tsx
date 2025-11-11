import React from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import type { RevenueReportItem } from '../../types'

interface RevenueChartProps {
  data: RevenueReportItem[]
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const { colors } = useTheme()
  const maxRevenue = Math.max(...data.map((item) => item.revenue))

  return (
    <Card className="p-6" style={{ background: colors.cardBackground, borderColor: colors.border }}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
        <TrendingUp className="w-5 h-5" style={{ color: colors.accent }} />
        Doanh thu
      </h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const date = new Date(item.date).toLocaleDateString('vi-VN')
          const percentage = (item.revenue / maxRevenue) * 100

          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: colors.textSecondary }}>{date}</span>
                <span className="font-semibold" style={{ color: colors.text }}>
                  {item.revenue.toLocaleString('vi-VN')} VND
                </span>
              </div>
              <div
                className="w-full rounded-full h-2"
                style={{ background: colors.cardBackgroundSecondary }}
              >
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%`, background: colors.accent }}
                />
              </div>
              <div className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                {item.orderCount} đơn hàng
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
