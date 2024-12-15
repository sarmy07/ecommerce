import React, { useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineRateReview } from "react-icons/md";
import {
  useGetAllUsersQuery,
  useGetUsersQuery,
} from "../../../redux/features/auth/authApi";
import { useGetProductsQuery } from "../../../redux/features/product/product.Api";
import {
  useGetAllReviewsQuery,
  useGetReviewsQuery,
} from "../../../redux/features/review/reviewApi";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { data: products, isLoading, error } = useGetProductsQuery();
  const { data: users } = useGetUsersQuery();
  const { data: reviews } = useGetReviewsQuery();
  // console.log(users)

  const { data: allUsers } = useGetAllUsersQuery();
  const { data: allReviews } = useGetAllReviewsQuery();
  // console.log(allUsers);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>An error occurred..try again!</p>;

  return (
    <>
      <div className="">
        <div className="mb-10 ">
          <h1>
            Hi, <span className="font-semibold">{user.name}! </span> <br />{" "}
            Welcome to your dashboard,
          </h1>
          <p>
            You are logged in as an{" "}
            <span className="text-red-500 italic capitalize">{user.role} </span>{" "}
            with the email{" "}
            <span className="text-red-500 italic">{user.email}</span> <br />{" "}
            Here you can manage products, orders, users and other administrative
            tasks.
          </p>
        </div>

        <hr />

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-5">
          <div className="border rounded-lg p-6 bg-blue-50">
            <div className="flex justify-between gap-8 items-center">
              <h3 className="font-semibold">Products</h3>
              <AiOutlineProduct className="text-blue-600" size={30} />
            </div>
            <span>{products?.length} Products</span>
          </div>

          <div className="border rounded-lg p-6  bg-green-50">
            <div className="flex justify-between gap-8 items-center">
              <h3 className="font-semibold">Users</h3>
              <PiUsersThree className="text-green-600" size={30} />
            </div>
            <p className="mt-2">{users} Users</p>
          </div>
          <div className="border rounded-lg p-6  bg-yellow-50">
            <div className="flex justify-between gap-8 items-center">
              <h3 className="font-semibold">Reviews</h3>
              <MdOutlineRateReview className="text-yellow-600" size={30} />
            </div>
            <p className="mt-2">{reviews} Reviews</p>
          </div>
        </div>

        {/*  */}

        <div className="mt-10 flex gap-4 justify-center  flex-col md:flex-row">
          {/* products */}
          <div className="overflow-x-auto">
            <h3 className="mb-5 px-3 font-semibold uppercase">Products</h3>

            <Table className="max-w-sm">
              <Table.Head>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
              </Table.Head>

              {products &&
                products?.slice(0, 5).map((product) => (
                  <Table.Body className="divide-y" key={product?._id}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {product?.title.slice(0, 20)}
                      </Table.Cell>
                      <Table.Cell>{product.category}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              <NavLink to={"/dashboard/manage-products"} className="pl-32 mt-4">
                Show More
              </NavLink>
            </Table>
          </div>

          {/* users */}
          <div className="overflow-x-auto">
            <h3 className="mb-5 px-3 font-semibold uppercase">Users</h3>

            <Table className="max-w-sm">
              <Table.Head>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
              </Table.Head>

              {allUsers &&
                allUsers?.map((user) => (
                  <Table.Body className="divide-y" key={user._id}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.email}
                      </Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              <NavLink to={"/dashboard/users"} className="pl-32 mt-4">
                Show More
              </NavLink>
            </Table>
          </div>

          {/* reviews */}
          <div className="overflow-x-auto">
            <h3 className="mb-5 px-3 font-semibold uppercase">Reviews</h3>

            <Table className="max-w-sm">
              <Table.Head>
                <Table.HeadCell>user Id</Table.HeadCell>
                <Table.HeadCell>Review</Table.HeadCell>
              </Table.Head>

              {allReviews &&
                allReviews?.slice(0, 3).map((review) => (
                  <Table.Body className="divide-y" key={review?._id}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {review.user}
                      </Table.Cell>
                      <Table.Cell>{review.review}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
