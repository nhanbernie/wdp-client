'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, MessageCircle, Download, Zap } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface OrderActionsCardProps {
  onReorder?: () => void
  onContactSupport?: () => void
  onDownloadInvoice?: () => void
}

export function OrderActionsCard({
  onReorder,
  onContactSupport,
  onDownloadInvoice,
}: OrderActionsCardProps) {
  const { colors } = useTheme()

  return (
    <Card
      className="rounded-lg border overflow-hidden"
      style={{
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }}
    >
      <CardHeader
        className="p-4 border-b"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.cardBackground,
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
          onClick={onContactSupport}
          className="w-full h-10 text-sm rounded-lg transition-opacity hover:opacity-80"
          style={{
            backgroundColor: colors.textSecondary,
            color: colors.background,
          }}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Liên hệ hỗ trợ
        </Button>
        <Button
          onClick={onDownloadInvoice}
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
