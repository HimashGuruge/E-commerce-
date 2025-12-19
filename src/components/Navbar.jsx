import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import NotificationsDropdown from "@/components/utils/notificationDrop";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    authCheck();
    window.addEventListener("authChange", authCheck);
    return () => window.removeEventListener("authChange", authCheck);
  }, []);

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

          {/* Admin notifications */}
          {isAdmin && <NotificationsDropdown />}
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
              <Link to={`/viewcart?userId=${userId}`} onClick={() => setMenuOpen(false)}>Cart</Link>
              <Link to={`/orders?userId=${userId}`} onClick={() => setMenuOpen(false)}>Orders</Link>
            </>
          )}

          {isAdmin && (
            <Link to="/admin/dashboard/notification" onClick={() => setMenuOpen(false)}>
              Notifications
            </Link>
          )}
          {isAdmin && <Link to="/admin/dashboard">Admin Dashboard</Link>}

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
