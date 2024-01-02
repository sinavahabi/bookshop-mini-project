import { createSlice } from "@reduxjs/toolkit";

const blurSlice = createSlice({
  name: 'blur',
  initialState: { isBlur: false },
  reducers:{
    blurOn(state) {
      state.isBlur = true;
    },
    blurOut(state) {
      state.isBlur = false;
    }
  }
});

export const blurActions = blurSlice.actions;
export default blurSlice;
