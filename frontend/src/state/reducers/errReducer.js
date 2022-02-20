const initailState = {
  message: null,
};

export default (state = initailState, action) => {
  switch (action.type) {
    case "CLEAR_ERRORS":
      return initailState;
    case "SET_ERROR":
      return { message: action.payload };
    case "GET_ERRORS":
      return state;
    default:
      return state;
  }
};
