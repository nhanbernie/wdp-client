import type { RootState } from '../store';

// Select address state
export const selectAddressState = (state: RootState) => state.address;

// Select selected address ID
export const selectSelectedAddressId = (state: RootState) => state.address.selectedAddressId;

// Select is address form open
export const selectIsAddressFormOpen = (state: RootState) => state.address.isAddressFormOpen;

// Select editing address
export const selectEditingAddress = (state: RootState) => state.address.editingAddress;

