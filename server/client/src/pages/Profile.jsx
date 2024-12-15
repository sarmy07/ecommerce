import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../redux/features/auth/authApi";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, ...rest } = formData; // destructure password out of formData
    const dataTosend = password ? formData : rest; // if password is empty, send only name and email
    try {
      await updateUser({ id: user?._id, ...dataTosend }).unwrap();
      alert("User updated successfully");
      console.log("User updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Something went wrong.");
    }
  };

  // Populate form fields with fetched data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name,
        email: user?.email,
        password: "", // Leave password empty
      });
    }
  }, [user]);

  return (
    <div className="w-full mt-40">
      <div className="max-w-md mx-auto p-10 hover:shadow-md border rounded-lg">
        <h1 className="text-start text-4xl mb-5 font-bold uppercase">
          Profile
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            type="text"
            id="name"
            name="name"
            className="rounded focus:outline-none p-4 bg-slate-200 border-none"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            id="email"
            name="email"
            className="rounded focus:outline-none p-4 bg-slate-200 border-none"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            name="password"
            className="rounded focus:outline-none p-4 bg-slate-200 border-none"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <button className="bg-slate-600 text-white py-4 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase font-semibold">
            {isLoading ? "Updating..." : " Update profile"}
          </button>

          <span>
            Click here to see your{" "}
            <Link
              to={`/profile-my-orders/${user?._id}`}
              className="text-blue-600 font-semibold"
            >
              Orders
            </Link>
          </span>

          {isSuccess && (
            <p className="text-green-500">User updated successfully</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
