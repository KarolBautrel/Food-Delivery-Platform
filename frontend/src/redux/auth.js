import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: "",
    email: "",
    token: "",
    id: "",
  },
  reducers: {
    getLoggedUserData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    clearUserData: (state) => {
      state.name = "";
      state.email = "";
      state.token = "";
      state.id = "";
    },
  },
});

export const { getLoggedUserData, clearUserData } = authSlice.actions;

export default authSlice.reducer;
