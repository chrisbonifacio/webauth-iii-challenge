function restricted(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    res
      .status(400)
      .json({ message: "Please send token in header to recieve users" });
  } else {
    next();
  }
}

module.exports = restricted;
