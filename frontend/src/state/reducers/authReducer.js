const initailState = {
  isLoggedIn: false,
  token: null,
};

export default (state = initailState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { isLoggedIn: true, token: action.payload.token };
    case "REGISTER":
      state = { isLoggedIn: false, token: null, redirect: true };
      return state;
    default:
      return state;
  }
};
