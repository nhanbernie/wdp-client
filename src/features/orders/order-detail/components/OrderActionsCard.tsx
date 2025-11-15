'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, MessageCircle, Download, Zap, Loader2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import type { Order } from '@/services/orders/types'

interface OrderActionsCardProps {
  order: Order
  onReorder?: () => void
  onContactSupport?: () => void
  onDownloadInvoice?: () => void
  isReordering?: boolean
}

export function OrderActionsCard({
  order,
  onReorder,
  onContactSupport,
  onDownloadInvoice,
  isReordering = false,
}: OrderActionsCardProps) {
  const { colors } = useTheme()

  const handleDownloadInvoice = () => {
    if (onDownloadInvoice) {
      onDownloadInvoice()
    }
  }

  return (
    <Card
      className="rounded-lg border overflow-hidden"
      style={{
        backgroundColor: colors.cardBackgroundSecondary,
        border: `1px solid ${colors.border}30`,
        boxShadow: `0 4px 12px ${colors.border}20`,
      }}
    >
      <CardHeader
        className="p-4 border-b"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          border: `1px solid ${colors.border}30`,
          boxShadow: `0 4px 12px ${colors.border}20`,
        }}
      >
        <CardTitle className="flex items-center text-lg font-bold">
          <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${colors.accent}15` }}>
            <Zap className="h-5 w-5" style={{ color: colors.accent }} />
          </div>
          <span style={{ color: colors.text }}>Hành động</span>
        </CardTitle>
      </CardHeader>
      <CardContent
        className="space-y-3 pt-4 p-4"
        style={{ backgroundColor: colors.cardBackground }}
      >
        <Button
          onClick={onReorder}
          disabled={isReordering}
          className="w-full h-10 text-sm rounded-lg transition-opacity hover:opacity-80"
          style={{
            backgroundColor: colors.accent,
            color: colors.background,
          }}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Mua lại
        </Button>
        <Button
          onClick={handleDownloadInvoice}
          className="w-full h-10 text-sm rounded-lg transition-opacity hover:opacity-80"
          style={{
            backgroundColor: colors.success,
            color: colors.background,
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          Tải hóa đơn
        </Button>
      </CardContent>
    </Card>
  )
}
