const mongoose = require("mongoose");

const subredditSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  titleDescription: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  ownerId: {
    type: String,
    required: true,
  },
  subredditPic: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    min: 3,
    max: 500,
    default: "",
  },
  joinedMembers: {
    type: Array,
    default: [],
  },
  mods: {
    type: Array,
    default: [],
  },
  rules: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Subreddits", subredditSchema);
