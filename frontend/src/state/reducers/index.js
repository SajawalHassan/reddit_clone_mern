import { combineReducers } from "redux";
import register from "./authReducer";
import error from "./errReducer";

// Combining reducers
const reducers = combineReducers({
  register,
  error,
});

export default reducers;
