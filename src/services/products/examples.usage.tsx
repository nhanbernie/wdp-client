/**
 * Example Usage for Product API
 *
 * This file demonstrates how to use the Product API endpoints
 */

import { toast } from 'sonner'
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductBySlugQuery,
  CreateProductDto,
  UpdateProductDto,
} from '@/services/products'

// ============================================
// 1. CREATE PRODUCT
// ============================================
export function CreateProductExample() {
  const [createProduct, { isLoading, isSuccess, error }] = useCreateProductMutation()

  const handleCreateProduct = async () => {
    const newProduct: CreateProductDto = {
      name: 'Bu lông inox M8',
      slug: 'bu-long-inox-m8',
      categoryId: 'cat-bolts',
      vendorId: 'v-001',
      brand: 'Inox Việt',
      thumbnail: 'https://cdn.example.com/thumb.jpg',
      images: ['https://cdn.example.com/1.jpg'],
      price: 3000,
      salePrice: 2500,
      currency: 'VND',
      stock: {
        quantity: 1000,
        unit: 'cái',
      },
      badges: ['bestseller', 'sale'],
      specs: {
        threadPitch: {
          value: 1.25,
          unit: 'mm',
        },
        strengthClass: '8.8',
      },
      options: [
        {
          name: 'size',
          displayName: 'Kích thước',
          values: [{ value: 'M8' }, { value: 'M10' }],
        },
      ],
      variants: [
        {
          sku: 'BOLT-M8-50',
          options: {
            size: 'M8',
            length: '50mm',
          },
          price: 3500,
          stockQty: 5000,
          specs: {},
        },
      ],
      shortDescription: 'Bu lông chất lượng cao',
      description: '<p>Mô tả chi tiết...</p>',
      datasheetUrl: 'https://cdn.example.com/datasheet.pdf',
    }

    try {
      const result = await createProduct(newProduct).unwrap()
      console.log('Product created successfully:', result)
      // Response: { success: true, message: "...", data: { id: "p-xyz-789" }, ... }
    } catch (err) {
      console.error('Failed to create product:', err)
    }
  }

  return { handleCreateProduct, isLoading, isSuccess, error }
}

// ============================================
// 2. UPDATE PRODUCT
// ============================================
export function UpdateProductExample() {
  const [updateProduct, { isLoading, isSuccess, error }] = useUpdateProductMutation()

  const handleUpdateProduct = async (productId: string) => {
    const updatedData: UpdateProductDto = {
      name: 'Bu lông inox M8 - Updated',
      slug: 'bu-long-inox-m8',
      categoryId: 'cat-bolts',
      vendorId: 'v-001',
      brand: 'Inox Việt',
      thumbnail: 'https://cdn.example.com/thumb-new.jpg',
      images: ['https://cdn.example.com/1.jpg', 'https://cdn.example.com/2.jpg'],
      price: 3200,
      salePrice: 2700,
      currency: 'VND',
      stock: {
        quantity: 1500,
        unit: 'cái',
      },
      badges: ['bestseller', 'sale', 'new'],
      specs: {
        threadPitch: {
          value: 1.25,
          unit: 'mm',
        },
        strengthClass: '8.8',
      },
      options: [
        {
          name: 'size',
          displayName: 'Kích thước',
          values: [{ value: 'M8' }, { value: 'M10' }, { value: 'M12' }],
        },
      ],
      variants: [
        {
          sku: 'BOLT-M8-50',
          options: {
            size: 'M8',
            length: '50mm',
          },
          price: 3500,
          stockQty: 5000,
          specs: {},
        },
      ],
      shortDescription: 'Bu lông chất lượng cao - Cập nhật',
      description: '<p>Mô tả chi tiết đã được cập nhật...</p>',
      datasheetUrl: 'https://cdn.example.com/datasheet.pdf',
      isActive: true,
    }

    try {
      const result = await updateProduct({ id: productId, data: updatedData }).unwrap()
      console.log('Product updated successfully:', result)
      // Response: { success: true, message: "Cập nhật sản phẩm thành công", data: { id: "p-xyz-789" }, ... }
    } catch (err) {
      console.error('Failed to update product:', err)
    }
  }

  return { handleUpdateProduct, isLoading, isSuccess, error }
}

// ============================================
// 3. DELETE PRODUCT
// ============================================
export function DeleteProductExample() {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation()

  const handleDeleteProduct = async (productId: string) => {
    try {
      const result = await deleteProduct(productId).unwrap()
      console.log('Product deleted successfully:', result)
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }

  return { handleDeleteProduct, isLoading }
}

// ============================================
// 4. GET PRODUCT BY SLUG
// ============================================
export function GetProductBySlugExample() {
  const { data, isLoading, error } = useGetProductBySlugQuery('bu-long-inox-m8')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading product</div>
  if (!data?.data) return <div>Product not found</div>

  return (
    <div>
      <h1>{data.data.name}</h1>
      <p>Price: {data.data.price}</p>
      <p>Brand: {data.data.brand}</p>
    </div>
  )
}

// ============================================
// 5. USAGE IN A COMPONENT WITH TOAST
// ============================================
export function ProductManagementComponent() {
  const [createProduct] = useCreateProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const handleCreate = async (productData: CreateProductDto) => {
    try {
      const result = await createProduct(productData).unwrap()
      toast.success('Tạo sản phẩm thành công!')
      return result.data.id
    } catch (error: any) {
      toast.error(error?.data?.message || 'Tạo sản phẩm thất bại!')
      throw error
    }
  }

  const handleUpdate = async (id: string, productData: UpdateProductDto) => {
    try {
      await updateProduct({ id, data: productData }).unwrap()
      toast.success('Cập nhật sản phẩm thành công!')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Cập nhật sản phẩm thất bại!')
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap()
      toast.success('Xóa sản phẩm thành công!')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Xóa sản phẩm thất bại!')
      throw error
    }
  }

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
  }
}
