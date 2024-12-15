import React, { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../redux/features/order/orderApi";
import { Link } from "react-router-dom";
import UpdateOrderStatus from "./UpdateOrderStatus";

export default function Users() {
  const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(orders);
  console.log(orders);

  const handleDelete = async (id) => {
    try {
      const res = await deleteOrder(id).unwrap();
      console.log(res);
      alert("Order deleted!");
      refetch();
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const statusColors = {
    pending: "text-yellow-500 text-yellow-900",
    shipped: "text-blue-500 text-blue-900",
    delivered: "text-green-500 text-green-900",
    cancelled: "text-red-500 text-red-900",
  };

  return (
    <div className="">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Order id
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Created
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Address
              </th>
              <th scope="col" class="px-6 py-3">
                City
              </th>
              <th scope="col" class="px-6 py-3">
                State
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="">Edit</span>
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="">Delete</span>
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
                  <td class="px-6 py-4">{order.shippingAddress.address}</td>
                  <td class="px-6 py-4">{order.shippingAddress.city}</td>
                  <td class="px-6 py-4">{order.shippingAddress.state}</td>
                  {/* <td class="px-6 py-4">{order.orderItems}</td> */}
                  <td class="px-6 py-4 text-right">
                    <Link
                      onClick={() => handleEdit(order)}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(order?._id)}
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

      {isModalOpen && setSelectedOrder && (
        <UpdateOrderStatus
          order={selectedOrder}
          onStatusUpdate={refetch}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
