import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    increment(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
      }
    },
    decrement(state, action) {
      const itemIdToRemove = action.payload.id;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === itemIdToRemove);

      if (existingItemIndex !== -1) {
        if (state.cartItems[existingItemIndex].quantity > 1) {
          state.cartItems[existingItemIndex].quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(item => item.id !== itemIdToRemove);
        }
      }
    },
    removeItem(state, action) {
      const itemIdToRemove = action.payload.id;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === itemIdToRemove);
      if (existingItemIndex !== -1) {
        state.cartItems = state.cartItems.filter(item => item.id !== itemIdToRemove);
      }
    },
    removeAll(state) {
      state.cartItems = [];
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
