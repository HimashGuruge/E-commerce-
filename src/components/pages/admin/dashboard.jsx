import React, { useEffect, useState } from "react";
import { 
  RxHamburgerMenu, 
  RxDashboard, 
  RxPerson, 
  RxExit 
} from "react-icons/rx";
import { 
  MdOutlineGridView, 
  MdAddBox, 
  MdEdit, 
  MdNotifications,
  MdShoppingCart,
  MdBarChart,
  MdSettings,
  MdChevronRight,
  MdChevronLeft
} from "react-icons/md";
import { 
  FiUsers, 
  FiPackage, 
  FiDollarSign, 
  FiTrendingUp 
} from "react-icons/fi";
import { Link, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AddProducts from "./addProducts";
import AdminAllProductView from "./AdminAllProductView";
import EditProducts from "./EditProducts";
import Notification from "./notification";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Stats for dashboard
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    newUsers: 0,
  });

  // Auth check
  const authcheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'Only administrators can access this dashboard',
          confirmButtonColor: '#d33',
        }).then(() => {
          navigate("/");
        });
        return;
      }
      setUser(decoded);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      // Mock data for now
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

  useEffect(() => {
    authcheck();
    fetchStats();
    window.addEventListener("authChange", authcheck);
    setLoading(false);
    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: "Are you sure you want to logout?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
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

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Top Bar - Only on Mobile */}
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
            <div className="text-white font-semibold">{user?.name || "Admin"}</div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">
              {user?.name?.charAt(0) || "A"}
            </span>
          </div>
        </div>
      </div>

      {/* SIDEBAR - Always visible on desktop, collapsible on mobile */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 shadow-xl z-40 transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo Section */}
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
              <div className="font-semibold text-gray-800">{user?.name || "Admin User"}</div>
              <div className="text-sm text-gray-500">{user?.email || "admin@example.com"}</div>
              <div className="text-xs mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full inline-block">
                Administrator
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-2">
            {/* Main Navigation */}
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
              to="/admin/dashboard/addproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-purple-600">
                <MdAddBox size={20} />
              </div>
              <span>Ads Managements</span>
            </Link>

            <Link
              to="/admin/dashboard/notification"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-red-600 relative">
                <MdNotifications size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <span>Notifications</span>
              <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                3 new
              </span>
            </Link>

            {/* Additional Sections */}
            <>
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
                <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">45</span>
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
            </>
          </div>
        </nav>

        {/* Logout Button */}
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

      {/* MAIN CONTENT AREA */}
      <div className=" w-full lg:ml-10">
        {/* Overlay for mobile sidebar */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Dashboard Header */}
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Welcome back, {user?.name?.split(' ')[0] || "Admin"}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your store today.
              </p>
            </div>
            <div className="mt-2 lg:mt-0">
              <div className="text-sm text-gray-500">Last updated</div>
              <div className="text-md font-semibold text-gray-700">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { 
                title: "Total Products", 
                value: stats.totalProducts, 
                icon: <FiPackage className="text-blue-600" size={24} />, 
                change: "+12%", 
                color: "bg-blue-50", 
                textColor: "text-blue-600" 
              },
              { 
                title: "Total Orders", 
                value: stats.totalOrders, 
                icon: <MdShoppingCart className="text-green-600" size={24} />, 
                change: "+8%", 
                color: "bg-green-50", 
                textColor: "text-green-600" 
              },
              { 
                title: "Total Revenue", 
                value: `$${stats.totalRevenue.toLocaleString()}`, 
                icon: <FiDollarSign className="text-purple-600" size={24} />, 
                change: "+23%", 
                color: "bg-purple-50", 
                textColor: "text-purple-600" 
              },
              { 
                title: "New Users", 
                value: stats.newUsers, 
                icon: <FiUsers className="text-orange-600" size={24} />, 
                change: "+5%", 
                color: "bg-orange-50", 
                textColor: "text-orange-600" 
              },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className={`text-sm font-semibold ${stat.textColor}`}>
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTERED CONTENT AREA */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[500px] flex flex-col">
              <Routes>
                <Route index element={
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6">📊</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
                    <p className="text-gray-600 max-w-2xl mb-8">
                      Select a section from the sidebar to manage products, view notifications, or access other admin features.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                      <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
                        <div className="text-blue-600 font-bold text-lg mb-2">📦 Products</div>
                        <div className="text-gray-600 text-sm">Manage your product inventory</div>
                      </div>
                      <div className="p-6 bg-green-50 border border-green-100 rounded-xl text-center">
                        <div className="text-green-600 font-bold text-lg mb-2">🛒 Orders</div>
                        <div className="text-gray-600 text-sm">View and manage customer orders</div>
                      </div>
                      <div className="p-6 bg-purple-50 border border-purple-100 rounded-xl text-center">
                        <div className="text-purple-600 font-bold text-lg mb-2">📈 Analytics</div>
                        <div className="text-gray-600 text-sm">Track store performance</div>
                      </div>
                    </div>
                  </div>
                } />
                <Route path="adminviewproducts" element={<AdminAllProductView />} />
                <Route path="addproducts" element={<AddProducts />} />
                <Route path="editproducts" element={<EditProducts />} />
                <Route path="notification" element={<Notification />} />
                <Route path="*" element={
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6">🔍</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 max-w-md mb-8">
                      The page you're looking for doesn't exist in the admin dashboard.
                    </p>
                    <button 
                      onClick={() => navigate('/admin/dashboard')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-200">
          <p>Admin Dashboard v1.0 • © {new Date().getFullYear()} Your Company</p>
        </div>
      </div>
    </div>
  );
}