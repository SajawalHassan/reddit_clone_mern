import { combineReducers } from "redux";

import auth from "./authReducer";
import user from "./userReducer";
import posts from "./postsReducer";
import error from "./errorReducer";

export default combineReducers({
  auth,
  user,
  error,
  posts,
});
