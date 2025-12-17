import React, { useEffect, useState, useCallback } from "react";
import { RxHamburgerMenu, RxDashboard, RxExit } from "react-icons/rx";
import {
  MdOutlineGridView,
  MdAddBox,
  MdNotifications,
  MdShoppingCart,
  MdBarChart,
  MdSettings,
} from "react-icons/md";
import { FiUsers, FiPackage, FiDollarSign } from "react-icons/fi";
import { Link, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import AddProducts from "./addProducts";
import AdminAllProductView from "./AdminAllProductView";
import EditProducts from "./EditProducts";
import Notification from "./notification";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Stats for dashboard (Keeping this here for context, though not used in the fix)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    newUsers: 0,
  });

  // Auth check using useCallback for useEffect
  const authcheck = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      navigate("/login");
      setLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Only administrators can access this dashboard",
          confirmButtonColor: "#d33",
        }).then(() => {
          navigate("/");
        });
        setLoading(false);
        return;
      }
      setUser(decoded);
      setLoading(false);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
      setLoading(false);
    }
  }, [navigate]);

  // Fetch dashboard stats (Keeping this here for context, though not used in the fix)
  const fetchStats = async () => {
    if (user?.role !== "admin") return;
    try {
      // Replace with real API calls
      setStats({
        totalProducts: 128,
        totalOrders: 45,
        totalRevenue: 12500,
        newUsers: 12,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

const fetchNotifications = useCallback(async () => {
  if (!user || user.role !== "admin") return;

  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await axios.get("http://localhost:4000/api/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Use `isRead` field from your AdminMessage model
    const adminNotifications = res.data.adminMessages || [];
    const totalUnread = adminNotifications.filter((n) => !n.isRead).length;

    setUnreadCount(totalUnread);
  } catch (err) {
    console.error("Error fetching notifications:", err);
  }
}, [user]);

  useEffect(() => {
    authcheck();
    window.addEventListener("authChange", authcheck);

    return () => {
      window.removeEventListener("authChange", authcheck);
    };
  }, [authcheck]);

  // Effect to fetch stats and notifications once user is authenticated
  useEffect(() => {
    if (user && user.role === "admin") {
      fetchStats();
      fetchNotifications();

      const interval = setInterval(fetchNotifications, 10000); // refresh every 10s

      return () => {
        clearInterval(interval);
      };
    }
  }, [user, fetchNotifications]); // user and fetchNotifications dependencies

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        // Dispatch event to trigger re-run of authcheck on other mounted components if necessary
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  // The Navigate component is correct for unauthenticated users
  if (!user || user.role !== "admin") {
    // Already navigated in authcheck, but this is a final fallback
    return <Navigate to="/login" />;
  }

  // The rest of your component rendering remains the same...
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-teal-500 p-4 flex justify-between items-center z-50 shadow-lg">
        <div className="flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mr-4 text-white"
          >
            <RxHamburgerMenu size={28} />
          </button>
          <h1 className="text-white text-xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm text-blue-100">Welcome</div>
            <div className="text-white font-semibold">
              {user?.name || "Admin"}
            </div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">
              {user?.name?.charAt(0) || "A"}
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 shadow-xl z-40 transition-transform duration-300
          ${
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
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
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
              Navigation
            </div>

            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-blue-600">
                <RxDashboard size={20} />
              </div>
              <span>Overview</span>
            </Link>

            <Link
              to="/admin/dashboard/adminviewproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-green-600">
                <MdOutlineGridView size={20} />
              </div>
              <span>View Products</span>
            </Link>

            <Link
              to="/admin/dashboard/addproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-purple-600">
                <MdAddBox size={20} />
              </div>
              <span>Add Product</span>
            </Link>

            <Link
  to="/admin/dashboard/notification"
  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
  onClick={() => {
    setMobileOpen(false);
    setUnreadCount(0); // reset unread badge on click
  }}
>
  <div className="text-red-600 relative">
    <MdNotifications size={20} />
    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
        {unreadCount > 9 ? "9+" : unreadCount}
      </span>
    )}
  </div>
  <span>Notifications</span>
  {unreadCount > 0 && (
    <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
      {unreadCount} new
    </span>
  )}
</Link>

            {/* Analytics */}
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider my-4 px-2">
              Analytics
            </div>

            <Link
              to="/admin/dashboard/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-indigo-600">
                <MdShoppingCart size={20} />
              </div>
              <span>Orders</span>
              <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                {stats.totalOrders}
              </span>
            </Link>

            <Link
              to="/admin/dashboard/users"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-teal-600">
                <FiUsers size={20} />
              </div>
              <span>Users</span>
            </Link>

            <Link
              to="/admin/dashboard/analytics"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-amber-600">
                <MdBarChart size={20} />
              </div>
              <span>Analytics</span>
            </Link>

            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider my-4 px-2">
              Settings
            </div>

            <Link
              to="/admin/dashboard/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-gray-600">
                <MdSettings size={20} />
              </div>
              <span>Settings</span>
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium bg-red-50 text-red-600 hover:bg-red-100 transition group"
          >
            <RxExit size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:ml-10">
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Header */}
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Welcome back, {user?.name?.split(" ")[0] || "Admin"}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your store today.
              </p>
            </div>
            <div className="mt-2 lg:mt-0">
              <div className="text-sm text-gray-500">Last updated</div>
              <div className="text-md font-semibold text-gray-700">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content Routes */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[500px] flex flex-col">
              <Routes>
                <Route
                  index
                  element={
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <div className="text-6xl mb-6">📊</div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                        Dashboard Overview
                      </h2>
                      <p className="text-gray-600 max-w-2xl mb-8">
                        Select a section from the sidebar to manage products,
                        view notifications, or access other admin features.
                      </p>
                      {/* Dashboard Stats Cards Placeholder for the Overview Page */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
                        <StatCard
                          icon={<FiPackage size={24} />}
                          title="Total Products"
                          value={stats.totalProducts}
                          color="text-green-600"
                        />
                        <StatCard
                          icon={<MdShoppingCart size={24} />}
                          title="Total Orders"
                          value={stats.totalOrders}
                          color="text-indigo-600"
                        />
                        <StatCard
                          icon={<FiDollarSign size={24} />}
                          title="Total Revenue"
                          value={`$${stats.totalRevenue.toLocaleString()}`}
                          color="text-amber-600"
                        />
                        <StatCard
                          icon={<FiUsers size={24} />}
                          title="New Users"
                          value={stats.newUsers}
                          color="text-teal-600"
                        />
                      </div>
                    </div>
                  }
                />
                <Route
                  path="adminviewproducts"
                  element={<AdminAllProductView />}
                />
                <Route path="addproducts" element={<AddProducts />} />
                <Route path="editproducts/:id" element={<EditProducts />} />
                <Route path="notification" element={<Notification />} />
                <Route
                  path="*"
                  element={
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <div className="text-6xl mb-6">🔍</div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                        Page Not Found
                      </h2>
                      <p className="text-gray-600 max-w-md mb-8">
                        The page you're looking for doesn't exist in the admin
                        dashboard.
                      </p>
                      <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        Return to Dashboard
                      </button>
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-200">
          <p>
            Admin Dashboard v1.0 • © {new Date().getFullYear()} Your Company
          </p>
        </div>
      </div>
    </div>
  );
}

// Simple StatCard component for the overview page
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex items-center space-x-4">
    <div className={`p-3 rounded-full bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
      {React.cloneElement(icon, { className: color })}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);