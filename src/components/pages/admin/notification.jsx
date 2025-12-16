import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

const token = localStorage.getItem("token");

export default function Notification() {
  // -----------------------
  // State
  // -----------------------
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const prevCount = useRef(0);

  // -----------------------
  // Helpers
  // -----------------------
  const showToast = (icon, title, timer = 1500) => {
    Swal.fire({
      icon,
      title,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer,
    });
  };

  // -----------------------
  // Fetch notifications
  // -----------------------
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newNotifications = res.data.adminMessages;

      if (prevCount.current && newNotifications.length > prevCount.current) {
        showToast("info", "You have new messages", 2000);
      }

      prevCount.current = newNotifications.length;
      setNotifications(newNotifications);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // Reply logic
  // -----------------------
  const handleReply = (userId) => {
    setCurrentUserId(userId);
    setReplyText("");
    setShowModal(true);
  };

  const sendReply = async () => {
    if (!replyText.trim()) return;

    const result = await Swal.fire({
      title: "Send Reply?",
      text: "Are you sure you want to send this reply?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axios.post(
        "http://localhost:4000/api/simai/admin/replymessage",
        { message: replyText, userId: currentUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        showToast("success", "Reply Sent!");
        await fetchNotifications();
        setShowModal(false);
        setReplyText("");
        setCurrentUserId(null);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to send reply",
        text: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

  // -----------------------
  // Mark as read
  // -----------------------
  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/notifications/read/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  // -----------------------
  // Delete notification
  // -----------------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Notification?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await axios.delete(`http://localhost:4000/api/notifications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNotifications((prev) => prev.filter((n) => n._id !== id));
        showToast("success", "Deleted");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: err.response?.data?.message || "Something went wrong",
        });
      }
    });
  };

  // -----------------------
  // Effect to fetch periodically
  // -----------------------
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // -----------------------
  // Render
  // -----------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Notifications
        </h1>
        <p className="text-gray-600 mt-2 font-medium">
          Manage your messages and user communications
        </p>
        {unreadCount > 0 && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mt-3">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No notifications yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {notifications.map((notif, index) => (
                  <tr
                    key={notif._id}
                    className={`transition-colors duration-150 hover:bg-gray-50 ${
                      !notif.isRead ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-700">
                      {notif.userId}
                    </td>
                    <td className="px-6 py-4 max-w-md truncate">{notif.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(notif.sentAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      <br />
                      <span className="text-gray-500 text-xs">
                        {new Date(notif.sentAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                      <button
                        onClick={() => handleReply(notif._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-sm"
                      >
                        Reply
                      </button>
                      {!notif.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notif._id)}
                          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 shadow-sm"
                        >
                          Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notif._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 shadow-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white rounded-2xl shadow-xl sm:max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Reply to User</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500">
                ✕
              </button>
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your response here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
              rows={4}
              autoFocus
            />
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                disabled={!replyText.trim()}
                className={`px-5 py-2.5 font-medium rounded-xl transition-all duration-200 ${
                  replyText.trim()
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-sm"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
