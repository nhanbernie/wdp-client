import * as yup from 'yup'

export const productFormSchema = yup.object().shape({
  // Basic Information
  name: yup
    .string()
    .required('Tên sản phẩm là bắt buộc')
    .min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự')
    .max(200, 'Tên sản phẩm không được quá 200 ký tự'),

  slug: yup
    .string()
    .required('Slug là bắt buộc')
    .matches(/^[a-z0-9-]+$/, 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang')
    .min(3, 'Slug phải có ít nhất 3 ký tự'),

  categoryId: yup.string().required('Danh mục là bắt buộc'),

  brand: yup
    .string()
    .required('Thương hiệu là bắt buộc')
    .min(2, 'Thương hiệu phải có ít nhất 2 ký tự')
    .max(100, 'Thương hiệu không được quá 100 ký tự'),

  // Pricing
  price: yup
    .number()
    .transform((value, originalValue) => {
      // Handle empty string
      if (originalValue === '' || originalValue === null || originalValue === undefined) {
        return undefined
      }
      return value
    })
    .required('Giá là bắt buộc')
    .min(1, 'Giá phải lớn hơn 0')
    .typeError('Giá phải là số'),

  salePrice: yup
    .number()
    .transform((value, originalValue) => {
      // Handle empty string - allow null/undefined
      if (originalValue === '' || originalValue === null || originalValue === undefined) {
        return null
      }
      return value
    })
    .nullable()
    .min(0, 'Giá khuyến mãi phải lớn hơn hoặc bằng 0')
    .test('is-less-than-price', 'Giá khuyến mãi phải nhỏ hơn giá gốc', function (value) {
      const { price } = this.parent
      if (value === null || value === undefined) return true
      return value < price
    })
    .typeError('Giá khuyến mãi phải là số'),

  currency: yup.string().required('Đơn vị tiền tệ là bắt buộc'),

  // Stock
  stock: yup.object().shape({
    quantity: yup
      .number()
      .transform((value, originalValue) => {
        // Handle empty string
        if (originalValue === '' || originalValue === null || originalValue === undefined) {
          return undefined
        }
        return value
      })
      .required('Số lượng là bắt buộc')
      .min(1, 'Số lượng phải lớn hơn 0')
      .integer('Số lượng phải là số nguyên')
      .typeError('Số lượng phải là số'),

    unit: yup
      .string()
      .required('Đơn vị là bắt buộc')
      .min(1, 'Đơn vị phải có ít nhất 1 ký tự')
      .max(20, 'Đơn vị không được quá 20 ký tự'),
  }),

  // Images - Accept both File and URL string
  thumbnail: yup
    .mixed()
    .required('Ảnh đại diện là bắt buộc')
    .test('is-file-or-url', 'Ảnh đại diện phải là file hoặc URL hợp lệ', (value) => {
      if (!value) return false
      // Allow empty string for edit mode (keeping existing)
      if (typeof value === 'string') {
        if (value.trim() === '') return true // Allow empty string
        try {
          new URL(value)
          return true
        } catch {
          return false
        }
      }
      return value instanceof File
    }),

  images: yup
    .array()
    .of(
      yup.mixed().test('is-file-or-url', 'Ảnh phải là file hoặc URL hợp lệ', (value) => {
        if (typeof value === 'string') {
          if (value.trim() === '') return false // Empty strings not allowed
          try {
            new URL(value)
            return true
          } catch {
            return false
          }
        }
        return value instanceof File
      }),
    )
    .min(1, 'Phải có ít nhất 1 ảnh')
    .required('Ảnh sản phẩm là bắt buộc'),

  // Description
  shortDescription: yup
    .string()
    .required('Mô tả ngắn là bắt buộc')
    .min(3, 'Mô tả ngắn phải có ít nhất 3 ký tự')
    .max(500, 'Mô tả ngắn không được quá 500 ký tự'),

  description: yup
    .string()
    .required('Mô tả chi tiết là bắt buộc')
    .min(10, 'Mô tả chi tiết phải có ít nhất 10 ký tự'),

  // Optional fields
  badges: yup.array().of(yup.string()),

  specs: yup.object().nullable(),

  datasheetUrl: yup.string().url('Datasheet phải là URL hợp lệ').nullable(),

  // Options - simplified schema
  options: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Tên tùy chọn là bắt buộc'),
        displayName: yup.string().nullable(),
        values: yup
          .array()
          .of(
            yup.lazy((value) => {
              // Support both string[] and ProductOptionValue[] formats
              if (typeof value === 'string') {
                return yup.string().required('Giá trị không được để trống')
              }
              return yup.object().shape({
                value: yup.string().required('Giá trị không được để trống'),
              })
            }),
          )
          .min(1, 'Phải có ít nhất 1 giá trị'),
      }),
    )
    .min(1, 'Phải tạo ít nhất 1 tùy chọn')
    .required('Phải tạo ít nhất 1 tùy chọn'),

  // Variants - validate required fields when creating variants
  variants: yup
    .array()
    .of(
      yup.object().shape({
        sku: yup
          .string()
          .required('SKU là bắt buộc')
          .min(1, 'SKU không được để trống')
          .max(50, 'SKU không được quá 50 ký tự')
          .matches(
            /^[a-zA-Z0-9-_]+$/,
            'SKU chỉ được chứa chữ cái, số, dấu gạch ngang và gạch dưới',
          ),
        price: yup
          .number()
          .transform((value, originalValue) => {
            if (originalValue === '' || originalValue === null || originalValue === undefined) {
              return undefined
            }
            return value
          })
          .required('Giá biến thể là bắt buộc')
          .min(1, 'Giá phải lớn hơn 0')
          .typeError('Giá phải là số'),
        stockQty: yup
          .number()
          .nullable()
          .min(0, 'Số lượng phải lớn hơn hoặc bằng 0')
          .integer('Số lượng phải là số nguyên')
          .typeError('Số lượng phải là số'),
        stock: yup
          .number()
          .nullable()
          .min(0, 'Số lượng phải lớn hơn hoặc bằng 0')
          .integer('Số lượng phải là số nguyên')
          .typeError('Số lượng phải là số'),
        options: yup.object().nullable(), // Made optional - variants can exist without options
        image: yup.mixed().nullable(), // Allow File or string or null
        specs: yup.object().nullable(),
      }),
    )
    .min(1, 'Phải tạo ít nhất 1 biến thể')
    .required('Phải tạo ít nhất 1 biến thể'),
})
