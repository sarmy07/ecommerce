const express = require("express");
const {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUsers,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.get('/all-users', getUsers);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
