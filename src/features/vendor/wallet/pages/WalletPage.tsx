'use client'

import React, { useState } from 'react'
import { WalletBalanceCard } from '../components/WalletBalanceCard'
import { DepositWalletDialog } from '../components/DepositWalletDialog'
import { TransactionHistory } from '../components/TransactionHistory'
import { Button } from '@/components/ui/button'
import { Plus, Wallet, ArrowDown } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const WalletPage: React.FC = () => {
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false)
  const { colors } = useTheme()

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.accent}15` }}>
                <Wallet className="w-8 h-8" style={{ color: colors.accent }} />
              </div>

              <div>
                <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
                  Quản lý ví
                </h1>
                <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                  Nạp tiền, rút tiền, xem số dư và lịch sử giao dịch
                </p>
              </div>
            </div>

            {/* Right actions */}
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
                style={{ backgroundColor: colors.accent, color: 'white' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nạp tiền
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <WalletBalanceCard />
          <TransactionHistory />
        </motion.div>

        {/* Dialog */}
        <DepositWalletDialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen} />
      </div>
    </div>
  )
}
