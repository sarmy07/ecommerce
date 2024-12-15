const express = require("express");
const {
  getTotalReviews,
  postReviews,
  getAllReviews,
  deleteReview,
} = require("../controllers/reviewController");
const router = express.Router();

router.get("/total-reviews", getTotalReviews);
router.get("/all-reviews", getAllReviews);
router.post("/post-review", postReviews);
router.delete('/:id', deleteReview)

module.exports = router;
