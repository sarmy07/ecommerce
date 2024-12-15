import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import { useNavigate } from "react-router-dom";

const CheckoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select cart data from Redux
  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log("Cart Items: ", cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const cartTotalQuantity = useSelector(
    (state) => state.cart.cartTotalQuantity
  );

  // Shipping address state
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();

  // Calculate totals on load
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  // Submit order
  const handleSubmit = async () => {
    const orderData = {
      orderItems: cartItems,
      shippingAddress,
      totalPrice: cartTotalAmount,
    };

    try {
      await createOrder(orderData).unwrap();
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Error placing the order.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mt-32">
      <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Order Summary</h3>
        {cartItems.length > 0 ? (
          <ul className="bg-white p-4 rounded shadow">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>
                  {item.title} (x{item.cartQuantity})
                </span>
                <span>${item.price * item.cartQuantity}</span>
              </li>
            ))}
            <li className="font-bold flex justify-between pt-2">
              <span>Total Items:</span>
              <span>{cartTotalQuantity}</span>
            </li>
            <li className="font-bold flex justify-between pt-2">
              <span>Total Price:</span>
              <span>${cartTotalAmount.toFixed()}</span>
            </li>
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Shipping Address</h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                address: e.target.value,
              })
            }
            className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="City"
            value={shippingAddress.city}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
            className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="State"
            value={shippingAddress.state}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                state: e.target.value,
              })
            }
            className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                country: e.target.value,
              })
            }
            className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {/* <input
            value={user?.email}
            className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          /> */}
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        {isLoading ? "Submitting..." : "Place Order"}
      </button>

      {/* Success/Error Messages */}
      {isSuccess && (
        <p className="text-green-600 mt-4">Order placed successfully!</p>
      )}
      {isError && <p className="text-red-600 mt-4">Failed to place order.</p>}
    </div>
  );
};

export default CheckoutComponent;
