import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
};

const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    registerPending: (state, action) => {
      state.isLoading = action.payload;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
    },
    registerFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerErrorClear: (state, action) => {
      state.error = "";
    },
  },
});

export const {
  registerPending,
  registerSuccess,
  registerFail,
  registerErrorClear,
} = registerSlice.actions;

export default registerSlice.reducer;
