const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).send("You are not an admin");
  next();
};

module.exports = verifyAdmin;
