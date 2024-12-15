import React from "react";
import { useGetOrdersByUserQuery } from "../redux/features/order/orderApi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbCalendarSad } from "react-icons/tb";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function MyOrders() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { data: orders, isLoading, error } = useGetOrdersByUserQuery(user?._id);

  if (!user) return <p>Please login to view your orders</p>;
  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>Error fetching orders: {error.message}</p>;

  const statusColors = {
    pending: "text-yellow-500 text-yellow-900",
    shipped: "text-blue-500 text-blue-900",
    delivered: "text-green-500 text-green-900",
    cancelled: "text-red-500 text-red-900",
  };

  console.log(orders);
  return (
    <div className="mt-24">
      {orders.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="mt-24 max-w-6xl mx-auto font-semibold text-center text-4xl">
            You currently have no orders
          </p>
          <TbCalendarSad className="size-72 text-orange-400" />
          <div className="">
            <Link to={"/"} className="flex items-center gap-2">
              <FaLongArrowAltLeft className="size-6 text-blue-600" />
              start shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-center text-4xl font-semibold mt-5">
            Your Orders
          </h2>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 max-w-6xl mx-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Order id
                  </th>
                  <th scope="col" class="px-6 py-3">
                    price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    created at
                  </th>
                  <th scope="col" class="px-6 py-3">
                    status
                  </th>
                </tr>
              </thead>

              {orders &&
                orders.map((order) => (
                  <tbody key={order?._id}>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Link to={`/order/get-order/${order?._id}`}>
                          {order._id}
                        </Link>
                      </th>
                      <td class="px-6 py-4">$ {order.totalPrice.toFixed(2)}</td>
                      <td class="px-6 py-4">
                        {new Date(order?.createdAt).toLocaleDateString()}
                      </td>
                      <td
                        className={`font-bold px-6 py-4 ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status}
                      </td>
                      {/* <td class="px-6 py-4">{order.orderItems}</td> */}
                      {/* <td class="px-6 py-4 text-right">
                    <Link
                      onClick={() => handleEdit(order)}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td> */}
                      {/* <td class="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(order?._id)}
                      class="font-medium text-red-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td> */}
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </>
      )}
    </div>
  );
}
