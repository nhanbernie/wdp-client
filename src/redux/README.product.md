# Product Redux State Management

## Overview

Redux Toolkit slice để quản lý state cho Products (filters, pagination, view mode, selected product).

## Architecture

```
redux/
├── store.ts                          # Redux store configuration
├── hooks.ts                          # Typed hooks (useAppDispatch, useAppSelector)
├── slices/
│   └── product.slice.ts             # Product state slice
├── selector/
│   └── product.selectors.ts         # Memoized selectors
└── hooks/
    └── useProductState.ts           # Custom hooks for easy usage
```

## State Structure

```typescript
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
```

## Actions

### Selected Product

- `setSelectedProduct(product)` - Set selected product
- `clearSelectedProduct()` - Clear selected product

### Filters

- `setSearch(search)` - Set search query
- `setCategoryFilter(categoryId)` - Set category filter
- `setPriceRange({ minPrice, maxPrice })` - Set price range
- `setInStockFilter(inStock)` - Set in-stock filter
- `setBadgesFilter(badges)` - Set badges filter
- `setSortFilter(sort)` - Set sort order
- `clearFilters()` - Clear all filters

### Pagination

- `setPage(page)` - Set current page
- `setLimit(limit)` - Set items per page
- `setTotal(total)` - Set total items

### View Mode

- `setViewMode(mode)` - Set view mode ('grid' | 'list')
- `toggleViewMode()` - Toggle between grid and list

### UI State

- `toggleFilterPanel()` - Toggle filter panel
- `setFilterPanelOpen(open)` - Set filter panel state
- `setLoading(loading)` - Set loading state

## Usage

### 1. Full State Hook (Recommended)

```typescript
import { useProductState } from '@/redux/hooks'

function ProductListPage() {
  const {
    // State
    filters,
    pagination,
    viewMode,
    isFilterOpen,
    hasActiveFilters,
    filterParams,

    // Actions
    setSearch,
    setCategoryFilter,
    setPage,
    clearFilters,
  } = useProductState()

  // Use filterParams with RTK Query
  const { data } = useGetProductsQuery(filterParams)

  return (
    <div>
      <input value={filters.search} onChange={(e) => setSearch(e.target.value)} />
      {hasActiveFilters && <button onClick={clearFilters}>Clear Filters</button>}
    </div>
  )
}
```

### 2. Filters Only Hook

```typescript
import { useProductFilters } from '@/redux/hooks'

function ProductFilters() {
  const { filters, hasActiveFilters, filterParams, setSearch, setCategoryFilter, clearFilters } =
    useProductFilters()

  return <div>{/* Filter UI */}</div>
}
```

### 3. Pagination Only Hook

```typescript
import { useProductPagination } from '@/redux/hooks'

function ProductPagination() {
  const { pagination, totalPages, setPage } = useProductPagination()

  return <div>{/* Pagination UI */}</div>
}
```

### 4. View Mode Only Hook

```typescript
import { useProductViewMode } from '@/redux/hooks'

function ProductViewToggle() {
  const { isGridView, toggleViewMode } = useProductViewMode()

  return <button onClick={toggleViewMode}>{isGridView ? 'List View' : 'Grid View'}</button>
}
```

## Integration with RTK Query

```typescript
import { useProductState } from '@/redux/hooks'
import { useGetProductsQuery } from '@/services/products'

function ProductList() {
  const { filterParams, setPage } = useProductState()

  // Automatically refetch when filterParams changes
  const { data, isLoading } = useGetProductsQuery(filterParams)

  return (
    <div>
      {data?.data?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

## Selectors

### Base Selectors

```typescript
import {
  selectFilters,
  selectPagination,
  selectViewMode,
  selectSelectedProduct,
} from '@/redux/selector'

const filters = useAppSelector(selectFilters)
const pagination = useAppSelector(selectPagination)
```

### Computed Selectors (Memoized)

```typescript
import {
  selectHasActiveFilters,
  selectFilterParams,
  selectTotalPages,
  selectIsGridView,
} from '@/redux/selector'

const hasFilters = useAppSelector(selectHasActiveFilters)
const filterParams = useAppSelector(selectFilterParams)
const totalPages = useAppSelector(selectTotalPages)
```

## Best Practices

### 1. Auto-reset pagination when filters change

All filter actions automatically reset page to 1.

```typescript
// When user changes category, page resets to 1
setCategoryFilter('cat-bolts')
```

### 2. Use filterParams with RTK Query

`selectFilterParams` selector returns only defined values for API query.

```typescript
const filterParams = useAppSelector(selectFilterParams)
// Returns: { categoryId: 'cat-1', page: 1, limit: 12 }
// Excludes: null, undefined, empty arrays
```

### 3. Debounce search input

```typescript
const [localSearch, setLocalSearch] = useState('')
const { setSearch } = useProductFilters()

useEffect(() => {
  const timer = setTimeout(() => setSearch(localSearch), 500)
  return () => clearTimeout(timer)
}, [localSearch])
```

### 4. Persist state (Optional)

```typescript
// Add redux-persist to persist filters/viewMode
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'product',
  storage,
  whitelist: ['viewMode', 'pagination.limit'], // Only persist these
}

const persistedReducer = persistReducer(persistConfig, productReducer)
```

## Examples

See `redux/hooks/examples.usage.tsx` for complete examples:

- Product list page with filters
- Search with debounce
- Pagination
- View mode toggle
- Selected product detail
- Integration with RTK Query

## Notes

### When to use Redux vs RTK Query?

- **RTK Query**: Server state (API data, caching)
- **Redux Slice**: UI state (filters, view mode, pagination)

### Cache Invalidation

Product slice state is separate from RTK Query cache. When you create/update/delete a product:

1. RTK Query invalidates cache (automatic)
2. Redux slice state remains (filters, pagination preserved)
3. Re-fetching uses current filters

### Performance

All selectors are memoized with `createSelector` to prevent unnecessary re-renders.

```typescript
// This selector only recalculates when filters change
export const selectHasActiveFilters = createSelector(
  [selectFilters],
  (filters) => /* calculation */
)
```
