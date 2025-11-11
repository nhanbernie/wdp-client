'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'

export const VendorShopHeader: React.FC = () => {
  const router = useRouter()
  const { colors } = useTheme()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Button
        onClick={() => router.back()}
        variant="outline"
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
        style={{
          borderColor: colors.border,
          color: colors.text,
        }}
      >
        <ArrowLeft size={20} />
        Quay lại
      </Button>
    </div>
  )
}
