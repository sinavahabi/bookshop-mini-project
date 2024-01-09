import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: { filterType: '' },
  reducers:{
    financial(state) {
      state.filterType = 'مالی';
    },
    philosophy(state) {
      state.filterType = 'فلسفه';
    },
    psychology(state) {
      state.filterType = 'روانشناسی';
    },
    selfDevelopment(state) {
      state.filterType = 'خودسازی';
    }
  }
});

export const filterActions = filterSlice.actions;
export default filterSlice;
