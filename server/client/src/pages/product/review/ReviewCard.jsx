import React from "react";
import { useSelector } from "react-redux";
import PostReview from "./PostReview";
import { FaRegCircleUser } from "react-icons/fa6";

export default function ReviewCard({ reviews }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="mx-auto max-w-6xl mt-5 p-6 my-6">
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Reviews</h3>
            <div>
              {reviews.map((review) => (
                <div className="mt-4 border rounded-lg p-3" key={review.id}>
                  <div className="flex gap-4 items-center ">
                    <FaRegCircleUser size="24" />
                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg font-medium underline underline-offset-2 text-gray-500">
                        {review?.user?.email}
                      </h4>
                      <p className="text-xs italic">
                        {new Date(review?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {/* review.detail */}
                  <div className="text-black-600 mt-2 p-8">
                    <p>{review?.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-lg ">No Reviews..</p>
        )}
      </div>
      <div>
        <PostReview />
      </div>
    </div>
  );
}
