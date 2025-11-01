import { z } from 'zod'

export const createQuoteRequestSchema = z.object({
  productId: z.string().uuid('ID sản phẩm không hợp lệ'),
  quantity: z.number().min(1, 'Số lượng phải lớn hơn 0'),
  specifications: z.string().max(2000, 'Mô tả không được quá 2000 ký tự').optional(),
  deliveryAddress: z.string().max(500, 'Địa chỉ không được quá 500 ký tự').optional(),
  requestNotes: z.string().max(1000, 'Ghi chú không được quá 1000 ký tự').optional(),
})

export type CreateQuoteRequestFormData = z.infer<typeof createQuoteRequestSchema>
