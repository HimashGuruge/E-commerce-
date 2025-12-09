import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

export default function Notification() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch all message threads (admin endpoint)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/chat/admin/messages", {
          headers: { Authorization: token },
        });
        
        // Based on your backend controller, data is in res.data.data
        if (res.data.data) {
          setUsers(res.data.data);
        } else if (res.data.messages) {
          // Alternative response format
          setUsers(res.data.messages);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        if (err.response?.status === 403) {
          alert("You don't have admin privileges");
        }
      }
    };
    
    if (token) {
      fetchMessages();
    }
  }, [token]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedUser]);

  // Handle admin reply
  const handleReply = async () => {
    if (!selectedUser || !replyText.trim()) return;

    setLoading(true);
    try {
      // Using your backend endpoint structure
      const res = await axios.post(
        "http://localhost:4000/api/chat/adminReply",
        { 
          userId: selectedUser.userId, // Send userId, not _id
          text: replyText  // Changed from 'message' to 'text'
        },
        { 
          headers: { 
            Authorization: token,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      alert(res.data.message || "Reply sent successfully");

      const newMessage = {
        _id: Date.now().toString(),
        sender: "admin",
        text: replyText,
        timestamp: new Date().toISOString(),
      };

      // Update selectedUser messages locally
      setSelectedUser((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      // Update main users array
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.userId === selectedUser.userId || u._id === selectedUser._id
            ? { 
                ...u, 
                messages: [...u.messages, {
                  sender: "admin",
                  text: replyText,
                  timestamp: new Date().toISOString()
                }] 
              }
            : u
        )
      );

      setReplyText("");
      scrollToBottom();
    } catch (err) {
      console.error("Error sending reply:", err);
      if (err.response) {
        console.error("Response error:", err.response.data);
        alert(`Failed to send reply: ${err.response.data.message || err.response.statusText}`);
      } else {
        alert("Failed to send reply");
      }
    } finally {
      setLoading(false);
    }
  };

  // Format messages for display
  const formatMessages = (messages) => {
    if (!messages || !Array.isArray(messages)) return [];
    
    return messages.map(msg => ({
      ...msg,
      // Ensure sender is in lowercase for comparison
      sender: msg.sender?.toLowerCase() || "unknown"
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Chat Dashboard</h1>
      
      <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left border-b font-semibold text-gray-700">User ID</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Email</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Messages</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Last Updated</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No chat threads found
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const formattedMessages = formatMessages(user.messages);
                const userMessages = formattedMessages.filter(m => m.sender === 'user');
                const lastUserMessage = userMessages[userMessages.length - 1];
                
                return (
                  <tr key={user._id || user.userId} className="border-t hover:bg-gray-50">
                    <td className="p-3 border-b">
                      <div className="font-medium">{user.userId}</div>
                      <div className="text-xs text-gray-500">Thread: {user._id?.substring(0, 8)}...</div>
                    </td>
                    <td className="p-3 border-b text-gray-600">{user.userEmail}</td>
                    <td className="p-3 border-b">
                      <div className="text-sm">
                        <span className="font-medium">{formattedMessages.length}</span> messages
                        {lastUserMessage && (
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            Last: "{lastUserMessage.text?.substring(0, 50)}..."
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3 border-b">
                      {user.updatedAt ? (
                        <div>
                          <div className="text-sm">{new Date(user.updatedAt).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">{new Date(user.updatedAt).toLocaleTimeString()}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="p-3 border-b">
                      <button
                        onClick={() => {
                          setSelectedUser({
                            ...user,
                            messages: formatMessages(user.messages)
                          });
                          setShowPopup(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                      >
                        View & Reply
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showPopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Chat with User</h2>
                <p className="text-sm text-blue-100">
                  User ID: {selectedUser.userId} | Email: {selectedUser.userEmail}
                </p>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                ✖
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {selectedUser.messages?.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No messages in this thread yet.
                </div>
              ) : (
                selectedUser.messages
                  ?.sort((a, b) => new Date(a.timestamp || a.createdAt) - new Date(b.timestamp || b.createdAt))
                  .map((msg, i) => (
                    <div
                      key={msg._id || i}
                      className={`mb-3 flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'user'
                            ? 'bg-white border border-gray-200 rounded-tl-none'
                            : 'bg-blue-100 border border-blue-200 rounded-tr-none'
                          }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`font-semibold ${msg.sender === 'user' ? 'text-gray-700' : 'text-blue-700'}`}>
                            {msg.sender === 'user' ? '👤 User' : '🛡️ Admin'}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-800">{msg.text}</p>
                      </div>
                    </div>
                  ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Input Area */}
            <div className="border-t p-4">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your reply..."
                rows="3"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                disabled={loading}
              />
              <div className="flex justify-end mt-3 space-x-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  disabled={loading}
                >
                  Close
                </button>
                <button
                  onClick={handleReply}
                  disabled={loading || !replyText.trim()}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Reply"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}