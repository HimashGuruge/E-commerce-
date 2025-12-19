import React, { useEffect, useState, useRef, useCallback } from "react";
import { FiBell, FiX } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";

export default function NavbarNotification() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const pollingRef = useRef(null);
  const dropdownRef = useRef(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/notifications/getNotifications");
      setNotifications(res.data);
      setUnreadCount(res.data.filter(n => !n.isRead).length);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.post(`http://localhost:4000/api/notifications/markRead/${id}`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const replyNotification = async (id, reply) => {
    try {
      await axios.post(`http://localhost:4000/api/notifications/reply/${id}`, { message: reply });
      Swal.fire("Sent!", "Your reply has been sent.", "success");
      setSelectedMessage(null);
      setReplyText("");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to send reply.", "error");
    }
  };

  // Polling
  useEffect(() => {
    fetchNotifications();
    pollingRef.current = setInterval(fetchNotifications, 3000);
    return () => clearInterval(pollingRef.current);
  }, [fetchNotifications]);

  // Close dropdown when clicking outside
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
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative p-2 rounded-full hover:bg-indigo-50 transition duration-200"
      >
        <FiBell className="text-2xl text-gray-700 hover:text-indigo-600 transition" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-xs flex items-center justify-center text-white shadow-md animate-bounce">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 transform transition-all duration-300 origin-top-right"
        >
          <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-indigo-50 to-white rounded-t-xl">
            <h3 className="font-semibold text-gray-800 text-lg">Notifications</h3>
            <button onClick={fetchNotifications} className="text-indigo-500 hover:text-indigo-700 font-medium">
              Refresh
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-400 italic">✨ No notifications</div>
            ) : (
              notifications.map(n => (
                <div
                  key={n._id}
                  className={`p-4 cursor-pointer hover:bg-indigo-50 transition ${!n.isRead ? "bg-yellow-50" : ""}`}
                  onClick={() => setSelectedMessage(n)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{n.message}</span>
                    {!n.isRead && (
                      <button
                        onClick={(e) => { e.stopPropagation(); markAsRead(n._id); }}
                        className="text-xs text-green-600 hover:text-green-800 font-medium"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {new Date(n.sentAt).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl p-6 transform transition-all scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-600">Reply</h2>
              <button onClick={() => { setSelectedMessage(null); setReplyText(""); }} className="text-gray-500 hover:text-red-500">
                <FiX size={22} />
              </button>
            </div>

            <p className="mb-2 font-medium text-gray-700">Original Message:</p>
            <p className="mb-4 text-gray-600 italic">{selectedMessage.message}</p>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none mb-4"
              placeholder="Type your reply..."
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setSelectedMessage(null); setReplyText(""); }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => replyNotification(selectedMessage.userId, replyText)}
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg shadow hover:opacity-90 transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
