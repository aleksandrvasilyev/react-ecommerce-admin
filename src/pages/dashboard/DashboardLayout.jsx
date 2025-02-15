// import React from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaUsers,
  FaBuffer,
  FaRegListAlt,
} from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) => {
    const baseClasses =
      "block text-gray-700 hover:bg-gray-200 rounded-md py-2 px-4 active:bg-gray-300";
    const activeClasses = "bg-gray-200";

    return `${baseClasses} ${isActive ? activeClasses : ""}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white p-4 flex justify-between items-center   border-b-2">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">{user.email}</span>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            Settings
          </button>
          <button
            onClick={() => logout()}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white p-4 hidden md:block border-r-2">
          <nav className="space-y-2">
            <NavLink className={navLinkClass} to={`/dashboard`} end>
              <span className="flex items-center space-x-2">
                <FaHome />
                <span>Dashboard</span>
              </span>
            </NavLink>
            <NavLink to={`/dashboard/orders`} className={navLinkClass}>
              <span className="flex items-center space-x-2">
                <FaShoppingCart />
                <span>Orders</span>
              </span>
            </NavLink>
            <NavLink to={`/dashboard/customers`} className={navLinkClass}>
              <span className="flex items-center space-x-2">
                <FaUsers />
                <span>Customers</span>
              </span>
            </NavLink>
            <NavLink to={`/dashboard/pages`} className={navLinkClass}>
              <span className="flex items-center space-x-2">
                <FaBuffer />
                <span>Pages</span>
              </span>
            </NavLink>
            <NavLink to={`/dashboard/categories`} className={navLinkClass}>
              <span className="flex items-center space-x-2">
                <FaRegListAlt />
                <span>Categories</span>
              </span>
            </NavLink>
            <NavLink to={`/dashboard/products`} className={navLinkClass}>
              <span className="flex items-center space-x-2">
                <AiFillProduct />
                <span>Products</span>
              </span>
            </NavLink>
            <NavLink to={`/dashboard/attributes`} className={navLinkClass}>
              <span className="flex items-center space-x-2">
                <RiCheckboxMultipleFill />
                <span>Attributes</span>
              </span>
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
