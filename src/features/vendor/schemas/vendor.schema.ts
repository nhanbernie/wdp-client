import * as yup from 'yup'

export const vendorFormSchema = yup.object().shape({
  businessName: yup
    .string()
    .required('Tên doanh nghiệp là bắt buộc')
    .min(2, 'Tên doanh nghiệp phải có ít nhất 2 ký tự')
    .max(100, 'Tên doanh nghiệp không được quá 100 ký tự'),

  businessDescription: yup
    .string()
    .required('Mô tả doanh nghiệp là bắt buộc')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự')
    .max(500, 'Mô tả không được quá 500 ký tự'),

  businessAddress: yup
    .string()
    .required('Địa chỉ doanh nghiệp là bắt buộc')
    .min(10, 'Địa chỉ phải có ít nhất 10 ký tự')
    .max(200, 'Địa chỉ không được quá 200 ký tự'),

  businessPhone: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(
      /^(\+84|84|0)[1-9][0-9]{8,9}$/,
      'Số điện thoại không hợp lệ (VD: +84123456789 hoặc 0123456789)',
    ),

  businessEmail: yup
    .string()
    .required('Email doanh nghiệp là bắt buộc')
    .email('Email không hợp lệ')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email không đúng định dạng'),

  businessLicense: yup
    .string()
    .required('Số giấy phép kinh doanh là bắt buộc')
    .matches(
      /^[A-Z0-9]{8,15}$/,
      'Số giấy phép kinh doanh không hợp lệ (8-15 ký tự, chữ hoa và số)',
    ),

  taxId: yup
    .string()
    .required('Mã số thuế là bắt buộc')
    .matches(/^[0-9]{10,13}$/, 'Mã số thuế phải có 10-13 chữ số'),
})
