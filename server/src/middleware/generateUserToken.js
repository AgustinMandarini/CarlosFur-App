const jwt = require("jsonwebtoken");

function generateUserToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

module.exports = { generateUserToken };
