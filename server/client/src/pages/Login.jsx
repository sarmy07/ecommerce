import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const res = await loginUser(data).unwrap();
      dispatch(setUser({ user: res }));
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-60 p-8 max-w-sm mx-auto flex flex-col border rounded-lg hover:shadow-md">
      <h1 className="text-3xl px-6 font-semibold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="py-3 px-5 rounded-lg border focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="py-3 px-5 rounded-lg border focus:outline-none"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          disabled={isLoading}
          className="bg-slate-300 p-3 rounded-lg uppercase font-semibold hover:opacity-90 disabled:opacity-85"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>

      <p className="mt-2 px-6">
        Don't have an account?{" "}
        <Link className="text-blue-500 italic" to="/register">
          Register
        </Link>{" "}
        here.
      </p>
    </div>
  );
}
