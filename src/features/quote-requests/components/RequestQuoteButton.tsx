'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { QuoteRequestForm } from './QuoteRequestForm'
import { FileText } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface Props {
  productId: string
}

export const RequestQuoteButton: React.FC<Props> = ({ productId }) => {
  const [open, setOpen] = useState(false)
  const { colors } = useTheme()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-lg h-11 text-sm font-bold shadow-sm transition-all duration-200 hover:shadow-md"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            color: colors.textSecondary,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.hoverBackground
            e.currentTarget.style.borderColor = colors.textSecondary
            e.currentTarget.style.color = colors.text
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.cardBackground
            e.currentTarget.style.borderColor = colors.border
            e.currentTarget.style.color = colors.textSecondary
          }}
        >
          <FileText className="h-4 w-4 mr-2" />
          Yêu cầu báo giá
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Yêu cầu báo giá</DialogTitle>
          <DialogDescription>
            Điền thông tin dưới đây để gửi yêu cầu báo giá đến vendor. Vendor sẽ phản hồi trong thời
            gian sớm nhất.
          </DialogDescription>
        </DialogHeader>
        <QuoteRequestForm productId={productId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
