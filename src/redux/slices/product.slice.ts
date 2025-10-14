import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductDto } from '@/services/api/product.type'

/**
 * Product State Interface
 * Quản lý UI state cho products (filters, selected product, view mode, etc.)
 */
interface ProductState {
  // Selected product for detail view
  selectedProduct: ProductDto | null

  // Filters state
  filters: {
    search: string
    categoryId: string | null
    minPrice: number | null
    maxPrice: number | null
    inStock: boolean | null
    badges: string[]
    sort: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | null
  }

  // Pagination
  pagination: {
    page: number
    limit: number
    total: number
  }

  // View mode
  viewMode: 'grid' | 'list'

  // UI states
  isFilterOpen: boolean
  isLoading: boolean
}

const initialState: ProductState = {
  selectedProduct: null,
  filters: {
    search: '',
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    inStock: null,
    badges: [],
    sort: null,
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
  viewMode: 'grid',
  isFilterOpen: false,
  isLoading: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Selected Product Actions
    setSelectedProduct: (state, action: PayloadAction<ProductDto | null>) => {
      state.selectedProduct = action.payload
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },

    // Filter Actions
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.pagination.page = 1 // Reset to first page when search changes
    },

    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.categoryId = action.payload
      state.pagination.page = 1
    },

    setPriceRange: (
      state,
      action: PayloadAction<{ minPrice: number | null; maxPrice: number | null }>,
    ) => {
      state.filters.minPrice = action.payload.minPrice
      state.filters.maxPrice = action.payload.maxPrice
      state.pagination.page = 1
    },

    setInStockFilter: (state, action: PayloadAction<boolean | null>) => {
      state.filters.inStock = action.payload
      state.pagination.page = 1
    },

    setBadgesFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.badges = action.payload
      state.pagination.page = 1
    },

    setSortFilter: (
      state,
      action: PayloadAction<
        'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | null
      >,
    ) => {
      state.filters.sort = action.payload
      state.pagination.page = 1
    },

    clearFilters: (state) => {
      state.filters = initialState.filters
      state.pagination.page = 1
    },

    // Pagination Actions
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },

    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload
      state.pagination.page = 1
    },

    setTotal: (state, action: PayloadAction<number>) => {
      state.pagination.total = action.payload
    },

    // View Mode Actions
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload
    },

    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid'
    },

    // UI Actions
    toggleFilterPanel: (state) => {
      state.isFilterOpen = !state.isFilterOpen
    },

    setFilterPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    // Reset State
    resetProductState: () => initialState,
  },
})

export const {
  setSelectedProduct,
  clearSelectedProduct,
  setSearch,
  setCategoryFilter,
  setPriceRange,
  setInStockFilter,
  setBadgesFilter,
  setSortFilter,
  clearFilters,
  setPage,
  setLimit,
  setTotal,
  setViewMode,
  toggleViewMode,
  toggleFilterPanel,
  setFilterPanelOpen,
  setLoading,
  resetProductState,
} = productSlice.actions

export const productReducer = productSlice.reducer
