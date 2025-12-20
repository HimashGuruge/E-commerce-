// DashboardRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProducts from "../addProducts";
import AdminAllProductView from "@/components/pages/admin/AdminAllProductView";
import EditProducts from "@/components/pages/admin/EditProducts";
import Notification from "@/components/pages/admin/Notification";
import StatCard from "@/components/pages/admin/Dashboard/StatCard";
import { FiPackage, FiUsers, FiDollarSign } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";

export default function DashboardRoutes({ stats }) {
  return (
    <Routes>
      <Route
        index
        element={
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-6">📊</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
            <p className="text-gray-600 max-w-2xl mb-8">
              Select a section from the sidebar to manage products, view notifications, or access other admin features.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
              <StatCard icon={<FiPackage size={24} />} title="Total Products" value={stats.totalProducts} color="text-green-600" />
              <StatCard icon={<MdShoppingCart size={24} />} title="Total Orders" value={stats.totalOrders} color="text-indigo-600" />
              <StatCard icon={<FiDollarSign size={24} />} title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} color="text-amber-600" />
              <StatCard icon={<FiUsers size={24} />} title="New Users" value={stats.newUsers} color="text-teal-600" />
            </div>
          </div>
        }
      />
      <Route path="adminviewproducts" element={<AdminAllProductView />} />
      <Route path="addproducts" element={<AddProducts />} />
      <Route path="editproducts/:id" element={<EditProducts />} />
      <Route path="notification" element={<Notification />} />
    </Routes>
  );
}
