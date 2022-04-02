const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Subreddit = require("../models/Subreddit");
const Comment = require("../models/Comment");
const bcrypt = require("bcrypt");

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

router.get("/view/:id", async (req, res) => {
  try {
    // Finding user
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (error) {
    if (error._message) return res.status(500).json(error._message);
    res.sendStatus(500);
  }
});

router.put("/edit", authenticate, async (req, res) => {
  try {
    // Validating user info
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Hashing password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Updating user
    await User.findOneAndUpdate(req.user._id, { $set: req.body });

    res.send("User updated");
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
