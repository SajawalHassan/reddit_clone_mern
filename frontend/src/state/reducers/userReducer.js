const initailState = {
  id: null,
  name: null,
  email: null,
  profilePic: null,
  date: null,
  joinedSubreddits: null,
  upvotedPosts: null,
  downVotedPosts: null,
  karma: 0,
};

export default (state = initailState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        profilePic: action.payload.profilePic,
        date: action.payload.date,
        joinedSubreddits: action.payload.joinedSubreddits,
        upvotedPosts: action.payload.upvotedPosts,
        downVotedPosts: action.payload.downVotedPosts,
        karma: action.payload.karma,
        redirect: true,
      };
    case "GET_USER":
      return state;
    default:
      return state;
  }
};
