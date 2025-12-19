import React, { useEffect, useState, useRef, useCallback } from "react";
import { FiBell, FiCheck, FiX, FiMessageSquare, FiChevronRight, FiRefreshCw } from "react-icons/fi";
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
      {/* Navbar Bell Icon - Enhanced */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative p-2 hover:bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full transition-all duration-300 hover:scale-110 group"
      >
        <div className="relative p-2">
          <FiBell className="text-xl text-gray-700 group-hover:text-indigo-600 transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center animate-pulse text-white font-bold shadow-lg">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
      </button>

      {/* Dropdown - Enhanced */}
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-3 w-96 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-50"
          style={{
            animation: 'slideDown 0.2s ease-out',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Notifications</h3>
              <p className="text-sm text-gray-500">{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={() => fetchNotifications()}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-180"
              title="Refresh"
            >
              <FiRefreshCw className="text-gray-600 transition-transform duration-200" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#c1c1c1 #f1f1f1'
          }}>
            <style>
              {`
                @keyframes slideDown {
                  from {
                    opacity: 0;
                    transform: translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }
                @keyframes scaleUp {
                  from {
                    opacity: 0;
                    transform: scale(0.95);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
                .animate-slideDown {
                  animation: slideDown 0.2s ease-out;
                }
                .animate-fadeIn {
                  animation: fadeIn 0.2s ease-out;
                }
                .animate-scaleUp {
                  animation: scaleUp 0.2s ease-out;
                }
                .custom-scrollbar::-webkit-scrollbar {
                  width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: #f1f1f1;
                  border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: #c1c1c1;
                  border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #a1a1a1;
                }
              `}
            </style>
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <FiBell className="text-2xl text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No notifications yet</p>
                <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n._id}
                  className={`p-4 border-b border-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 ${
                    !n.isRead ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-l-yellow-400" : ""
                  }`}
                  onClick={() => setSelectedMessage(n)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 p-2 rounded-full ${
                      !n.isRead ? "bg-gradient-to-br from-yellow-400 to-orange-400" : "bg-gray-200"
                    }`}>
                      <FiMessageSquare className={`text-sm ${!n.isRead ? "text-white" : "text-gray-600"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{n.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(n.sentAt).toLocaleString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        {!n.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(n._id);
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full hover:shadow-lg transition-all duration-200 flex items-center gap-1"
                          >
                            <FiCheck size={12} />
                            Mark read
                          </button>
                        )}
                      </div>
                    </div>
                    <FiChevronRight className="text-gray-400 mt-1" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Reply Modal - Enhanced */}
      {selectedMessage && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
            style={{ animation: 'scaleUp 0.2s ease-out' }}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Reply to Message</h2>
                <p className="text-sm text-gray-500 mt-1">Send a response to this notification</p>
              </div>
              <button
                onClick={() => { setSelectedMessage(null); setReplyText(""); }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Original Message:</p>
                <p className="text-gray-800 font-medium">{selectedMessage.message}</p>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Your Reply</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 resize-none bg-gray-50"
                  placeholder="Type your reply here..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                  onClick={() => { setSelectedMessage(null); setReplyText(""); }}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => replyNotification(selectedMessage.userId, replyText)}
                  disabled={!replyText.trim()}
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}