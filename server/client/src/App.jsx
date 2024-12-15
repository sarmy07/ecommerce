import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Header from "./components/navbar/Header";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AddNewProduct from "./pages/admin/addNewProduct/AddNewProduct";
import ManageProducts from "./pages/admin/manageProducts/ManageProducts";
import Users from "./pages/admin/users/Users";
import ProductDetail from "./pages/product/ProductDetail";
import FooterComponent from "./components/footer/FooterComponent";
import Checkout from "./pages/Checkout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reviews from "./pages/admin/reviews/Reviews";
import Order from "./pages/admin/orders/Order";
import UpdateProduct from "./pages/admin/manageProducts/UpdateProduct";
import OrderDetails from "./pages/OrderDetails";
import MyOrders from "./pages/MyOrders";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <ScrollToTop />
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-my-orders/:id" element={<MyOrders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/get-order/:id" element={<OrderDetails />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/dashboard/add-new-product"
              element={<AddNewProduct />}
            />
            <Route
              path="/dashboard/manage-products"
              element={<ManageProducts />}
            />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/reviews" element={<Reviews />} />
            <Route path="/dashboard/orders" element={<Order />} />
            <Route
              path="/dashboard/update-product/:id"
              element={<UpdateProduct />}
            />
          </Route>
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}
