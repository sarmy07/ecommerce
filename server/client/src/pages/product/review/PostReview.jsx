import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { usePostReviewMutation } from "../../../redux/features/review/reviewApi";
import { useGetProductQuery } from "../../../redux/features/product/product.Api";

export default function PostReview() {
  const { id } = useParams();
  const [review, setReview] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [postReview] = usePostReviewMutation();
  const { refetch } = useGetProductQuery(id, { skip: !id });

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to post a review");
      navigate("/login");
      return;
    }
    const newReview = {
      review: review,
      user: user._id,
      productId: id,
    };
    try {
      const res = await postReview(newReview).unwrap();
      console.log(res);
      alert("Review posted!");
      setReview("");
      refetch();
    } catch (error) {
      console.log(error);
      alert("An error occurred while posting review..");
    }
  };
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">Leave a Review</h3>
      <form onSubmit={handlePostReview}>
        <textarea
          name="text"
          placeholder="Leave a review about this product..."
          cols="30"
          rows="10"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full focus:outline-none p-5 rounded-md"
        />
        <button className="w-full mt-2 text-white bg-black font-medium py-3 rounded-md hover:bg-indigo-500 uppercase">
          submit
        </button>
      </form>
    </div>
  );
}
