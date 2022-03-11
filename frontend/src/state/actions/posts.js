import axios from "../../axios/axios";

export default () => async (dispatch) => {
  try {
    const { data } = await axios.get("/posts/feed");

    dispatch({ type: "ALL_POSTS", payload: data });
    dispatch({ type: "CLEAR_ERRORS" });
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.response.data });
  }
};
