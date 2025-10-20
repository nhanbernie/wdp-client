'use client'

import React, { useState } from 'react'
import { useProducts, useProductActions } from './hooks'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Package, TrendingUp, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

export const ProductsManagement: React.FC = () => {
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <Package className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600" />
          </div>
          <p className="mt-6 text-gray-600 font-medium">Đang tải sản phẩm...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 space-y-6">
      {/* Modern Header with Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Quản lý sản phẩm
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <span className="font-semibold text-purple-600">{meta.total}</span> sản phẩm
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modern Filters Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-700">🔍 Lọc theo:</span>
          <select
            value={stockFilter}
            onChange={(e) => {
              setStockFilter(e.target.value as 'low' | 'out' | '')
              setPage(1)
            }}
            className="flex-1 max-w-xs px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gradient-to-r from-white to-purple-50 font-medium"
          >
            <option value="">Tất cả sản phẩm</option>
            <option value="low">⚠️ Sắp hết hàng</option>
            <option value="out">❌ Hết hàng</option>
          </select>
        </div>
      </motion.div>

      {/* Modern Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <th className="p-4 text-left text-sm font-semibold">📦 Tên sản phẩm</th>
                <th className="p-4 text-left text-sm font-semibold">🏷️ Danh mục</th>
                <th className="p-4 text-left text-sm font-semibold">🏪 Vendor</th>
                <th className="p-4 text-right text-sm font-semibold">💰 Giá</th>
                <th className="p-4 text-right text-sm font-semibold">📊 Tồn kho</th>
                <th className="p-4 text-right text-sm font-semibold">🔥 Đã bán</th>
                <th className="p-4 text-left text-sm font-semibold">⚡ Trạng thái</th>
                <th className="p-4 text-left text-sm font-semibold">⚙️ Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-purple-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                >
                  <td className="p-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="p-4 text-sm text-gray-600">{product.categoryName}</td>
                  <td className="p-4 text-sm text-gray-600">{product.vendorName}</td>
                  <td className="p-4 text-sm text-right font-semibold text-blue-600">
                    {product.price.toLocaleString('vi-VN')} VND
                  </td>
                  <td className="p-4 text-sm text-right">
                    <span
                      className={`px-3 py-1 rounded-full font-bold ${
                        product.stockQty < 10
                          ? 'bg-red-100 text-red-700'
                          : product.stockQty < 50
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {product.stockQty}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-right">
                    <span className="flex items-center justify-end gap-1 font-semibold text-purple-600">
                      <TrendingUp className="h-4 w-4" />
                      {product.totalSold}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={product.isActive ? 'default' : 'secondary'}
                      className={
                        product.isActive
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }
                    >
                      {product.isActive ? '✓ Hoạt động' : '⏸ Tạm dừng'}
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
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-200 shadow-md"
                    >
                      ✏️ Cập nhật
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modern Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">
            📄 Trang <span className="text-purple-600 font-bold">{meta.page}</span> /{' '}
            <span className="font-bold">{meta.totalPages}</span>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border-2 border-purple-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-200 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages}
              className="border-2 border-purple-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-200 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Modern Update Stock Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-purple-200"
          >
            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  📦 Cập nhật tồn kho
                </h3>
                <p className="text-sm text-gray-500">Điều chỉnh số lượng sản phẩm</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Stock Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  📊 Số lượng mới
                </label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-semibold text-lg"
                  min="0"
                />
              </div>

              {/* Reason Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  📝 Lý do <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
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
                  className="flex-1 border-2 border-gray-300 hover:bg-gray-100 transition-all duration-200 py-3 font-semibold"
                >
                  ❌ Hủy
                </Button>
                <Button
                  onClick={handleUpdateStock}
                  disabled={updating || !reason.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? '⏳ Đang cập nhật...' : '✓ Xác nhận'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ProductsManagement
