const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json("Unauthorized");
  jwt.verify(token, process.env.secret, (err, user) => {
    if (err) return res.status(403).json("Invalid Token");
    req.user = user;
    // console.log(req.user);
    next();
  });
};

module.exports = verifyToken;
