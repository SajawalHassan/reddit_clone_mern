const RefreshToken = require("../models/RefreshToken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { registerValidation } = require("../utils/validation");
const { generateAccessToken } = require("../utils/generateAccessToken");

router.post("/register", async (req, res) => {
  try {
    // Making sure the username doesn't contain spaces
    if (req.body.username.includes(" "))
      return res.status(400).json("Username cannot contain spaces!");

    // Checking if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json("Email already exists!");

    // Validating info
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Hashing passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Getting info to save new user
    const newUser = User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePic: req.body.profilePic,
    });

    // Saving new user into db
    await newUser.save();

    res.json("Registered successfully!");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Making sure the email isn't invalid
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Invalid email or password");

    // Making sure the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Invalid email or password");

    const payload = {
      username: user.username,
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

    // Getting info to save refreshToken
    const newRefreshToken = RefreshToken({
      refreshToken: refreshToken,
    });

    // Saving refreshToken
    await newRefreshToken.save();

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/refresh", async (req, res) => {
  try {
    // Getting refreshToken
    const refreshToken = req.body.token;
    // Finding refreshToken in db
    const _refreshToken = await RefreshToken.findOne({
      refreshToken: refreshToken,
    });

    // Making sure the refreshToken is not null
    if (_refreshToken == null) return res.sendStatus(401);
    // Making sure the refreshToken exists
    if (!_refreshToken) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      const payload = {
        username: user.username,
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
    res.sendStatus(500);
  }
});

router.delete("/logout", async (req, res) => {
  try {
    await RefreshToken.findOneAndDelete({ refreshToken: req.body.token });

    res.json("Logged out!");
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
