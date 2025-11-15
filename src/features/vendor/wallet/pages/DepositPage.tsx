'use client'

import React, { useState, useRef, useCallback } from 'react'
import { DepositWalletDialog } from '../components/DepositWalletDialog'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const DepositPage: React.FC = () => {
  const router = useRouter()
  const { colors } = useTheme()

  const [isDialogOpen, setIsDialogOpen] = useState(true)

  const mountedRef = useRef(false)
  const userInitiatedCloseRef = useRef(false)

  const handleUserClose = useCallback(() => {
    userInitiatedCloseRef.current = true
    setIsDialogOpen(false)
  }, [])

  const handleDialogOpenChange = useCallback((open: boolean) => {
    if (!mountedRef.current) {
      mountedRef.current = true
      setIsDialogOpen(open)
      return
    }

    setIsDialogOpen(open)

    if (!open && userInitiatedCloseRef.current) {
      router.replace('/vendor/wallet')
    }
  }, [router])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.replace('/vendor/wallet')}
          style={{ color: colors.text }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        <div>
          <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
            Nạp tiền vào ví
          </h1>
          <p className="mt-2" style={{ color: colors.textSecondary }}>
            Nạp tiền vào ví để xử lý đơn hàng và thanh toán phí sàn
          </p>
        </div>
      </div>

      <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: colors.text }}>
            <Wallet className="w-5 h-5" style={{ color: colors.textSecondary }} />
            Hướng dẫn nạp tiền
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" style={{ color: colors.text }}>
          <div className="space-y-2">
            <h3 className="font-semibold">Các bước nạp tiền:</h3>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Nhập số tiền bạn muốn nạp (tối thiểu 10,000 VND)</li>
              <li>Nhấn nút &quot;Nạp tiền&quot; để tạo yêu cầu</li>
              <li>Thanh toán qua PayOS bằng QR code hoặc link thanh toán</li>
              <li>Sau khi thanh toán thành công, số tiền sẽ được cộng vào ví của bạn</li>
            </ol>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
            <h3 className="font-semibold mb-2">Lưu ý:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4" style={{ color: colors.textSecondary }}>
              <li>Số tiền nạp tối thiểu: 10,000 VND</li>
              <li>Thanh toán qua PayOS an toàn và nhanh chóng</li>
              <li>Giao dịch sẽ được xử lý tự động sau khi thanh toán thành công</li>
              <li>Bạn có thể xem lịch sử giao dịch trong trang Quản lý ví</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={() => {
            userInitiatedCloseRef.current = false
            setIsDialogOpen(true)
          }}
          size="lg"
          style={{ backgroundColor: colors.accent, color: 'white' }}
        >
          <Wallet className="w-5 h-5 mr-2" />
          Bắt đầu nạp tiền
        </Button>
      </div>

      <DepositWalletDialog
        open={isDialogOpen}
        onOpenChange={handleDialogOpenChange}
        onUserClose={handleUserClose}
      />
    </div>
  )
}
