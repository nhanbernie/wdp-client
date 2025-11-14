import React from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

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
  const { colors } = useTheme()
  const isPositiveTrend = trend !== undefined && trend >= 0

  return (
    <Card className="p-6" style={{ background: colors.cardBackground, borderColor: colors.border }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
            {title}
          </p>
          <h3 className="text-3xl font-bold mt-2" style={{ color: colors.text }}>
            {value}
          </h3>
          {trend !== undefined && (
            <div className="flex items-center mt-2 text-sm">
              {isPositiveTrend ? (
                <TrendingUp className="w-4 h-4 mr-1" style={{ color: colors.success }} />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" style={{ color: colors.error }} />
              )}
              <span style={{ color: isPositiveTrend ? colors.success : colors.error }}>
                {Math.abs(trend)}%
              </span>
              {trendLabel && (
                <span className="ml-1" style={{ color: colors.textSecondary }}>
                  {trendLabel}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ background: colors.accent }}>
          {icon}
        </div>
      </div>
    </Card>
  )
}
