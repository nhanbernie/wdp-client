import { useState, useEffect } from 'react'
import { productsService } from '@/services/admin'
import type { ProductListItem, ProductListParams } from '../../types'

export const useProducts = (params?: ProductListParams) => {
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await productsService.getProducts(params)
      setProducts(response.data)
      setMeta(response.meta)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [params?.page, params?.limit, params?.stockLevel, params?.isActive])

  return {
    products,
    meta,
    loading,
    error,
    refetch: fetchProducts,
  }
}

export const useProductActions = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateStock = async (
    productId: string,
    stockQuantity: number,
    reason: string
  ) => {
    try {
      setLoading(true)
      setError(null)
      await productsService.updateStock(productId, { stockQuantity, reason })
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update stock')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    updateStock,
    loading,
    error,
  }
}
