'use client'

import React, { useState } from 'react'
import { WalletBalanceCard } from '../components/WalletBalanceCard'
import { DepositWalletDialog } from '../components/DepositWalletDialog'
import { TransactionHistory } from '../components/TransactionHistory'
import { Button } from '@/components/ui/button'
import { Plus, Wallet } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

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
          <p className="text-gray-600"> Nạp tiền, xem số dư và lịch sử giao dịch </p>
        </div>
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

      <WalletBalanceCard />

      <TransactionHistory />

      <DepositWalletDialog
        open={isDepositDialogOpen}
        onOpenChange={setIsDepositDialogOpen}
      />
    </div>
  )
}

