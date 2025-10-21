import * as z from 'zod'

export const vendorProfileSchema = z.object({
  businessName: z.string().min(1, 'Tên doanh nghiệp là bắt buộc'),
  businessEmail: z.string().email('Email không hợp lệ'),
  businessPhone: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .regex(/^[0-9]+$/, 'Số điện thoại chỉ chứa số'),
  businessAddress: z.string().min(1, 'Địa chỉ là bắt buộc'),
  taxId: z
    .string()
    .min(10, 'Mã số thuế phải có ít nhất 10 ký tự')
    .max(14, 'Mã số thuế không quá 14 ký tự'),
  description: z.string().optional(),
  logo: z.string().url('URL không hợp lệ').optional().or(z.literal('')),
})

export type VendorProfileFormData = z.infer<typeof vendorProfileSchema>
