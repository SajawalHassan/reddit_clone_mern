const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Subreddit = require("../models/Subreddit");

const { verify } = require("../authentication/verifyToken");

router.get("/profile", verify, async (req, res) => {
  try {
    // Getting user info
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/edit", verify, async (req, res) => {
  try {
    // Hashing password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Updating user
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      $set: req.body,
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/delete", verify, async (req, res) => {
  try {
    // Deleting user
    await User.findByIdAndDelete(req.user._id);

    res.json("User deleted!");
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
