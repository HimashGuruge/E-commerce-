import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineGridView, MdAddBox, MdEdit, MdNotifications } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // correct import
import AddProducts from "./addProducts";
import AdminAllProductView from "./AdminAllProductView";
import EditProducts from "./EditProducts";
import Notification from "./notification";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Auth check
  const authcheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch {
      setUser(null);
    }
  };

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    window.dispatchEvent(new Event("authChange"));
  };

  useEffect(() => {
    authcheck();
    window.addEventListener("authChange", authcheck);
    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="bg-blue-600 lg:hidden p-4 flex justify-between items-center w-full fixed top-0 left-0 z-50 shadow-md">
        <h1 className="text-white text-lg font-semibold">Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <RxHamburgerMenu size={28} className="text-white" />
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-screen w-64 bg-white text-gray-700 shadow-lg border-r border-gray-200 transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="py-6 flex justify-center border-b border-gray-200">
          <Link
            to="/admin/dashboard"
            className="text-2xl font-bold text-blue-600 tracking-wide"
          >
            Dashboard
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 px-4 mt-6">
          <Link
            to="/admin/dashboard/adminviewproducts"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <MdOutlineGridView className="text-xl" /> View Products
          </Link>

          <Link
            to="/admin/dashboard/addproducts"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <MdAddBox className="text-xl" /> Add Product
          </Link>

          <Link
            to="/admin/dashboard/editproducts"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <MdEdit className="text-xl" /> Edit Product
          </Link>

          <Link
            to="/admin/dashboard/notification"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <MdNotifications className="text-xl" /> Notification
          </Link>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-100 p-10">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Welcome to Admin Dashboard
        </h1>

        <div className="bg-white rounded-xl shadow-md p-4 min-h-[calc(100vh-150px)]">
          <Routes>
            <Route path="adminviewproducts" element={<AdminAllProductView />} />
            <Route path="addproducts" element={<AddProducts />} />
            <Route path="editproducts" element={<EditProducts />} />
            <Route path="notification" element={<Notification />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
