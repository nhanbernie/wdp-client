'use client'

import React, { useState } from 'react'
import { WalletBalanceCard } from '../components/WalletBalanceCard'
import { DepositWalletDialog } from '../components/DepositWalletDialog'
import { TransactionHistory } from '../components/TransactionHistory'
import { Button } from '@/components/ui/button'
import { Plus, Wallet, ArrowDown } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

export const WalletPage: React.FC = () => {
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false)
  const { colors } = useTheme()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-blue-600" />
            Quản lý ví
          </h1>
          <p className="text-gray-600"> Nạp tiền, rút tiền, xem số dư và lịch sử giao dịch </p>
        </div>
        <div className="flex gap-3">
          <Link href="/vendor/wallet/withdraw">
            <Button
              variant="outline"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.border,
                color: colors.text,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.hoverBackground
                e.currentTarget.style.borderColor = colors.textSecondary
                e.currentTarget.style.color = colors.text
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
                e.currentTarget.style.borderColor = colors.border
                e.currentTarget.style.color = colors.text
              }}
            >
              <ArrowDown className="w-4 h-4 mr-2" />
              Rút tiền
            </Button>
          </Link>
          <Button
            onClick={() => setIsDepositDialogOpen(true)}
            style={{
              backgroundColor: colors.accent,
              color: 'white',
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nạp tiền
          </Button>
        </div>
      </div>

      <WalletBalanceCard />

      <TransactionHistory />

      <DepositWalletDialog
        open={isDepositDialogOpen}
        onOpenChange={setIsDepositDialogOpen}
      />
    </div>
  )
}

