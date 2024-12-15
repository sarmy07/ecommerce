import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import filterReducer from "./features/filter/filterSlice";
import { authApi } from "./features/auth/authApi";
import { productApi } from "./features/product/product.Api";
import { reviewApi } from "./features/review/reviewApi";
import { orderApi } from "./features/order/orderApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    productFilter: filterReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      reviewApi.middleware,
      orderApi.middleware
    ),
});
