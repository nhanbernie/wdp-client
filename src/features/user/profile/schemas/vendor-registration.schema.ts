import { z } from 'zod'

export const vendorRegistrationSchema = z.object({
  businessName: z.string().min(3, 'Tên doanh nghiệp phải có ít nhất 3 ký tự'),
  businessDescription: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  businessAddress: z.string().min(10, 'Địa chỉ phải có ít nhất 10 ký tự'),
  businessPhone: z.string().regex(/^(\+84|0)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ'),
  businessEmail: z.string().email('Email không hợp lệ'),
  businessLicense: z.string().min(5, 'Số giấy phép kinh doanh phải có ít nhất 5 ký tự'),
  taxId: z.string().min(5, 'Mã số thuế phải có ít nhất 5 ký tự'),
})

export type VendorRegistrationFormData = z.infer<typeof vendorRegistrationSchema>
