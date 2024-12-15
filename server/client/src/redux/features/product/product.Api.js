import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api", credentials: "include" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
        provideTags: ["Product"],
      }),
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/product/create",
        method: "POST",
        body: newProduct,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }], // invalidate only the specific product
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    getRelatedProducts: builder.query({
      query: (id) => ({
        url: `/product/related/${id}`,
        method: "GET",
      }),
    }),
    getTotalProducts: builder.query({
      query: () => ({
        url: "/product/total-products",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetRelatedProductsQuery,
  useGetTotalProductsQuery,
} = productApi;
