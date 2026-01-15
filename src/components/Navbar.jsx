import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { ShoppingCart, Package, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";
import NotificationsDropdown from "@/components/utils/notificationDrop";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Backend එකෙන් User data ලබා ගන්නා function එක
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setUser(null);
      setIsAdmin(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ඔයාගේ API එකෙන් දත්ත එන්නේ { user: { ... } } ආකාරයට නම්:
      const userData = response.data.user; 
      
      setUser(userData);
      // Role එක පරීක්ෂා කිරීම (userData ඇතුළේ role එක තිබිය යුතුයි)
      setIsAdmin(userData.role === "admin");
      
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Token එක අවුල් නම් පමණක් logout කරන්න
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("authChange", fetchUserData);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("authChange", fetchUserData);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  // User object එක ඇතුළේ තියෙන ID එක නිවැරදිව ගැනීම
  const userId = user?._id || user?.id || "";

  const navLinkClass = (path) => `
    relative text-[14px] font-medium transition-all duration-300 px-3 py-2 rounded-lg
    ${location.pathname === path 
      ? "text-blue-600 bg-blue-50/50" 
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}
  `;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 block ${
      scrolled 
      ? "bg-white/80 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-b border-slate-100 py-2.5" 
      : "bg-white py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
            M
          </div>
          <span className="text-xl font-black tracking-tight text-slate-800">
            MY<span className="text-blue-600">BRAND</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 mr-4">
            <Link to="/" className={navLinkClass("/")}>Home</Link>
            <Link to="/about" className={navLinkClass("/about")}>About</Link>
            <Link to="/service" className={navLinkClass("/service")}>Services</Link>
            <Link to="/contact" className={navLinkClass("/contact")}>Contact</Link>
          </div>

          <div className="h-5 w-[1px] bg-slate-200 mx-2" />

          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-1">
                <Link title="Cart" to={`/viewcart?userId=${userId}`} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                  <ShoppingCart size={20} />
                </Link>
                <Link title="Orders" to={`/orders?userId=${userId}`} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                  <Package size={20} />
                </Link>
              </div>
            )}

            {isAdmin && <NotificationsDropdown />}
            
            {isAdmin && (
              <Link to="/admin/dashboard" className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-blue-600 transition-all shadow-sm flex items-center gap-2">
                <LayoutDashboard size={14} /> Dashboard
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <Link to={`/profile?userId=${userId}`} className="p-0.5 rounded-full border border-slate-100 hover:border-blue-400 transition-colors">
                  <img 
                    src={user.profileImage || "/default-avatar.png"} 
                    className="w-8 h-8 rounded-full object-cover" 
                    alt="profile"
                  />
                </Link>
                <button onClick={handleLogout} title="Logout" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3">Login</Link>
                <Link to="/singup" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                  Create New Account
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-2">
              <MobileNavLink to="/" label="Home" active={location.pathname === "/"} onClick={() => setMenuOpen(false)} />
              <MobileNavLink to="/service" label="Services" active={location.pathname === "/service"} onClick={() => setMenuOpen(false)} />
              <MobileNavLink to="/contact" label="Contact" active={location.pathname === "/contact"} onClick={() => setMenuOpen(false)} />
              
              {user && (
                 <MobileNavLink to={`/profile?userId=${userId}`} label="My Profile" active={location.pathname === "/profile"} onClick={() => setMenuOpen(false)} />
              )}

              {!user && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Link to="/login" className="py-3 text-center text-sm font-bold text-slate-700 border border-slate-200 rounded-xl">Login</Link>
                  <Link to="/register" className="py-3 text-center text-sm font-bold bg-blue-600 text-white rounded-xl">Sign Up</Link>
                </div>
              )}

              {user && (
                <button onClick={handleLogout} className="mt-4 flex items-center justify-center gap-2 py-3 w-full text-sm font-bold text-rose-600 bg-rose-50 rounded-xl">
                  <LogOut size={16} /> Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileNavLink({ to, label, active, onClick }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-xl font-semibold transition-all ${
        active ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
      <ChevronRight size={16} className={active ? "opacity-100" : "opacity-30"} />
    </Link>
  );
}