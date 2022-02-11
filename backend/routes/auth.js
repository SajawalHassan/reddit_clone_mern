const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const { registerValidation } = require("../utils/validation");

router.post("/register", async (req, res) => {
  try {
    // Validating data
    const { error } = await registerValidation(req.body);
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
    res.status(400).json(err);
  }
});

module.exports = router;
