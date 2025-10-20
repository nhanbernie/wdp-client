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
    .required('Giá là bắt buộc')
    .min(0, 'Giá phải lớn hơn hoặc bằng 0')
    .typeError('Giá phải là số'),

  salePrice: yup
    .number()
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
      .required('Số lượng là bắt buộc')
      .min(0, 'Số lượng phải lớn hơn hoặc bằng 0')
      .integer('Số lượng phải là số nguyên')
      .typeError('Số lượng phải là số'),

    unit: yup
      .string()
      .required('Đơn vị là bắt buộc')
      .min(1, 'Đơn vị phải có ít nhất 1 ký tự')
      .max(20, 'Đơn vị không được quá 20 ký tự'),
  }),

  // Images
  thumbnail: yup
    .string()
    .required('Ảnh đại diện là bắt buộc')
    .url('Ảnh đại diện phải là URL hợp lệ'),

  images: yup
    .array()
    .of(yup.string().url('Ảnh phải là URL hợp lệ'))
    .min(1, 'Phải có ít nhất 1 ảnh')
    .required('Ảnh sản phẩm là bắt buộc'),

  // Description
  shortDescription: yup
    .string()
    .required('Mô tả ngắn là bắt buộc')
    .min(10, 'Mô tả ngắn phải có ít nhất 10 ký tự')
    .max(500, 'Mô tả ngắn không được quá 500 ký tự'),

  description: yup
    .string()
    .required('Mô tả chi tiết là bắt buộc')
    .min(50, 'Mô tả chi tiết phải có ít nhất 50 ký tự'),

  // Optional fields
  badges: yup.array().of(yup.string()),

  specs: yup.object().nullable(),

  datasheetUrl: yup.string().url('Datasheet phải là URL hợp lệ').nullable(),

  // Options
  options: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Tên tùy chọn là bắt buộc'),
        displayName: yup.string().required('Tên hiển thị là bắt buộc'),
        values: yup
          .array()
          .of(
            yup.object().shape({
              value: yup.string().required('Giá trị là bắt buộc'),
            }),
          )
          .min(1, 'Phải có ít nhất 1 giá trị'),
      }),
    )
    .nullable(),

  // Variants
  variants: yup
    .array()
    .of(
      yup.object().shape({
        sku: yup.string().required('SKU là bắt buộc'),
        price: yup.number().required('Giá là bắt buộc').min(0, 'Giá phải lớn hơn 0'),
        stockQty: yup
          .number()
          .required('Số lượng là bắt buộc')
          .min(0, 'Số lượng phải lớn hơn 0')
          .integer('Số lượng phải là số nguyên'),
        options: yup.object().required('Options là bắt buộc'),
        specs: yup.object().nullable(),
      }),
    )
    .nullable(),
})
