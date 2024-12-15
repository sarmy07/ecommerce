import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api", credentials: "include" }),
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: "/review/total-reviews",
        method: "GET",
      }),
    }),
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: productId },
      ],
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: "/review/all-reviews",
        method: "GET",
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetReviewsQuery,
  usePostReviewMutation,
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
} = reviewApi;
