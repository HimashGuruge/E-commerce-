// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard, RxExit } from "react-icons/rx";
import {
  MdOutlineGridView,
  MdAddBox,
  MdNotifications,
  MdShoppingCart,
  MdBarChart,
  MdSettings,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";

export default function Sidebar({
  user,
  unreadCount,
  stats,
  handleLogout,
  closeMobile,
}) {
  return (
    <div className="fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 shadow-xl z-40 transition-transform duration-300">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Link to="/admin/dashboard" className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mr-3">
            <RxDashboard className="text-white text-xl" />
          </div>
          <span className="text-2xl font-bold text-gray-800">AdminPanel</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div>
            <div className="font-semibold text-gray-800">
              {user?.name || "Admin User"}
            </div>
            <div className="text-sm text-gray-500">
              {user?.email || "admin@example.com"}
            </div>
            <div className="text-xs mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full inline-block">
              Administrator
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Navigation
        </div>
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <RxDashboard size={20} className="text-blue-600" />
          Overview
        </Link>
        <Link
          to="/admin/dashboard/adminviewproducts"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdOutlineGridView size={20} className="text-green-600" />
          View Products
        </Link>
        <Link
          to="/admin/dashboard/addproducts"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdAddBox size={20} className="text-purple-600" />
          Add Product
        </Link>
        <Link
          to="/admin/dashboard/notification"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdNotifications size={20} className="text-red-600 relative" />
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </Link>
        <Link
          to="/admin/dashboard/orders"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdShoppingCart size={20} className="text-indigo-600" />
          Orders ({stats.totalOrders})
        </Link>
        <Link
          to="/admin/dashboard/users"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <FiUsers size={20} className="text-teal-600" />
          Users
        </Link>
        <Link
          to="/admin/dashboard/analytics"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdBarChart size={20} className="text-amber-600" />
          Analytics
        </Link>
        <Link
          to="/admin/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdSettings size={20} className="text-gray-600" />
          Settings
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium bg-red-50 text-red-600 hover:bg-red-100"
        >
          <RxExit size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
