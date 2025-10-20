import { useAppDispatch, useAppSelector } from '../hooks'
import {
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
  setViewMode,
  toggleViewMode,
  toggleFilterPanel,
  setFilterPanelOpen,
} from '../slices/product.slice'
import {
  selectSelectedProduct,
  selectFilters,
  selectPagination,
  selectViewMode,
  selectIsFilterOpen,
  selectProductIsLoading,
  selectHasActiveFilters,
  selectFilterParams,
  selectTotalPages,
  selectIsGridView,
  selectIsListView,
} from '../selector/product.selectors'
import { ProductDto } from '@/services/api/product.type'

/**
 * Custom hook for managing product state
 */
export const useProductState = () => {
  const dispatch = useAppDispatch()

  // Selectors
  const selectedProduct = useAppSelector(selectSelectedProduct)
  const filters = useAppSelector(selectFilters)
  const pagination = useAppSelector(selectPagination)
  const viewMode = useAppSelector(selectViewMode)
  const isFilterOpen = useAppSelector(selectIsFilterOpen)
  const isLoading = useAppSelector(selectProductIsLoading)
  const hasActiveFilters = useAppSelector(selectHasActiveFilters)
  const filterParams = useAppSelector(selectFilterParams)
  const totalPages = useAppSelector(selectTotalPages)
  const isGridView = useAppSelector(selectIsGridView)
  const isListView = useAppSelector(selectIsListView)

  // Actions
  const handleSetSelectedProduct = (product: ProductDto | null) => {
    dispatch(setSelectedProduct(product))
  }

  const handleClearSelectedProduct = () => {
    dispatch(clearSelectedProduct())
  }

  const handleSetSearch = (search: string) => {
    dispatch(setSearch(search))
  }

  const handleSetCategoryFilter = (categoryId: string | null) => {
    dispatch(setCategoryFilter(categoryId))
  }

  const handleSetPriceRange = (minPrice: number | null, maxPrice: number | null) => {
    dispatch(setPriceRange({ minPrice, maxPrice }))
  }

  const handleSetInStockFilter = (inStock: boolean | null) => {
    dispatch(setInStockFilter(inStock))
  }

  const handleSetBadgesFilter = (badges: string[]) => {
    dispatch(setBadgesFilter(badges))
  }

  const handleSetSortFilter = (
    sort: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | null,
  ) => {
    dispatch(setSortFilter(sort))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  const handleSetPage = (page: number) => {
    dispatch(setPage(page))
  }

  const handleSetLimit = (limit: number) => {
    dispatch(setLimit(limit))
  }

  const handleSetViewMode = (mode: 'grid' | 'list') => {
    dispatch(setViewMode(mode))
  }

  const handleToggleViewMode = () => {
    dispatch(toggleViewMode())
  }

  const handleToggleFilterPanel = () => {
    dispatch(toggleFilterPanel())
  }

  const handleSetFilterPanelOpen = (open: boolean) => {
    dispatch(setFilterPanelOpen(open))
  }

  return {
    // State
    selectedProduct,
    filters,
    pagination,
    viewMode,
    isFilterOpen,
    isLoading,
    hasActiveFilters,
    filterParams,
    totalPages,
    isGridView,
    isListView,

    // Actions
    setSelectedProduct: handleSetSelectedProduct,
    clearSelectedProduct: handleClearSelectedProduct,
    setSearch: handleSetSearch,
    setCategoryFilter: handleSetCategoryFilter,
    setPriceRange: handleSetPriceRange,
    setInStockFilter: handleSetInStockFilter,
    setBadgesFilter: handleSetBadgesFilter,
    setSortFilter: handleSetSortFilter,
    clearFilters: handleClearFilters,
    setPage: handleSetPage,
    setLimit: handleSetLimit,
    setViewMode: handleSetViewMode,
    toggleViewMode: handleToggleViewMode,
    toggleFilterPanel: handleToggleFilterPanel,
    setFilterPanelOpen: handleSetFilterPanelOpen,
  }
}

/**
 * Hook for product filters only
 */
export const useProductFilters = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)
  const hasActiveFilters = useAppSelector(selectHasActiveFilters)
  const filterParams = useAppSelector(selectFilterParams)

  return {
    filters,
    hasActiveFilters,
    filterParams,
    setSearch: (search: string) => dispatch(setSearch(search)),
    setCategoryFilter: (categoryId: string | null) => dispatch(setCategoryFilter(categoryId)),
    setPriceRange: (minPrice: number | null, maxPrice: number | null) =>
      dispatch(setPriceRange({ minPrice, maxPrice })),
    setInStockFilter: (inStock: boolean | null) => dispatch(setInStockFilter(inStock)),
    setBadgesFilter: (badges: string[]) => dispatch(setBadgesFilter(badges)),
    setSortFilter: (
      sort: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | null,
    ) => dispatch(setSortFilter(sort)),
    clearFilters: () => dispatch(clearFilters()),
  }
}

/**
 * Hook for product pagination only
 */
export const useProductPagination = () => {
  const dispatch = useAppDispatch()
  const pagination = useAppSelector(selectPagination)
  const totalPages = useAppSelector(selectTotalPages)

  return {
    pagination,
    totalPages,
    setPage: (page: number) => dispatch(setPage(page)),
    setLimit: (limit: number) => dispatch(setLimit(limit)),
  }
}

/**
 * Hook for product view mode only
 */
export const useProductViewMode = () => {
  const dispatch = useAppDispatch()
  const viewMode = useAppSelector(selectViewMode)
  const isGridView = useAppSelector(selectIsGridView)
  const isListView = useAppSelector(selectIsListView)

  return {
    viewMode,
    isGridView,
    isListView,
    setViewMode: (mode: 'grid' | 'list') => dispatch(setViewMode(mode)),
    toggleViewMode: () => dispatch(toggleViewMode()),
  }
}
