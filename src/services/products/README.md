# Product API Documentation

## Overview

API endpoints cho quản lý sản phẩm (products) trong hệ thống.

## Endpoints

### 1. Create Product

**POST** `/api/products`

Tạo sản phẩm mới với options và variants.

**Request Body:**

```typescript
{
  name: string
  slug: string
  categoryId: string
  vendorId: string
  brand: string
  thumbnail: string
  images: string[]
  price: number
  salePrice?: number
  currency: string
  stock: {
    quantity: number
    unit: string
  }
  badges?: string[]
  specs?: Record<string, any>
  options?: Array<{
    name: string
    displayName: string
    values: Array<{ value: string }>
  }>
  variants?: Array<{
    sku: string
    options: Record<string, string>
    price: number
    stockQty: number
    specs?: Record<string, any>
  }>
  shortDescription: string
  description: string
  datasheetUrl?: string
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tạo sản phẩm thành công",
  "data": {
    "id": "p-xyz-789"
  },
  "errors": null,
  "statusCode": 201
}
```

**Usage:**

```typescript
import { useCreateProductMutation } from '@/services/products'

const [createProduct, { isLoading }] = useCreateProductMutation()

const handleCreate = async () => {
  try {
    const result = await createProduct(productData).unwrap()
    toast.success('Tạo sản phẩm thành công!')
  } catch (error) {
    toast.error('Tạo sản phẩm thất bại!')
  }
}
```

---

### 2. Update Product

**PATCH** `/api/products/{id}`

Cập nhật thông tin sản phẩm.

**Parameters:**

- `id` (path, required): Product ID

**Request Body:**

```typescript
{
  name: string
  slug: string
  categoryId: string
  vendorId: string
  brand: string
  thumbnail: string
  images: string[]
  price: number
  salePrice?: number
  currency: string
  stock: {
    quantity: number
    unit: string
  }
  badges?: string[]
  specs?: Record<string, any>
  options?: Array<{
    name: string
    displayName: string
    values: Array<{ value: string }>
  }>
  variants?: Array<{
    sku: string
    options: Record<string, string>
    price: number
    stockQty: number
    specs?: Record<string, any>
  }>
  shortDescription: string
  description: string
  datasheetUrl?: string
  isActive?: boolean
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật sản phẩm thành công",
  "data": {
    "id": "p-xyz-789"
  },
  "errors": null,
  "statusCode": 200
}
```

**Usage:**

```typescript
import { useUpdateProductMutation } from '@/services/products'

const [updateProduct, { isLoading }] = useUpdateProductMutation()

const handleUpdate = async (productId: string) => {
  try {
    await updateProduct({ id: productId, data: updatedData }).unwrap()
    toast.success('Cập nhật sản phẩm thành công!')
  } catch (error) {
    toast.error('Cập nhật sản phẩm thất bại!')
  }
}
```

---

### 3. Delete Product

**DELETE** `/api/products/{id}`

Xóa sản phẩm (soft delete - set isActive to false).

**Parameters:**

- `id` (path, required): Product ID

**Response:**

```json
{
  "success": true,
  "message": "Xóa sản phẩm thành công",
  "data": {
    "id": "p-xyz-789"
  },
  "errors": null,
  "statusCode": 200
}
```

**Usage:**

```typescript
import { useDeleteProductMutation } from '@/services/products'

const [deleteProduct, { isLoading }] = useDeleteProductMutation()

const handleDelete = async (productId: string) => {
  try {
    await deleteProduct(productId).unwrap()
    toast.success('Xóa sản phẩm thành công!')
  } catch (error) {
    toast.error('Xóa sản phẩm thất bại!')
  }
}
```

---

### 4. Get Product by Slug

**GET** `/api/products/by-slug/{slug}`

Lấy thông tin sản phẩm qua slug (SEO-friendly).

**Parameters:**

- `slug` (path, required): Product slug (e.g., "bu-long-inox-m8")

**Response:**

```json
{
  "success": true,
  "message": "Lấy sản phẩm thành công",
  "data": {
    "id": "p-xyz-789",
    "name": "Bu lông inox M8",
    "slug": "bu-long-inox-m8",
    "thumbnail": "...",
    "price": 3000,
    "salePrice": 2500
    // ... other product fields
  },
  "errors": null,
  "statusCode": 200
}
```

**Usage:**

```typescript
import { useGetProductBySlugQuery } from '@/services/products'

function ProductDetailPage({ slug }: { slug: string }) {
  const { data, isLoading, error } = useGetProductBySlugQuery(slug)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return <div>{data?.data?.name}</div>
}
```

---

## Types

### CreateProductDto

```typescript
interface CreateProductDto {
  name: string
  slug: string
  categoryId: string
  vendorId: string
  brand: string
  thumbnail: string
  images: string[]
  price: number
  salePrice?: number
  currency: string
  stock: {
    quantity: number
    unit: string
  }
  badges?: string[]
  specs?: Record<string, any>
  options?: CreateProductOption[]
  variants?: CreateProductVariant[]
  shortDescription: string
  description: string
  datasheetUrl?: string
}
```

### UpdateProductDto

```typescript
interface UpdateProductDto extends CreateProductDto {
  isActive?: boolean
}
```

### CreateProductOption

```typescript
interface CreateProductOption {
  name: string
  displayName: string
  values: CreateProductOptionValue[]
}
```

### CreateProductVariant

```typescript
interface CreateProductVariant {
  sku: string
  options: Record<string, string>
  price: number
  stockQty: number
  specs?: Record<string, any>
}
```

---

## Notes

### Categories Integration

API có sẵn categories service, có thể dùng để validate categoryId:

```typescript
import { useGetCategoriesQuery } from '@/services/categories'

const { data: categoriesData } = useGetCategoriesQuery()
const categories = categoriesData?.data || []
```

### Cache Invalidation

Tất cả mutations (create, update, delete) đều tự động invalidate cache với tag `['Products']`, giúp refetch data khi cần.

### Error Handling

Mọi API đều trả về format chuẩn:

```typescript
{
  success: boolean
  message: string
  data: T | null
  errors: any | null
  statusCode: number
}
```

---

## Example: Complete Product Form Component

Xem file `examples.usage.tsx` để có ví dụ đầy đủ về cách sử dụng tất cả các endpoints.
