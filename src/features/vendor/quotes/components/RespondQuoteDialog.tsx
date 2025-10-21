'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import FormProvider from '@/components/form/FormProvider'
import { TextField } from '@/components/common/TextField'
import { TextAreaField } from '@/components/common/TextAreaField'
import { Button } from '@/components/ui/button'
import { QuoteRequest } from '@/services/vendor/vendor.types'
import { respondQuoteSchema } from '../schemas/respondQuote.schema'
import { RespondQuoteFormData } from '../types'
import { useQuoteRequests } from '../hooks/useQuoteRequests'

interface RespondQuoteDialogProps {
  open: boolean
  onClose: () => void
  quote: QuoteRequest
  onSuccess?: () => void
}

export const RespondQuoteDialog: React.FC<RespondQuoteDialogProps> = ({
  open,
  onClose,
  quote,
  onSuccess,
}) => {
  const { handleRespond, isResponding } = useQuoteRequests()

  const defaultValues: RespondQuoteFormData = {
    responsePrice: quote.product?.price ? Number(quote.product.price) : 1,
    responseNotes: '',
    validUntil: '',
  }

  const onSubmit = async (data: RespondQuoteFormData) => {
    try {
      const submitData: any = {
        responsePrice: Number(data.responsePrice),
        responseNotes: data.responseNotes || undefined,
        validUntil: data.validUntil ? new Date(data.validUntil).toISOString() : undefined,
      }

      if (data.responseNotes) {
        submitData.responseNotes = data.responseNotes
      }

      if (data.validUntil) {
        submitData.validUntil = new Date(data.validUntil).toISOString()
      }

      await handleRespond(quote.id, submitData)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to respond to quote:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Báo giá cho khách hàng</DialogTitle>
          <DialogDescription>
            Khách hàng yêu cầu báo giá cho {quote.quantity} {quote.product?.stockUnit || 'sản phẩm'}
          </DialogDescription>
        </DialogHeader>

        <FormProvider<RespondQuoteFormData>
          defaultValues={defaultValues}
          validationSchema={respondQuoteSchema}
          onSubmit={onSubmit}
          mode="onChange"
        >
          <div className="space-y-4">
            {/* Product Summary */}
            {quote.product && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <h4 className="font-semibold text-gray-900">{quote.product.name}</h4>
                <div className="text-sm text-gray-600">
                  <p>
                    Số lượng: {quote.quantity} {quote.product.stockUnit}
                  </p>
                  <p>Giá niêm yết: {Number(quote.product.price).toLocaleString('vi-VN')} VND</p>
                </div>
              </div>
            )}

            <TextField
              name="responsePrice"
              label="Giá báo (VND)"
              type="number"
              placeholder="Nhập giá báo"
              required
            />

            <TextField name="validUntil" label="Hạn báo giá" type="text" placeholder="2025-10-30" />

            <TextAreaField
              name="responseNotes"
              label="Ghi chú"
              placeholder="Nhập ghi chú cho khách hàng (tùy chọn)..."
              rows={4}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isResponding}>
                Hủy
              </Button>
              <Button type="submit" disabled={isResponding}>
                {isResponding ? 'Đang gửi...' : 'Gửi báo giá'}
              </Button>
            </div>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
