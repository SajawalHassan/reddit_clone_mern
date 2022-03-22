const router = require("express").Router();
const User = require("../models/User");

const { registerValidation } = require("./validation");

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

    // Getting info to save new user
    const newUser = User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profilePic: req.body.profilePic,
    });

    // Saving new user into db
    await newUser.save();

    res.json("Registered successfully!");
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
