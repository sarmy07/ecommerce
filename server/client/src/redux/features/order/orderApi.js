import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api", credentials: "include" }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/create-order",
        method: "POST",
        body: orderData,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/order/get-all-orders",
        method: "GET",
      }),
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `/order/get-order/${id}`,
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body: { status },
      }),
      refetchOnMount: true,
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
    }),
    getOrdersByUser: builder.query({
      query: (userId) => `/order/user/${userId}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
  useGetOrdersByUserQuery,
} = orderApi;
