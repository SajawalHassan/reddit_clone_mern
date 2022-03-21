const Jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return Jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

module.exports = { generateAccessToken };
