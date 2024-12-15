const Review = require("../models/Review");

const getTotalReviews = async (req, res) => {
  const totalReviews = await Review.countDocuments({});
  return res.status(200).json(totalReviews);
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find();
  return res.status(200).json(reviews);
};

const postReviews = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    return res.status(200).json(review);
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (req, res) => {
  const reviewId  = req.params.id;
  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) return res.status(404).json("review not found!");
    return res.status(200).json("review deleted!");
  } catch (error) {
    console.log(error);
    console.error("failed to delete review", error);
  }
};

module.exports = { getTotalReviews, postReviews, getAllReviews, deleteReview };
