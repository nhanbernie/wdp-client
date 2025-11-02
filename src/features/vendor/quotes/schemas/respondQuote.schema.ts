import * as z from 'zod'

export const respondQuoteSchema = z.object({
  responsePrice: z.preprocess((val) => {
    const cleanedVal = typeof val === 'string' ? val.replace(/[\.,]/g, '') : val
    const num = Number(cleanedVal)
    return isNaN(num) ? undefined : num
  }, z.number().min(1, 'Giá phải lớn hơn 0')),

  responseNotes: z.string().max(1000, 'Ghi chú không quá 1000 ký tự').optional(),

  // Date object for date picker, will be converted to ISO string before API call
  validUntil: z.date().optional().or(z.string().optional()),
})

export type RespondQuoteFormData = z.infer<typeof respondQuoteSchema>
