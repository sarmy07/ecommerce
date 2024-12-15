import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../redux/features/product/product.Api";
import { Link } from "react-router-dom";

export default function ManageProducts() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const initialVisibleCount = 10;
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  // Function to show all products
  const handleShowMore = () => {
    setVisibleCount(products?.length);
  };
  // console.log(products);

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id).unwrap();
      alert("Product deleted successfully");
      refetch();
    } catch (error) {
      console.error(" Error deleting product:", error);
    }
  };

  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product title
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="">Edit</span>
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="">Delete</span>
              </th>
            </tr>
          </thead>

          {products &&
            products.slice(0, visibleCount).map((product) => (
              <tbody key={product._id}>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.title}
                  </th>
                  <td class="px-6 py-4">{product.category}</td>
                  <td class="px-6 py-4">$ {product.price}</td>
                  <td class="px-6 py-4 text-right">
                    <Link
                      to={`/dashboard/update-product/${product?._id}`}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(product?._id)}
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
      {/* Show More Button */}
      {visibleCount < products?.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
