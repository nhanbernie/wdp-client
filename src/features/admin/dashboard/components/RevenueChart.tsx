import React from 'react'
import { Card } from '@/components/ui/card'
import type { RevenueReportItem } from '../../types'

interface RevenueChartProps {
  data: RevenueReportItem[]
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  // Calculate max revenue for scaling
  const maxRevenue = Math.max(...data.map((item) => item.revenue))

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Doanh thu</h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const date = new Date(item.date).toLocaleDateString('vi-VN')
          const percentage = (item.revenue / maxRevenue) * 100

          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">{date}</span>
                <span className="font-semibold">
                  {item.revenue.toLocaleString('vi-VN')} VND
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {item.orderCount} đơn hàng
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
