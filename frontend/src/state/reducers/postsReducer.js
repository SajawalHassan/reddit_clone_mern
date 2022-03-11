export default (state = [], action) => {
  switch (action.type) {
    case "ALL_POSTS":
      return action.payload;
    default:
      return state;
  }
};
