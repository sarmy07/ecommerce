import React, { useState } from "react";
import { useUpdateOrderStatusMutation } from "../../../redux/features/order/orderApi";
import { BsExclamationCircle } from "react-icons/bs";

export default function UpdateOrderStatus({ order, onClose, onStatusUpdate }) {
  const [status, setStatus] = useState(order?.status);
  const [updateOrderStatus, { isLoading, error }] =
    useUpdateOrderStatusMutation();
  console.log(status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await updateOrderStatus({
        id: order?._id,
        status,
      }).unwrap();
      onStatusUpdate();
      onClose();
      alert("Status updated!");
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <BsExclamationCircle className="mx-auto size-12 mb-5" />
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Are you sure you want to update order status?
          </h2>
        </div>
        <select
          className="block w-full p-2 border border-gray-300 rounded-md mb-4"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div className="flex justify-between mt-5">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Update Status
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
