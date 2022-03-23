const jwt = require("jsonwebtoken");
module.exports.generateAccessToken = function (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};
