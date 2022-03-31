import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "../features/loginSlice";
import modalReducer from "../features/modalSlice";
import registerReducer from "../features/registerSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    modal: modalReducer,
  },
});
