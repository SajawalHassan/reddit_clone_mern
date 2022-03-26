const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Subreddit = require("../models/Subreddit");
const Comment = require("../models/Comment");

const { authenticate } = require("../auth/authenticate");
const { userValidation } = require("../utils/validation");

router.get("/me", authenticate, async (req, res) => {
  try {
    // Finding user
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (error) {
    if (error._message) return res.status(500).json(error._message);
    res.sendStatus(500);
  }
});

router.put("/edit", authenticate, async (req, res) => {
  try {
    // Finding user
    const user = await User.findById(req.user._id);

    // Validating user info
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Updating the user
    await user.updateOne({ $set: req.body });

    res.json("User updated");
  } catch (error) {
    if (error._message) return res.status(500).json(error._message);
    res.sendStatus(500);
  }
});

router.delete("/delete", authenticate, async (req, res) => {
  try {
    // Deleting user, posts and subreddits created by the user
    await User.findByIdAndDelete(req.user._id);
    await Post.deleteMany({ ownerId: req.user._id });
    await Subreddit.deleteMany({ ownerId: req.user._id });
    await Comment.deleteMany({ ownerId: req.user._id });

    res.json("User deleted");
  } catch (error) {
    if (error._message) return res.status(500).json(error._message);
    res.sendStatus(500);
  }
});

module.exports = router;
