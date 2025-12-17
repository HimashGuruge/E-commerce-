import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");

  const token = localStorage.getItem("token");

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:4000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const adminMessages = res.data.adminMessages || [];
      const unread = adminMessages.filter((n) => !n.isRead).length;

      setNotifications(adminMessages);
      setUnreadCount(unread);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleReply = async () => {
    if (!selectedMessage || replyText.trim() === "") return;

    try {
      await axios.post(
        `http://localhost:4000/api/notifications/reply/${selectedMessage._id}`,
        { reply: replyText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({ icon: "success", title: "Reply sent!" });
      setSelectedMessage(null);
      setReplyText("");
      fetchNotifications();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Failed to send reply" });
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="relative">
        <FiBell className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50">
          <div className="p-2 font-semibold border-b">Notifications</div>
          {notifications.length === 0 && <div className="p-3 text-gray-500">No notifications</div>}
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-3 border-b cursor-pointer hover:bg-gray-100 ${!n.isRead ? "bg-blue-50" : ""}`}
            >
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-gray-400 mb-2">{new Date(n.sentAt).toLocaleString()}</p>
              <button
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => setSelectedMessage(n)}
              >
                View & Reply
              </button>
            </div>
          ))}
          <Link
            to="/admin/dashboard/notification"
            className="block text-center p-2 text-blue-600 hover:bg-gray-100"
            onClick={() => setDropdownOpen(false)}
          >
            See all
          </Link>

          {/* Reply Modal */}
          {selectedMessage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-96 p-6">
                <h2 className="text-lg font-semibold mb-2">Reply to Message</h2>
                <p className="text-sm text-gray-600 mb-4">{selectedMessage.message}</p>
                <textarea
                  className="w-full p-2 border rounded mb-4"
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                  <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setSelectedMessage(null)}>
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleReply}>
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
