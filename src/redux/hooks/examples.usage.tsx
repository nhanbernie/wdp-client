/**
 * Example Usage for Product Redux State Management
 *
 * This file demonstrates how to use the Product Redux slice
 */

import { useProductState, useProductFilters, useProductPagination } from '@/redux/hooks'
import { useGetProductsQuery } from '@/services/products'

// ============================================
// 1. FULL PRODUCT STATE HOOK
// ============================================
export function ProductListPageExample() {
  const {
    // State
    filters,
    pagination,
    viewMode,
    isFilterOpen,
    hasActiveFilters,
    filterParams,
    totalPages,
    isGridView,

    // Actions
    setSearch,
    setCategoryFilter,
    setPriceRange,
    setInStockFilter,
    setBadgesFilter,
    setSortFilter,
    clearFilters,
    setPage,
    setViewMode,
    toggleFilterPanel,
  } = useProductState()

  // Fetch products with current filters
  const { data: productsData, isLoading } = useGetProductsQuery(filterParams)

  const handleSearchChange = (searchQuery: string) => {
    setSearch(searchQuery)
  }

  const handleCategoryChange = (categoryId: string) => {
    setCategoryFilter(categoryId)
  }

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange(min, max)
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        value={filters.search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
      />

      {/* View Mode Toggle */}
      <button onClick={() => setViewMode(isGridView ? 'list' : 'grid')}>
        {isGridView ? 'Hiển thị dạng danh sách' : 'Hiển thị dạng lưới'}
      </button>

      {/* Filter Panel Toggle */}
      <button onClick={toggleFilterPanel}>{isFilterOpen ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}</button>

      {/* Clear Filters */}
      {hasActiveFilters && <button onClick={clearFilters}>Xóa bộ lọc</button>}

      {/* Filter Panel */}
      {isFilterOpen && (
        <div>
          <h3>Bộ lọc</h3>
          {/* Category filter */}
          <select onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="">Tất cả danh mục</option>
            <option value="cat-1">Danh mục 1</option>
            <option value="cat-2">Danh mục 2</option>
          </select>

          {/* Price range */}
          <div>
            <input
              type="number"
              placeholder="Giá từ"
              onChange={(e) => handlePriceChange(Number(e.target.value), filters.maxPrice || 0)}
            />
            <input
              type="number"
              placeholder="Giá đến"
              onChange={(e) => handlePriceChange(filters.minPrice || 0, Number(e.target.value))}
            />
          </div>

          {/* In stock filter */}
          <label>
            <input
              type="checkbox"
              checked={filters.inStock === true}
              onChange={(e) => setInStockFilter(e.target.checked ? true : null)}
            />
            Chỉ hiển thị sản phẩm còn hàng
          </label>

          {/* Sort */}
          <select onChange={(e) => setSortFilter(e.target.value as any)}>
            <option value="">Sắp xếp mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
            <option value="newest">Mới nhất</option>
          </select>
        </div>
      )}

      {/* Product List */}
      <div className={isGridView ? 'grid grid-cols-3 gap-4' : 'flex flex-col gap-2'}>
        {isLoading && <div>Đang tải...</div>}
        {productsData?.data?.map((product) => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <p>
              {product.price} {product.currency}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div>
        <span>
          Trang {pagination.page} / {totalPages}
        </span>
        <button
          disabled={pagination.page === 1}
          onClick={() => handlePageChange(pagination.page - 1)}
        >
          Trang trước
        </button>
        <button
          disabled={pagination.page === totalPages}
          onClick={() => handlePageChange(pagination.page + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  )
}

// ============================================
// 2. FILTERS ONLY HOOK
// ============================================
export function ProductFiltersExample() {
  const { filters, hasActiveFilters, filterParams, setSearch, setCategoryFilter, clearFilters } =
    useProductFilters()

  return (
    <div>
      <input
        value={filters.search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm kiếm..."
      />

      <select
        value={filters.categoryId || ''}
        onChange={(e) => setCategoryFilter(e.target.value || null)}
      >
        <option value="">Tất cả</option>
        <option value="cat-1">Danh mục 1</option>
      </select>

      {hasActiveFilters && (
        <button onClick={clearFilters}>Xóa bộ lọc ({Object.keys(filterParams).length})</button>
      )}
    </div>
  )
}

// ============================================
// 3. PAGINATION ONLY HOOK
// ============================================
export function ProductPaginationExample() {
  const { pagination, totalPages, setPage, setLimit } = useProductPagination()

  return (
    <div>
      <select value={pagination.limit} onChange={(e) => setLimit(Number(e.target.value))}>
        <option value="12">12 sản phẩm</option>
        <option value="24">24 sản phẩm</option>
        <option value="48">48 sản phẩm</option>
      </select>

      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => setPage(page)} disabled={page === pagination.page}>
            {page}
          </button>
        ))}
      </div>

      <span>
        Hiển thị {(pagination.page - 1) * pagination.limit + 1} -{' '}
        {Math.min(pagination.page * pagination.limit, pagination.total)} trong tổng số{' '}
        {pagination.total}
      </span>
    </div>
  )
}

// ============================================
// 4. INTEGRATED WITH RTK QUERY
// ============================================
export function ProductListWithQueryExample() {
  const { filterParams, setPage, clearFilters } = useProductState()

  // Automatically refetch when filterParams changes
  const { data, isLoading, isFetching } = useGetProductsQuery(filterParams)

  const products = data?.data || []
  const pagination = data?.pagination

  return (
    <div>
      {isFetching && <div>Đang tải...</div>}

      <div>
        {products.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>

      {pagination && (
        <button disabled={!pagination.hasNextPage} onClick={() => setPage(filterParams.page + 1)}>
          Tải thêm
        </button>
      )}
    </div>
  )
}

// ============================================
// 5. SELECTED PRODUCT EXAMPLE
// ============================================
export function ProductDetailExample() {
  const { selectedProduct, setSelectedProduct, clearSelectedProduct } = useProductState()
  const { data: productsData } = useGetProductsQuery({ page: 1, limit: 10 })

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product)
  }

  return (
    <div>
      {/* Product List */}
      <div>
        {productsData?.data?.map((product) => (
          <div key={product.id} onClick={() => handleSelectProduct(product)}>
            {product.name}
          </div>
        ))}
      </div>

      {/* Selected Product Detail */}
      {selectedProduct && (
        <div>
          <h2>{selectedProduct.name}</h2>
          <p>Giá: {selectedProduct.price}</p>
          <button onClick={clearSelectedProduct}>Đóng</button>
        </div>
      )}
    </div>
  )
}

// ============================================
// 6. SEARCH WITH DEBOUNCE
// ============================================
import { useEffect, useState } from 'react'

export function ProductSearchExample() {
  const { setSearch, filters } = useProductFilters()
  const [localSearch, setLocalSearch] = useState(filters.search)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch)
    }, 500)

    return () => clearTimeout(timer)
  }, [localSearch, setSearch])

  return (
    <input
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      placeholder="Tìm kiếm với debounce..."
    />
  )
}
