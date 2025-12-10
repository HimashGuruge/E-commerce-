import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const authcheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsAdmin(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAdmin(decoded.role === "admin"); // Check if user is admin
    } catch {
      setUser(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    authcheck();
    window.addEventListener("authChange", authcheck);
    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 hover:text-blue-600 transition"
        >
          MyBrand
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </Link>
          <Link
            to="/service"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Service
          </Link>

          <Link
            to={`/viewcart?userId=${user ? user.id : ""}`}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Cart
          </Link>

          <Link
            to={`/orders?userId=${user ? user.id : ""}`}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Orders
          </Link>

          {/* Show Notification link only for admins */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Admin Dashboard
            </Link>
          )}

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt={user.name || "User profile"}
                className="w-10 h-10 rounded-full object-cover border shadow-sm"
              />
              <Link
                to={`/profile?userId=${user.id}`}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded shadow-md">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link to="/service" onClick={() => setMenuOpen(false)}>
            Service
          </Link>
          <Link to="/viewcart" onClick={() => setMenuOpen(false)}>
            Cart
          </Link>

          {/* Show Admin Dashboard link only for admins in mobile */}
          {isAdmin && (
            <Link to="/notification" onClick={() => setMenuOpen(false)}>
              Admin Dashboard
            </Link>
          )}

          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
