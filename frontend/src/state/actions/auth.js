import axios from "../../axios/axios";

export const register = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/register", {
      name,
      email,
      password,
    });

    dispatch({ type: "REGISTER", payload: data });
    dispatch({ type: "CLEAR_ERRORS" });
  } catch (err) {
    dispatch({ type: "SET_ERROR", payload: err.response.data });
  }
};
