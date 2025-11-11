'use client'

import React, { useState } from 'react'
import { useProducts, useProductActions } from './hooks'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  Package,
  TrendingUp,
  AlertTriangle,
  Loader2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useTheme } from '@/contexts/ThemeContext'

export const ProductsManagement: React.FC = () => {
  const { colors } = useTheme()
  const [page, setPage] = useState(1)
  const [stockFilter, setStockFilter] = useState<'low' | 'out' | ''>('')
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [newStock, setNewStock] = useState<number>(0)
  const [reason, setReason] = useState('')

  const { products, meta, loading, refetch } = useProducts({
    page,
    limit: 10,
    stockLevel: stockFilter || undefined,
  })

  const { updateStock, loading: updating } = useProductActions()

  const handleUpdateStock = async () => {
    if (selectedProduct && reason.trim()) {
      const success = await updateStock(selectedProduct, newStock, reason)
      if (success) {
        refetch()
        setSelectedProduct(null)
        setNewStock(0)
        setReason('')
      }
    }
  }

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: colors.backgroundGradient }}
      >
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin mx-auto" style={{ color: colors.accent }} />
          <p className="mt-6 font-medium" style={{ color: colors.textSecondary }}>
            Đang tải sản phẩm...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 space-y-6" style={{ background: colors.backgroundGradient }}>
      {/* Header */}
      <div
        className="rounded-2xl shadow-xl p-8"
        style={{ background: colors.cardBackground, borderColor: colors.border }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl shadow-lg" style={{ background: colors.accent }}>
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold" style={{ color: colors.text }}>
                Quản lý sản phẩm
              </h1>
              <p className="mt-2" style={{ color: colors.textSecondary }}>
                <span className="font-semibold" style={{ color: colors.accent }}>
                  {meta.total}
                </span>{' '}
                sản phẩm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Filters Card */}
      <div
        className="rounded-2xl shadow-lg p-6 border"
        style={{ background: colors.cardBackground, borderColor: colors.border }}
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold" style={{ color: colors.text }}>
            Lọc theo:
          </span>
          <select
            value={stockFilter}
            onChange={(e) => {
              setStockFilter(e.target.value as 'low' | 'out' | '')
              setPage(1)
            }}
            className="flex-1 max-w-xs px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 font-medium"
            style={{
              borderColor: colors.border,
              background: colors.background,
              color: colors.text,
            }}
          >
            <option value="">Tất cả sản phẩm</option>
            <option value="low">Sắp hết hàng</option>
            <option value="out">Hết hàng</option>
          </select>
        </div>
      </div>

      {/* Modern Products Table */}
      <div
        className="rounded-2xl shadow-xl overflow-hidden border"
        style={{ background: colors.cardBackground, borderColor: colors.border }}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: colors.accent }}>
                <th className="p-4 text-left text-sm font-semibold text-white">Tên sản phẩm</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Danh mục</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Vendor</th>
                <th className="p-4 text-right text-sm font-semibold text-white">Giá</th>
                <th className="p-4 text-right text-sm font-semibold text-white">Tồn kho</th>
                <th className="p-4 text-right text-sm font-semibold text-white">Đã bán</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Trạng thái</th>
                <th className="p-4 text-left text-sm font-semibold text-white">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b transition-all duration-200"
                  style={{ borderColor: colors.border }}
                >
                  <td className="p-4 text-sm font-medium" style={{ color: colors.text }}>
                    {product.name}
                  </td>
                  <td className="p-4 text-sm" style={{ color: colors.textSecondary }}>
                    {product.categoryName}
                  </td>
                  <td className="p-4 text-sm" style={{ color: colors.textSecondary }}>
                    {product.vendorName}
                  </td>
                  <td
                    className="p-4 text-sm text-right font-semibold"
                    style={{ color: colors.accent }}
                  >
                    {product.price.toLocaleString('vi-VN')} VND
                  </td>
                  <td className="p-4 text-sm text-right">
                    <span
                      className="px-3 py-1 rounded-full font-bold"
                      style={{
                        background:
                          product.stockQty < 10
                            ? colors.error + '20'
                            : product.stockQty < 50
                            ? colors.warning + '20'
                            : colors.success + '20',
                        color:
                          product.stockQty < 10
                            ? colors.error
                            : product.stockQty < 50
                            ? colors.warning
                            : colors.success,
                      }}
                    >
                      {product.stockQty}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-right">
                    <span
                      className="flex items-center justify-end gap-1 font-semibold"
                      style={{ color: colors.accentSecondary }}
                    >
                      <TrendingUp className="h-4 w-4" />
                      {product.totalSold}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={product.isActive ? 'default' : 'secondary'}
                      style={{
                        background: product.isActive ? colors.success : colors.textSecondary,
                        color: 'white',
                      }}
                    >
                      {product.isActive ? 'Hoạt động' : 'Tạm dừng'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product.id)
                        setNewStock(product.stockQty)
                      }}
                      className="text-white border-0 hover:scale-105 transition-all duration-200 shadow-md"
                      style={{ background: colors.accent }}
                    >
                      Cập nhật
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Pagination */}
      <div
        className="rounded-2xl shadow-lg p-6 border"
        style={{ background: colors.cardBackground, borderColor: colors.border }}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium" style={{ color: colors.text }}>
            Trang{' '}
            <span className="font-bold" style={{ color: colors.accent }}>
              {meta.page}
            </span>{' '}
            / <span className="font-bold">{meta.totalPages}</span>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="hover:text-white hover:border-transparent transition-all duration-200 disabled:opacity-50"
              style={{ borderColor: colors.border }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages}
              className="hover:text-white hover:border-transparent transition-all duration-200 disabled:opacity-50"
              style={{ borderColor: colors.border }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modern Update Stock Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="rounded-2xl shadow-2xl p-8 max-w-md w-full border"
            style={{ background: colors.cardBackground, borderColor: colors.border }}
          >
            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl shadow-lg" style={{ background: colors.accent }}>
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
                  Cập nhật tồn kho
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Điều chỉnh số lượng sản phẩm
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Stock Input */}
              <div>
                <label
                  className="flex items-center gap-2 text-sm font-semibold mb-3"
                  style={{ color: colors.text }}
                >
                  Số lượng mới
                </label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 font-semibold text-lg"
                  style={{
                    borderColor: colors.border,
                    background: colors.background,
                    color: colors.text,
                  }}
                  min="0"
                />
              </div>

              {/* Reason Input */}
              <div>
                <label
                  className="flex items-center gap-2 text-sm font-semibold mb-3"
                  style={{ color: colors.text }}
                >
                  Lý do <span style={{ color: colors.error }}>*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 resize-none"
                  style={{
                    borderColor: colors.border,
                    background: colors.background,
                    color: colors.text,
                  }}
                  placeholder="Nhập lý do cập nhật tồn kho..."
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProduct(null)
                    setNewStock(0)
                    setReason('')
                  }}
                  className="flex-1 border-2 hover:bg-opacity-10 transition-all duration-200 py-3 font-semibold"
                  style={{ borderColor: colors.border }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleUpdateStock}
                  disabled={updating || !reason.trim()}
                  className="flex-1 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: colors.accent }}
                >
                  {updating ? 'Đang cập nhật...' : 'Xác nhận'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsManagement
