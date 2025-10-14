import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Base selectors
export const selectProductState = (state: RootState) => state.product

export const selectSelectedProduct = (state: RootState) => state.product.selectedProduct

export const selectFilters = (state: RootState) => state.product.filters

export const selectPagination = (state: RootState) => state.product.pagination

export const selectViewMode = (state: RootState) => state.product.viewMode

export const selectIsFilterOpen = (state: RootState) => state.product.isFilterOpen

export const selectProductIsLoading = (state: RootState) => state.product.isLoading

// Individual filter selectors
export const selectSearchQuery = (state: RootState) => state.product.filters.search

export const selectCategoryFilter = (state: RootState) => state.product.filters.categoryId

export const selectPriceRange = createSelector([selectFilters], (filters) => ({
  minPrice: filters.minPrice,
  maxPrice: filters.maxPrice,
}))

export const selectInStockFilter = (state: RootState) => state.product.filters.inStock

export const selectBadgesFilter = (state: RootState) => state.product.filters.badges

export const selectSortFilter = (state: RootState) => state.product.filters.sort

// Pagination selectors
export const selectCurrentPage = (state: RootState) => state.product.pagination.page

export const selectPageLimit = (state: RootState) => state.product.pagination.limit

export const selectTotalItems = (state: RootState) => state.product.pagination.total

// Computed selectors
export const selectTotalPages = createSelector([selectPagination], (pagination) =>
  Math.ceil(pagination.total / pagination.limit),
)

export const selectHasActiveFilters = createSelector([selectFilters], (filters) => {
  return (
    filters.search !== '' ||
    filters.categoryId !== null ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.inStock !== null ||
    filters.badges.length > 0 ||
    filters.sort !== null
  )
})

export const selectFilterParams = createSelector(
  [selectFilters, selectPagination],
  (filters, pagination) => ({
    search: filters.search || undefined,
    categoryId: filters.categoryId || undefined,
    minPrice: filters.minPrice || undefined,
    maxPrice: filters.maxPrice || undefined,
    inStock: filters.inStock ?? undefined,
    badges: filters.badges.length > 0 ? filters.badges : undefined,
    sort: filters.sort || undefined,
    page: pagination.page,
    limit: pagination.limit,
  }),
)

// UI state selectors
export const selectIsGridView = (state: RootState) => state.product.viewMode === 'grid'

export const selectIsListView = (state: RootState) => state.product.viewMode === 'list'
