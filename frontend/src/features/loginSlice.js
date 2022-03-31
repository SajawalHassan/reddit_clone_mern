import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  error: "",
};

const loginSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginPending: (state, action) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginErrorClear: (state, action) => {
      state.error = "";
    },
  },
});

export const { loginPending, loginSuccess, loginFail, loginErrorClear } =
  loginSlice.actions;

export default loginSlice.reducer;
