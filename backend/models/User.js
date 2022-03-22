const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  profilePic: {
    type: String,
    default: "",
  },
  upvotedPosts: {
    type: Array,
    default: [],
  },
  downvotedPosts: {
    type: Array,
    default: [],
  },
  joinedSubreddits: {
    type: Array,
    default: [],
  },
  karma: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Users", userSchema);
