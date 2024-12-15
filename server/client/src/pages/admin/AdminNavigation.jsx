import React from "react";
import { NavLink } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

export default function AdminNavigation() {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-5 bg-slate-50 p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between">
      <div>
        <div className="mb-5">
          <RiAdminLine size="24" />
          <p>Admin</p>
        </div>
        <hr />

        <ul className="space-y-5 pt-5">
          <li>
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
              end
            >
              Dashboard
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
              end
            >
              Profile
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to={"/dashboard/add-new-product"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Add new product
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/manage-products"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Manage products
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/users"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/reviews"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/orders"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
      {/*  */}
      <div>
        <hr />
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-medium mt-5 px-5 py-1 rounded-sm hover:shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
