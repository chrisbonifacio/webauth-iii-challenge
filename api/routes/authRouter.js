const express = require("express");
const router = express.Router();

const Users = require("../users/userModel");

const login = require("../middleware/login");
const restricted = require("../middleware/restricted");

const bcrypt = require("bcrypt");
const generateToken = require("../tokens/generateToken");

// GET all users
router.get("/users", restricted, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Could not get users" });
  }
});

// GET user by ID
router.get("/users/:id", restricted, async (req, res) => {
  try {
    const user = await Users.find(req.params.id);
    if (!user) {
      res
        .status(400)
        .json({ message: "User with specified ID does not exist" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// POST to register
router.post("/register", async (req, res) => {
  const user = req.body;

  if (!user.username || !user.password || !user.department) {
    res
      .status(400)
      .json({ message: "Please provide a username, password, and department" });
  } else {
    try {
      const newUser = await Users.add({
        ...user,
        password: bcrypt.hashSync(user.password, 8)
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: "Failed to register user" });
    }
  }
});

// POST to login
router.post("/login", login, (req, res) => {
  const user = req.user;
  const token = generateToken(user);
  res.status(200).json({ message: `Welcome ${user.username}!`, token });
});

module.exports = router;
