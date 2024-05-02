import { createSlice } from "@reduxjs/toolkit";
import { decryption } from "../token/token";

const userSlice = createSlice({
  name: 'currentUser',
  initialState: {
    id: Number(decryption('D4B7EF6F8553C18E', 'uid')) || null,
    name: null,
    lastName: null,
    phone: null,
    password: null,
  },
  reducers: {
    loggedIn(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.password = action.payload.password;
    },
    loggedOut(state) {
      state.id = null;
      state.name = null;
      state.lastName = null;
      state.phone = null;
      state.password = null;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice;
