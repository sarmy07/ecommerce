import React from "react";
import { useGetProductQuery } from "../../redux/features/product/product.Api";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import RelatedProducts from "./RelatedProducts";
import ReviewCard from "./review/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/features/cart/cartSlice";

export default function productDetail() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(addProduct(product));
  };

  {
    isLoading && <div>Loading...</div>;
  }
  {
    error && <div>Error loading page!</div>;
  }
  // console.log(product);
  return (
    <div className="flex flex-col justify-between w-full mx-auto max-w-6xl mt-24">
      {product && (
        <>
          <Breadcrumb
            aria-label="Default breadcrumb example"
            className="p-8 mt-5"
          >
            <Breadcrumb.Item icon={HiHome}>
              <Link to={"/"}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">{product?.title}</Breadcrumb.Item>
          </Breadcrumb>

          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-start gap-6 items-center mt-8 w-full p-8">
              <div className="">
                <img
                  src={product?.image}
                  className="w-full max-w-md lg:max-w-lg rounded-lg"
                  alt=""
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-3xl">
                  {product?.title.slice(0, 20)}
                </h4>
                <h6 className="text-gray-700">{product?.category}</h6>
                <p className="text-gray-500">
                  {product?.description.slice(0, 80)}
                </p>
                <h5 className="">Price: ${product?.price}</h5>

                <div className="">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white py-4 w-full rounded-md hover:opacity-95 mt-5 capitalize"
                  >
                    Add to cart
                  </button>
                </div>
              </div>

              {/*  */}
            </div>
            <ReviewCard reviews={product?.reviews} />
          </div>

          <div className="mt-10">
            <RelatedProducts />
          </div>
        </>
      )}
    </div>
  );
}
