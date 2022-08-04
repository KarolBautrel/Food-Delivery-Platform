import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: "",
    email: "",
    token: "",
  },
  reducers: {
    getLoggedUserData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
  },
});

export const { getLoggedUserData } = authSlice.actions;

export default authSlice.reducer;
