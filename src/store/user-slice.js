import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'currentUser',
  initialState: {
    id: Number(localStorage.getItem('userId')) || null,
    name: null,
    lastName: null,
    phone: null,
    password: null,
    loggedIn: localStorage.getItem('userLoggedIn')?.length === 4 ? true : false || false
  },
  reducers: {
    loggedIn(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.password = action.payload.password;
      state.loggedIn = action.payload.loggedIn;
    },
    loggedOut(state) {
      state.id = null;
      state.name = null;
      state.lastName = null;
      state.phone = null;
      state.password = null;
      state.loggedIn = false;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice;
