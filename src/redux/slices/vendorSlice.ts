import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { VendorService } from '../../services/vendor.service'
import { Vendor, CreateVendorRequest, VendorFilters, VendorState } from '../../types/vendor.types'

const initialState: VendorState = {
  vendors: [],
  currentVendor: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    page: 1,
    limit: 10,
  },
}

// Async thunks
export const createVendor = createAsyncThunk(
  'vendor/createVendor',
  async (vendorData: CreateVendorRequest, { rejectWithValue }) => {
    try {
      const response = await VendorService.createVendor(vendorData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create vendor')
    }
  },
)

export const fetchVendors = createAsyncThunk(
  'vendor/fetchVendors',
  async (filters: VendorFilters = {}, { rejectWithValue }) => {
    try {
      const response = await VendorService.getVendors(filters)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch vendors')
    }
  },
)

export const fetchVendorById = createAsyncThunk(
  'vendor/fetchVendorById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await VendorService.getVendorById(id)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch vendor')
    }
  },
)

export const updateVendor = createAsyncThunk(
  'vendor/updateVendor',
  async (
    { id, vendorData }: { id: string; vendorData: Partial<CreateVendorRequest> },
    { rejectWithValue },
  ) => {
    try {
      const response = await VendorService.updateVendor(id, vendorData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update vendor')
    }
  },
)

export const deleteVendor = createAsyncThunk(
  'vendor/deleteVendor',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await VendorService.deleteVendor(id)
      return { id, response }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete vendor')
    }
  },
)

export const updateVendorStatus = createAsyncThunk(
  'vendor/updateVendorStatus',
  async (
    { id, status }: { id: string; status: 'pending' | 'approved' | 'rejected' },
    { rejectWithValue },
  ) => {
    try {
      const response = await VendorService.updateVendorStatus(id, status)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update vendor status')
    }
  },
)

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<VendorFilters>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
    clearCurrentVendor: (state) => {
      state.currentVendor = null
    },
    setCurrentVendor: (state, action: PayloadAction<Vendor>) => {
      state.currentVendor = action.payload
    },
  },
  extraReducers: (builder) => {
    // Create vendor
    builder
      .addCase(createVendor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.loading = false
        state.vendors.unshift(action.payload.data)
        state.currentVendor = action.payload.data
        state.error = null
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Fetch vendors
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false
        state.vendors = action.payload.data
        state.pagination = action.payload.pagination
        state.error = null
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Fetch vendor by ID
    builder
      .addCase(fetchVendorById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.loading = false
        state.currentVendor = action.payload.data
        state.error = null
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update vendor
    builder
      .addCase(updateVendor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.loading = false
        const index = state.vendors.findIndex((vendor) => vendor.id === action.payload.data.id)
        if (index !== -1) {
          state.vendors[index] = action.payload.data
        }
        if (state.currentVendor?.id === action.payload.data.id) {
          state.currentVendor = action.payload.data
        }
        state.error = null
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Delete vendor
    builder
      .addCase(deleteVendor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.loading = false
        state.vendors = state.vendors.filter((vendor) => vendor.id !== action.payload.id)
        if (state.currentVendor?.id === action.payload.id) {
          state.currentVendor = null
        }
        state.error = null
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update vendor status
    builder
      .addCase(updateVendorStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateVendorStatus.fulfilled, (state, action) => {
        state.loading = false
        const index = state.vendors.findIndex((vendor) => vendor.id === action.payload.data.id)
        if (index !== -1) {
          state.vendors[index] = action.payload.data
        }
        if (state.currentVendor?.id === action.payload.data.id) {
          state.currentVendor = action.payload.data
        }
        state.error = null
      })
      .addCase(updateVendorStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setFilters, clearError, clearCurrentVendor, setCurrentVendor } = vendorSlice.actions
export default vendorSlice.reducer
