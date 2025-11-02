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

interface Props {
  productId: string
}

export const RequestQuoteButton: React.FC<Props> = ({ productId }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-2xl h-14 text-base font-bold border-2 hover:bg-slate-50 hover:border-indigo-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          <FileText className="h-5 w-5 mr-2" />
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
