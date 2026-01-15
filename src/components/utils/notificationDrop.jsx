import React, { useEffect, useState, useRef, useCallback } from "react";
import { FiBell, FiCheckCircle } from "react-icons/fi";
import axios from "axios";

export default function NotificationDrop() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔄 1. දත්ත ලබා ගැනීම (Fetch)
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/notifications/getNotifications");
      const data = Array.isArray(res.data) ? res.data : [];
      setNotifications(data);
      
      // ඇත්තටම isRead: false තියෙන ගණන Badge එකට ගන්නවා
      const realUnreadCount = data.filter((n) => n.isRead === false).length;
      setUnreadCount(realUnreadCount);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }, []);

  // 📩 2. Mark as Read (Optimistic Update ක්‍රමයට)
  const markAsRead = async (userId) => {
    // Backend එකෙන් response එක එන්න කලින් UI එක update කරනවා
    const previousNotifications = [...notifications];
    const previousCount = unreadCount;

    // UI එක වහාම Update කිරීම
    setNotifications((prev) =>
      prev.map((n) => (n.userId === userId ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));

    try {
      // 💡 ඔයාගේ අලුත් Controller එකට අනුව Body එකෙන් userId යැවීම
      await axios.post("http://localhost:4000/api/notifications/markRead", { userId });
    } catch (err) {
      // Error එකක් ආවොත් තිබුණු තත්වයටම Rollback කිරීම
      console.error("Mark Read Error:", err);
      setNotifications(previousNotifications);
      setUnreadCount(previousCount);
    }
  };

  // තත්පර 5කට වරක් අලුත් මැසේජ් පරීක්ෂා කිරීම
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Dropdown එකෙන් පිටත click කළ විට වැසීම
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block font-sans" ref={dropdownRef}>
      {/* 🔔 Bell Icon & Real Count Badge */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative p-2 rounded-full hover:bg-slate-100 transition-all focus:outline-none"
      >
        <FiBell className="text-2xl text-slate-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-600 rounded-full text-[10px] flex items-center justify-center text-white border-2 border-white font-bold animate-in zoom-in">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 📂 Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
            {unreadCount > 0 && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">NEW</span>}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-10 text-center text-slate-400 text-sm italic">No new alerts</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`p-4 border-b border-slate-50 flex flex-col transition-colors ${!n.isRead ? "bg-indigo-50/40" : "bg-white"}`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <p className={`text-sm leading-snug ${!n.isRead ? "text-slate-900 font-bold" : "text-slate-500 font-medium"}`}>
                      {n.message}
                    </p>
                    {!n.isRead && (
                      <button
                        onClick={() => markAsRead(n.userId)}
                        className="text-indigo-600 hover:text-indigo-800 transition-transform active:scale-90"
                        title="Mark as read"
                      >
                        <FiCheckCircle size={18} />
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      {new Date(n.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}