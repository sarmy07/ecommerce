import React from "react";
import Product from "../../pages/Product";

export default function Hero() {
  return (
    <div className="flex flex-col gap-6 p-20 px-5 max-w-6xl mx-auto mt-20">
      <h1 className="text-4xl text-blue-600 font-bold lg:text-6xl">
        Welcome to MernCommerce
      </h1>
      <p className="text-xs sm:text-sm gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste autem a
        error, dolorem, facilis placeat quam quia officia sapiente illum iusto
        consectetur excepturi nisi quaerat adipisci sed voluptate ullam quod?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat itaque
        exercitationem quos facilis. Rerum laborum culpa mollitia impedit nulla
        qui ea consequatur, possimus quod iste earum dolor! Et, non rerum?
      </p>
      <span className="text-xs sm:text-sm font-bold text-blue-800 hover:underline underline-offset-2">
        Shop with us
      </span>

      {/* products */}
      <Product />
    </div>
  );
}
