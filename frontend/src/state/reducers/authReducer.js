const initailState = {
  isLoggedIn: false,
  token: null,
  redirect: false,
};

export default (state = initailState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        token: action.payload.authtoken,
        redirect: true,
      };
    case "REGISTER":
      return { isLoggedIn: false, token: null, redirect: true };
    default:
      return state;
  }
};
