const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Array,
    default: [],
  },
  downvotes: {
    type: Array,
    default: [],
  },
});
module.exports = mongoose.model("Comments", commentSchema);
