import React from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: number
  trendLabel?: string
  color?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  color = 'blue',
}) => {
  const isPositiveTrend = trend !== undefined && trend >= 0

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
          {trend !== undefined && (
            <div className="flex items-center mt-2 text-sm">
              {isPositiveTrend ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span
                className={isPositiveTrend ? 'text-green-500' : 'text-red-500'}
              >
                {Math.abs(trend)}%
              </span>
              {trendLabel && (
                <span className="text-gray-500 ml-1">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          {icon}
        </div>
      </div>
    </Card>
  )
}
