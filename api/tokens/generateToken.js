const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
    // ... any other data
  };
  const options = {
    expiresIn: "30s"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = generateToken;
