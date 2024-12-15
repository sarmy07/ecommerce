import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { name, email, password };
      const res = await registerUser(data).unwrap();
      dispatch(setUser({ user: res }));
      console.log(res);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-60 p-8 flex flex-col max-w-sm mx-auto border rounded-lg hover:shadow-md">
      <h1 className="text-3xl px-6 font-semibold">Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="p-3 rounded-lg border focus:outline-none"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 rounded-lg border focus:outline-none"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg border focus:outline-none"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          disabled={isLoading}
          className="bg-slate-300 p-3 rounded-lg uppercase font-semibold hover:opacity-90 disabled:opacity-85"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>

      <p className="mt-2 px-6">
        Already have an account?{" "}
        <Link className="text-blue-500 italic" to="/login">
          Login
        </Link>{" "}
        here.
      </p>
    </div>
  );
}
