const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  relatedProduct,
  totalProducts,
} = require("../controllers/productController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.get("/", getProducts);
router.post("/create", verifyToken, verifyAdmin, createProduct);
router.get("/:id", getProduct);
router.put("/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);
router.get("/related/:id", relatedProduct);
router.get("/total-products", totalProducts);

module.exports = router;
