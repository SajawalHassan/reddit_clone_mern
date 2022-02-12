const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("./validation");

router.post("/register", async (req, res) => {
  try {
    // Validating data
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Getting info for new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });

    // Saving new user
    const newUser = await user.save();

    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Validating data
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    // Checking if the email is correct
    const userEmail = await User.findOne({ email: req.body.email });
    if (!userEmail) return res.status(400).json("Invalid email or password!");

    // Checking if the password is correct
    const validPass = await bcrypt.compare(
      req.body.password,
      userEmail.password
    );
    if (!validPass) return res.status(400).json("Invalid email or password!");

    // Creating and assigning the token
    const token = Jwt.sign({ _id: userEmail._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).json({
      name: userEmail.name,
      email: userEmail.email,
      profilePic: userEmail.profilePic,
      upVotedPosts: userEmail.upVotedPosts,
      downVotedPosts: userEmail.downVotedPosts,
      joinedSubreddits: userEmail.joinedSubreddits,
      karma: userEmail.karma,
      date: userEmail.date,
      _id: userEmail._id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
