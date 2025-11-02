'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createQuoteRequestSchema,
  CreateQuoteRequestFormData,
} from '@/features/quote-requests/schemas/quote-request.schema'
import { useCreateQuoteRequest } from '@/features/quote-requests/hooks/useCreateQuoteRequest'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  productId: string
  onSuccess?: () => void
}

export const QuoteRequestForm: React.FC<Props> = ({ productId, onSuccess }) => {
  const { handleCreate, isLoading } = useCreateQuoteRequest()

  const { register, handleSubmit, formState } = useForm<CreateQuoteRequestFormData>({
    resolver: zodResolver(createQuoteRequestSchema),
    defaultValues: { productId, quantity: 1 },
  })

  const onSubmit = async (values: CreateQuoteRequestFormData) => {
    try {
      await handleCreate(values)
      onSuccess?.()
    } catch (e) {
      // error handled in hook
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register('productId')} />

      <div>
        <label className="block text-sm mb-1">Số lượng</label>
        <Input type="number" {...register('quantity', { valueAsNumber: true })} />
        {formState.errors.quantity && (
          <p className="text-xs text-red-500">{formState.errors.quantity.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Yêu cầu kỹ thuật</label>
        <Textarea {...register('specifications')} rows={4} />
        {formState.errors.specifications && (
          <p className="text-xs text-red-500">{formState.errors.specifications.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Địa chỉ giao</label>
        <Input {...register('deliveryAddress')} />
        {formState.errors.deliveryAddress && (
          <p className="text-xs text-red-500">{formState.errors.deliveryAddress.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Ghi chú</label>
        <Textarea {...register('requestNotes')} rows={3} />
        {formState.errors.requestNotes && (
          <p className="text-xs text-red-500">{formState.errors.requestNotes.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          Gửi yêu cầu
        </Button>
      </div>
    </form>
  )
}
