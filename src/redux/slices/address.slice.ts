import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Address } from '@/services/addresses/types';

interface AddressState {
  selectedAddressId: string | null;
  isAddressFormOpen: boolean;
  editingAddress: Address | null;
}

const initialState: AddressState = {
  selectedAddressId: null,
  isAddressFormOpen: false,
  editingAddress: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setSelectedAddress: (state, action: PayloadAction<string | null>) => {
      state.selectedAddressId = action.payload;
    },
    openAddressForm: (state, action: PayloadAction<Address | null>) => {
      state.isAddressFormOpen = true;
      state.editingAddress = action.payload || null;
    },
    closeAddressForm: (state) => {
      state.isAddressFormOpen = false;
      state.editingAddress = null;
    },
    resetAddressState: (state) => {
      state.selectedAddressId = null;
      state.isAddressFormOpen = false;
      state.editingAddress = null;
    },
  },
});

export const {
  setSelectedAddress,
  openAddressForm,
  closeAddressForm,
  resetAddressState,
} = addressSlice.actions;

export const addressReducer = addressSlice.reducer;

