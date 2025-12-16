import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiBell } from "react-icons/fi";
import axios from "axios";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // 🔐 Auth check
  const authCheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsAdmin(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAdmin(decoded.role === "admin");
    } catch {
      setUser(null);
      setIsAdmin(false);
    }
  };

  // 🔔 Fetch notifications (ADMIN ONLY)
  const fetchNotifications = async () => {
    if (!isAdmin) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(
        "http://localhost:4000/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let totalUnread = 0;
      if (res.data.adminMessages)
        totalUnread += res.data.adminMessages.length;

      setUnreadCount(totalUnread);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    authCheck();
    window.addEventListener("authChange", authCheck);
    return () => window.removeEventListener("authChange", authCheck);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const userId = user?.id || "";

  return (
    <nav className="bg-gray-100 shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          MyBrand
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/service">Service</Link>

          {user && (
            <>
              <Link to={`/viewcart?userId=${userId}`}>Cart</Link>
              <Link to={`/orders?userId=${userId}`}>Orders</Link>
            </>
          )}

          {/* 🔔 ADMIN NOTIFICATION BELL ONLY */}
          {isAdmin && (
            <Link
              to="/admin/dashboard/notification"
              className="relative"
            >
              <FiBell className="text-xl" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}

          {isAdmin && <Link to="/admin/dashboard">Admin Dashboard</Link>}

          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
              <Link to={`/profile?userId=${userId}`}>Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded shadow">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/service" onClick={() => setMenuOpen(false)}>Service</Link>

          {user && (
            <>
              <Link to={`/viewcart?userId=${userId}`}>Cart</Link>
              <Link to={`/orders?userId=${userId}`}>Orders</Link>
            </>
          )}

          {/* 🔔 ADMIN ONLY (mobile) */}
          {isAdmin && (
            <Link
              to="/admin/dashboard/notification"
              onClick={() => setMenuOpen(false)}
            >
              Notifications ({unreadCount})
            </Link>
          )}

          {isAdmin && (
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          )}

          {user ? (
            <>
              <Link to={`/profile?userId=${userId}`}>Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
