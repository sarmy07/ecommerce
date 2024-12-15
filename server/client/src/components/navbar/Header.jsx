import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RiAdminLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { user } = useSelector((state) => state.auth);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shadow-md bg-slate-100 w-full top-0 left-0 fixed">
      <div className="flex justify-between max-w-6xl mx-auto items-center p-6 relative">
        <h1 className="text-3xl font-bold">
          <NavLink to="/">
            E-<span className="text-blue-600">commerce</span>
          </NavLink>
        </h1>

        <ul className="hidden md:flex space-x-6">
          <NavLink to={"/"}>
            <li>Home</li>
          </NavLink>

          {user && user.role === "user" ? (
            <li className="space-x-5 flex">
              <NavLink to={"/profile"}>Profile</NavLink>

              <NavLink to={"/cart"} className="relative">
                <FaCartShopping size="16" />
                <span className="">
                  <h6 className="text-orange-600 rounded-full absolute bottom-5 left-4">
                    {cartTotalQuantity}
                  </h6>
                </span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white py-0.5 px-2"
              >
                Logout
              </button>
            </li>
          ) : null}

          {user && user.role === "admin" && (
            <li className="flex space-x-4">
              <NavLink
                to={"/dashboard"}
                className="bg-blue-500 text-white px-2 py-0.5"
              >
                Dashboard
              </NavLink>
              <RiAdminLine size="16" />
            </li>
          )}

          {!user && (
            <li className="flex space-x-5">
              <NavLink to={"/login"}>
                <li>Login</li>
              </NavLink>
              <NavLink to={"/register"}>
                <li>Register</li>
              </NavLink>
            </li>
          )}
        </ul>

        <div onClick={toggleMenu} className="text-2xl cursor-pointer md:hidden">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`md:hidden shadow-md absolute z-50 bg-gray-50 top-16 font-normal space-y-2 flex flex-col items-center left-0 w-full duration-700 ease-in-out transition-all transform ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          }`}
        >
          <NavLink to={"/"} onClick={toggleMenu}>
            <li>Home</li>
          </NavLink>

          {user && user.role === "admin" && (
            <li
              className="flex flex-col gap-2 py-1 items-center"
              onClick={toggleMenu}
            >
              <NavLink
                to={"/dashboard"}
                onClick={toggleMenu}
                className="bg-blue-500 text-white px-2 py-0.5"
              >
                Dashboard
              </NavLink>
              <RiAdminLine size="16" onClick={toggleMenu} />
            </li>
          )}

          {user && user.role === "user" ? (
            <li
              className="flex flex-col space-y-4 gap-2 items-center py-4"
              onClick={toggleMenu}
            >
              <NavLink to={"/profile"} onClick={toggleMenu}>
                Profile
              </NavLink>

              <NavLink to={"/cart"} className="relative" onClick={toggleMenu}>
                <FaCartShopping size="16" />
                <span>
                  <h6 className="text-orange-600 rounded-full absolute bottom-5 left-4">
                    {cartTotalQuantity}
                  </h6>
                </span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white py-0.5 px-2"
              >
                Logout
              </button>
            </li>
          ) : null}

          {!user && (
            <li className="flex flex-col gap py-3  items-center space-y-4">
              <NavLink to={"/login"} onClick={toggleMenu}>
                <li>Login</li>
              </NavLink>
              <NavLink to={"/register"} onClick={toggleMenu}>
                <li>Register</li>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
