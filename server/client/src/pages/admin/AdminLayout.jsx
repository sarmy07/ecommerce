import React from "react";
import AdminNavigation from "./AdminNavigation";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminLayout() {
  const { user } = useSelector((state) => state.auth);
  if (!user || user.role !== "admin") return <Navigate to="/login" />;

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-start items-start mt-32">
      <header className="w-full lg:w-1/5 sm:w-2/5">
        <AdminNavigation />
      </header>
      <main className="bg-slate-50 w-full p-8">
        <Outlet />
      </main>
    </div>
  );
}
