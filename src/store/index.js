import { configureStore } from "@reduxjs/toolkit";
import blurSlice from './blur-slice';

const store = configureStore({
  reducer: {
    blur: blurSlice.reducer
  }
});

export default store;
