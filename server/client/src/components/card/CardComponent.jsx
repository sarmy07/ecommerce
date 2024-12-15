import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../redux/features/cart/cartSlice";

export default function CardComponent({ product }) {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(addProduct(product));
  };
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover p-4"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.title.slice(0, 20)}
        </h3>
        <p className="text-sm  text-gray-500 mb-2">{product.category}</p>
        <p className="text-gray-600 mb-4">
          {product.description.slice(0, 20)}...
        </p>

        <div className="flex justify-between items-center">
          <span>${product.price}</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <span>{product.rating.rate}</span>
            <span>{product.rating.count}</span>
          </div>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
