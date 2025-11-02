import * as z from 'zod'

export const vendorProfileSchema = z.object({
  businessName: z.string().min(1, 'Tên doanh nghiệp là bắt buộc'),
  businessDescription: z.string().min(1, 'Mô tả doanh nghiệp là bắt buộc'),
  businessAddress: z.string().min(1, 'Địa chỉ là bắt buộc'),
  businessPhone: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .regex(/^[0-9+]+$/, 'Số điện thoại không hợp lệ'),
  businessEmail: z.string().email('Email không hợp lệ'),
  businessLicense: z.string().min(1, 'Giấy phép kinh doanh là bắt buộc'),
  taxId: z
    .string()
    .min(10, 'Mã số thuế phải có ít nhất 10 ký tự')
    .max(14, 'Mã số thuế không quá 14 ký tự'),
})

export type VendorProfileFormData = z.infer<typeof vendorProfileSchema>
