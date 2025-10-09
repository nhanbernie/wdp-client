import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { RootState, AppDispatch } from '../redux/store'
import {
  createVendor,
  fetchVendors,
  fetchVendorById,
  updateVendor,
  deleteVendor,
  updateVendorStatus,
  setFilters,
  clearError,
  clearCurrentVendor,
  setCurrentVendor,
} from '../redux/slices/vendorSlice'
import { CreateVendorRequest, VendorFilters, Vendor } from '../types/vendor.types'

export const useVendor = () => {
  const dispatch = useDispatch<AppDispatch>()
  const vendorState = useSelector((state: RootState) => state.vendor)

  // Actions
  const createVendorAction = useCallback(
    (vendorData: CreateVendorRequest) => {
      return dispatch(createVendor(vendorData))
    },
    [dispatch],
  )

  const fetchVendorsAction = useCallback(
    (filters?: VendorFilters) => {
      return dispatch(fetchVendors(filters))
    },
    [dispatch],
  )

  const fetchVendorByIdAction = useCallback(
    (id: string) => {
      return dispatch(fetchVendorById(id))
    },
    [dispatch],
  )

  const updateVendorAction = useCallback(
    (id: string, vendorData: Partial<CreateVendorRequest>) => {
      return dispatch(updateVendor({ id, vendorData }))
    },
    [dispatch],
  )

  const deleteVendorAction = useCallback(
    (id: string) => {
      return dispatch(deleteVendor(id))
    },
    [dispatch],
  )

  const updateVendorStatusAction = useCallback(
    (id: string, status: 'pending' | 'approved' | 'rejected') => {
      return dispatch(updateVendorStatus({ id, status }))
    },
    [dispatch],
  )

  const setFiltersAction = useCallback(
    (filters: VendorFilters) => {
      dispatch(setFilters(filters))
    },
    [dispatch],
  )

  const clearErrorAction = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  const clearCurrentVendorAction = useCallback(() => {
    dispatch(clearCurrentVendor())
  }, [dispatch])

  const setCurrentVendorAction = useCallback(
    (vendor: Vendor) => {
      dispatch(setCurrentVendor(vendor))
    },
    [dispatch],
  )

  return {
    // State
    vendors: vendorState.vendors,
    currentVendor: vendorState.currentVendor,
    loading: vendorState.loading,
    error: vendorState.error,
    pagination: vendorState.pagination,
    filters: vendorState.filters,

    // Actions
    createVendor: createVendorAction,
    fetchVendors: fetchVendorsAction,
    fetchVendorById: fetchVendorByIdAction,
    updateVendor: updateVendorAction,
    deleteVendor: deleteVendorAction,
    updateVendorStatus: updateVendorStatusAction,
    setFilters: setFiltersAction,
    clearError: clearErrorAction,
    clearCurrentVendor: clearCurrentVendorAction,
    setCurrentVendor: setCurrentVendorAction,
  }
}

export default useVendor
