const initState = {
  isLoggedIn: false,
  token: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "REGISTER":
      state = { isLoggedIn: false, token: null, redirect: true };
      return state;
    default:
      return state;
  }
};
