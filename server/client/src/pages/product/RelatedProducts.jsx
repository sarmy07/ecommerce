import React from "react";
import { useGetRelatedProductsQuery } from "../../redux/features/product/product.Api";
import { Link, useParams } from "react-router-dom";

// import { Carousel } from "flowbite-react";
import CardComponent from "../../components/card/CardComponent";

export default function RelatedProducts() {
  const { id } = useParams();
  const { data: products } = useGetRelatedProductsQuery(id);
  const randomProducts = products?.map((product) => ({
    ...product,
    uniqueId: Math.random().toString(36).substring(2, 9),
  }));

  //   console.log(products);
  // console.log(randomProducts);

  return (
    <div className="p-4 flex flex-col items-center">
      <h3 className="text-3xl font-semibold text-gray-400 text-center">
        Related Products
      </h3>
      {/* <hr /> */}

      <div className="">
        {randomProducts?.length > 0 ? (
          <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {randomProducts?.slice(0, 4)?.map((product) => (
              <CardComponent product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div>No Related product found</div>
        )}
      </div>
    </div>
  );
}
