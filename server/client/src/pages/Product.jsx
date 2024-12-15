import React, { useState } from "react";
import { useGetProductsQuery } from "../redux/features/product/product.Api";
import CardComponent from "../components/card/CardComponent";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setSearchedProduct,
} from "../redux/features/filter/filterSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function Product() {
  const [showSearch, setShowSearch] = useState(false);
  const { data: products, error, isLoading } = useGetProductsQuery();

  const { searchedProduct, category } = useSelector(
    (state) => state.productFilter
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let productsData;

  const categories = [
    {
      value: "all",
      name: "Find Product By Category",
    },
    {
      value: "jewelery",
      name: "jewelery",
    },
    {
      value: "men's clothing",
      name: "men's clothing",
    },
    {
      value: "women's clothing",
      name: "women's clothing",
    },
    {
      value: "electronics",
      name: "electronics",
    },
  ];

  if (searchedProduct) {
    productsData = products?.filter((item) =>
      item.title.toLowerCase().includes(searchedProduct.toLowerCase())
    );
  } else if (category?.length > 0) {
    if (category.toLowerCase() === "all") {
      productsData = products;
    } else {
      productsData = products?.filter((item) =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
    }
  } else {
    productsData = products;
  }

  // console.log(products);
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col justify-between w-full gap-5 mb-5">
        <div className="w-full flex flex-col">
          <h2 className="font-semibold text-2xl md:text-3xl  text-gray-500">
            Shop By Collection
          </h2>
          <p className="text-gray-400">
            Each season, we collaborate with world class designers to create a
            collection inspired by natural world.
          </p>
        </div>

        <div className="flex flex-col w-full gap-4 justify-end">
          <div className="flex items-center gap-2">
            <div className="">
              {showSearch && (
                <input
                  type="text"
                  value={searchedProduct}
                  placeholder="Search product"
                  className="rounded-md focus:outline-none border w-full"
                  onChange={(e) => dispatch(setSearchedProduct(e.target.value))}
                />
              )}
            </div>

            <BiSearch
              className="size-8 cursor-pointer"
              onClick={(e) => setShowSearch(!showSearch)}
            />
          </div>

          <div className="mb-10">
            <select
              value={category}
              className="rounded-md"
              onChange={(e) => dispatch(setCategory(e.target.value))}
            >
              {categories?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl font-semibold capitalize text-gray-500">
        some of our products
      </h1>

      {isLoading && <Spinner aria-label="Default status example" />}
      {error && <p>Something went wrong...Try again later!</p>}

      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {productsData &&
          productsData.map((product) => (
            <CardComponent key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}
