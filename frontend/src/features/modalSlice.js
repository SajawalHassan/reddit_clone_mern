import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
  view: "login",
};

const modalSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    changeModalState: (state, action) => {
      state.isOpened = action.payload;
    },
    changeView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { changeModalState, changeView } = modalSlice.actions;

export default modalSlice.reducer;
