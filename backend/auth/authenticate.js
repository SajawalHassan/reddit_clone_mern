const jwt = require("jsonwebtoken");

module.exports.authenticate = function (req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json("Token invalid!");
      req.user = user;
      next();
    });
  } catch (error) {
    res.sendStatus(500);
  }
};
