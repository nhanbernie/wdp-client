'use client'

import React, { useState, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useVendorWallet } from '../hooks/useVendorWallet'
import { Loader2, Wallet } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useToast } from '@/hooks/useToast'

interface DepositWalletDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserClose?: () => void
}

export const DepositWalletDialog: React.FC<DepositWalletDialogProps> = ({
  open,
  onOpenChange,
  onUserClose,
}) => {
  const { deposit, isDepositing } = useVendorWallet()
  const { colors } = useTheme()
  const toast = useToast()

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const amountNum = Number(amount.replace(/[^0-9]/g, ''))
    if (amountNum < 10000) {
      toast.warning('Số tiền nạp tối thiểu là 10,000 VND')
      return
    }

    try {
      await deposit({
        amount: amountNum,
        description: description || undefined,
      })
      setAmount('')
      setDescription('')
    } catch (error) {
      console.error('Deposit failed:', error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setAmount(value)
  }

  const quickAmounts = [100000, 500000, 1000000, 2000000, 5000000]

  const handleCancelClick = useCallback(() => {
    onUserClose?.()
    onOpenChange(false)
  }, [onOpenChange, onUserClose])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
        onEscapeKeyDown={() => {
          onUserClose?.()
        }}
        onPointerDownOutside={() => {
          onUserClose?.()
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ color: colors.text }}>
            <Wallet className="w-5 h-5" />
            Nạp tiền vào ví
          </DialogTitle>
          <DialogDescription style={{ color: colors.textSecondary }}>
            Nạp tiền vào ví để xử lý đơn hàng. Số tiền tối thiểu: 10,000 VND
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" style={{ color: colors.text }}>
              Số tiền nạp <span style={{ color: colors.error }}>*</span>
            </Label>
            <Input
              id="amount"
              type="text"
              value={amount ? formatPrice(Number(amount)) : ''}
              onChange={handleAmountChange}
              placeholder="Nhập số tiền"
              required
              min={10000}
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                color: colors.text,
              }}
            />
            <p className="text-xs" style={{ color: colors.textSecondary }}>
              Số tiền tối thiểu: 10,000 VND
            </p>
          </div>

          {/* Quick amount buttons */}
          <div className="grid grid-cols-5 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAmount(quickAmount.toString())}
                style={{ borderColor: colors.border, color: colors.text }}
              >
                {quickAmount / 1000}k
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" style={{ color: colors.text }}>
              Ghi chú (tùy chọn)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ghi chú cho giao dịch này..."
              rows={3}
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                color: colors.text,
              }}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelClick}
              className="flex-1"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              Hủy
            </Button>

            <Button
              type="submit"
              disabled={isDepositing || !amount || Number(amount) < 10000}
              className="flex-1"
              style={{ backgroundColor: colors.accent, color: 'white' }}
            >
              {isDepositing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Nạp tiền
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
