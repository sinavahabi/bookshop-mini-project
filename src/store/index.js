import { configureStore } from "@reduxjs/toolkit";
import blurSlice from './blur-slice';
import filterSlice from './filter-slice';
import userSlice from "./user-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    blur: blurSlice.reducer,
    filter: filterSlice.reducer,
    currentUser: userSlice.reducer,
    cart: cartSlice.reducer
  }
});

export default store;
