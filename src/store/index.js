import { configureStore } from "@reduxjs/toolkit";
import blurSlice from './blur-slice';
import filterSlice from './filter-slice';

const store = configureStore({
  reducer: {
    blur: blurSlice.reducer,
    filter: filterSlice.reducer,
  }
});

export default store;
