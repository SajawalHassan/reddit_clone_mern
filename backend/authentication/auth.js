const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const { registerValidation } = require("./validation");
const { generateAccessToken } = require("../utils/generateAccessToken");

router.post("/register", async (req, res) => {
  try {
    // Checking if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json("Email already exists!");
    }

    // Making sure the user doesn't put a space in username
    if (req.body.name.includes(" ")) {
      return res.status(400).json("Username cannot include space!");
    }

    // Validating data
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Getting info for new user
    const userData = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });

    // Saving new user
    const newUser = await userData.save();

    res.json(newUser);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Checking if the email is correct
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json("Invalid email or password!");

    // Checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).json("Invalid email or password!");

    const payload = {
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      upVotedPosts: user.upVotedPosts,
      downVotedPosts: user.downVotedPosts,
      joinedSubreddits: user.joinedSubreddits,
      karma: user.karma,
      date: user.date,
      _id: user._id,
    };

    // Creating the access and refresh token
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(
      user.toJSON(),
      process.env.REFRESH_TOKEN_SECRET
    );

    const newRefreshToken = await RefreshToken({
      refreshToken: refreshToken,
    });

    await newRefreshToken.save();

    res.json({
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      upVotedPosts: user.upVotedPosts,
      downVotedPosts: user.downVotedPosts,
      joinedSubreddits: user.joinedSubreddits,
      karma: user.karma,
      date: user.date,
      _id: user._id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/refresh", (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const _refreshToken = RefreshToken.find({
      refreshToken: refreshToken,
    });

    if (_refreshToken == null) return res.sendStatus(401);
    if (!_refreshToken) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const payload = {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        upVotedPosts: user.upVotedPosts,
        downVotedPosts: user.downVotedPosts,
        joinedSubreddits: user.joinedSubreddits,
        karma: user.karma,
        date: user.date,
        _id: user._id,
      };
      const accessToken = generateAccessToken(payload);
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
