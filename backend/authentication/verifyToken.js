const jwt = require("jsonwebtoken");

module.exports.verify = function (req, res, next) {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json("Access denied");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(403);

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
