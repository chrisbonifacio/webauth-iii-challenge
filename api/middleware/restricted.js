const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");

function restricted(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, secrets.jwtSecret, err => {
    if (err) {
      res.status(400).json({ message: "JSON Token could not be verified" });
    } else {
      next();
    }
  });
}

module.exports = restricted;
