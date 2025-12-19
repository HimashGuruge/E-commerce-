import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const pollingIntervalRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    
    // Start polling for real-time updates
    startPolling();
    
    return () => {
      // Cleanup polling on unmount
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const startPolling = () => {
    // Poll every 3 seconds for real-time updates
    pollingIntervalRef.current = setInterval(() => {
      fetchNotifications();
    }, 3000);
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/notifications/getNotifications");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.post(`http://localhost:4000/api/notifications/markRead/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // View notification using SweetAlert2 with Reply button
  const viewNotification = (notification) => {
    Swal.fire({
      title: "Notification",
      html: `<p><strong>Message:</strong> ${notification.message}</p>
             <p><strong>Sent At:</strong> ${new Date(notification.sentAt).toLocaleString()}</p>
             <p><strong>Status:</strong> ${notification.isRead ? "Read" : "Unread"}</p>`,
      showCancelButton: true,
      confirmButtonText: "Reply",
      cancelButtonText: "Close",
      preConfirm: async () => {
        const { value: reply } = await Swal.fire({
          title: "Reply to Notification",
          input: "textarea",
          inputLabel: "Your reply",
          inputPlaceholder: "Type your reply here...",
          showCancelButton: true,
          confirmButtonText: "Send",
        });

        if (reply) {
          try {
            // Replace with your API endpoint
            await axios.post(`http://localhost:4000/api/notifications/reply/${notification.userId}`, {
              message: reply,
            });
            Swal.fire("Sent!", "Your reply has been sent.", "success");
          } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to send reply.", "error");
          }
        }
      },
    });
  };

  return (
    <div className="p-4">
      {notifications.length === 0 && <p className="text-gray-500">No Notifications</p>}

      {notifications.length > 0 && (
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Message ID</th>
              <th className="px-4 py-2 border-b">User ID</th>
              <th className="px-4 py-2 border-b">Message</th>
              <th className="px-4 py-2 border-b">Read Status</th>
              <th className="px-4 py-2 border-b">Sent At</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification._id} className={notification.isRead ? "" : "bg-yellow-50"}>
                <td className="px-4 py-2 border-b">{notification._id}</td>
                <td className="px-4 py-2 border-b">{notification.userId}</td>
                <td className="px-4 py-2 border-b">{notification.message}</td>
                <td className="px-4 py-2 border-b">{notification.isRead ? "Read" : "Unread"}</td>
                <td className="px-4 py-2 border-b">{new Date(notification.sentAt).toLocaleString()}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => viewNotification(notification)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    View
                  </button>
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}