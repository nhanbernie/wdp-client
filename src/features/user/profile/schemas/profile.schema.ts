import { z } from 'zod'

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'Tên không được để trống'),
  lastName: z.string().min(1, 'Họ không được để trống'),
  phoneNumber: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),
})

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>
