import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Swal from "sweetalert2";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/notifications`;

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pollingRef = useRef(null);

  // 1. Badge count එක ගණනය කිරීම
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchNotifications = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/getNotifications`);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications(true);
    pollingRef.current = setInterval(() => fetchNotifications(false), 5000);
    return () => clearInterval(pollingRef.current);
  }, [fetchNotifications]);

  // 2. Mark as Read Logic (Optimistic Update)
  const handleMarkAsRead = async (userId) => {
    const previousState = [...notifications];
    setNotifications((prev) =>
      prev.map((n) => (n.userId === userId ? { ...n, isRead: true } : n))
    );

    try {
      await axios.post(`${API_BASE_URL}/markRead`, { userId });
    } catch (err) {
      setNotifications(previousState);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  // 3. Inline Messaging System (Modal with History)
  const openChatModal = async (notification) => {
    try {
      const { data: chatHistory } = await axios.get(`${API_BASE_URL}/getChat/${notification.userId}`);
      
      const chatHtml = chatHistory.map(msg => `
        <div style="text-align: ${msg.sender === 'admin' ? 'right' : 'left'}; margin-bottom: 12px;">
          <div style="display: inline-block; padding: 10px 14px; border-radius: 18px; 
            max-width: 80%; font-size: 0.85rem;
            background: ${msg.sender === 'admin' ? '#3b82f6' : '#f3f4f6'}; 
            color: ${msg.sender === 'admin' ? 'white' : '#1f2937'};
            border-bottom-${msg.sender === 'admin' ? 'right' : 'left'}-radius: 4px;">
            ${msg.text}
          </div>
          <div style="font-size: 0.65rem; color: #9ca3af; margin-top: 4px;">
            ${new Date(msg.createdAt).toLocaleTimeString()}
          </div>
        </div>
      `).join('');

      Swal.fire({
        title: `<div style="text-align: left; font-size: 1rem;">Chat with ${notification.userId}</div>`,
        html: `
          <div id="chat-box" style="max-height: 300px; overflow-y: auto; padding: 10px; background: #fff; text-align: left; border: 1px solid #eee; border-radius: 8px;">
            ${chatHtml || '<p style="text-align: center; color: #ccc;">No history found.</p>'}
          </div>
          <div style="display: flex; gap: 8px; margin-top: 15px;">
            <input id="inline-input" type="text" placeholder="Type a message..." 
              style="flex: 1; padding: 10px 15px; border: 1px solid #d1d5db; border-radius: 20px; outline: none;">
            <button id="inline-send-btn" style="background: #3b82f6; color: white; border: none; padding: 0 15px; border-radius: 20px; font-weight: bold; cursor: pointer;">
              Send
            </button>
          </div>`,
        showConfirmButton: false,
        showCloseButton: true,
        width: '480px',
        didOpen: () => {
          const chatBox = document.getElementById('chat-box');
          const input = document.getElementById('inline-input');
          const btn = document.getElementById('inline-send-btn');

          chatBox.scrollTop = chatBox.scrollHeight;
          input.focus();

          const sendMessage = async () => {
            const message = input.value.trim();
            if (!message) return;
            btn.disabled = true;
            try {
              await axios.post(`${API_BASE_URL}/reply/${notification.userId}`, { message });
              if(!notification.isRead) await axios.post(`${API_BASE_URL}/markRead`, { userId: notification.userId });
              Swal.close();
              fetchNotifications();
              Swal.fire({ icon: 'success', title: 'Sent', timer: 800, showConfirmButton: false });
            } catch (err) {
              Swal.fire("Error", "Could not send reply", "error");
            }
          };

          btn.onclick = sendMessage;
          input.onkeydown = (e) => { if (e.key === 'Enter') sendMessage(); };
        }
      });
    } catch (err) {
      Swal.fire("Error", "History failed", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border font-bold text-red-500">
            {unreadCount} New Messages
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-400">Loading...</td></tr>
              ) : (
                notifications.map((n) => (
                  <tr key={n._id} className={`hover:bg-gray-50 ${!n.isRead ? "bg-blue-50/30" : ""}`}>
                    <td className="px-6 py-4 font-bold text-blue-600">{n.userId.slice(-5)}</td>
                    <td className="px-6 py-4 text-gray-500 truncate max-w-[150px]">{n.message}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-black ${n.isRead ? "bg-gray-200 text-gray-600" : "bg-red-500 text-white"}`}>
                        {n.isRead ? "READ" : "NEW"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openChatModal(n)} className="text-blue-600 font-bold hover:underline">Chat</button>
                      {!n.isRead && (
                        <button onClick={() => handleMarkAsRead(n.userId)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Done</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}