import React, { useEffect, useState, useRef, useCallback } from "react";
import { FiBell, FiCheckCircle, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import axios from "axios";

export default function NotificationDrop() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔄 1. Fetch Logic (පරණ විදිහටම)
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/notifications/getNotifications");
      const data = Array.isArray(res.data) ? res.data : [];
      setNotifications(data);
      const realUnreadCount = data.filter((n) => !n.isRead).length;
      setUnreadCount(realUnreadCount);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }, []);

  // 📩 2. Mark as Read Logic
  const markAsRead = async (userId) => {
    const previousNotifications = [...notifications];
    const previousCount = unreadCount;

    setNotifications((prev) =>
      prev.map((n) => (n.userId === userId ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));

    try {
      await axios.post("http://localhost:4000/api/notifications/markRead", { userId });
    } catch (err) {
      setNotifications(previousNotifications);
      setUnreadCount(previousCount);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

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
    <div className="relative inline-block" ref={dropdownRef}>
      {/* --- 🔔 Trigger Button --- */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`relative p-2.5 rounded-xl transition-all duration-200 group ${
          dropdownOpen ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-50 text-slate-500"
        }`}
      >
        <FiBell className={`text-2xl ${dropdownOpen ? "scale-110" : "group-hover:scale-110"} transition-transform`} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* --- 📂 Dropdown Menu --- */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-[360px] bg-white border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 overflow-hidden ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-4 duration-300">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Notifications</h3>
              <p className="text-[11px] text-slate-400 font-medium">You have {unreadCount} unread alerts</p>
            </div>
            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
              <FiMoreHorizontal size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[420px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {notifications.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center opacity-40">
                <FiBell size={48} className="text-slate-200 mb-3" />
                <p className="text-sm font-medium text-slate-400 italic">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`relative px-5 py-4 border-b border-slate-50 flex gap-4 group transition-all duration-200 cursor-pointer ${
                    !n.isRead ? "bg-indigo-50/30 hover:bg-indigo-50/50" : "hover:bg-slate-50"
                  }`}
                >
                  {/* Status Indicator Dot */}
                  {!n.isRead && (
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className={`text-[13px] leading-relaxed break-words ${
                        !n.isRead ? "text-slate-900 font-semibold" : "text-slate-600 font-normal"
                      }`}>
                        {n.message}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                        {new Date(n.sentAt).toLocaleDateString([], { month: 'short', day: 'numeric' })} • {new Date(n.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      {!n.isRead && (
                        <button
                          onClick={(e) => { e.stopPropagation(); markAsRead(n.userId); }}
                          className="text-[10px] text-indigo-600 font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Quick Action Button (Visible on Hover) */}
                  <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!n.isRead && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); markAsRead(n.userId); }}
                        className="p-1.5 bg-white text-emerald-600 rounded-lg shadow-sm border border-slate-100 hover:bg-emerald-50"
                      >
                        <FiCheckCircle size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-center">
            <button 
               onClick={() => setDropdownOpen(false)}
               className="text-[12px] font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- ADDED UI FEATURES ---
// 1. Badge Animation: Ping animation එකක් එක්ක අලුත් alerts highlight කරලා තියෙනවා.
// 2. Glassmorphism Header: Dropdown එකේ උඩ කොටස scroll කරද්දී පෙනෙන සේ සකසා ඇත.
// 3. Hover Actions: හැම notification එකකටම hover කරද්දී "Mark as read" button එක පෙනෙන්නට සැලැස්වූවා.
// 4. Dot Indicator: කියවපු නැති පණිවිඩ වල පැත්තකින් කුඩා තිතක් දර්ශනය වේ.