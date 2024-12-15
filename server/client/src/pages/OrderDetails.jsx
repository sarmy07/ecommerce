import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../redux/features/order/orderApi";

export default function OrderDetails() {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderQuery(id);
  console.log(order);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;
  return (
    <div className="mt-28">
      {order && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Order Details</h1>

          {/* Order Overview */}
          <div className="mb-6">
            <p className="text-gray-700">
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Customer:</span> {order.user.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Amount:</span> $
              {order.totalPrice.toFixed(2)}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  order.status === "delivered"
                    ? "text-green-600"
                    : order.status === "pending"
                    ? "text-yellow-600"
                    : order.status === "shipped"
                    ? "text-blue-500"
                    : order.status === "cancelled"
                    ? "text-red-500"
                    : "text-black"
                } font-medium`}
              >
                {order.status}
              </span>
            </p>
          </div>

          {/* Order Items */}
          <h2 className="text-xl font-semibold mb-2">Order Items</h2>
          <ul className="divide-y divide-gray-200">
            {order?.orderItems.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <div>
                  <p className="text-gray-800 font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.cartQuantity}
                  </p>
                </div>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
