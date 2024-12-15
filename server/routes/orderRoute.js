const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  getOrdersByUser,
} = require("../controllers/orderController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.get("/get-all-orders", verifyToken, getAllOrders);
router.get("/user/:userId", getOrdersByUser);
router.get("/get-order/:id", getOrder);
router.put("/:id", verifyToken, verifyAdmin, updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
