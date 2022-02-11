const router = require("express").Router();
const User = require("../models/User");

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

module.exports = router;
