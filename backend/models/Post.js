const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  wordContent: {
    type: String,
    default: "",
  },
  picContent: {
    type: String,
    default: "",
  },
  ownerId: {
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
  subredditId: {
    type: String,
    required: true,
  },
  subredditPic: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Posts", postSchema);
