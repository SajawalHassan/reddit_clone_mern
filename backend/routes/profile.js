const router = require("express").Router();
const User = require("../models/User");

const { authenticate } = require("../auth/authenticate");

router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (error) {
    if (error._message) return res.status(500).json(error._message);
    res.sendStatus(500);
  }
});

module.exports = router;
