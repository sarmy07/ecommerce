import React from "react";
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from "../../../redux/features/review/reviewApi";

export default function Reviews() {
  const { data: reviews, isLoading, error, refetch } = useGetAllReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation();
  console.log(reviews);

  const handleDelete = async (id) => {
    try {
      const res = await deleteReview(id).unwrap();
      alert("Review Deleted!");
      refetch();
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  return (
    <div className="">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Review
              </th>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Created
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Delete</span>
              </th>
            </tr>
          </thead>

          {reviews &&
            reviews.map((review) => (
              <tbody key={review._id}>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {review.review}
                  </th>
                  <td class="px-6 py-4">{review._id}</td>
                  <td class="px-6 py-4">
                    {" "}
                    {new Date(review?.createdAt).toLocaleDateString()}
                  </td>
                  <td class="px-6 py-4">
                    <button
                      onClick={() => handleDelete(review?._id)}
                      class="font-medium text-red-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}
