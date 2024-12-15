import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateProductMutation } from "../../../redux/features/product/product.Api";

export default function AddNewProduct() {
  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rate" || name === "count") {
      setFormData({
        ...formData,
        rating: { ...formData.rating, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // convert rate and count to numbers before submission
      const preparedData = {
        ...formData,
        price: parseFloat(formData.price),
        rating: {
          rate: parseFloat(formData.rating.rate),
          count: parseFloat(formData.rating.count),
        },
      };

      await createProduct(preparedData).unwrap();
      alert("Product added successfully");
    } catch (error) {
      console.error("failed to add product", error);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Add New Product</h1>

      {isLoading && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col md:flex-row justify-start mt-10 md:mt-5 items-center md:p-10 gap-8">
          <div className="w-full md:w-2/3 ">
            <textarea
              name="description"
              // type="text"
              onChange={handleChange}
              value={formData.description}
              placeholder="Write a short description about the product..."
              className="w-full p-3 focus:outline-none rounded"
              rows={20}
              cols={20}
            />
          </div>
          <div className="flex flex-col gap-8 w-full md:w-1/3">
            <input
              type="text"
              name="title"
              className="rounded focus:outline-none w-full"
              onChange={handleChange}
              value={formData.title}
              placeholder="Title"
            />
            <input
              type="number"
              name="price"
              className="rounded focus:outline-none w-full"
              onChange={handleChange}
              value={formData.price}
              placeholder="Price"
            />
            <input
              type="text"
              name="category"
              className="rounded focus:outline-none"
              onChange={handleChange}
              value={formData.category}
              placeholder="Category"
            />
            <input
              type="text"
              name="image"
              className="rounded focus:outline-none"
              onChange={handleChange}
              value={formData.image}
              placeholder="Image URL"
            />
            <input
              type="number"
              name="rate"
              className="rounded focus:outline-none"
              onChange={handleChange}
              value={formData.rating.rate}
              placeholder="Rate"
            />
            <input
              type="number"
              name="count"
              className="rounded focus:outline-none"
              onChange={handleChange}
              value={formData.rating.count}
              placeholder="Count"
            />
            <input type="text" value={user?._id} disabled />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white hover:bg-slate-800 py-3 font-semibold uppercase mt-5"
        >
          {isLoading ? "Adding product..." : "Add Product"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
