import React, { useEffect } from "react";
import { FaArrowLeft, FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProduct,
  clearCart,
  decreaseCart,
  getTotals,
  removeProduct,
} from "../redux/features/cart/cartSlice";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemove = (cartItem) => {
    dispatch(removeProduct(cartItem));
  };
  const handleIncrease = (cartItem) => {
    dispatch(addProduct(cartItem));
  };
  const handleDecrease = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="mt-28 p-10">
      <h3 className="font-semibold text-2xl text-center border-b-2">Cart Page</h3>
      {cart?.cartItems.length === 0 ? (
        <div className="flex flex-col mt-8">
          <h3 className="text-4xl font-semibold text-center mt-10 text-gray-400">
            Your Cart is Empty!
          </h3>
          
          <Link
            to={"/"}
            className="max-w-6xl mx-auto flex items-center gap-3 mt-6 font-semibold"
          >
            <span>
              <FaArrowLeft className="text-blue-500" />
            </span>
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="w-full mt-10">
          {cart?.cartItems?.map((cartItem) => (
            <div
              key={cartItem._id}
              className="flex flex-col md:flex-row gap-8 justify-between items-center border-b p-6 "
            >
              <div>
                <img src={cartItem.image} className="w-20" alt="" />
              </div>

              <div className="flex flex-col items-center">
                <h5>{cartItem?.title?.slice(0, 20)}</h5>
                <h6>$ {cartItem.price}</h6>
              </div>

              <div className="flex justify-between items-center gap-5">
                <button
                  onClick={() => handleIncrease(cartItem)}
                  className="border bg-slate-200 px-2 hover:shadow-md"
                >
                  +
                </button>
                <h6>{cartItem.cartQuantity}</h6>
                <button
                  onClick={() => handleDecrease(cartItem)}
                  className="border bg-slate-200 px-2 hover:shadow-md"
                >
                  -
                </button>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <h6>$ {cartItem.price * cartItem.cartQuantity}</h6>
                <button
                  onClick={() => handleRemove(cartItem)}
                  className="bg-red-500 text-white p-2 rounded-md hover:shadow-md"
                >
                  remove
                </button>
              </div>
            </div>
          ))}

          <hr />

          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-between">
            <div>
              <button
                onClick={() => handleClearCart()}
                className="bg-red-500 text-white items-center px-5 py-2 rounded-md"
              >
                Clear All
              </button>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center">
                <span>SubTotal:</span>
                <span>$ {cart.cartTotalAmount.toFixed()}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button className="bg-gray-400 text-white p-2 rounded-sm uppercase hover:shadow-md">
                <Link to={"/checkout"}>Check out</Link>
              </button>
              <div>
                <Link
                  to={"/"}
                  className="flex items-center gap-2 font-semibold"
                >
                  <FaLongArrowAltLeft className="text-blue-500" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
