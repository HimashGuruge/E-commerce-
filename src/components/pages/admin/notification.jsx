import axios from "axios";
import React, { useEffect, useState } from "react";

const token = localStorage.getItem("token");

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setNotifications(res.data.adminMessages))
      .catch((err) => console.log(err));
  }, []);

  const handleReply = (userId) => {
    setCurrentUserId(userId);
    setReplyText("");
    setShowModal(true); // open popup
  };

  const sendReply = async () => {
  if (!replyText.trim()) return;

  try {
    const res = await axios.post(
      "http://localhost:4000/api/simai/admin/replymessage",
      {
        message: replyText,
        userId: currentUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      console.log("✅ Reply sent successfully");

      // Optional: remove replied notification from UI
      setNotifications((prev) =>
        prev.filter((n) => n.userId !== currentUserId)
      );

      // Close modal & reset
      setShowModal(false);
      setReplyText("");
      setCurrentUserId(null);
    }
  } catch (err) {
    console.error("❌ Error sending reply:", err.response?.data || err.message);
  }
};


  const handleMarkAsRead = (id) => {
    // Optional: implement mark as read API
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  };

  const handleDelete = (id) => {
    // Optional: implement delete API
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">User Id</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif, index) => (
                <tr
                  key={notif._id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center">{notif.userId}</td>
                  <td className="px-4 py-2 border truncate max-w-xs">
                    {notif.message}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(notif.sentAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-2 border flex gap-2 justify-center">
                    <button
                      onClick={() => handleReply(notif.userId)}
                      className="px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Reply
                    </button>
                    {!notif.read && (
                      <button
                        onClick={() => handleMarkAsRead(notif._id)}
                        className="px-2 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif._id)}
                      className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
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

      {/* Modal for Reply */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-3">Reply to User</h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="w-full border rounded p-2 mb-3"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
