const jwt = require("jsonwebtoken");

module.exports.verify = function (req, res, next) {
  try {
    // Checking if the user has the token
    const token = req.header("auth-token");
    // If he doesn't then throw err
    if (!token) {
      return res.status(403).json("Please sign in/up first!");
    }

    // Verifying token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json(err);
  }
};
