const Users = require("../users/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Please provide a username and password" });
  } else {
    try {
      const user = await Users.findBy({ username });
      if (user && bcrypt.compareSync(password, user.password)) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to login" });
    }
  }
}

module.exports = login;
