This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
aiChatBot.jsx
aichatbot.text
all.md
eslint.config.js
frontend.md
index.html
jsconfig.json
package.json
public/vite.svg
README.md
repomix.config.json
src/App.css
src/App.jsx
src/assets/react.svg
src/components/aiChatBot.jsx
src/components/Banners.jsx
src/components/Card.jsx
src/components/imageSlider.jsx
src/components/Navbar.jsx
src/components/newadds.jsx
src/components/pages/about.jsx
src/components/pages/admin/addProducts.jsx
src/components/pages/admin/AdminAllProductView.jsx
src/components/pages/admin/Dashboard/dashboard.jsx
src/components/pages/admin/Dashboard/DashboardRoutes.jsx
src/components/pages/admin/Dashboard/Footer.jsx
src/components/pages/admin/Dashboard/Sidebar.jsx
src/components/pages/admin/Dashboard/StatCard.jsx
src/components/pages/admin/Dashboard/TopBar.jsx
src/components/pages/admin/EditProducts.jsx
src/components/pages/admin/notification.jsx
src/components/pages/admin/payment.jsx
src/components/pages/admin/repomix-output.md
src/components/pages/admin/repomix.config.json
src/components/pages/HomeContainer.jsx
src/components/pages/Homepage.jsx
src/components/pages/Login.jsx
src/components/pages/NotFound.jsx
src/components/pages/orderpage.jsx
src/components/pages/productoverview.jsx
src/components/pages/ProfilePage.jsx
src/components/pages/service.jsx
src/components/pages/shipping.jsx
src/components/pages/singUp.jsx
src/components/pages/viewCart.jsx
src/components/utils/cart.jsx
src/components/utils/mediaupload.jsx
src/components/utils/notificationDrop.jsx
src/components/utils/voice.jsx
src/index.css
src/main.jsx
text.text
vercel.json
vite.config.js
```

# Files

## File: frontend.md
`````markdown
This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
aiChatBot.jsx
aichatbot.text
all.md
eslint.config.js
index.html
jsconfig.json
package.json
public/vite.svg
README.md
repomix.config.json
src/App.css
src/App.jsx
src/assets/react.svg
src/components/aiChatBot.jsx
src/components/Banners.jsx
src/components/Card.jsx
src/components/imageSlider.jsx
src/components/Navbar.jsx
src/components/newadds.jsx
src/components/pages/about.jsx
src/components/pages/admin/addProducts.jsx
src/components/pages/admin/AdminAllProductView.jsx
src/components/pages/admin/Dashboard/dashboard.jsx
src/components/pages/admin/Dashboard/DashboardRoutes.jsx
src/components/pages/admin/Dashboard/Footer.jsx
src/components/pages/admin/Dashboard/Sidebar.jsx
src/components/pages/admin/Dashboard/StatCard.jsx
src/components/pages/admin/Dashboard/TopBar.jsx
src/components/pages/admin/EditProducts.jsx
src/components/pages/admin/notification.jsx
src/components/pages/admin/payment.jsx
src/components/pages/admin/repomix-output.md
src/components/pages/admin/repomix.config.json
src/components/pages/HomeContainer.jsx
src/components/pages/Homepage.jsx
src/components/pages/Login.jsx
src/components/pages/NotFound.jsx
src/components/pages/orderpage.jsx
src/components/pages/productoverview.jsx
src/components/pages/ProfilePage.jsx
src/components/pages/service.jsx
src/components/pages/shipping.jsx
src/components/pages/singUp.jsx
src/components/pages/viewCart.jsx
src/components/utils/cart.jsx
src/components/utils/mediaupload.jsx
src/components/utils/notificationDrop.jsx
src/components/utils/voice.jsx
src/index.css
src/main.jsx
text.text
vercel.json
vite.config.js
```

# Files

## File: aiChatBot.jsx
````javascript
import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Swal from "sweetalert2";

export default function AiChatBot() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null);

  // Show loading SweetAlert
  const showLoadingAlert = (title, text) => {
    return Swal.fire({
      title: title || "Loading...",
      text: text || "Please wait",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  };

  // Show success SweetAlert
  const showSuccessAlert = (title, text) => {
    return Swal.fire({
      title: title || "Success!",
      text: text || "Operation completed successfully",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Show error SweetAlert
  const showErrorAlert = (title, text) => {
    return Swal.fire({
      title: title || "Error!",
      text: text || "Something went wrong",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
    });
  };

  // Show confirmation dialog
  const showConfirmationDialog = async (title, text, confirmText = "Yes", cancelText = "No") => {
    const result = await Swal.fire({
      title: title || "Are you sure?",
      text: text || "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    });
    return result.isConfirmed;
  };

  // Load messages with SweetAlert loading
  const loadMessages = useCallback(async () => {
    if (loading) return;

    const loadingAlert = showLoadingAlert("Loading Messages", "Fetching your chat history...");
    
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/chat/getMessagesbyid", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.data && res.data.messages) {
        setMessages(res.data.messages);
      } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
        setMessages(res.data.data);
      } else {
        setMessages([]);
      }
      
      await loadingAlert.close();
    } catch (err) {
      await loadingAlert.close();
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            showErrorAlert("Session Expired", "Please login again to continue chatting.");
            // Optional: Redirect to login
            // window.location.href = "/login";
            break;
          case 403:
            showErrorAlert("Access Denied", "You don't have permission to access chat history.");
            break;
          case 404:
            showErrorAlert("Not Found", "Chat history not found.");
            break;
          default:
            showErrorAlert("Error", "Failed to load messages. Please try again.");
        }
      } else {
        showErrorAlert("Network Error", "Unable to connect to the server. Please check your connection.");
      }
      console.error("Error loading messages:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Load messages when chat opens
  useEffect(() => {
    if (open && token) {
      loadMessages();
    } else {
      setMessages([]);
    }
  }, [open]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll when messages change
  useEffect(() => {
    if (open && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, open]);

  // Handle reply with SweetAlert
  const handleReply = async () => {
    if (!newMessage.trim() || sending) return;
    
    // Optional: Show confirmation for long messages
    if (newMessage.trim().length > 500) {
      const confirmed = await showConfirmationDialog(
        "Send Long Message?",
        "Your message is quite long. Are you sure you want to send it?",
        "Send",
        "Cancel"
      );
      if (!confirmed) return;
    }
    
    const messageToSend = newMessage.trim();
    
    // Create local message
    const localMessage = {
      _id: Date.now(),
      sender: "User",
      text: messageToSend,
      createdAt: new Date().toISOString(),
    };

    // Optimistic Update
    setMessages((prev) => [...prev, localMessage]);
    setNewMessage("");
    setSending(true);

    try {
      // Show sending indicator
      const sendingAlert = showLoadingAlert("Sending", "Your message is being sent...");
      
      await axios.post(
        "http://localhost:4000/api/chat/sendMessage",
        { text: messageToSend }, 
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      await sendingAlert.close();
      await showSuccessAlert("Sent!", "Message delivered successfully");
      
      // Wait a bit before reloading messages
      setTimeout(() => {
        loadMessages();
      }, 500);
      
    } catch (error) {
      console.error("Message sending failed:", error);
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            showErrorAlert("Session Expired", "Please login again to send messages.");
            break;
          case 403:
            showErrorAlert("Permission Denied", "You don't have permission to send messages.");
            break;
          case 429:
            showErrorAlert("Too Many Requests", "Please wait a moment before sending another message.");
            break;
          case 500:
            showErrorAlert("Server Error", "Our server encountered an error. Please try again later.");
            break;
          default:
            showErrorAlert("Failed to Send", "Unable to send message. Please try again.");
        }
      } else if (error.request) {
        showErrorAlert("Network Error", "Unable to connect to the server. Please check your internet connection.");
      } else {
        showErrorAlert("Error", "Something went wrong. Please try again.");
      }
      
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg._id !== localMessage._id));
      setNewMessage(messageToSend);
    } finally {
      setSending(false);
    }
  };

  // Handle chat window toggle with confirmation if there's unsent message
  const handleToggleChat = async () => {
    if (newMessage.trim() && !open) {
      const confirmed = await showConfirmationDialog(
        "Unsaved Message",
        "You have an unsent message. Open chat anyway?",
        "Open",
        "Continue Writing"
      );
      if (!confirmed) return;
    }
    setOpen(!open);
  };

  // Clear chat history
  const handleClearChat = async () => {
    if (messages.length === 0) return;
    
    const confirmed = await showConfirmationDialog(
      "Clear Chat History?",
      "This will remove all your chat history. This action cannot be undone.",
      "Clear All",
      "Cancel"
    );
    
    if (!confirmed) return;
    
    const loadingAlert = showLoadingAlert("Clearing", "Removing chat history...");
    
    try {
      await axios.delete("http://localhost:4000/api/chat/clearMessages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      await loadingAlert.close();
      await showSuccessAlert("Cleared!", "All chat history has been removed.");
      setMessages([]);
    } catch (error) {
      await loadingAlert.close();
      showErrorAlert("Clear Failed", "Failed to clear chat history. Please try again.");
      console.error("Error clearing messages:", error);
    }
  };

  // Debug: Check token with SweetAlert
  useEffect(() => {
    if (!token && open) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please login to use the chat feature.",
        icon: "warning",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          window.location.href = "/login";
        } else {
          setOpen(false);
        }
      });
    }
  }, [open, token]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button with notification badge */}
      <div className="relative">
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          onClick={handleToggleChat}
        >
          💬
          {messages.length > 0 && !open && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {messages.length > 9 ? '9+' : messages.length}
            </span>
          )}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center px-4 py-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full absolute -top-0 -right-0 animate-ping"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full absolute -top-0 -right-0"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Assistant</h3>
                <p className="text-xs opacity-80">
                  {(loading || sending) ? "Processing..." : "Online"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  className="text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition"
                  title="Clear chat history"
                >
                  🗑️
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-lg hover:text-gray-200 transition"
                title="Close chat"
              >
                ✖
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {/* Loading Indicator with SweetAlert2 style */}
            {loading && messages.length === 0 && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mx-auto mb-3"></div>
                <p className="text-gray-500 text-sm">Loading your conversation history...</p>
              </div>
            )}

            {/* No messages */}
            {!loading && messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💬</span>
                </div>
                <h4 className="font-semibold text-gray-700">Start a Conversation</h4>
                <p className="text-gray-500 text-sm mt-1">Ask me anything! I'm here to help.</p>
                <div className="mt-4 text-left bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-xs text-gray-600 mb-1">Try asking:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• "Hello, how can you help me?"</li>
                    <li>• "Explain machine learning in simple terms"</li>
                    <li>• "What's the weather like today?"</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message._id}
                className={`p-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                  message.sender !== "User"
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200"
                    : "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                } max-w-[85%] ${
                  message.sender !== "User" ? "mr-auto" : "ml-auto"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    message.sender !== "User" 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                      : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                  }`}>
                    {message.sender !== "User" ? "AI" : "U"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {message.sender}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {message.text}
                    </p>
                    <small className="text-xs text-gray-500 block mt-2">
                      {new Date(message.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </small>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Sending indicator */}
            {sending && (
              <div className="text-center py-2">
                <div className="inline-flex items-center space-x-2 text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                  <span className="text-sm">Sending message...</span>
                </div>
              </div>
            )}
            
            {/* Scroll Ref */}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer with Reply */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  disabled={loading || sending}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed pr-12"
                  onKeyPress={(e) => { 
                    if (e.key === 'Enter' && !sending && newMessage.trim()) {
                      handleReply();
                    }
                  }}
                  maxLength={2000}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  {newMessage.length}/2000
                </div>
              </div>
              <button
                onClick={handleReply}
                disabled={loading || sending || !newMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center w-12"
                title={sending ? "Sending..." : "Send message"}
              >
                {sending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                ) : (
                  <span className="text-lg">➤</span>
                )}
              </button>
            </div>
            {newMessage.length > 1500 && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Message getting too long ({newMessage.length}/2000)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
````

## File: all.md
````markdown
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

const token = localStorage.getItem("token");

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const prevCount = useRef(0);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newNotifications = res.data.adminMessages;

      if (prevCount.current && newNotifications.length > prevCount.current) {
        Swal.fire({
          icon: "info",
          title: "New Notification",
          text: "You have new messages",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          position: "top-end",
        });
      }

      prevCount.current = newNotifications.length;
      setNotifications(newNotifications);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

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
        Swal.fire({
          icon: "success",
          title: "Reply Sent!",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: "top-end",
        });

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

        Swal.fire({
          icon: "success",
          title: "Deleted",
          toast: true,
          timer: 1500,
          showConfirmButton: false,
          position: "top-end",
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: err.response?.data?.message || "Something went wrong",
        });
      }
    });
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight">
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
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No notifications yet
              </h3>
              <p className="text-gray-500">
                Messages from users will appear here
              </p>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-700 inline-block">
                          {notif.userId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md truncate">
                          {notif.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {new Date(notif.sentAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          <br />
                          <span className="text-gray-500 text-xs">
                            {new Date(notif.sentAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleReply(notif._id)}
                            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow"
                          >
                            Reply
                          </button>
                          {!notif.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(notif._id)}
                              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow"
                            >
                              Read
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notif._id)}
                            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow"
                          >
                            Delete
                          </button>
                        </div>
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
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-6 pt-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      Reply to User
                    </h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your reply message:
                    </label>
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
                        className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={sendReply}
                        disabled={!replyText.trim()}
                        className={`px-5 py-2.5 font-medium rounded-xl transition-all duration-200 ${
                          replyText.trim()
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-sm hover:shadow"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
````

## File: eslint.config.js
````javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
````

## File: index.html
````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
````

## File: jsconfig.json
````json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "src/*"
            ],
            "@components/*": [
                "src/components/*"
            ],
            "@utils/*": [
                "src/utils/*"
            ]
        }
    },
    "include": [
        "src"
    ]
}
````

## File: public/vite.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>
````

## File: README.md
````markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
````

## File: repomix.config.json
````json
{
  "$schema": "https://repomix.com/schemas/latest/schema.json",
  "input": {
    "maxFileSize": 52428800
  },
  "output": {
    "filePath": "repomix-output.md",
    "style": "markdown",
    "parsableStyle": false,
    "fileSummary": true,
    "directoryStructure": true,
    "files": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "compress": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "truncateBase64": false,
    "copyToClipboard": false,
    "includeFullDirectoryStructure": false,
    "tokenCountTree": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": false,
      "includeLogs": false,
      "includeLogsCount": 50
    }
  },
  "include": [],
  "ignore": {
    "useGitignore": true,
    "useDotIgnore": true,
    "useDefaultPatterns": true,
    "customPatterns": []
  },
  "security": {
    "enableSecurityCheck": true
  },
  "tokenCount": {
    "encoding": "o200k_base"
  }
}
````

## File: src/App.css
````css

````

## File: src/assets/react.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
````

## File: src/components/Banners.jsx
````javascript
import React, { useState, useEffect, useRef } from 'react';

export default function Banners({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const delay = 3000; // 3 seconds per slide

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => resetTimeout();
  }, [currentIndex, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="flex-shrink-0 w-full">
            <img src={src} alt={`banner-${idx}`} className="w-full h-64 object-cover rounded-lg" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
      >
        &#8594;
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 w-full flex justify-center space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              idx === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
````

## File: src/components/imageSlider.jsx
````javascript
import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function ImageSlider({ images = [] }) {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) return null;

  return (
    <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      {/* Main Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
        <img
          src={images[currentImage]}
          alt={`product-${currentImage}`}
          className="w-full h-full object-cover object-center"
        />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 sm:left-3 md:left-4 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-black/60 transition"
        >
          <AiOutlineLeft size={20} className="sm:text-[24px] md:text-[28px]" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 sm:right-3 md:right-4 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-black/60 transition"
        >
          <AiOutlineRight size={20} className="sm:text-[24px] md:text-[28px]" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 mt-3 justify-center overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
              currentImage === index ? "border-red-500" : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt={`thumb-${index}`}
              className="w-16 h-16 object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
````

## File: src/components/pages/about.jsx
````javascript
import React from 'react';

export default function About() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700 text-lg">
        Welcome to our website! This is the About page where you can share information
        about your company, mission, or services.
      </p>
    </div>
  );
}
````

## File: src/components/pages/admin/Dashboard/dashboard.jsx
````javascript
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

import Sidebar from "@/components/pages/admin/Dashboard/Sidebar";
import TopBar from "@/components/pages/admin/Dashboard/TopBar";
import DashboardRoutes from "@/components/pages/admin/Dashboard/DashboardRoutes";
import Footer from "@/components/pages/admin/Dashboard/Footer";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalRevenue: 0, newUsers: 0 });

  const navigate = useNavigate();

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
      }
    });
  };

  const authcheck = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      navigate("/login");
      setLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        Swal.fire({ icon: "error", title: "Access Denied", text: "Only administrators can access this dashboard" })
          .then(() => navigate("/"));
        setLoading(false);
        return;
      }
      setUser(decoded);
      setLoading(false);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    authcheck();
    window.addEventListener("authChange", authcheck);
    return () => window.removeEventListener("authChange", authcheck);
  }, [authcheck]);

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== "admin") return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar user={user} unreadCount={unreadCount} stats={stats} handleLogout={handleLogout} closeMobile={() => setMobileOpen(false)} />
      <TopBar user={user} mobileOpen={mobileOpen} toggleMobile={toggleMobile} />
      <div className="flex-1 lg:mt-15 lg:ml-20">
        <DashboardRoutes stats={stats} />
        <Footer />
      </div>
    </div>
  );
}
````

## File: src/components/pages/admin/Dashboard/Footer.jsx
````javascript
// Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-200">
      <p>Admin Dashboard v1.0 • © {new Date().getFullYear()} Your Company</p>
    </div>
  );
}
````

## File: src/components/pages/admin/Dashboard/Sidebar.jsx
````javascript
// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard, RxExit } from "react-icons/rx";
import {
  MdOutlineGridView,
  MdAddBox,
  MdNotifications,
  MdShoppingCart,
  MdBarChart,
  MdSettings,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";

export default function Sidebar({
  user,
  unreadCount,
  stats,
  handleLogout,
  closeMobile,
}) {
  return (
    <div className="fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 shadow-xl z-40 transition-transform duration-300">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Link to="/admin/dashboard" className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mr-3">
            <RxDashboard className="text-white text-xl" />
          </div>
          <span className="text-2xl font-bold text-gray-800">AdminPanel</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div>
            <div className="font-semibold text-gray-800">
              {user?.name || "Admin User"}
            </div>
            <div className="text-sm text-gray-500">
              {user?.email || "admin@example.com"}
            </div>
            <div className="text-xs mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full inline-block">
              Administrator
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Navigation
        </div>
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <RxDashboard size={20} className="text-blue-600" />
          Overview
        </Link>
        <Link
          to="/admin/dashboard/adminviewproducts"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdOutlineGridView size={20} className="text-green-600" />
          View Products
        </Link>
        <Link
          to="/admin/dashboard/addproducts"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdAddBox size={20} className="text-purple-600" />
          Add Product
        </Link>
        <Link
          to="/admin/dashboard/notification"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdNotifications size={20} className="text-red-600 relative" />
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </Link>
        <Link
          to="/admin/dashboard/orders"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdShoppingCart size={20} className="text-indigo-600" />
          Orders ({stats.totalOrders})
        </Link>
        <Link
          to="/admin/dashboard/users"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <FiUsers size={20} className="text-teal-600" />
          Users
        </Link>
        <Link
          to="/admin/dashboard/analytics"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdBarChart size={20} className="text-amber-600" />
          Analytics
        </Link>
        <Link
          to="/admin/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdSettings size={20} className="text-gray-600" />
          Settings
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium bg-red-50 text-red-600 hover:bg-red-100"
        >
          <RxExit size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
````

## File: src/components/pages/admin/Dashboard/StatCard.jsx
````javascript
// StatCard.jsx
import React from "react";

export default function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex items-center space-x-4">
      <div className={`p-3 rounded-full bg-opacity-10 ${color.replace("text-", "bg-")}`}>
        {React.cloneElement(icon, { className: color })}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
````

## File: src/components/pages/admin/Dashboard/TopBar.jsx
````javascript
// TopBar.jsx
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function TopBar({ user, mobileOpen, toggleMobile }) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-teal-500 p-4 flex justify-between items-center z-50 shadow-lg">
      <div className="flex items-center">
        <button onClick={toggleMobile} className="mr-4 text-white">
          <RxHamburgerMenu size={28} />
        </button>
        <h1 className="text-white text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <div className="text-sm text-blue-100">Welcome</div>
          <div className="text-white font-semibold">{user?.name || "Admin"}</div>
        </div>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{user?.name?.charAt(0) || "A"}</span>
        </div>
      </div>
    </div>
  );
}
````

## File: src/components/pages/admin/repomix-output.md
````markdown
This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
addProducts.jsx
AdminAllProductView.jsx
dashboard.jsx
EditProducts.jsx
notification.jsx
payment.jsx
repomix.config.json
```

# Files

## File: addProducts.jsx
```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import { FiUpload, FiImage, FiDollarSign, FiPackage, FiTag, FiShoppingCart } from "react-icons/fi";

export default function AddProducts() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    productId: uuidv4().substring(0, 8).toUpperCase(),
    productName: "",
    altNames: "",
    price: "",
    lastPrices: "",
    stock: "",
    description: "",
    category: "General",
    brand: "Unbranded",
  });

  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "Other"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        alert("Only administrators can add products.");
        navigate("/");
      }
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // Generate new product ID
  const generateNewId = () => {
    setFormData(prev => ({
      ...prev,
      productId: uuidv4().substring(0, 8).toUpperCase()
    }));
  };

  // Handle image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove image
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      alert("Product name is required");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert("Please enter a valid price");
      return false;
    }
    if (images.length === 0) {
      alert("Please upload at least one image");
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setUploading(true);
    const token = localStorage.getItem("token");
    
    try {
      // Upload images to Supabase
      const imgUrls = await Promise.all(
        images.map(file => uploadMediaToSupabase(file))
      );

      // Prepare payload
      const payload = {
        ...formData,
        productId: `PROD-${formData.productId}`,
        altNames: formData.altNames ? formData.altNames.split(",").map(n => n.trim()).filter(n => n) : [],
        price: parseFloat(formData.price),
        lastPrices: formData.lastPrices ? parseFloat(formData.lastPrices) : parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: imgUrls,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Send to backend
      const res = await axios.post(
        "http://localhost:4000/api/products",
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      console.log("Product saved:", res.data);
      
      // Show success message and reset form
      alert("✅ Product uploaded successfully!");
      
      // Reset form
      setFormData({
        productId: uuidv4().substring(0, 8).toUpperCase(),
        productName: "",
        altNames: "",
        price: "",
        lastPrices: "",
        stock: "",
        description: "",
        category: "General",
        brand: "Unbranded",
      });
      setImages([]);
      setImagePreviews([]);
      
      // Optional: Navigate to products page
      // navigate("/products");

    } catch (err) {
      console.error("Upload failed:", err);
      let errorMessage = "Failed to upload product.";
      
      if (err.response) {
        errorMessage = err.response.data?.message || err.response.statusText;
      } else if (err.request) {
        errorMessage = "No response from server. Check your connection.";
      }
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Add New Product</h1>
                <p className="text-blue-100 mt-2">Fill in the product details below</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={generateNewId}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  title="Generate new ID"
                >
                  🔄 New ID
                </button>
                <div className="text-right">
                  <div className="text-sm opacity-90">Product ID</div>
                  <div className="text-xl font-mono font-bold">PROD-{formData.productId}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiShoppingCart className="mr-2" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="Separate with commas (e.g., iPhone 15, Smartphone)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional: Other names customers might search for</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2" /> Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Price
                    </label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiPackage className="mr-2" /> Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Brand
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column - Images & Description */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2" /> Product Images *
                  </label>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-3 mb-3">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{imagePreviews.length} image(s) selected</p>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    <FiUpload className="text-3xl text-gray-400 mx-auto mb-3" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-gray-600 font-medium mb-1">Click to upload images</div>
                      <div className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</div>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the product features, specifications, etc."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading Product...
                      </>
                    ) : (
                      "Upload Product"
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    * Required fields. All product information will be saved to our database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: AdminAllProductView.jsx
```javascript
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiCopy, 
  FiDownload, 
  FiRefreshCw,
  FiPlus
} from "react-icons/fi";
import { MdGridView, MdList } from "react-icons/md";
import Swal from "sweetalert2";

export default function AdminAllProductView() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productsData = res.data?.data || res.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load products',
          confirmButtonColor: '#d33',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, token]);

  // Get unique categories and brands for filters
  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category).filter(Boolean);
    return ["all", ...new Set(allCategories)];
  }, [products]);

  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand).filter(Boolean);
    return ["all", ...new Set(allBrands)];
  }, [products]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.productName?.toLowerCase().includes(term) ||
        product.productId?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.altNames?.some(name => name.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== "all") {
      result = result.filter(product => product.brand === selectedBrand);
    }

    // Sorting
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "stock":
        result.sort((a, b) => b.stock - a.stock);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchTerm, selectedCategory, selectedBrand, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleDelete = async (productId, productName) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      html: `Are you sure you want to delete <strong>"${productName}"</strong>?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Product has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });

        // Remove from state
        setProducts(prev => prev.filter(p => p.productId !== productId));
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: err.response?.data?.message || 'Failed to delete product',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Selection',
        text: 'Please select products to delete',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Bulk Delete?',
      html: `Are you sure you want to delete ${selectedProducts.size} product(s)?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Delete ${selectedProducts.size} Items`,
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        const deletePromises = Array.from(selectedProducts).map(productId =>
          axios.delete(`http://localhost:4000/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        await Promise.all(deletePromises);

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `${selectedProducts.size} product(s) deleted`,
          timer: 2000,
          showConfirmButton: false
        });

        // Refresh products
        setProducts(prev => prev.filter(p => !selectedProducts.has(p.productId)));
        setSelectedProducts(new Set());
      } catch (err) {
        console.error("Bulk delete error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: 'Failed to delete selected products',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === currentProducts.length) {
      setSelectedProducts(new Set());
    } else {
      const allIds = new Set(currentProducts.map(p => p.productId));
      setSelectedProducts(allIds);
    }
  };

  const handleSelectProduct = (productId) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Product ID copied to clipboard',
      timer: 1500,
      showConfirmButton: false
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Products Management</h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} products • {selectedProducts.size} selected
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            onClick={() => navigate("/admin/dashboard/addproducts")}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 transition"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            title="Refresh"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, ID, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded ${viewMode === "table" ? "bg-white shadow" : "text-gray-600"}`}
            >
              <MdList size={20} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded ${viewMode === "grid" ? "bg-white shadow" : "text-gray-600"}`}
            >
              <MdGridView size={20} />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand === "all" ? "All Brands" : brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Stock: High to Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bulk Actions</label>
            <div className="flex space-x-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Action</option>
                <option value="delete">Delete Selected</option>
                <option value="export">Export Selected</option>
              </select>
              <button
                onClick={() => bulkAction === "delete" && handleBulkDelete()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                disabled={!bulkAction}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Selection */}
        {selectedProducts.size > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="text-blue-700 font-medium">
              {selectedProducts.size} product(s) selected
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedProducts(new Set())}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table (Table View) */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.size === currentProducts.length && currentProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr key={product.productId} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.productId)}
                          onChange={() => handleSelectProduct(product.productId)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            {product.images?.[0] ? (
                              <img
                                className="h-16 w-16 object-cover rounded-lg"
                                src={product.images[0]}
                                alt={product.productName}
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.productName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <span className="font-mono">{product.productId}</span>
                              <button
                                onClick={() => copyToClipboard(product.productId)}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                                title="Copy ID"
                              >
                                <FiCopy size={14} />
                              </button>
                            </div>
                            <div className="text-xs text-gray-400 truncate max-w-xs">
                              {product.description?.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          ${parseFloat(product.price).toFixed(2)}
                        </div>
                        {product.lastPrices && product.lastPrices > product.price && (
                          <div className="text-xs text-gray-500 line-through">
                            ${parseFloat(product.lastPrices).toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock} units
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/product/${product.productId}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => navigate("/admin/dashboard/editproducts", { state: { product } })}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product.productId, product.productName)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-lg mb-2">No products found</div>
                      <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                          setSelectedBrand("all");
                        }}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Clear all filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.productId} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="relative">
                  {product.images?.[0] ? (
                    <img
                      className="w-full h-48 object-cover"
                      src={product.images[0]}
                      alt={product.productName}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.productId)}
                    onChange={() => handleSelectProduct(product.productId)}
                    className="absolute top-2 left-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{product.productName}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-blue-600">${parseFloat(product.price).toFixed(2)}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate("/admin/dashboard/editproducts", { state: { product } })}
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.productId, product.productName)}
                        className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">{product.category}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📦</div>
              <div className="text-gray-600 text-xl mb-2">No products found</div>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## File: dashboard.jsx
```javascript
import React, { useEffect, useState } from "react";
import { 
  RxHamburgerMenu, 
  RxDashboard, 
  RxPerson, 
  RxExit 
} from "react-icons/rx";
import { 
  MdOutlineGridView, 
  MdAddBox, 
  MdEdit, 
  MdNotifications,
  MdShoppingCart,
  MdBarChart,
  MdSettings,
  MdChevronRight,
  MdChevronLeft
} from "react-icons/md";
import { 
  FiUsers, 
  FiPackage, 
  FiDollarSign, 
  FiTrendingUp 
} from "react-icons/fi";
import { Link, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AddProducts from "./addProducts";
import AdminAllProductView from "./AdminAllProductView";
import EditProducts from "./EditProducts";
import Notification from "./notification";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Stats for dashboard
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    newUsers: 0,
  });

  // Auth check
  const authcheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'Only administrators can access this dashboard',
          confirmButtonColor: '#d33',
        }).then(() => {
          navigate("/");
        });
        return;
      }
      setUser(decoded);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      // Mock data for now
      setStats({
        totalProducts: 128,
        totalOrders: 45,
        totalRevenue: 12500,
        newUsers: 12,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    authcheck();
    fetchStats();
    window.addEventListener("authChange", authcheck);
    setLoading(false);
    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: "Are you sure you want to logout?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Top Bar - Only on Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-teal-500 p-4 flex justify-between items-center z-50 shadow-lg">
        <div className="flex items-center">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mr-4 text-white"
          >
            <RxHamburgerMenu size={28} />
          </button>
          <h1 className="text-white text-xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm text-blue-100">Welcome</div>
            <div className="text-white font-semibold">{user?.name || "Admin"}</div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">
              {user?.name?.charAt(0) || "A"}
            </span>
          </div>
        </div>
      </div>

      {/* SIDEBAR - Always visible on desktop, collapsible on mobile */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 shadow-xl z-40 transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link to="/admin/dashboard" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mr-3">
              <RxDashboard className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-gray-800">AdminPanel</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{user?.name || "Admin User"}</div>
              <div className="text-sm text-gray-500">{user?.email || "admin@example.com"}</div>
              <div className="text-xs mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full inline-block">
                Administrator
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-2">
            {/* Main Navigation */}
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
              Navigation
            </div>

            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-blue-600">
                <RxDashboard size={20} />
              </div>
              <span>Overview</span>
            </Link>

            <Link
              to="/admin/dashboard/adminviewproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-green-600">
                <MdOutlineGridView size={20} />
              </div>
              <span>View Products</span>
            </Link>

            <Link
              to="/admin/dashboard/addproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-purple-600">
                <MdAddBox size={20} />
              </div>
              <span>Add Product</span>
            </Link>


                        <Link
              to="/admin/dashboard/addproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-purple-600">
                <MdAddBox size={20} />
              </div>
              <span>Ads Managements</span>
            </Link>

            <Link
              to="/admin/dashboard/notification"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-red-600 relative">
                <MdNotifications size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <span>Notifications</span>
              <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                3 new
              </span>
            </Link>

            {/* Additional Sections */}
            <>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider my-4 px-2">
                Analytics
              </div>

              <Link
                to="/admin/dashboard/orders"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-indigo-600">
                  <MdShoppingCart size={20} />
                </div>
                <span>Orders</span>
                <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">45</span>
              </Link>

              <Link
                to="/admin/dashboard/users"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-teal-600">
                  <FiUsers size={20} />
                </div>
                <span>Users</span>
              </Link>

              <Link
                to="/admin/dashboard/analytics"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-amber-600">
                  <MdBarChart size={20} />
                </div>
                <span>Analytics</span>
              </Link>

              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider my-4 px-2">
                Settings
              </div>

              <Link
                to="/admin/dashboard/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-gray-600">
                  <MdSettings size={20} />
                </div>
                <span>Settings</span>
              </Link>
            </>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium bg-red-50 text-red-600 hover:bg-red-100 transition group"
          >
            <RxExit size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className=" w-full lg:ml-10">
        {/* Overlay for mobile sidebar */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Dashboard Header */}
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Welcome back, {user?.name?.split(' ')[0] || "Admin"}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your store today.
              </p>
            </div>
            <div className="mt-2 lg:mt-0">
              <div className="text-sm text-gray-500">Last updated</div>
              <div className="text-md font-semibold text-gray-700">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { 
                title: "Total Products", 
                value: stats.totalProducts, 
                icon: <FiPackage className="text-blue-600" size={24} />, 
                change: "+12%", 
                color: "bg-blue-50", 
                textColor: "text-blue-600" 
              },
              { 
                title: "Total Orders", 
                value: stats.totalOrders, 
                icon: <MdShoppingCart className="text-green-600" size={24} />, 
                change: "+8%", 
                color: "bg-green-50", 
                textColor: "text-green-600" 
              },
              { 
                title: "Total Revenue", 
                value: `$${stats.totalRevenue.toLocaleString()}`, 
                icon: <FiDollarSign className="text-purple-600" size={24} />, 
                change: "+23%", 
                color: "bg-purple-50", 
                textColor: "text-purple-600" 
              },
              { 
                title: "New Users", 
                value: stats.newUsers, 
                icon: <FiUsers className="text-orange-600" size={24} />, 
                change: "+5%", 
                color: "bg-orange-50", 
                textColor: "text-orange-600" 
              },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className={`text-sm font-semibold ${stat.textColor}`}>
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTERED CONTENT AREA */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[500px] flex flex-col">
              <Routes>
                <Route index element={
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6">📊</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
                    <p className="text-gray-600 max-w-2xl mb-8">
                      Select a section from the sidebar to manage products, view notifications, or access other admin features.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                      <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
                        <div className="text-blue-600 font-bold text-lg mb-2">📦 Products</div>
                        <div className="text-gray-600 text-sm">Manage your product inventory</div>
                      </div>
                      <div className="p-6 bg-green-50 border border-green-100 rounded-xl text-center">
                        <div className="text-green-600 font-bold text-lg mb-2">🛒 Orders</div>
                        <div className="text-gray-600 text-sm">View and manage customer orders</div>
                      </div>
                      <div className="p-6 bg-purple-50 border border-purple-100 rounded-xl text-center">
                        <div className="text-purple-600 font-bold text-lg mb-2">📈 Analytics</div>
                        <div className="text-gray-600 text-sm">Track store performance</div>
                      </div>
                    </div>
                  </div>
                } />
                <Route path="adminviewproducts" element={<AdminAllProductView />} />
                <Route path="addproducts" element={<AddProducts />} />
                <Route path="editproducts" element={<EditProducts />} />
                <Route path="notification" element={<Notification />} />
                <Route path="*" element={
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6">🔍</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 max-w-md mb-8">
                      The page you're looking for doesn't exist in the admin dashboard.
                    </p>
                    <button 
                      onClick={() => navigate('/admin/dashboard')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-200">
          <p>Admin Dashboard v1.0 • © {new Date().getFullYear()} Your Company</p>
        </div>
      </div>
    </div>
  );
}
```

## File: EditProducts.jsx
```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { 
  FiEdit, 
  FiSave, 
  FiTrash2, 
  FiImage, 
  FiPackage, 
  FiDollarSign, 
  FiTag, 
  FiGrid,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiBox
} from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  
  // Status options
  const statusOptions = [
    { value: "pending", label: "Pending", icon: FiClock, color: "bg-yellow-100 text-yellow-800" },
    { value: "ready", label: "Ready", icon: FiCheckCircle, color: "bg-green-100 text-green-800" },
    { value: "delivered", label: "Delivered", icon: FiTruck, color: "bg-blue-100 text-blue-800" },
    { value: "out_of_stock", label: "Out of Stock", icon: FiBox, color: "bg-red-100 text-red-800" },
  ];

  // Categories and brands for dropdown
  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food", "Office"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "HP", "Microsoft", "Other"];

  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    altNames: "",
    price: "",
    lastPrices: "",
    stock: "",
    description: "",
    category: "General",
    brand: "Unbranded",
    status: "pending", // Added status field
  });

  // Fetch product data
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        let productData;
        
        if (location.state?.product) {
          productData = location.state.product;
        } else if (id) {
          const response = await axios.get(
            `http://localhost:4000/api/products/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          productData = response.data;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Product Selected',
            text: 'Please select a product to edit',
            confirmButtonColor: '#d33',
          }).then(() => navigate("/admin/products"));
          return;
        }

        // Set form data including status
        setFormData({
          productId: productData.productId || "",
          productName: productData.productName || "",
          altNames: productData.altNames?.join(", ") || "",
          price: productData.price || "",
          lastPrices: productData.lastPrices || productData.price || "",
          stock: productData.stock || "",
          description: productData.description || "",
          category: productData.category || "General",
          brand: productData.brand || "Unbranded",
          status: productData.status || "pending", // Set status from API
        });

        if (productData.images && Array.isArray(productData.images)) {
          setExistingImageUrls(productData.images);
        }

      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load product data',
          confirmButtonColor: '#d33',
        }).then(() => navigate("/admin/products"));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [token, navigate, location.state, id]);

  // Handle new image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove new image preview
  const removeNewImage = (index) => {
    const newImagesCopy = [...newImages];
    const newPreviews = [...imagePreviews];
    
    URL.revokeObjectURL(newPreviews[index]);
    newImagesCopy.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setNewImages(newImagesCopy);
    setImagePreviews(newPreviews);
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    Swal.fire({
      title: 'Remove Image?',
      text: "This image will be removed from the product",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newExistingImages = [...existingImageUrls];
        newExistingImages.splice(index, 1);
        setExistingImageUrls(newExistingImages);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Quick status update handler
  const handleQuickStatusUpdate = (newStatus) => {
    Swal.fire({
      title: `Change Status to ${newStatus.toUpperCase()}?`,
      text: `Are you sure you want to change product status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update status!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(prev => ({ ...prev, status: newStatus }));
        Swal.fire({
          icon: 'success',
          title: 'Status Updated!',
          text: `Product status changed to ${newStatus}`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Product name is required',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Price',
        text: 'Please enter a valid price',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    if (existingImageUrls.length === 0 && newImages.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No Images',
        text: 'Please add at least one product image',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    
    try {
      // Upload new images
      const uploadedImages = newImages.length > 0 
        ? await Promise.all(newImages.map(uploadMediaToSupabase))
        : [];

      // Prepare payload including status
      const payload = {
        ...formData,
        altNames: formData.altNames 
          ? formData.altNames.split(",").map(n => n.trim()).filter(n => n)
          : [],
        price: parseFloat(formData.price),
        lastPrices: formData.lastPrices ? parseFloat(formData.lastPrices) : parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: [...existingImageUrls, ...uploadedImages],
        status: formData.status, // Include status in payload
        updatedAt: new Date().toISOString(),
      };

      // Update product
      await axios.patch(
        `http://localhost:4000/api/products/${formData.productId}`,
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      // Success alert
      await Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        text: 'Product has been successfully updated',
        showConfirmButton: false,
        timer: 2000
      });

      // Reset image states
      setNewImages([]);
      setImagePreviews([]);

      // Navigate back
      navigate("/admin/dashboard/adminviewproducts");

    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update product. Please try again.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading product data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Status */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <p className="text-blue-100 mt-2">Update product information</p>
              </div>
              <div className="mt-4 md:mt-0 space-y-2">
                <div className="text-sm opacity-90">Product ID</div>
                <div className="text-xl font-mono font-bold">{formData.productId}</div>
                
                {/* Current Status Display */}
                <div className="flex items-center space-x-2 mt-3">
                  <div className="text-sm opacity-90">Current Status:</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
                  }`}>
                    {statusOptions.find(s => s.value === formData.status)?.label || "Unknown"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Product Info */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiPackage className="mr-2" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                {/* Alternate Names */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="Separate with commas"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2" /> Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Price
                    </label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiGrid className="mr-2" /> Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Status Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Status
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {statusOptions.map((status) => (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() => handleQuickStatusUpdate(status.value)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                          formData.status === status.value
                            ? 'border-blue-500 bg-blue-50 scale-105'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <status.icon className={`h-6 w-6 mb-2 ${
                          formData.status === status.value ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          formData.status === status.value ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {status.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Select product status from dropdown or click on status cards above
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Right Column - Images */}
              <div className="space-y-6">
                {/* Existing Images */}
                {existingImageUrls.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Images ({existingImageUrls.length})
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {existingImageUrls.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Product ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Preview */}
                {imagePreviews.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Images to Add ({imagePreviews.length})
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`New ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <MdClose size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2" /> Add More Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FiImage className="text-4xl text-gray-400 mx-auto mb-4" />
                      <div className="text-gray-600 font-medium mb-2">Click to upload new images</div>
                      <div className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</div>
                    </label>
                  </div>
                </div>

                {/* Status Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <FiCheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Status Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
                      }`}>
                        {statusOptions.find(s => s.value === formData.status)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Stock Level:</span>
                      <span className={`font-medium ${
                        parseInt(formData.stock) > 10 ? 'text-green-600' : 
                        parseInt(formData.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {formData.stock || 0} units
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-3">
                      💡 <strong>Status Guide:</strong> Pending → Ready → Delivered
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 space-y-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Update Product
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate("/admin/dashboard/adminviewproducts")}
                      className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: 'Update Only Status?',
                          text: 'Would you like to update just the status without saving other changes?',
                          icon: 'question',
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: 'Save All Changes',
                          denyButtonText: 'Update Status Only',
                          cancelButtonText: 'Cancel'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleSave();
                          } else if (result.isDenied) {
                            // Update only status
                            const statusOnlyPayload = { status: formData.status };
                            axios.patch(
                              `http://localhost:4000/api/products/${formData.productId}`,
                              statusOnlyPayload,
                              { 
                                headers: { 
                                  Authorization: `Bearer ${token}`,
                                  'Content-Type': 'application/json'
                                } 
                              }
                            ).then(() => {
                              Swal.fire({
                                icon: 'success',
                                title: 'Status Updated!',
                                text: 'Product status has been updated',
                                timer: 1500,
                                showConfirmButton: false
                              });
                            }).catch(error => {
                              console.error("Status update failed:", error);
                              Swal.fire({
                                icon: 'error',
                                title: 'Status Update Failed',
                                text: 'Failed to update product status',
                                confirmButtonColor: '#d33',
                              });
                            });
                          }
                        });
                      }}
                      className="w-full px-6 py-3 border border-blue-300 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Preview</h3>
            <div className={`px-4 py-1 rounded-full text-sm font-medium ${
              statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
            }`}>
              {statusOptions.find(s => s.value === formData.status)?.label}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Preview */}
            <div className="md:w-1/3">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                {existingImageUrls.length > 0 || imagePreviews.length > 0 ? (
                  <img
                    src={existingImageUrls[0] || imagePreviews[0]}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Product Status</div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    formData.status === 'pending' ? 'bg-yellow-500' :
                    formData.status === 'ready' ? 'bg-green-500' :
                    formData.status === 'delivered' ? 'bg-blue-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className="text-gray-700">{statusOptions.find(s => s.value === formData.status)?.label}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {formData.status === 'pending' && 'Product is awaiting processing'}
                  {formData.status === 'ready' && 'Product is ready for delivery'}
                  {formData.status === 'delivered' && 'Product has been delivered'}
                  {formData.status === 'out_of_stock' && 'Product is currently out of stock'}
                </p>
              </div>
            </div>
            
            {/* Info Preview */}
            <div className="md:w-2/3">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{formData.productName || "Product Name"}</h4>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-blue-600 mr-3">
                  ${parseFloat(formData.price || 0).toFixed(2)}
                </span>
                {formData.lastPrices && parseFloat(formData.lastPrices) > parseFloat(formData.price) && (
                  <span className="text-lg text-gray-500 line-through">
                    ${parseFloat(formData.lastPrices).toFixed(2)}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{formData.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Brand</div>
                  <div className="font-medium">{formData.brand}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Stock</div>
                  <div className={`font-medium ${
                    parseInt(formData.stock) > 10 ? 'text-green-600' : 
                    parseInt(formData.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {formData.stock || 0} units
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Product ID</div>
                  <div className="font-mono font-medium">{formData.productId}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Availability</div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    formData.status === 'out_of_stock' 
                      ? 'bg-red-100 text-red-800' 
                      : parseInt(formData.stock) > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {formData.status === 'out_of_stock' 
                      ? 'Out of Stock' 
                      : parseInt(formData.stock) > 0 
                        ? 'In Stock' 
                        : 'Low Stock'}
                  </div>
                  {formData.status === 'delivered' && (
                    <div className="text-sm text-gray-600 flex items-center">
                      <FiTruck className="h-4 w-4 mr-1" /> Delivered
                    </div>
                  )}
                </div>
              </div>
              <div className="text-gray-600">
                {formData.description || "No description provided"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: notification.jsx
```javascript
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
          headers: { Authorization: `Bearer ${token}` },
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
            Authorization: `Bearer ${token}`,
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
```

## File: payment.jsx
```javascript
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Shield, Lock, CheckCircle, ArrowLeft, 
  Truck, Package, Wallet, DollarSign 
} from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (!orderData) {
      Swal.fire({
        icon: 'error',
        title: 'Order Data Missing',
        text: 'Please complete the shipping process first.',
      }).then(() => {
        navigate('/shipping');
      });
      return;
    }

    // Get user info from order data or fetch from API
    const token = localStorage.getItem('token');
    if (token && orderData.userInfo) {
      setUserInfo(orderData.userInfo);
    }
  }, [orderData, navigate]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
    } 
    // Format CVV to max 3-4 digits
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    }
    // Format expiry month/year
    else if (name === 'expiryMonth') {
      const formatted = value.replace(/\D/g, '').slice(0, 2);
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    }
    else if (name === 'expiryYear') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    }
    else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateCardDetails = () => {
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
      return 'Please enter a valid 16-digit card number';
    }
    if (!cardDetails.cardName) {
      return 'Please enter the name on card';
    }
    if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
      return 'Please enter card expiry date';
    }
    const month = parseInt(cardDetails.expiryMonth);
    const year = parseInt(cardDetails.expiryYear);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    if (month < 1 || month > 12) {
      return 'Invalid expiry month';
    }
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      return 'Please enter a valid CVV';
    }
    return null;
  };

  const handlePlaceOrder = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please log in to complete your order.',
    });
    navigate('/login');
    return;
  }

  if (!orderData) {
    Swal.fire({
      icon: 'error',
      title: 'Order Error',
      text: 'Order data is missing. Please try again.',
    });
    return;
  }

  if (paymentMethod === 'card') {
    const validationError = validateCardDetails();
    if (validationError) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: validationError,
      });
      return;
    }
  }

  // Confirm with Swal first
  const result = await Swal.fire({
    title: 'Confirm Order',
    html: `... your summary HTML ...`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Place Order',
    cancelButtonText: 'Cancel'
  });

  if (!result.isConfirmed) return;

  setLoading(true);

  try {
    // Send order to backend
    const response = await axios.post(
      'http://localhost:4000/api/orders', // your backend route
      {
        ...orderData,
        paymentMethod,
        cardDetails: paymentMethod === 'card' ? cardDetails : null
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const savedOrder = response.data;

    // Show success Swal
    await Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      html: `
        <p>Order #${savedOrder._id} has been placed successfully.</p>
        <p>Total: Rs. ${savedOrder.total?.toFixed(2)}</p>
      `,
      showConfirmButton: true
    });

    navigate('/orders'); // go to order list page
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Order Failed',
      text: error.response?.data?.message || 'Something went wrong!',
    });
  } finally {
    setLoading(false);
  }
};


  const handleBackToShipping = () => {
    navigate('/shipping', { state: { quoteData: orderData } });
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Order Found</h2>
          <p className="text-gray-600 mb-4">Please complete the shipping process first.</p>
          <button
            onClick={() => navigate('/shipping')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Shipping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackToShipping}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Shipping
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-500 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
              <p className="text-gray-600">Secure payment gateway - Your information is protected</p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-8 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Cart</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
            
            <div className="flex-1 h-1 bg-green-500 mx-4"></div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Shipping</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
            
            <div className="flex-1 h-1 bg-green-500 mx-4"></div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Payment</p>
                <p className="text-xs text-gray-500">Current Step</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                Select Payment Method
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'card' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <CreditCard className={`h-5 w-5 ${paymentMethod === 'card' ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-500">Pay with Visa, MasterCard</p>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'wallet' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'wallet' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <Wallet className={`h-5 w-5 ${paymentMethod === 'wallet' ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Digital Wallet</p>
                    <p className="text-sm text-gray-500">Apple Pay, Google Pay</p>
                  </div>
                  {paymentMethod === 'wallet' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'bank' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'bank' ? 'bg-purple-100' : 'bg-gray-100'}`}>
          <DollarSign className={`h-5 w-5 ${paymentMethod === 'bank' ? 'text-purple-600' : 'text-gray-600'}`} />

                  </div>
                  <div className="text-left">
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Direct bank payment</p>
                  </div>
                  {paymentMethod === 'bank' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'cod' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'cod' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <Truck className={`h-5 w-5 ${paymentMethod === 'cod' ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive</p>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-blue-500" />
                    Card Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        maxLength="19"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardDetails.cardName}
                        onChange={handleCardInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Month *
                        </label>
                        <input
                          type="text"
                          name="expiryMonth"
                          value={cardDetails.expiryMonth}
                          onChange={handleCardInputChange}
                          placeholder="MM"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          maxLength="2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Year *
                        </label>
                        <input
                          type="text"
                          name="expiryYear"
                          value={cardDetails.expiryYear}
                          onChange={handleCardInputChange}
                          placeholder="YYYY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          maxLength="4"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          maxLength="4"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-sm text-gray-600">
                        Your card details are encrypted and secure. We do not store your card information.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Payment Method Messages */}
              {paymentMethod !== 'card' && (
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <Shield className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {paymentMethod === 'wallet' && 'Digital Wallet Payment'}
                        {paymentMethod === 'bank' && 'Bank Transfer'}
                        {paymentMethod === 'cod' && 'Cash on Delivery'}
                      </h4>
                      <p className="text-gray-600">
                        {paymentMethod === 'wallet' && 'You will be redirected to your preferred digital wallet for secure payment.'}
                        {paymentMethod === 'bank' && 'Bank transfer details will be provided after order confirmation.'}
                        {paymentMethod === 'cod' && 'Pay when your order is delivered. Additional charges may apply.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2 text-amber-500" />
                Order Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rs. {orderData.labeledTotal?.toFixed(2)}</span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>- Rs. {orderData.discount?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Total Amount</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">Rs. {orderData.total?.toFixed(2)}</p>
                      {orderData.discount > 0 && (
                        <p className="text-sm text-green-600">
                          You saved Rs. {orderData.discount?.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Items in Order ({orderData.items?.length || 0})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {orderData.items?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.images?.[0] ? (
                            <img src={item.images[0]} alt={item.productName} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Package className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <p className="font-semibold">Rs. {(item.lastPrice * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Summary & Button */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Security Assurance */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Secure Payment
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>PCI DSS compliant</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>No card details stored</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Money-back guarantee</span>
                  </li>
                </ul>
              </div>

              {/* Payment Summary & Button */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Payment Summary</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Order #{orderData.orderId}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items Total</span>
                      <span>Rs. {orderData.labeledTotal?.toFixed(2)}</span>
                    </div>
                    {orderData.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>- Rs. {orderData.discount?.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total to Pay</span>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">Rs. {orderData.total?.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">including all taxes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mb-6">
                  <div className="flex items-start mb-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-purple-600 rounded mt-1 mr-2"
                      defaultChecked
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <button className="text-purple-600 hover:text-purple-700">Terms & Conditions</button>{' '}
                      and{' '}
                      <button className="text-purple-600 hover:text-purple-700">Privacy Policy</button>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    By completing this purchase, you agree to our terms and authorize the charge to your selected payment method.
                  </p>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>
                        Pay Rs. {orderData.total?.toFixed(2)}
                      </span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Secured by SSL encryption
                </p>
              </div>

              {/* Support Info */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Need help?{' '}
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Contact Customer Support
                  </button>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  You can cancel your order within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: repomix.config.json
```json
{
  "$schema": "https://repomix.com/schemas/latest/schema.json",
  "input": {
    "maxFileSize": 52428800
  },
  "output": {
    "filePath": "repomix-output.md",
    "style": "markdown",
    "parsableStyle": false,
    "fileSummary": true,
    "directoryStructure": true,
    "files": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "compress": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "truncateBase64": false,
    "copyToClipboard": false,
    "includeFullDirectoryStructure": false,
    "tokenCountTree": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": false,
      "includeLogs": false,
      "includeLogsCount": 50
    }
  },
  "include": [],
  "ignore": {
    "useGitignore": true,
    "useDotIgnore": true,
    "useDefaultPatterns": true,
    "customPatterns": []
  },
  "security": {
    "enableSecurityCheck": true
  },
  "tokenCount": {
    "encoding": "o200k_base"
  }
}
```
````

## File: src/components/pages/admin/repomix.config.json
````json
{
  "$schema": "https://repomix.com/schemas/latest/schema.json",
  "input": {
    "maxFileSize": 52428800
  },
  "output": {
    "filePath": "repomix-output.md",
    "style": "markdown",
    "parsableStyle": false,
    "fileSummary": true,
    "directoryStructure": true,
    "files": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "compress": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "truncateBase64": false,
    "copyToClipboard": false,
    "includeFullDirectoryStructure": false,
    "tokenCountTree": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": false,
      "includeLogs": false,
      "includeLogsCount": 50
    }
  },
  "include": [],
  "ignore": {
    "useGitignore": true,
    "useDotIgnore": true,
    "useDefaultPatterns": true,
    "customPatterns": []
  },
  "security": {
    "enableSecurityCheck": true
  },
  "tokenCount": {
    "encoding": "o200k_base"
  }
}
````

## File: src/components/pages/NotFound.jsx
````javascript
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
````

## File: src/components/pages/service.jsx
````javascript
import React from 'react';

export default function Service() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>
      <p className="text-gray-700 text-lg">
        Here you can describe the services your company offers. Add details to help
        users understand what you provide.
      </p>
    </div>
  );
}
````

## File: src/components/pages/singUp.jsx
````javascript
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: "customer",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/users/signup", formData);
      console.log("User created:", response.data);
      setLoading(false);
      navigate("/login"); // redirect after signup
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="border p-2 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL (optional)"
          value={formData.profileImage}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
````

## File: src/components/utils/cart.jsx
````javascript
export function loadCart() {
  const cart = localStorage.getItem("cart");
  if (cart != null) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

export function addToCart(productId, qty) {
  const cart = loadCart();
  const index = cart.findIndex((item) => {
    return item.productId == productId;
  });
  if (index == -1) {
    cart.push({ productId, qty });
  } else {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].qty = newQty;
    }
  }
  saveCart(cart);
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function deleteItem(productId) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId == productId);
  if (index != -1) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}




// මේක ඔයාගේ cart.js ෆයිල් එකේ අන්තිමට එකතු කරන්න

export function updateItemQty(productId, qty) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId == productId);
  
  if (index != -1) {
    if (qty <= 0) {
      // ප්‍රමාණය 0 හෝ ඊට අඩු නම් item එක ඉවත් කරන්න
      cart.splice(index, 1);
    } else {
      // නැත්නම් අලුත් ප්‍රමාණය set කරන්න
      cart[index].qty = qty;
    }
    saveCart(cart);
  }
}
````

## File: src/components/utils/mediaupload.jsx
````javascript
import { createClient } from "@supabase/supabase-js";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc2JlZWxmZHFqaGZ5Z2hnb3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMzA2NjgsImV4cCI6MjA3OTgwNjY2OH0.WbA2YyeUh9XiZo2yJpLt0Lj4Fs9u44N7E3W94oAGhkY";

const url = "https://sosbeelfdqjhfyghgoqm.supabase.co";

const supabase = createClient(url, key);

export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("File not added");
    }

    let fileName = file.name;
    const extension = fileName.split(".")[fileName.split(".").length - 1];
    const timestamp = new Date().getTime();
    fileName = timestamp + file.name + "." + extension;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;
        resolve(publicUrl);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
````

## File: src/components/utils/voice.jsx
````javascript
export function speakText(text) {
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";       // Change language if needed
  utterance.rate = 1;             // Speed of speech
  utterance.pitch = 1;            // Voice pitch
  window.speechSynthesis.speak(utterance);
}
````

## File: src/index.css
````css
@import "tailwindcss";
````

## File: src/main.jsx
````javascript
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(

    <App />

)
````

## File: vercel.json
````json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
````

## File: .gitignore
````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
.env

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
````

## File: aichatbot.text
````
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function AiChatbot() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [adminMessageCount, setAdminMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);
  const inputRef = useRef(null);
  const notificationSoundRef = useRef(null);

  // Initialize notification sound
  useEffect(() => {
    notificationSoundRef.current = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
    );
    notificationSoundRef.current.volume = 0.3;
  }, []);

  // Fetch messages and check for admin messages
  const fetchMessages = async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      setMessages([]);
      return;
    }
    try {
      const res = await axios.get("http://localhost:4000/api/messages/getMessages", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      const fetchedMessages = res.data.messages || [];
      setMessages(fetchedMessages);
      
      // Check for admin messages (messages sent by admin)
      const hasAdminMessage = fetchedMessages.some(msg => 
        msg.text && msg.text.includes("admin:") || msg.text.includes("Admin:")
      );
      
      if (hasAdminMessage && !open) {
        triggerAdminNotification();
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Listen for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem("token"));
      fetchMessages();
    };
    
    const handleLogout = () => {
      setMessages([]);
      setToken(null);
    };

    // Listen for admin messages (you can trigger this from backend)
    const handleAdminMessage = (event) => {
      if (event.detail && event.detail.adminMessage) {
        triggerAdminNotification();
      }
    };

    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("logout", handleLogout);
    window.addEventListener("adminMessageReceived", handleAdminMessage);

    fetchMessages();

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("logout", handleLogout);
      window.removeEventListener("adminMessageReceived", handleAdminMessage);
    };
  }, [open]);

  // Setup speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
        stopSpeaking();
        sendHandle(transcript, true);
      };

      recognition.current.onend = () => setListening(false);
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [open]);

  // Trigger admin notification
  const triggerAdminNotification = () => {
    setAdminMessageCount(prev => prev + 1);
    setShowNotification(true);
    
    // Play notification sound
    if (notificationSoundRef.current) {
      notificationSoundRef.current.play().catch(e => console.log("Sound play error:", e));
    }
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Close notification
  const closeNotification = () => {
    setShowNotification(false);
    setAdminMessageCount(0);
  };

  // Voice controls
  const handleVoice = () => {
    if (!recognition.current) return;
    if (listening) {
      recognition.current.stop();
      setListening(false);
    } else {
      recognition.current.start();
      setListening(true);
      stopSpeaking();
    }
  };

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    setSpeaking(true);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.onend = () => setSpeaking(false);
    speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  // Fetch AI reply
  const fetchAiReply = async (userText) => {
    try {
      setIsTyping(true);
      const currentToken = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:4000/api/simai/reply",
        { query: userText },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
      setIsTyping(false);
      return res.data.reply || "No response from AI.";
    } catch (err) {
      setIsTyping(false);
      console.error("Error fetching AI reply:", err);
      return "Sorry, I couldn't find an answer in my knowledge base.";
    }
  };

  // Send message
  const sendHandle = async (voiceInput = null, isVoice = false) => {
    const textToSend = voiceInput || input;
    if (!textToSend?.trim()) return;

    const newMessage = {
      sender: "user",
      text: textToSend,
      _id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Admin message handling (user sending to admin)
    if (textToSend.toLowerCase().includes("@admin")) {
      const textAfterAdmin = textToSend.split("@admin")[1]?.trim();
      if (!textAfterAdmin) {
        console.error("You must type a message after @admin");
        alert("You must type a message after @admin");
        return;
      }

      try {
        const currentToken = localStorage.getItem("token");
        await axios.post(
          "http://localhost:4000/api/simai/admin/message",
          { message: textToSend },
          { headers: { Authorization: `Bearer ${currentToken}`, "Content-Type": "application/json" } }
        );
      } catch (err) {
        console.error("Admin endpoint error:", err);
      }

      const adminMessageObj = {
        sender: "ai",
        text: "✅ Your message has been sent to the admin. They will respond shortly.",
        _id: (Date.now() + 1).toString(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, adminMessageObj]);
      if (isVoice) speakText(adminMessageObj.text);
      return;
    }

    // Normal AI message
    try {
      const currentToken = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/api/messages/sendMessages",
        { input: textToSend },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
    } catch (err) {
      console.error("Error sending user message:", err);
    }

    const aiText = await fetchAiReply(newMessage.text);
    const aiMessage = {
      sender: "ai",
      text: aiText,
      _id: (Date.now() + 2).toString(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, aiMessage]);
    if (isVoice) speakText(aiText);
  };

  return (
    <>
      {/* Admin Notification Alert */}
      {showNotification && !open && (
        <div className="fixed top-4 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-slideIn">
          <div className="relative">
            <span className="text-xl">🔔</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
          </div>
          <div>
            <p className="font-medium">New message from admin!</p>
            <p className="text-sm opacity-90">Click the chat button to view</p>
          </div>
          <button
            onClick={closeNotification}
            className="ml-2 p-1 hover:bg-white/20 rounded-full"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Button */}
      {!open && (<button
  onClick={() => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: "warning",
          title: "Not Logged In",
          text: "You need to log in to use the chatbot.",
          showCancelButton: true,
          confirmButtonText: "Go to Login",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });
      } else {
        alert("Please login to use the chatbot");
      }
      return;
    }
    setOpen(true);
    closeNotification(); // Close notification when opening chat
  }}
  className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40"
>
  <div className="relative">
    <span className="text-2xl">🤖</span>
    {adminMessageCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
        {adminMessageCount > 9 ? '9+' : adminMessageCount}
      </span>
    )}
  </div>
</button>)}

      {/* Chat Widget */}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                {speaking && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <div className="flex items-center gap-2 text-xs opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online</span>
                  {isTyping && <span className="ml-2 animate-pulse">Typing...</span>}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={stopSpeaking}
                disabled={!speaking}
                className={`p-2 rounded-lg ${speaking ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 cursor-not-allowed'} transition-colors`}
                title="Stop speaking"
              >
                <span className="text-sm">⏹</span>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title="Close chat"
              >
                <span className="text-sm">✕</span>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
                <div className="text-4xl mb-4 opacity-50">👋</div>
                <h3 className="text-lg font-semibold mb-2">Welcome to AI Assistant</h3>
                <p className="text-center text-sm text-gray-600 mb-6">
                  Start a conversation with me! I can help you with questions, explanations, and more.
                </p>
                <div className="text-xs text-gray-500">
                  💡 Tip: Use <code className="bg-gray-200 px-2 py-1 rounded">@admin</code> to contact administrators
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                          : message.text.includes("admin:") || message.text.includes("Admin:")
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-bl-none border-l-4 border-yellow-400"
                          : "bg-gradient-to-r from-gray-100 to-white border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.text.includes("admin:") || message.text.includes("Admin:") ? (
                          <>
                            <span className="text-sm">👑</span>
                            <span className="text-xs opacity-90">Admin</span>
                          </>
                        ) : message.sender === "ai" ? (
                          <span className="text-xs opacity-90">AI Assistant</span>
                        ) : null}
                      </div>
                      <div className="whitespace-pre-wrap break-words text-sm">
                        {message.text.replace("admin:", "").replace("Admin:", "").trim()}
                      </div>
                      <div className={`text-xs mt-2 ${message.sender === "user" ? "text-blue-200" : "text-gray-300"}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                        {message.sender === "user" && message.text.includes("@admin") && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-700 rounded-full text-xs">
                            To Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-bl-none p-4 bg-gradient-to-r from-gray-100 to-white border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <button
                onClick={handleVoice}
                className={`p-2.5 rounded-full flex-shrink-0 transition-all ${
                  listening 
                    ? "animate-pulse bg-red-100 text-red-600 border-2 border-red-300" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                title={listening ? "Stop listening" : "Start voice input"}
              >
                {listening ? "⏹" : "🎤"}
              </button>
              
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                onKeyDown={(e) => e.key === "Enter" && sendHandle()}
              />
              
              <button
                onClick={() => sendHandle()}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium flex-shrink-0"
              >
                Send
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 flex justify-between px-1">
              <span>Press Enter to send</span>
              <span>Shift+Enter for new line</span>
            </div>
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </>
  );
}
````

## File: src/components/Card.jsx
````javascript
import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  productId,
  lastPrices, // now price
  images = [],
  productName,
  price, // old price
}) {
  const firstImageUrl = images.length > 0 ? images[0] : null;

  // Convert to numbers
  const nowPriceNum = lastPrices ? Number(lastPrices) : null; // current price
  const oldPriceNum = Number(price); // previous price

  // Check if product is on sale
  const isSale = oldPriceNum && oldPriceNum > nowPriceNum;

  // Compute discount percentage
  const discountPercentage = isSale
    ? Math.round(((oldPriceNum - nowPriceNum) / oldPriceNum) * 100)
    : 0;

  return (
    <Link to={`/productoverview/${productId}`}>
      <div className="max-w-xs mx-auto my-4 bg-white rounded-xl w-[300px] h-[480px] shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          {firstImageUrl ? (
            <img
              src={firstImageUrl}
              alt={`Image of ${productName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              [Image Not Available]
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col justify-between h-[220px]">
          <h3
            className="text-xl font-bold text-gray-800 mb-2 truncate"
            title={productName}
          >
            {productName}
          </h3>

          {/* Price Section */}
          <div className="mt-2">
            {isSale ? (
              <div className="flex items-center space-x-2">
                {/* Old Price */}
                <span className="text-gray-400 line-through text-sm">
                  Rs.{oldPriceNum}
                </span>

                {/* Current Price */}
                <span className="text-lg font-bold text-green-600">
                  Rs.{nowPriceNum}
                </span>

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                Rs.{nowPriceNum}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
````

## File: src/components/newadds.jsx
````javascript
import React, { useState, useRef, useEffect } from 'react';

export default function Marquee({ 
  children, 
  direction = 'left',
  speed = 50,
  pauseOnHover = true,
  gradient = true,
  className = ''
}) {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  // Get keyframes based on direction
  const getKeyframes = () => {
    if (direction === 'right') {
      return `
        @keyframes marquee {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `;
    } else {
      return `
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `;
    }
  };

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  };

  const innerStyle = {
    display: 'flex',
    width: 'max-content',
    whiteSpace: 'nowrap',
    animation: `marquee ${speed}s linear infinite`,
    animationPlayState: isPaused ? 'paused' : 'running',
  };

  const contentStyle = {
    flexShrink: 0,
    display: 'flex',
  };

  const gradientStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100px',
    pointerEvents: 'none',
    zIndex: 2,
  };

  const gradientLeftStyle = {
    ...gradientStyle,
    left: 0,
    background: 'linear-gradient(to right, white, transparent)',
  };

  const gradientRightStyle = {
    ...gradientStyle,
    right: 0,
    background: 'linear-gradient(to left, white, transparent)',
  };

  return (
    <div 
      className={className}
      style={containerStyle}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <style>{getKeyframes()}</style>
      
      <div 
        style={innerStyle}
        ref={marqueeRef}
      >
        <div style={contentStyle}>
          {children}
        </div>
        <div style={contentStyle} aria-hidden="true">
          {children}
        </div>
      </div>
      
      {gradient && (
        <>
          <div style={gradientLeftStyle}></div>
          <div style={gradientRightStyle}></div>
        </>
      )}
    </div>
  );
}
````

## File: src/components/pages/ProfilePage.jsx
````javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Edit, 
  Save,
  X,
  Package,
  ShoppingBag,
  Calendar,
  Shield,
  LogOut,
  CreditCard,
  Truck,
  CheckCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: ''
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch user profile and orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile
        const userRes = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/users/me', {
          headers: getAuthHeader()
        });

        if (userRes.data && userRes.data.user) {
          const userData = userRes.data.user;
          setUser(userData);
          setEditForm({
            name: userData.name || '',
            lastname: userData.lastname || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: userData.address || ''
          });
        }

        // Fetch user orders
        try {
          const ordersRes = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/orders/my-orders', {
            headers: getAuthHeader()
          });
          
          if (ordersRes.data.success) {
            setOrders(ordersRes.data.orders || []);
          }
        } catch (orderError) {
          console.log('Could not fetch orders:', orderError.message);
        }

      } catch (error) {
        console.error('Error fetching profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load profile. Please try again.',
        }).then(() => {
          navigate('/login');
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!editForm.name || !editForm.email) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Name and email are required fields.',
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(import.meta.env.VITE_BACKEND_URL+'/api/users/me', editForm, {
        headers: getAuthHeader()
      });

      if (res.data) {
        setUser(res.data.user || res.data);
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been updated successfully.',
          timer: 1500,
          showConfirmButton: false
        });
        setEditing(false);
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Change Password',
      html: `
        <input id="current-password" type="password" class="swal2-input" placeholder="Current Password">
        <input id="new-password" type="password" class="swal2-input" placeholder="New Password">
        <input id="confirm-password" type="password" class="swal2-input" placeholder="Confirm New Password">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const current = document.getElementById('current-password').value;
        const newPass = document.getElementById('new-password').value;
        const confirm = document.getElementById('confirm-password').value;

        if (!current || !newPass || !confirm) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        if (newPass !== confirm) {
          Swal.showValidationMessage('New passwords do not match');
          return false;
        }

        if (newPass.length < 6) {
          Swal.showValidationMessage('Password must be at least 6 characters');
          return false;
        }

        return { currentPassword: current, newPassword: newPass };
      }
    });

    if (formValues) {
      try {
        setLoading(true);
        // Note: You need to add a change password endpoint to your backend
        // await axios.put('/api/users/change-password', formValues, {
        //   headers: getAuthHeader()
        // });
        
        Swal.fire({
          icon: 'success',
          title: 'Password Updated!',
          text: 'Your password has been changed successfully.',
          timer: 1500
        });
      } catch (error) {
        console.error('Password change error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: error.response?.data?.message || 'Failed to change password.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-amber-100 text-amber-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalSpent = () => {
    return orders
      .filter(order => order.paymentStatus === 'paid')
      .reduce((total, order) => total + (order.total || 0), 0);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No User Found</h2>
          <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">Manage your account and view your orders</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-xl font-bold">{orders.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-xl font-bold">Rs. {getTotalSpent().toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <Truck className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Orders</p>
                  <p className="text-xl font-bold">
                    {orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-xl font-bold">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  Personal Information
                </h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                    disabled={loading}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setEditForm({
                          name: user.name || '',
                          lastname: user.lastname || '',
                          email: user.email || '',
                          phone: user.phone || '',
                          address: user.address || ''
                        });
                      }}
                      className="flex items-center px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      disabled={loading}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading}
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.name || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="lastname"
                        value={editForm.lastname}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading}
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.lastname || 'N/A'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{user.email || 'N/A'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{user.phone || 'N/A'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  {editing ? (
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="flex items-start px-4 py-2 bg-gray-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="whitespace-pre-line">{user.address || 'No address provided'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Security
                </h3>
                <button
                  onClick={handleChangePassword}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                  disabled={loading}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-amber-500" />
                  Recent Orders
                </h2>
                <button
                  onClick={() => navigate('/orders')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All Orders
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order._id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{order.orderId}</h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(order.createdAt)} • {order.items?.length || 0} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">Rs. {(order.total || 0).toLocaleString()}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status?.charAt(0)?.toUpperCase() + order.status?.slice(1) || 'Unknown'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          {order.items?.slice(0, 2).map(item => item.productName).join(', ')}
                          {order.items?.length > 2 && ` and ${order.items.length - 2} more`}
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => navigate('/orders')}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </button>
                        {order.status === 'processing' && (
                          <button
                            onClick={() => navigate('/orders')}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Account Info & Actions */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <div className="flex items-center mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrator' : 'Customer'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{formatDate(user.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                >
                  <Package className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium">View All Orders</p>
                    <p className="text-sm text-gray-500">Check your order history</p>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/addresses')}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                >
                  <MapPin className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium">Manage Addresses</p>
                    <p className="text-sm text-gray-500">Update shipping addresses</p>
                  </div>
                </button>
                <button
                  onClick={handleChangePassword}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                >
                  <Lock className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-gray-500">Update your password</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 mb-4">Our support team is here to help you</p>
              <button
                onClick={() => navigate('/chat')}
                className="w-full px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: vite.config.js
````javascript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
````

## File: src/components/utils/notificationDrop.jsx
````javascript
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
````

## File: text.text
````
MTgyODI4MjEzMzc5Mjk2MzExMzM5MjM0NDU5MjE4OTE0NjUxMDI=
````

## File: src/App.jsx
````javascript
import Homepage from "./components/pages/Homepage.jsx";
import NotFound from "./components/pages/NotFound.jsx"; // import new page
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";



function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
````

## File: src/components/pages/admin/AdminAllProductView.jsx
````javascript
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiCopy, 
  FiDownload, 
  FiRefreshCw,
  FiPlus
} from "react-icons/fi";
import { MdGridView, MdList } from "react-icons/md";
import Swal from "sweetalert2";

export default function AdminAllProductView() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productsData = res.data?.data || res.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load products',
          confirmButtonColor: '#d33',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, token]);

  // Get unique categories and brands for filters
  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category).filter(Boolean);
    return ["all", ...new Set(allCategories)];
  }, [products]);

  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand).filter(Boolean);
    return ["all", ...new Set(allBrands)];
  }, [products]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.productName?.toLowerCase().includes(term) ||
        product.productId?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.altNames?.some(name => name.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== "all") {
      result = result.filter(product => product.brand === selectedBrand);
    }

    // Sorting
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "stock":
        result.sort((a, b) => b.stock - a.stock);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchTerm, selectedCategory, selectedBrand, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleDelete = async (productId, productName) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      html: `Are you sure you want to delete <strong>"${productName}"</strong>?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(import.meta.env.VITE_BACKEND_URL+`/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Product has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });

        // Remove from state
        setProducts(prev => prev.filter(p => p.productId !== productId));
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: err.response?.data?.message || 'Failed to delete product',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Selection',
        text: 'Please select products to delete',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Bulk Delete?',
      html: `Are you sure you want to delete ${selectedProducts.size} product(s)?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Delete ${selectedProducts.size} Items`,
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        const deletePromises = Array.from(selectedProducts).map(productId =>
          axios.delete(import.meta.env.VITE_BACKEND_URL+`/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        await Promise.all(deletePromises);

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `${selectedProducts.size} product(s) deleted`,
          timer: 2000,
          showConfirmButton: false
        });

        // Refresh products
        setProducts(prev => prev.filter(p => !selectedProducts.has(p.productId)));
        setSelectedProducts(new Set());
      } catch (err) {
        console.error("Bulk delete error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: 'Failed to delete selected products',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === currentProducts.length) {
      setSelectedProducts(new Set());
    } else {
      const allIds = new Set(currentProducts.map(p => p.productId));
      setSelectedProducts(allIds);
    }
  };

  const handleSelectProduct = (productId) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Product ID copied to clipboard',
      timer: 1500,
      showConfirmButton: false
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Products Management</h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} products • {selectedProducts.size} selected
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            onClick={() => navigate("/admin/dashboard/addproducts")}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 transition"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            title="Refresh"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, ID, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded ${viewMode === "table" ? "bg-white shadow" : "text-gray-600"}`}
            >
              <MdList size={20} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded ${viewMode === "grid" ? "bg-white shadow" : "text-gray-600"}`}
            >
              <MdGridView size={20} />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand === "all" ? "All Brands" : brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Stock: High to Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bulk Actions</label>
            <div className="flex space-x-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Action</option>
                <option value="delete">Delete Selected</option>
                <option value="export">Export Selected</option>
              </select>
              <button
                onClick={() => bulkAction === "delete" && handleBulkDelete()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                disabled={!bulkAction}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Selection */}
        {selectedProducts.size > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="text-blue-700 font-medium">
              {selectedProducts.size} product(s) selected
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedProducts(new Set())}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table (Table View) */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.size === currentProducts.length && currentProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr key={product.productId} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.productId)}
                          onChange={() => handleSelectProduct(product.productId)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            {product.images?.[0] ? (
                              <img
                                className="h-16 w-16 object-cover rounded-lg"
                                src={product.images[0]}
                                alt={product.productName}
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.productName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <span className="font-mono">{product.productId}</span>
                              <button
                                onClick={() => copyToClipboard(product.productId)}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                                title="Copy ID"
                              >
                                <FiCopy size={14} />
                              </button>
                            </div>
                            <div className="text-xs text-gray-400 truncate max-w-xs">
                              {product.description?.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          ${parseFloat(product.price).toFixed(2)}
                        </div>
                        {product.lastPrices && product.lastPrices > product.price && (
                          <div className="text-xs text-gray-500 line-through">
                            ${parseFloat(product.lastPrices).toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock} units
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/product/${product.productId}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => navigate("/admin/dashboard/editproducts", { state: { product } })}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product.productId, product.productName)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-lg mb-2">No products found</div>
                      <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                          setSelectedBrand("all");
                        }}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Clear all filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.productId} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="relative">
                  {product.images?.[0] ? (
                    <img
                      className="w-full h-48 object-cover"
                      src={product.images[0]}
                      alt={product.productName}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.productId)}
                    onChange={() => handleSelectProduct(product.productId)}
                    className="absolute top-2 left-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{product.productName}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-blue-600">${parseFloat(product.price).toFixed(2)}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate("/admin/dashboard/editproducts", { state: { product } })}
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.productId, product.productName)}
                        className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">{product.category}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📦</div>
              <div className="text-gray-600 text-xl mb-2">No products found</div>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
````

## File: src/components/pages/admin/Dashboard/DashboardRoutes.jsx
````javascript
// DashboardRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProducts from "../addProducts";
import AdminAllProductView from "../AdminAllProductView";
import EditProducts from "../EditProducts";
import Notification from "../notification";
import StatCard from "../Dashboard/StatCard";
import { FiPackage, FiUsers, FiDollarSign } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";

export default function DashboardRoutes({ stats }) {
  return (
    <Routes>
      <Route
        index
        element={
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-6">📊</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
            <p className="text-gray-600 max-w-2xl mb-8">
              Select a section from the sidebar to manage products, view notifications, or access other admin features.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
              <StatCard icon={<FiPackage size={24} />} title="Total Products" value={stats.totalProducts} color="text-green-600" />
              <StatCard icon={<MdShoppingCart size={24} />} title="Total Orders" value={stats.totalOrders} color="text-indigo-600" />
              <StatCard icon={<FiDollarSign size={24} />} title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} color="text-amber-600" />
              <StatCard icon={<FiUsers size={24} />} title="New Users" value={stats.newUsers} color="text-teal-600" />
            </div>
          </div>
        }
      />
      <Route path="adminviewproducts" element={<AdminAllProductView />} />
      <Route path="addproducts" element={<AddProducts />} />
      <Route path="editproducts/:id" element={<EditProducts />} />
      <Route path="notification" element={<Notification />} />
    </Routes>
  );
}
````

## File: src/components/pages/admin/payment.jsx
````javascript
import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { clearCart } from '@/components/utils/cart'; // 🛒 ඔයාගේ cart functions තියෙන path එක මෙතනට දාන්න

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderedata = location.state;

  // 1. Cash on Delivery (COD) Function
  const handleCOD = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to place this order as Cash on Delivery?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, place order!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:4000/api/payment/cod', orderedata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then((res) => {
          
          // ✅ සාර්ථක වූ පසු Cart එක clear කිරීම
          clearCart(); 

          Swal.fire({
            title: 'Success!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            navigate('/orders'); 
          });
        }).catch((err) => {
          Swal.fire('Error!', err.response?.data?.message || 'Order failed', 'error');
        });
      }
    });
  };

  // 2. Card Payment Function (PayHere Redirect Method)
  const handleCardPayment = async () => {
    try {
      // පේමන්ට් එක ලෑස්ති කරන අතරතුර Loading එකක් පෙන්වමු
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we redirect you to PayHere',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const formattedItems = orderedata.orderedItems.map(item => ({
        productId: item.productId,
        name: item.productName || item.name,
        qty: item.qty,
        price: item.lastPrice || item.price 
      }));

      // Backend එකට දත්ත යවා Hash එක සහ Order ID එක ලබා ගැනීම
      const response = await axios.post('http://localhost:4000/api/payment/generate-hash', {
        items: formattedItems,
        userDetails: {
          firstName: "Himash", 
          email: "himash@example.com",
          phone: "0771234567"
        }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const paymentData = response.data;
      
      // ✅ පේමන්ට් එකට Redirect වෙන්න කලින් Cart එක clear කිරීම
      clearCart(); 
      Swal.close(); 

      const payment = {
        sandbox: true,
        merchant_id: paymentData.merchant_id,
        return_url: "http://localhost:3001/orders", 
        cancel_url: "http://localhost:3001/cancel",
        notify_url: "http://localhost:4000/api/payment/notify", 
        order_id: paymentData.order_id,
        items: "Online Purchase",
        amount: paymentData.amount, 
        currency: paymentData.currency,
        hash: paymentData.hash,
        first_name: paymentData.first_name,
        last_name: paymentData.last_name,
        email: paymentData.email,
        phone: paymentData.phone,
        address: "No.1, Colombo Road",
        city: "Colombo",
        country: "Sri Lanka",
      };

      // Hidden Form එකක් සාදා Submit කිරීම
      const form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('action', 'https://sandbox.payhere.lk/pay/checkout');

      Object.keys(payment).forEach(key => {
        const hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', payment[key]);
        form.appendChild(hiddenField);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      Swal.fire('Error!', 'Card payment initialization failed.', 'error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-12 rounded-3xl shadow-2xl border border-blue-100 text-center max-w-lg w-full">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Checkout</h2>
        <p className="text-slate-500 mb-8 font-medium">කරුණාකර ඔබ කැමති ගෙවීම් ක්‍රමය තෝරන්න</p>
        
        <div className="flex flex-col gap-4">
          {/* Cash on Delivery Button */}
          <button 
            onClick={handleCOD}
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-4 px-12 rounded-2xl transition duration-300 transform hover:scale-105"
          >
            Cash on Delivery (COD)
          </button>

          {/* Card Payment Button */}
          <button 
            onClick={handleCardPayment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-2xl transition duration-300 transform hover:scale-105 shadow-xl"
          >
            Pay with Card (PayHere)
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-slate-400 text-sm">Safe & Secure Payments by PayHere</p>
        </div>
      </div>
    </div>
  );
}
````

## File: src/components/pages/orderpage.jsx
````javascript
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Package,
  ArrowLeft,
  Search,
  Eye,
  MoreVertical,
  Calendar,
  User,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Filter,
  Download,
  ChevronDown,
  ShoppingBag,
  CreditCard,
  RefreshCw,
  Truck
} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

export default function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId: pathOrderId } = useParams();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // 1. URL Logic: Pretty URL Update සහ පේමන්ට් Alerts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const statusCode = queryParams.get("status_code");
    const queryOrderId = queryParams.get("order_id");

    // ✨ Pretty URL Redirect: 
    // ?order_id=123 ලෙස එන එක /orders/123 ලෙස පිරිසිදු කරයි
    if (queryOrderId && !pathOrderId) {
      navigate(`/orders/${queryOrderId}${location.search}`, { replace: true });
      return;
    }


    console.log(queryOrderId)

    // ✨ පේමන්ට් එකෙන් පසු එන Status පරීක්ෂාව
    if (statusCode) {
      if (statusCode === "2") {
        localStorage.removeItem("cart");
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `ඔබගේ ඇණවුම (${queryOrderId || pathOrderId}) සාර්ථකයි.`,
          timer: 3000,
          showConfirmButton: false,
        });
      } else if (statusCode === "-1") {
        Swal.fire({ icon: "info", title: "Payment Canceled", text: "ඔබ පේමන්ට් එක අවලංගු කළා." });
      } else if (statusCode === "-2") {
        Swal.fire({ icon: "error", title: "Payment Failed", text: "පේමන්ට් එක අසාර්ථක විය." });
      }

      // Alert එකෙන් පසු URL එකේ ඇති Query Params සම්පූර්ණයෙන්ම අයින් කර Pretty URL එක ඉතිරි කරයි
      const cleanUrl = pathOrderId ? `/orders/${pathOrderId}` : "/orders";
      window.history.replaceState({}, document.title, cleanUrl);
    }

    fetchOrders();
  }, [location.search, pathOrderId, navigate]);

  // 2. දත්ත ලබා ගැනීම (Fetch Orders)
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      const res = await axios.get(
        "http://localhost:4000/api/orders/my-orders",
        { headers: getAuthHeader() }
      );

      if (res.data.success) {
        // Transform your existing order data to match table structure
        const transformedOrders = res.data.orders.map(order => ({
          ...order,
          // Map your existing data to table fields
          user: "You", // Since these are user's own orders
          project: order.items?.[0]?.name || "Shopping Order",
          address: order.shippingAddress || "Not specified",
          date: formatTimeAgo(order.createdAt),
          status: mapStatus(order.status)
        }));
        
        setOrders(transformedOrders);
        setFilteredOrders(transformedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire("Error", "දත්ත ලබා ගැනීම අසාර්ථකයි.", "error");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Map your existing status to table status
  const mapStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "In Progress";
      case "confirmed": return "Approved";
      case "delivered": return "Complete";
      case "cancelled": return "Rejected";
      default: return "Pending";
    }
  };

  // 3. Filtering Logic (Search & Status)
  useEffect(() => {
    let result = orders;
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status?.toLowerCase() === statusFilter.toLowerCase());
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderId?.toLowerCase().includes(term) ||
          o.user?.toLowerCase().includes(term) ||
          o.project?.toLowerCase().includes(term) ||
          o.address?.toLowerCase().includes(term)
      );
    }
    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter]);

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "in progress":
      case "pending":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: <Clock className="h-3 w-3" />,
          dot: "bg-blue-500"
        };
      case "complete":
      case "delivered":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: <CheckCircle className="h-3 w-3" />,
          dot: "bg-emerald-500"
        };
      case "approved":
      case "confirmed":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          icon: <CheckCircle className="h-3 w-3" />,
          dot: "bg-green-500"
        };
      case "rejected":
      case "cancelled":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          icon: <XCircle className="h-3 w-3" />,
          dot: "bg-red-500"
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: <AlertCircle className="h-3 w-3" />,
          dot: "bg-gray-500"
        };
    }
  };

  const StatusBadge = ({ status }) => {
    const config = getStatusConfig(status);
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${config.bg} ${config.border} border ${config.text} text-xs font-medium`}>
        <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`}></span>
        {status}
      </div>
    );
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-10 w-10 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order List</h1>
              <p className="text-gray-500 mt-1">Track and manage all your orders</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Shop
              </button>
              <button
                onClick={fetchOrders}
                className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by Order ID, item name, or user..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <div className="col-span-2">Order ID</div>
            <div className="col-span-2">User</div>
            <div className="col-span-2">Project/Items</div>
            <div className="col-span-3">Address</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Status</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No orders found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div 
                  key={order._id} 
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="col-span-2 flex items-center">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">#{order.orderId}</span>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.user}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <p className="text-gray-900 font-medium truncate">{order.project}</p>
                    <p className="text-gray-500 text-sm">{order.items?.length || 0} items</p>
                  </div>
                  
                  <div className="col-span-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{order.address}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{order.date}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <div>
            Showing <span className="font-medium">{filteredOrders.length}</span> of <span className="font-medium">{orders.length}</span> orders
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium">
              Total: Rs. {filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
                  <p className="text-sm text-gray-500">#{selectedOrder.orderId}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <p className="font-medium">{new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <p className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {selectedOrder.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  {getStatusConfig(selectedOrder.status).icon}
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>
                    <p className="font-medium">{selectedOrder.status}</p>
                  </div>
                </div>
                <StatusBadge status={selectedOrder.status} />
              </div>

              {/* Items List */}
              <div>
                <p className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Ordered Items ({selectedOrder.items?.length || 0})
                </p>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">Rs. {(item.price * item.qty).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Rs. {item.price?.toLocaleString()} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">Total Amount</p>
                    <p className="text-sm text-gray-500">Including all charges</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      Rs. {selectedOrder.totalAmount?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
````

## File: src/components/pages/shipping.jsx
````javascript
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Shipping() {
  const location = useLocation();
  const orderData = location.state;
  const navigate = useNavigate();

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No order data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Shipping Details
        </h1>

        {/* Order Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Total Amount</p>
          <p className="text-xl font-semibold text-green-600">
            Rs. {orderData.total?.toFixed(2)}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Items ({orderData.orderedItems?.length})
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            {orderData.orderedItems?.map((item) => (
              <li key={item.productId}>
                • {item.productName} × {item.qty}
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => navigate("/payment", { state: orderData })}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Proceed to Payment
        </button>

      </div>
    </div>
  );
}
````

## File: package.json
````json
{
  "name": "app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "@supabase/supabase-js": "^2.86.0",
    "@tailwindcss/vite": "^4.1.17",
    "axios": "^1.13.2",
    "dotenv": "^17.2.3",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^0.556.0",
    "lz-string": "^1.5.0",
    "md5": "^2.3.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.6",
    "sweetalert2": "^11.26.10",
    "tailwindcss": "^4.1.17",
    "uuid": "^13.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
````

## File: src/components/pages/admin/addProducts.jsx
````javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "../../utils/mediaupload.jsx";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import { FiUpload, FiImage, FiDollarSign, FiPackage, FiTag, FiShoppingCart } from "react-icons/fi";

export default function AddProducts() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    productId: uuidv4().substring(0, 8).toUpperCase(),
    productName: "",
    altNames: "",
    price: "",
    lastPrices: "",
    stock: "",
    description: "",
    category: "General",
    brand: "Unbranded",
  });

  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "Other"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        alert("Only administrators can add products.");
        navigate("/");
      }
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // Generate new product ID
  const generateNewId = () => {
    setFormData(prev => ({
      ...prev,
      productId: uuidv4().substring(0, 8).toUpperCase()
    }));
  };

  // Handle image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove image
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      alert("Product name is required");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert("Please enter a valid price");
      return false;
    }
    if (images.length === 0) {
      alert("Please upload at least one image");
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setUploading(true);
    const token = localStorage.getItem("token");
    
    try {
      // Upload images to Supabase
      const imgUrls = await Promise.all(
        images.map(file => uploadMediaToSupabase(file))
      );

      // Prepare payload
      const payload = {
        ...formData,
        productId: `PROD-${formData.productId}`,
        altNames: formData.altNames ? formData.altNames.split(",").map(n => n.trim()).filter(n => n) : [],
        price: parseFloat(formData.price),
        lastPrices: formData.lastPrices ? parseFloat(formData.lastPrices) : parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: imgUrls,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Send to backend
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/products",
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      console.log("Product saved:", res.data);
      
      // Show success message and reset form
      alert("✅ Product uploaded successfully!");
      
      // Reset form
      setFormData({
        productId: uuidv4().substring(0, 8).toUpperCase(),
        productName: "",
        altNames: "",
        price: "",
        lastPrices: "",
        stock: "",
        description: "",
        category: "General",
        brand: "Unbranded",
      });
      setImages([]);
      setImagePreviews([]);
      
      // Optional: Navigate to products page
      // navigate("/products");

    } catch (err) {
      console.error("Upload failed:", err);
      let errorMessage = "Failed to upload product.";
      
      if (err.response) {
        errorMessage = err.response.data?.message || err.response.statusText;
      } else if (err.request) {
        errorMessage = "No response from server. Check your connection.";
      }
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Add New Product</h1>
                <p className="text-blue-100 mt-2">Fill in the product details below</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={generateNewId}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  title="Generate new ID"
                >
                  🔄 New ID
                </button>
                <div className="text-right">
                  <div className="text-sm opacity-90">Product ID</div>
                  <div className="text-xl font-mono font-bold">PROD-{formData.productId}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiShoppingCart className="mr-2" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="Separate with commas (e.g., iPhone 15, Smartphone)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional: Other names customers might search for</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2" /> Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Price
                    </label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiPackage className="mr-2" /> Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Brand
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column - Images & Description */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2" /> Product Images *
                  </label>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-3 mb-3">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{imagePreviews.length} image(s) selected</p>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    <FiUpload className="text-3xl text-gray-400 mx-auto mb-3" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-gray-600 font-medium mb-1">Click to upload images</div>
                      <div className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</div>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the product features, specifications, etc."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading Product...
                      </>
                    ) : (
                      "Upload Product"
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    * Required fields. All product information will be saved to our database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/components/pages/admin/EditProducts.jsx
````javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "../../utils/mediaupload.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { 
  FiEdit, 
  FiSave, 
  FiTrash2, 
  FiImage, 
  FiPackage, 
  FiDollarSign, 
  FiTag, 
  FiGrid,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiBox
} from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  
  // Status options
  const statusOptions = [
    { value: "pending", label: "Pending", icon: FiClock, color: "bg-yellow-100 text-yellow-800" },
    { value: "ready", label: "Ready", icon: FiCheckCircle, color: "bg-green-100 text-green-800" },
    { value: "delivered", label: "Delivered", icon: FiTruck, color: "bg-blue-100 text-blue-800" },
    { value: "out_of_stock", label: "Out of Stock", icon: FiBox, color: "bg-red-100 text-red-800" },
  ];

  // Categories and brands for dropdown
  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food", "Office"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "HP", "Microsoft", "Other"];

  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    altNames: "",
    price: "",
    lastPrices: "",
    stock: "",
    description: "",
    category: "General",
    brand: "Unbranded",
    status: "pending", // Added status field
  });

  // Fetch product data
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        let productData;
        
        if (location.state?.product) {
          productData = location.state.product;
        } else if (id) {
          const response = await axios.get(
            import.meta.env.VITE_BACKEND_URL+`/api/products/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          productData = response.data;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Product Selected',
            text: 'Please select a product to edit',
            confirmButtonColor: '#d33',
          }).then(() => navigate("/admin/products"));
          return;
        }

        // Set form data including status
        setFormData({
          productId: productData.productId || "",
          productName: productData.productName || "",
          altNames: productData.altNames?.join(", ") || "",
          price: productData.price || "",
          lastPrices: productData.lastPrices || productData.price || "",
          stock: productData.stock || "",
          description: productData.description || "",
          category: productData.category || "General",
          brand: productData.brand || "Unbranded",
          status: productData.status || "pending", // Set status from API
        });

        if (productData.images && Array.isArray(productData.images)) {
          setExistingImageUrls(productData.images);
        }

      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load product data',
          confirmButtonColor: '#d33',
        }).then(() => navigate("/admin/products"));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [token, navigate, location.state, id]);

  // Handle new image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove new image preview
  const removeNewImage = (index) => {
    const newImagesCopy = [...newImages];
    const newPreviews = [...imagePreviews];
    
    URL.revokeObjectURL(newPreviews[index]);
    newImagesCopy.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setNewImages(newImagesCopy);
    setImagePreviews(newPreviews);
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    Swal.fire({
      title: 'Remove Image?',
      text: "This image will be removed from the product",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newExistingImages = [...existingImageUrls];
        newExistingImages.splice(index, 1);
        setExistingImageUrls(newExistingImages);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Quick status update handler
  const handleQuickStatusUpdate = (newStatus) => {
    Swal.fire({
      title: `Change Status to ${newStatus.toUpperCase()}?`,
      text: `Are you sure you want to change product status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update status!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(prev => ({ ...prev, status: newStatus }));
        Swal.fire({
          icon: 'success',
          title: 'Status Updated!',
          text: `Product status changed to ${newStatus}`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Product name is required',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Price',
        text: 'Please enter a valid price',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    if (existingImageUrls.length === 0 && newImages.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No Images',
        text: 'Please add at least one product image',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    
    try {
      // Upload new images
      const uploadedImages = newImages.length > 0 
        ? await Promise.all(newImages.map(uploadMediaToSupabase))
        : [];

      // Prepare payload including status
      const payload = {
        ...formData,
        altNames: formData.altNames 
          ? formData.altNames.split(",").map(n => n.trim()).filter(n => n)
          : [],
        price: parseFloat(formData.price),
        lastPrices: formData.lastPrices ? parseFloat(formData.lastPrices) : parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: [...existingImageUrls, ...uploadedImages],
        status: formData.status, // Include status in payload
        updatedAt: new Date().toISOString(),
      };

      // Update product
      await axios.patch(
        import.meta.env.VITE_API_URL + `/api/products/${formData.productId}`,
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      // Success alert
      await Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        text: 'Product has been successfully updated',
        showConfirmButton: false,
        timer: 2000
      });

      // Reset image states
      setNewImages([]);
      setImagePreviews([]);

      // Navigate back
      navigate("/admin/dashboard/adminviewproducts");

    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update product. Please try again.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading product data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Status */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <p className="text-blue-100 mt-2">Update product information</p>
              </div>
              <div className="mt-4 md:mt-0 space-y-2">
                <div className="text-sm opacity-90">Product ID</div>
                <div className="text-xl font-mono font-bold">{formData.productId}</div>
                
                {/* Current Status Display */}
                <div className="flex items-center space-x-2 mt-3">
                  <div className="text-sm opacity-90">Current Status:</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
                  }`}>
                    {statusOptions.find(s => s.value === formData.status)?.label || "Unknown"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Product Info */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiPackage className="mr-2" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                {/* Alternate Names */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="Separate with commas"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2" /> Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Price
                    </label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiGrid className="mr-2" /> Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Status Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Status
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {statusOptions.map((status) => (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() => handleQuickStatusUpdate(status.value)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                          formData.status === status.value
                            ? 'border-blue-500 bg-blue-50 scale-105'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <status.icon className={`h-6 w-6 mb-2 ${
                          formData.status === status.value ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          formData.status === status.value ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {status.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Select product status from dropdown or click on status cards above
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Right Column - Images */}
              <div className="space-y-6">
                {/* Existing Images */}
                {existingImageUrls.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Images ({existingImageUrls.length})
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {existingImageUrls.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Product ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Preview */}
                {imagePreviews.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Images to Add ({imagePreviews.length})
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`New ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <MdClose size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2" /> Add More Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FiImage className="text-4xl text-gray-400 mx-auto mb-4" />
                      <div className="text-gray-600 font-medium mb-2">Click to upload new images</div>
                      <div className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</div>
                    </label>
                  </div>
                </div>

                {/* Status Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <FiCheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Status Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
                      }`}>
                        {statusOptions.find(s => s.value === formData.status)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Stock Level:</span>
                      <span className={`font-medium ${
                        parseInt(formData.stock) > 10 ? 'text-green-600' : 
                        parseInt(formData.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {formData.stock || 0} units
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-3">
                      💡 <strong>Status Guide:</strong> Pending → Ready → Delivered
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 space-y-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Update Product
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate("/admin/dashboard/adminviewproducts")}
                      className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: 'Update Only Status?',
                          text: 'Would you like to update just the status without saving other changes?',
                          icon: 'question',
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: 'Save All Changes',
                          denyButtonText: 'Update Status Only',
                          cancelButtonText: 'Cancel'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleSave();
                          } else if (result.isDenied) {
                            // Update only status
                            const statusOnlyPayload = { status: formData.status };
                            axios.patch(
                              import.meta.env.VITE_API_URL + `/api/products/${formData.productId}`,
                              statusOnlyPayload,
                              { 
                                headers: { 
                                  Authorization: `Bearer ${token}`,
                                  'Content-Type': 'application/json'
                                } 
                              }
                            ).then(() => {
                              Swal.fire({
                                icon: 'success',
                                title: 'Status Updated!',
                                text: 'Product status has been updated',
                                timer: 1500,
                                showConfirmButton: false
                              });
                            }).catch(error => {
                              console.error("Status update failed:", error);
                              Swal.fire({
                                icon: 'error',
                                title: 'Status Update Failed',
                                text: 'Failed to update product status',
                                confirmButtonColor: '#d33',
                              });
                            });
                          }
                        });
                      }}
                      className="w-full px-6 py-3 border border-blue-300 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Preview</h3>
            <div className={`px-4 py-1 rounded-full text-sm font-medium ${
              statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
            }`}>
              {statusOptions.find(s => s.value === formData.status)?.label}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Preview */}
            <div className="md:w-1/3">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                {existingImageUrls.length > 0 || imagePreviews.length > 0 ? (
                  <img
                    src={existingImageUrls[0] || imagePreviews[0]}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Product Status</div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    formData.status === 'pending' ? 'bg-yellow-500' :
                    formData.status === 'ready' ? 'bg-green-500' :
                    formData.status === 'delivered' ? 'bg-blue-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className="text-gray-700">{statusOptions.find(s => s.value === formData.status)?.label}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {formData.status === 'pending' && 'Product is awaiting processing'}
                  {formData.status === 'ready' && 'Product is ready for delivery'}
                  {formData.status === 'delivered' && 'Product has been delivered'}
                  {formData.status === 'out_of_stock' && 'Product is currently out of stock'}
                </p>
              </div>
            </div>
            
            {/* Info Preview */}
            <div className="md:w-2/3">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{formData.productName || "Product Name"}</h4>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-blue-600 mr-3">
                  ${parseFloat(formData.price || 0).toFixed(2)}
                </span>
                {formData.lastPrices && parseFloat(formData.lastPrices) > parseFloat(formData.price) && (
                  <span className="text-lg text-gray-500 line-through">
                    ${parseFloat(formData.lastPrices).toFixed(2)}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{formData.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Brand</div>
                  <div className="font-medium">{formData.brand}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Stock</div>
                  <div className={`font-medium ${
                    parseInt(formData.stock) > 10 ? 'text-green-600' : 
                    parseInt(formData.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {formData.stock || 0} units
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Product ID</div>
                  <div className="font-mono font-medium">{formData.productId}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Availability</div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    formData.status === 'out_of_stock' 
                      ? 'bg-red-100 text-red-800' 
                      : parseInt(formData.stock) > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {formData.status === 'out_of_stock' 
                      ? 'Out of Stock' 
                      : parseInt(formData.stock) > 0 
                        ? 'In Stock' 
                        : 'Low Stock'}
                  </div>
                  {formData.status === 'delivered' && (
                    <div className="text-sm text-gray-600 flex items-center">
                      <FiTruck className="h-4 w-4 mr-1" /> Delivered
                    </div>
                  )}
                </div>
              </div>
              <div className="text-gray-600">
                {formData.description || "No description provided"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/components/pages/HomeContainer.jsx
````javascript
import React, { useEffect, useState, useRef, useCallback } from "react";
import Card from "@/components/Card";
import axios from "axios";
import NewAdsTitles from "@/components/newadds";
import Banners from "@/components/Banners";

export default function HomeContainer() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Initial fetch loading state
  const [loadingMore, setLoadingMore] = useState(false); // Infinite scroll/button loading state
  const [error, setError] = useState(null); // <--- NEW: State to store fetch error
  const [visibleCount, setVisibleCount] = useState(8);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  // --- 1. Initial Data Fetch ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products");
        if (Array.isArray(response.data)) {
          const products = response.data;
          setAllProducts(products);
          setDisplayedProducts(products.slice(0, visibleCount));
          setHasMore(products.length > visibleCount);
        } else {
          setAllProducts([]);
          setDisplayedProducts([]);
          setHasMore(false);
          // Optional: Set a specific error if data format is unexpected
          // setError("Received data in an unexpected format.");
        }
      } catch (e) {
        console.error("Error fetching products:", e);
        // <--- UPDATED: Set the error state on failure
        setError("Failed to fetch products. Please check the server connection " +(import.meta.env.VITE_BACKEND_URL));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 2. Load More Logic (No change needed here) ---
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const newCount = visibleCount + 8;
      setVisibleCount(newCount);
      setDisplayedProducts(allProducts.slice(0, newCount));
      setHasMore(allProducts.length > newCount);
      setLoadingMore(false);
    }, 500);
  }, [allProducts, loadingMore, hasMore, visibleCount]);

  // --- 3. Intersection Observer (No change needed here) ---
  useEffect(() => {
    // Only observe if there is more data and no loading is currently active
    if (!hasMore || loading || loadingMore || error) return; // <--- Check for error

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5, rootMargin: "100px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadingMore, loadMore, error]); // <--- Added error dependency

  // --- 4. Initial Load Spinner UI ---
  // A. Show spinner while fetching
  if (loading && displayedProducts.length === 0) {
    return (
      <div className="min-h-screen p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        <span className="ml-3 text-teal-600">Fetching initial products...</span>
      </div>
    );
  }

  // B. Show persistent error message if fetch failed
  if (error) {
    return (
      <div className="min-h-screen p-8 flex flex-col justify-center items-center bg-red-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
        <p className="text-red-600 text-center max-w-lg">{error}</p>
        <p className="text-gray-500 text-sm mt-4">Check your console for more details on the fetch error.</p>
      </div>
    );
  }

  // --- 5. Main Render ---
  return (
    <div className="min-h-screen">
      <div className="">
        <NewAdsTitles direction="left" speed={100}>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
        </NewAdsTitles>
      </div>
      <div className="p-4 md:p-8">
        {/*banners casorle here */}

        <div className="mt-2">
          <Banners images={[]} />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <Card
              key={product._id || product.productId}
              productId={product.productId}
              productName={product.productName}
              lastPrices={product.lastPrices}
              price={product.price}
              images={product.images}
            />
          ))}
        </div>

        {/* --- 6. Loading More Indicator UI --- */}
        {loadingMore && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mr-3"></div>
              <span className="text-teal-600">Loading more products...</span>
            </div>
          </div>
        )}

        {/* Observer target for Intersection Observer */}
        {/* Only visible when there's a chance of loading more */}
        {hasMore && <div ref={observerTarget} className="h-10"></div>}


        {/* --- 7. Fallback "Load More" Button UI --- */}
        {hasMore && !loadingMore && (
          <div className="text-center py-8">
            <div className="mb-4 text-gray-600 text-sm">
              Scroll down to load more or click below
            </div>
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Load More ({allProducts.length - displayedProducts.length}{" "}
              remaining)
            </button>
          </div>
        )}

        {/* --- 8. All Loaded Message UI --- */}
        {!hasMore && allProducts.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-block px-6 py-3 bg-green-100 text-green-800 rounded-full">
              🎉 All {allProducts.length} products loaded!
            </div>
            <p className="text-gray-500 text-sm mt-2">
              You've reached the end of our products
            </p>
          </div>
        )}

        {/* Scroll indicator for mobile */}
        {hasMore && displayedProducts.length > 8 && (
          <div className="fixed bottom-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg text-sm animate-bounce lg:hidden">
            ↓ Scroll for more
          </div>
        )}
      </div>
    </div>
  );
}
````

## File: src/components/pages/Login.jsx
````javascript
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        { email, password }
      );

      // Save token
      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("authChange"));

      // Navigate
      if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
            <p className="text-gray-600 mt-1">Enter your credentials to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/components/pages/viewCart.jsx
````javascript
import React, { useEffect, useState } from "react";
// Added 'updateItemQty' to imports
import { loadCart, deleteItem, updateItemQty } from "@/components/utils/cart";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// Added 'Minus' and 'Plus' icons
import { Trash2, ShoppingBag, AlertCircle, ChevronRight, Package, Tag, CreditCard, Shield, Truck, Minus, Plus } from "lucide-react";

const initialQuoteState = {
  orderedItems: [],
  total: 0,
  labeledTotal: 0,
  discount: 0,
  message: "Calculating prices...",
};

export default function ViewCart() {
  const [quoteData, setQuoteData] = useState(initialQuoteState);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Check auth and load token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setToken(null);
      setQuoteData({ ...initialQuoteState, message: "Please log in to view your cart." });
      return;
    }
    setToken(storedToken);
  }, []);

  // 2. Fetch Quote Function
  const fetchQuote = async (currentToken) => {
    const cart = loadCart();
    
    if (!cart.length) {
      setQuoteData({ ...initialQuoteState, message: "Your cart is empty." });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders/quote",
        { orderedItems: cart },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );
      setQuoteData(data);
    } catch (error) {
      console.error("Quote API Error:", error);
      
      const serverMessage = error.response?.data?.message;

      // Handle Stock Errors (400) specifically so user sees "Insufficient stock"
      if (error.response?.status === 400 && serverMessage) {
         setQuoteData({ 
            ...initialQuoteState, 
            orderedItems: loadCart(), // Keep showing items even on error
            message: serverMessage 
         });
         // Optional: Toast for better visibility
         Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: serverMessage,
            showConfirmButton: false,
            timer: 3000
         });
      } else if (error.response?.status === 401) {
        setQuoteData({ ...initialQuoteState, message: "Session expired. Please login again." });
      } else {
        setQuoteData({ ...initialQuoteState, message: "Failed to fetch prices." });
      }
    } finally {
      setLoading(false);
    }
  };

  // 3. Trigger Fetch when token is ready
  useEffect(() => {
    if (token) {
      fetchQuote(token);
    }
  }, [token]);

  // --- NEW FEATURE: Handle Quantity Change ---
  const handleQtyChange = (productId, currentQty, change) => {
    const newQty = currentQty + change;

    // Prevent going below 1 (User should use 'Remove' button for that)
    if (newQty < 1) return;

    // 1. Update Local Storage
    updateItemQty(productId, newQty);

    // 2. Re-fetch quote to update totals and check stock
    if (token) {
        fetchQuote(token);
    }
  };

  // Delete item with confirmation
  const handleDelete = (productId, productName) => {
    Swal.fire({
      title: 'Remove Item',
      text: `Are you sure you want to remove "${productName}" from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(productId);
        
        const updatedCart = loadCart();
        if (updatedCart.length === 0) {
           setQuoteData({ ...initialQuoteState, message: "Your cart is empty." });
        } else {
           fetchQuote(token);
        }

        Swal.fire({
          icon: 'success',
          title: 'Item Removed',
          text: 'The item has been removed from your cart.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Clear entire cart
  const handleClearCart = () => {
    Swal.fire({
      title: 'Clear Cart',
      text: 'Are you sure you want to clear all items from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, clear all!',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cart");
        setQuoteData({ ...initialQuoteState, message: "Your cart has been cleared." });
        
        Swal.fire({
          icon: 'success',
          title: 'Cart Cleared',
          text: 'All items have been removed from your cart.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Checkout
  const handleCheckout = () => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "Please log in to proceed to checkout.",
        confirmButtonColor: "#f59e0b",
        backdrop: 'rgba(0,0,0,0.5)'
      });
      navigate("/login");
      return;
    }

    if (!quoteData.orderedItems.length || quoteData.total <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text: "Your cart is empty or calculation failed. Please add items to proceed.",
        confirmButtonColor: "#f59e0b",
        backdrop: 'rgba(0,0,0,0.5)'
      });
      return;
    }

    Swal.fire({
      title: "Confirm Checkout",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to place an order for:</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <p class="font-semibold text-lg">Rs. ${quoteData.total.toFixed(2)}</p>
            <p class="text-sm text-gray-600">${quoteData.orderedItems.length} item(s) in your cart</p>
          </div>
          <p class="text-sm text-gray-600">You will be redirected to the shipping details page.</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Proceed to Shipping",
      cancelButtonText: "Review Order",
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/shipping/", { state: quoteData });
      }
    });
  };

  const { orderedItems, total, labeledTotal, discount, message } = quoteData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-amber-500 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          </div>
          <p className="text-gray-600">Review and manage your items before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {/* Message Banner */}
            {message && (
              <div className="mb-6">
                <div className={`flex items-center p-4 rounded-lg ${
                  message.includes("Please log in") || message.includes("Failed") || message.includes("Session") || message.includes("Insufficient")
                    ? "bg-red-50 border border-red-200"
                    : message.includes("empty")
                    ? "bg-amber-50 border border-amber-200"
                    : "bg-blue-50 border border-blue-200"
                }`}>
                  <AlertCircle className={`h-5 w-5 mr-3 ${
                    message.includes("Please log in") || message.includes("Failed") || message.includes("Session") || message.includes("Insufficient")
                      ? "text-red-500"
                      : message.includes("empty")
                      ? "text-amber-500"
                      : "text-blue-500"
                  }`} />
                  <span className={`text-sm ${
                    message.includes("Please log in") || message.includes("Failed") || message.includes("Session") || message.includes("Insufficient")
                      ? "text-red-700"
                      : message.includes("empty")
                      ? "text-amber-700"
                      : "text-blue-700"
                  }`}>{message}</span>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Cart Items ({orderedItems.length})
                  </h2>
                  {orderedItems.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>

              {token && orderedItems.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {orderedItems.map((item) => (
                    <div key={item.productId} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-amber-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.productName}</h3>
                              <p className="text-sm text-gray-500 mt-1">Product ID: {item.productId}</p>
                              
                              {/* --- UPDATED: Quantity Controls --- */}
                              <div className="flex items-center space-x-3 mt-3">
                                <button 
                                  onClick={() => handleQtyChange(item.productId, item.qty, -1)}
                                  disabled={loading || item.qty <= 1}
                                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  title="Decrease quantity"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                
                                <span className="font-semibold text-gray-900 w-6 text-center">
                                  {item.qty}
                                </span>
                                
                                <button 
                                  onClick={() => handleQtyChange(item.productId, item.qty, 1)}
                                  disabled={loading}
                                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  title="Increase quantity"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              {/* ---------------------------------- */}
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                {item.discount > 0 && (
                                  <span className="text-sm text-gray-400 line-through">
                                    Rs. {(item.price * item.qty).toFixed(2)}
                                  </span>
                                )}
                                <span className="text-lg font-bold text-gray-900">
                                  Rs. {(item.lastPrice * item.qty).toFixed(2)}
                                </span>
                              </div>
                              {item.discount > 0 && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                  <Tag className="h-3 w-3 mr-1" />
                                  Save Rs. {(item.discount * item.qty).toFixed(2)}
                                </span>
                              )}
                              <button
                                onClick={() => handleDelete(item.productId, item.productName)}
                                className="mt-3 flex items-center text-sm text-red-600 hover:text-red-700 font-medium ml-auto"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-8">Add some products to get started!</p>
                  <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Continue Shopping
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              )}
            </div>

            {/* Security Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Secure Payment</h4>
                  <p className="text-sm text-gray-500">100% safe and secure</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over Rs. 5000</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Easy Returns</h4>
                  <p className="text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({orderedItems.length} items)</span>
                    <span className="font-medium">Rs. {labeledTotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-700 font-medium">Discount</span>
                      </div>
                      <span className="font-bold text-green-700">- Rs. {discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>

                  <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Included</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between py-4 border-t border-gray-200">
                    <div>
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <p className="text-sm text-gray-500">Including all taxes</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">Rs. {total.toFixed(2)}</div>
                      {labeledTotal > 0 && (
                        <div className="text-sm text-gray-500 line-through">Rs. {labeledTotal.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={!token || total <= 0 || loading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    total > 0 && token && !loading
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Proceed to Checkout</span>
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                >
                  Continue Shopping
                </button>

                {/* Help Text */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Need help?{" "}
                    <button className="text-amber-600 hover:text-amber-700 font-medium">
                      Contact Support
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Tips */}
            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Shopping Tips
              </h3>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Free shipping on orders above Rs. 5000
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Prices are inclusive of all taxes
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  You can modify your order before checkout
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  30-day return policy applies to all items
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/components/Navbar.jsx
````javascript
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import NotificationsDropdown from "@/components/utils/notificationDrop";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Auth check
  const authCheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsAdmin(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAdmin(decoded.role === "admin");
    } catch {
      setUser(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    authCheck();
    window.addEventListener("authChange", authCheck);
    return () => window.removeEventListener("authChange", authCheck);
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const userId = user?.id || "";

  return (
    <nav className="bg-gray-100 shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          MyBrand
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/service">Service</Link>

          {user && (
            <>
              <Link to={`/viewcart?userId=${userId}`}>Cart</Link>
              <Link to={`/orders?userId=${userId}`}>Orders</Link>
            </>
          )}

          {/* Admin notifications */}
          {isAdmin && <NotificationsDropdown />}
          {isAdmin && <Link to="/admin/dashboard">Admin Dashboard</Link>}

          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
              <Link to={`/profile?userId=${userId}`}>Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded shadow">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/service" onClick={() => setMenuOpen(false)}>Service</Link>

          {user && (
            <>
              <Link to={`/viewcart?userId=${userId}`} onClick={() => setMenuOpen(false)}>Cart</Link>
              <Link to={`/orders?userId=${userId}`} onClick={() => setMenuOpen(false)}>Orders</Link>
            </>
          )}

          {isAdmin && (
            <Link to="/admin/dashboard/notification" onClick={() => setMenuOpen(false)}>
              Notifications
            </Link>
          )}
          {isAdmin && <Link to="/admin/dashboard">Admin Dashboard</Link>}

          {user ? (
            <>
              <Link to={`/profile?userId=${userId}`}>Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
````

## File: src/components/pages/admin/notification.jsx
````javascript
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
````

## File: src/components/pages/productoverview.jsx
````javascript
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageSlider from "@/components/imageSlider";
import { addToCart } from "../utils/cart";
import {
  FiShoppingCart,
  FiTag,
  FiInfo,
  FiArrowLeft,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import Swal from "sweetalert2";

export default function ProductOverview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/api/products/${productId}`
        );

        if (response.data && response.data.product) {
          setProduct(response.data);
        } else {
          setError("Product data not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  console.log(product);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyNow = () => {
    if (!product?.product || product.product.stock <= 0) return;

    Swal.fire({
      title: "Proceed to Checkout?",
      text: `Buy "${product.product.productName}" for LKR ${(
        product.product.lastPrices * quantity
      ).toFixed(2)}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Continue shopping",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(
          `/shipping/?P_id=${
            product.product._id
          }&productName=${encodeURIComponent(
            product.product.productName
          )}&productId=${product.product.productId}`,
          {
            state: {
              orderedItems: [
                {
                  productId: product.product.productId,
                  productName: product.product.productName,
                  price: product.product.price,
                  lastPrice: product.product.lastPrices,
                  qty: quantity,
                  image: product.product.images?.[0] || "",
                },
              ],
              total: product.product.lastPrices * quantity,
              labeledTotal: product.product.price * quantity,
              discount:
                (product.product.price - product.product.lastPrices) * quantity,
              message: "Buying single product now",
            },
          }
        );
      }
    });
  };

  const handleAddToCart = async () => {
    if (!product?.product || product.product.stock <= 0) return;

    setAddingToCart(true);
    try {
      addToCart(product.product.productId, quantity);

      await Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${quantity} × "${product.product.productName}" added to your cart`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add",
        text: "Could not add item to cart. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Product Details
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch the product information...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product?.product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {error || "Product Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for might not exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <FiArrowLeft /> Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const data = product.product;
  const discountPercentage =
    data.price > 0
      ? Math.round(((data.price - data.lastPrices) / data.price) * 100)
      : 0;
  const hasDiscount = data.price > data.lastPrices;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <FiArrowLeft /> Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6">
              <ImageSlider
                images={data.images}
                showThumbnails={true}
                autoplay={true}
              />

              {/* Product Highlights */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <FiTruck className="text-blue-600" />
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <FiShield className="text-green-600" />
                  <span className="text-sm font-medium">1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                  <MdOutlineInventory2 className="text-purple-600" />
                  <span className="text-sm font-medium">
                    In Stock: {data.stock}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* Product ID & Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  SKU: {data.productId}
                </span>
                <div className="flex items-center gap-2">
                  <FiTag className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {data.category}
                  </span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {data.productName}
              </h1>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold text-green-600">
                    {formatPrice(data.lastPrices)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-2xl text-gray-400 line-through">
                        {formatPrice(data.price)}
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-full">
                        -{discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div
                className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  data.stock > 10
                    ? "bg-green-100 text-green-800"
                    : data.stock > 0
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    data.stock > 10
                      ? "bg-green-500"
                      : data.stock > 0
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="font-medium">
                  {data.stock > 10
                    ? "In Stock"
                    : data.stock > 0
                    ? `Only ${data.stock} left`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={data.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= data.stock) setQuantity(val);
                    }}
                    className="w-20 text-center border border-gray-300 rounded-lg py-2"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= data.stock}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    Max: {data.stock} units
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={data.stock <= 0 || addingToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <FiShoppingCart /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={data.stock <= 0}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FiInfo className="text-gray-600" />
                  Product Description
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {data.description ||
                      "No description available for this product."}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold text-gray-800">{data.category}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Brand</p>
                  <p className="font-semibold text-gray-800">{data.brand}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/components/pages/Homepage.jsx
````javascript
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "@/components/pages/HomeContainer";
import Login from "./Login";
import Dashboard from "@/components/pages/admin/Dashboard/dashboard";
import NotFound from "@/components/pages/NotFound";
import Signup from "@/components/pages/singUp";
import Productoverview from "./productoverview";
import ViewCartPage from "./viewCart";
import ShipingPage from "@/components/pages/shipping";
import AboutPage from "@/components/pages/about.jsx";
import ServicePage from "@/components/pages/service.jsx";
import { jwtDecode } from "jwt-decode"; // FIXED IMPORT
import AiChatBot from "@/components/aiChatBot";
import PaymentPage from "@/components/pages/admin/payment";
import OrderPage from "@/components/pages/orderpage.jsx";
import ProfilePage from "@/components/pages/ProfilePage.jsx";



export default function Homepage() {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState("customer");

  useEffect(() => {
    const authcheck = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser("customer");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setUser(decoded.role === "admin" ? "admin" : "customer");
      } catch {
        setUser("customer");
      }
    };

    authcheck(); // first check
    window.addEventListener("authChange", authcheck);

    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      {/* Main content area */}
      <div className="w-full h-[calc(100vh-100px)]">
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/viewcart" element={<ViewCartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shipping/" element={<ShipingPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />

          <Route path="/orders" element={<OrderPage />} />
          <Route path="/orders/:orderId" element={<OrderPage />} />


          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin/dashboard/*" element={<Dashboard />} />



          <Route path="*" element={<NotFound />} />

          <Route
            path="/productoverview/:productId"
            element={<Productoverview />}
          />
        </Routes>
      </div>

      {/* Show chatbot only for customer */}
      {user === "customer" && <AiChatBot />}
    </div>
  );
}
````

## File: src/components/aiChatBot.jsx
````javascript
import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import axios from "axios";

// ----------------------
// Message Bubble Component
// ----------------------
const MessageBubble = memo(({ msg }) => {
  const isUser = msg.sender === "user";
  const isAdmin = msg.sender === "admin";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} animate-in`}>
      <div
        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-slate-900 text-white rounded-t-2xl rounded-bl-2xl"
            : isAdmin
            ? "bg-blue-600 text-white rounded-t-2xl rounded-br-2xl"
            : "bg-slate-100 text-slate-700 border border-slate-200 rounded-t-2xl rounded-br-2xl"
        }`}
      >
        {msg.text}
      </div>
      <span className="text-[10px] text-slate-400 mt-1 font-semibold uppercase tracking-wider">
        {isUser ? "You" : isAdmin ? "Admin Representative" : "AI Assistant"}
      </span>
    </div>
  );
});

// ----------------------
// ChatBot Component
// ----------------------
export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // ----------------------
  // Fetch Admin Replies
  // ----------------------
  const fetchAdminReplies = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:4000/api/messages/getadminreplies", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.messages && res.data.messages.length > 0) {
        setMessages((prev) => {
          const existingTexts = prev.map((m) => m.text);
          const newReplies = res.data.messages.filter((m) => !existingTexts.includes(m.text));
          if (newReplies.length === 0) return prev;
          return [...prev, ...newReplies];
        });
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
    }
  }, []);

  // ----------------------
  // Polling Admin Replies
  // ----------------------
  useEffect(() => {
    let interval;
    if (isOpen) {
      fetchAdminReplies();
      interval = setInterval(fetchAdminReplies, 4000);
    }
    return () => clearInterval(interval);
  }, [isOpen, fetchAdminReplies]);

  // ----------------------
  // Fetch Initial Messages (User + AI)
  // ----------------------
  const fetchLatestMessages = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:4000/api/messages/getmessages", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.messages && Array.isArray(res.data.messages)) {
        const formatted = res.data.messages.map((msg) => ({
          sender: msg.sender,
          text: msg.text,
        }));
        setMessages(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchLatestMessages();
  }, [isOpen, fetchLatestMessages]);

  // ----------------------
  // Scroll to bottom on new messages
  // ----------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ----------------------
  // Handle Sending Messages (Pessimistic Update)
  // ----------------------
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const token = localStorage.getItem("token");
    const messageText = input.trim();

    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/messages/sendmessage",
        { message: messageText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.messages && Array.isArray(data.messages)) {
        setMessages((prev) => [...prev, ...data.messages]);
      }
    } catch (err) {
      console.error("Send failed:", err);
      alert("Message sending failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------
  // Render
  // ----------------------
  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-2xl shadow-xl"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[360px] h-[600px] bg-white rounded-[32px] flex flex-col shadow-2xl overflow-hidden border">
          {/* Header */}
          <header className="p-6 border-b flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Support Center</h3>
          </header>

          {/* Messages */}
          <main className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-slate-50/30">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} msg={msg} />
            ))}
            {loading && (
              <div className="text-[11px] text-slate-400 italic">Sending...</div>
            )}
            <div ref={messagesEndRef} />
          </main>

          {/* Footer */}
          <footer className="p-4 bg-white border-t">
            <form
              onSubmit={handleSend}
              className="flex gap-2 bg-slate-100 rounded-2xl p-1.5 pl-4"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something or @admin..."
                disabled={loading}
                className="flex-1 bg-transparent outline-none text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white p-2 rounded-xl disabled:opacity-50"
              >
                ➤
              </button>
            </form>
          </footer>
        </div>
      )}
    </div>
  );
}
````
`````

## File: aiChatBot.jsx
`````javascript
import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Swal from "sweetalert2";

export default function AiChatBot() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null);

  // Show loading SweetAlert
  const showLoadingAlert = (title, text) => {
    return Swal.fire({
      title: title || "Loading...",
      text: text || "Please wait",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  };

  // Show success SweetAlert
  const showSuccessAlert = (title, text) => {
    return Swal.fire({
      title: title || "Success!",
      text: text || "Operation completed successfully",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Show error SweetAlert
  const showErrorAlert = (title, text) => {
    return Swal.fire({
      title: title || "Error!",
      text: text || "Something went wrong",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
    });
  };

  // Show confirmation dialog
  const showConfirmationDialog = async (title, text, confirmText = "Yes", cancelText = "No") => {
    const result = await Swal.fire({
      title: title || "Are you sure?",
      text: text || "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    });
    return result.isConfirmed;
  };

  // Load messages with SweetAlert loading
  const loadMessages = useCallback(async () => {
    if (loading) return;

    const loadingAlert = showLoadingAlert("Loading Messages", "Fetching your chat history...");
    
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/chat/getMessagesbyid", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.data && res.data.messages) {
        setMessages(res.data.messages);
      } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
        setMessages(res.data.data);
      } else {
        setMessages([]);
      }
      
      await loadingAlert.close();
    } catch (err) {
      await loadingAlert.close();
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            showErrorAlert("Session Expired", "Please login again to continue chatting.");
            // Optional: Redirect to login
            // window.location.href = "/login";
            break;
          case 403:
            showErrorAlert("Access Denied", "You don't have permission to access chat history.");
            break;
          case 404:
            showErrorAlert("Not Found", "Chat history not found.");
            break;
          default:
            showErrorAlert("Error", "Failed to load messages. Please try again.");
        }
      } else {
        showErrorAlert("Network Error", "Unable to connect to the server. Please check your connection.");
      }
      console.error("Error loading messages:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Load messages when chat opens
  useEffect(() => {
    if (open && token) {
      loadMessages();
    } else {
      setMessages([]);
    }
  }, [open]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll when messages change
  useEffect(() => {
    if (open && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, open]);

  // Handle reply with SweetAlert
  const handleReply = async () => {
    if (!newMessage.trim() || sending) return;
    
    // Optional: Show confirmation for long messages
    if (newMessage.trim().length > 500) {
      const confirmed = await showConfirmationDialog(
        "Send Long Message?",
        "Your message is quite long. Are you sure you want to send it?",
        "Send",
        "Cancel"
      );
      if (!confirmed) return;
    }
    
    const messageToSend = newMessage.trim();
    
    // Create local message
    const localMessage = {
      _id: Date.now(),
      sender: "User",
      text: messageToSend,
      createdAt: new Date().toISOString(),
    };

    // Optimistic Update
    setMessages((prev) => [...prev, localMessage]);
    setNewMessage("");
    setSending(true);

    try {
      // Show sending indicator
      const sendingAlert = showLoadingAlert("Sending", "Your message is being sent...");
      
      await axios.post(
        "http://localhost:4000/api/chat/sendMessage",
        { text: messageToSend }, 
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      await sendingAlert.close();
      await showSuccessAlert("Sent!", "Message delivered successfully");
      
      // Wait a bit before reloading messages
      setTimeout(() => {
        loadMessages();
      }, 500);
      
    } catch (error) {
      console.error("Message sending failed:", error);
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            showErrorAlert("Session Expired", "Please login again to send messages.");
            break;
          case 403:
            showErrorAlert("Permission Denied", "You don't have permission to send messages.");
            break;
          case 429:
            showErrorAlert("Too Many Requests", "Please wait a moment before sending another message.");
            break;
          case 500:
            showErrorAlert("Server Error", "Our server encountered an error. Please try again later.");
            break;
          default:
            showErrorAlert("Failed to Send", "Unable to send message. Please try again.");
        }
      } else if (error.request) {
        showErrorAlert("Network Error", "Unable to connect to the server. Please check your internet connection.");
      } else {
        showErrorAlert("Error", "Something went wrong. Please try again.");
      }
      
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg._id !== localMessage._id));
      setNewMessage(messageToSend);
    } finally {
      setSending(false);
    }
  };

  // Handle chat window toggle with confirmation if there's unsent message
  const handleToggleChat = async () => {
    if (newMessage.trim() && !open) {
      const confirmed = await showConfirmationDialog(
        "Unsaved Message",
        "You have an unsent message. Open chat anyway?",
        "Open",
        "Continue Writing"
      );
      if (!confirmed) return;
    }
    setOpen(!open);
  };

  // Clear chat history
  const handleClearChat = async () => {
    if (messages.length === 0) return;
    
    const confirmed = await showConfirmationDialog(
      "Clear Chat History?",
      "This will remove all your chat history. This action cannot be undone.",
      "Clear All",
      "Cancel"
    );
    
    if (!confirmed) return;
    
    const loadingAlert = showLoadingAlert("Clearing", "Removing chat history...");
    
    try {
      await axios.delete("http://localhost:4000/api/chat/clearMessages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      await loadingAlert.close();
      await showSuccessAlert("Cleared!", "All chat history has been removed.");
      setMessages([]);
    } catch (error) {
      await loadingAlert.close();
      showErrorAlert("Clear Failed", "Failed to clear chat history. Please try again.");
      console.error("Error clearing messages:", error);
    }
  };

  // Debug: Check token with SweetAlert
  useEffect(() => {
    if (!token && open) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please login to use the chat feature.",
        icon: "warning",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          window.location.href = "/login";
        } else {
          setOpen(false);
        }
      });
    }
  }, [open, token]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button with notification badge */}
      <div className="relative">
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          onClick={handleToggleChat}
        >
          💬
          {messages.length > 0 && !open && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {messages.length > 9 ? '9+' : messages.length}
            </span>
          )}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center px-4 py-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full absolute -top-0 -right-0 animate-ping"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full absolute -top-0 -right-0"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Assistant</h3>
                <p className="text-xs opacity-80">
                  {(loading || sending) ? "Processing..." : "Online"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  className="text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition"
                  title="Clear chat history"
                >
                  🗑️
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-lg hover:text-gray-200 transition"
                title="Close chat"
              >
                ✖
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {/* Loading Indicator with SweetAlert2 style */}
            {loading && messages.length === 0 && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mx-auto mb-3"></div>
                <p className="text-gray-500 text-sm">Loading your conversation history...</p>
              </div>
            )}

            {/* No messages */}
            {!loading && messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💬</span>
                </div>
                <h4 className="font-semibold text-gray-700">Start a Conversation</h4>
                <p className="text-gray-500 text-sm mt-1">Ask me anything! I'm here to help.</p>
                <div className="mt-4 text-left bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-xs text-gray-600 mb-1">Try asking:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• "Hello, how can you help me?"</li>
                    <li>• "Explain machine learning in simple terms"</li>
                    <li>• "What's the weather like today?"</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message._id}
                className={`p-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                  message.sender !== "User"
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200"
                    : "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                } max-w-[85%] ${
                  message.sender !== "User" ? "mr-auto" : "ml-auto"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    message.sender !== "User" 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                      : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                  }`}>
                    {message.sender !== "User" ? "AI" : "U"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {message.sender}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {message.text}
                    </p>
                    <small className="text-xs text-gray-500 block mt-2">
                      {new Date(message.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </small>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Sending indicator */}
            {sending && (
              <div className="text-center py-2">
                <div className="inline-flex items-center space-x-2 text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                  <span className="text-sm">Sending message...</span>
                </div>
              </div>
            )}
            
            {/* Scroll Ref */}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer with Reply */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  disabled={loading || sending}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed pr-12"
                  onKeyPress={(e) => { 
                    if (e.key === 'Enter' && !sending && newMessage.trim()) {
                      handleReply();
                    }
                  }}
                  maxLength={2000}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  {newMessage.length}/2000
                </div>
              </div>
              <button
                onClick={handleReply}
                disabled={loading || sending || !newMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center w-12"
                title={sending ? "Sending..." : "Send message"}
              >
                {sending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                ) : (
                  <span className="text-lg">➤</span>
                )}
              </button>
            </div>
            {newMessage.length > 1500 && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Message getting too long ({newMessage.length}/2000)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
`````

## File: all.md
`````markdown
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

const token = localStorage.getItem("token");

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const prevCount = useRef(0);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newNotifications = res.data.adminMessages;

      if (prevCount.current && newNotifications.length > prevCount.current) {
        Swal.fire({
          icon: "info",
          title: "New Notification",
          text: "You have new messages",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          position: "top-end",
        });
      }

      prevCount.current = newNotifications.length;
      setNotifications(newNotifications);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

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
        Swal.fire({
          icon: "success",
          title: "Reply Sent!",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: "top-end",
        });

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

        Swal.fire({
          icon: "success",
          title: "Deleted",
          toast: true,
          timer: 1500,
          showConfirmButton: false,
          position: "top-end",
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: err.response?.data?.message || "Something went wrong",
        });
      }
    });
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight">
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
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No notifications yet
              </h3>
              <p className="text-gray-500">
                Messages from users will appear here
              </p>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-700 inline-block">
                          {notif.userId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md truncate">
                          {notif.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {new Date(notif.sentAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          <br />
                          <span className="text-gray-500 text-xs">
                            {new Date(notif.sentAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleReply(notif._id)}
                            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow"
                          >
                            Reply
                          </button>
                          {!notif.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(notif._id)}
                              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow"
                            >
                              Read
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notif._id)}
                            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow"
                          >
                            Delete
                          </button>
                        </div>
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
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-6 pt-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      Reply to User
                    </h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your reply message:
                    </label>
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
                        className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={sendReply}
                        disabled={!replyText.trim()}
                        className={`px-5 py-2.5 font-medium rounded-xl transition-all duration-200 ${
                          replyText.trim()
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-sm hover:shadow"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
`````

## File: eslint.config.js
`````javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
`````

## File: index.html
`````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`````

## File: jsconfig.json
`````json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "src/*"
            ],
            "@components/*": [
                "src/components/*"
            ],
            "@utils/*": [
                "src/utils/*"
            ]
        }
    },
    "include": [
        "src"
    ]
}
`````

## File: public/vite.svg
`````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>
`````

## File: README.md
`````markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
`````

## File: repomix.config.json
`````json
{
  "$schema": "https://repomix.com/schemas/latest/schema.json",
  "input": {
    "maxFileSize": 52428800
  },
  "output": {
    "filePath": "repomix-output.md",
    "style": "markdown",
    "parsableStyle": false,
    "fileSummary": true,
    "directoryStructure": true,
    "files": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "compress": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "truncateBase64": false,
    "copyToClipboard": false,
    "includeFullDirectoryStructure": false,
    "tokenCountTree": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": false,
      "includeLogs": false,
      "includeLogsCount": 50
    }
  },
  "include": [],
  "ignore": {
    "useGitignore": true,
    "useDotIgnore": true,
    "useDefaultPatterns": true,
    "customPatterns": []
  },
  "security": {
    "enableSecurityCheck": true
  },
  "tokenCount": {
    "encoding": "o200k_base"
  }
}
`````

## File: src/App.css
`````css

`````

## File: src/assets/react.svg
`````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
`````

## File: src/components/Banners.jsx
`````javascript
import React, { useState, useEffect, useRef } from 'react';

export default function Banners({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const delay = 3000; // 3 seconds per slide

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => resetTimeout();
  }, [currentIndex, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="flex-shrink-0 w-full">
            <img src={src} alt={`banner-${idx}`} className="w-full h-64 object-cover rounded-lg" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
      >
        &#8594;
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 w-full flex justify-center space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              idx === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
`````

## File: src/components/imageSlider.jsx
`````javascript
import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function ImageSlider({ images = [] }) {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) return null;

  return (
    <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      {/* Main Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
        <img
          src={images[currentImage]}
          alt={`product-${currentImage}`}
          className="w-full h-full object-cover object-center"
        />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 sm:left-3 md:left-4 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-black/60 transition"
        >
          <AiOutlineLeft size={20} className="sm:text-[24px] md:text-[28px]" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 sm:right-3 md:right-4 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-black/60 transition"
        >
          <AiOutlineRight size={20} className="sm:text-[24px] md:text-[28px]" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 mt-3 justify-center overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
              currentImage === index ? "border-red-500" : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt={`thumb-${index}`}
              className="w-16 h-16 object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
`````

## File: src/components/pages/about.jsx
`````javascript
import React from 'react';

export default function About() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700 text-lg">
        Welcome to our website! This is the About page where you can share information
        about your company, mission, or services.
      </p>
    </div>
  );
}
`````

## File: src/components/pages/admin/Dashboard/dashboard.jsx
`````javascript
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

import Sidebar from "@/components/pages/admin/Dashboard/Sidebar";
import TopBar from "@/components/pages/admin/Dashboard/TopBar";
import DashboardRoutes from "@/components/pages/admin/Dashboard/DashboardRoutes";
import Footer from "@/components/pages/admin/Dashboard/Footer";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalRevenue: 0, newUsers: 0 });

  const navigate = useNavigate();

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
      }
    });
  };

  const authcheck = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      navigate("/login");
      setLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        Swal.fire({ icon: "error", title: "Access Denied", text: "Only administrators can access this dashboard" })
          .then(() => navigate("/"));
        setLoading(false);
        return;
      }
      setUser(decoded);
      setLoading(false);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    authcheck();
    window.addEventListener("authChange", authcheck);
    return () => window.removeEventListener("authChange", authcheck);
  }, [authcheck]);

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== "admin") return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar user={user} unreadCount={unreadCount} stats={stats} handleLogout={handleLogout} closeMobile={() => setMobileOpen(false)} />
      <TopBar user={user} mobileOpen={mobileOpen} toggleMobile={toggleMobile} />
      <div className="flex-1 lg:mt-15 lg:ml-20">
        <DashboardRoutes stats={stats} />
        <Footer />
      </div>
    </div>
  );
}
`````

## File: src/components/pages/admin/Dashboard/Footer.jsx
`````javascript
// Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-200">
      <p>Admin Dashboard v1.0 • © {new Date().getFullYear()} Your Company</p>
    </div>
  );
}
`````

## File: src/components/pages/admin/Dashboard/Sidebar.jsx
`````javascript
// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard, RxExit } from "react-icons/rx";
import {
  MdOutlineGridView,
  MdAddBox,
  MdNotifications,
  MdShoppingCart,
  MdBarChart,
  MdSettings,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";

export default function Sidebar({
  user,
  unreadCount,
  stats,
  handleLogout,
  closeMobile,
}) {
  return (
    <div className="fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 shadow-xl z-40 transition-transform duration-300">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Link to="/admin/dashboard" className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mr-3">
            <RxDashboard className="text-white text-xl" />
          </div>
          <span className="text-2xl font-bold text-gray-800">AdminPanel</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div>
            <div className="font-semibold text-gray-800">
              {user?.name || "Admin User"}
            </div>
            <div className="text-sm text-gray-500">
              {user?.email || "admin@example.com"}
            </div>
            <div className="text-xs mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full inline-block">
              Administrator
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Navigation
        </div>
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <RxDashboard size={20} className="text-blue-600" />
          Overview
        </Link>
        <Link
          to="/admin/dashboard/adminviewproducts"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdOutlineGridView size={20} className="text-green-600" />
          View Products
        </Link>
        <Link
          to="/admin/dashboard/addproducts"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdAddBox size={20} className="text-purple-600" />
          Add Product
        </Link>
        <Link
          to="/admin/dashboard/notification"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdNotifications size={20} className="text-red-600 relative" />
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </Link>
        <Link
          to="/admin/dashboard/orders"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdShoppingCart size={20} className="text-indigo-600" />
          Orders ({stats.totalOrders})
        </Link>
        <Link
          to="/admin/dashboard/users"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <FiUsers size={20} className="text-teal-600" />
          Users
        </Link>
        <Link
          to="/admin/dashboard/analytics"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdBarChart size={20} className="text-amber-600" />
          Analytics
        </Link>
        <Link
          to="/admin/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
          onClick={closeMobile}
        >
          <MdSettings size={20} className="text-gray-600" />
          Settings
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium bg-red-50 text-red-600 hover:bg-red-100"
        >
          <RxExit size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
`````

## File: src/components/pages/admin/Dashboard/StatCard.jsx
`````javascript
// StatCard.jsx
import React from "react";

export default function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex items-center space-x-4">
      <div className={`p-3 rounded-full bg-opacity-10 ${color.replace("text-", "bg-")}`}>
        {React.cloneElement(icon, { className: color })}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
`````

## File: src/components/pages/admin/Dashboard/TopBar.jsx
`````javascript
// TopBar.jsx
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function TopBar({ user, mobileOpen, toggleMobile }) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-teal-500 p-4 flex justify-between items-center z-50 shadow-lg">
      <div className="flex items-center">
        <button onClick={toggleMobile} className="mr-4 text-white">
          <RxHamburgerMenu size={28} />
        </button>
        <h1 className="text-white text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <div className="text-sm text-blue-100">Welcome</div>
          <div className="text-white font-semibold">{user?.name || "Admin"}</div>
        </div>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{user?.name?.charAt(0) || "A"}</span>
        </div>
      </div>
    </div>
  );
}
`````

## File: src/components/pages/admin/repomix-output.md
`````markdown
This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
addProducts.jsx
AdminAllProductView.jsx
dashboard.jsx
EditProducts.jsx
notification.jsx
payment.jsx
repomix.config.json
```

# Files

## File: addProducts.jsx
```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import { FiUpload, FiImage, FiDollarSign, FiPackage, FiTag, FiShoppingCart } from "react-icons/fi";

export default function AddProducts() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    productId: uuidv4().substring(0, 8).toUpperCase(),
    productName: "",
    altNames: "",
    price: "",
    lastPrices: "",
    stock: "",
    description: "",
    category: "General",
    brand: "Unbranded",
  });

  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "Other"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        alert("Only administrators can add products.");
        navigate("/");
      }
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // Generate new product ID
  const generateNewId = () => {
    setFormData(prev => ({
      ...prev,
      productId: uuidv4().substring(0, 8).toUpperCase()
    }));
  };

  // Handle image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove image
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      alert("Product name is required");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert("Please enter a valid price");
      return false;
    }
    if (images.length === 0) {
      alert("Please upload at least one image");
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setUploading(true);
    const token = localStorage.getItem("token");
    
    try {
      // Upload images to Supabase
      const imgUrls = await Promise.all(
        images.map(file => uploadMediaToSupabase(file))
      );

      // Prepare payload
      const payload = {
        ...formData,
        productId: `PROD-${formData.productId}`,
        altNames: formData.altNames ? formData.altNames.split(",").map(n => n.trim()).filter(n => n) : [],
        price: parseFloat(formData.price),
        lastPrices: formData.lastPrices ? parseFloat(formData.lastPrices) : parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: imgUrls,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Send to backend
      const res = await axios.post(
        "http://localhost:4000/api/products",
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      console.log("Product saved:", res.data);
      
      // Show success message and reset form
      alert("✅ Product uploaded successfully!");
      
      // Reset form
      setFormData({
        productId: uuidv4().substring(0, 8).toUpperCase(),
        productName: "",
        altNames: "",
        price: "",
        lastPrices: "",
        stock: "",
        description: "",
        category: "General",
        brand: "Unbranded",
      });
      setImages([]);
      setImagePreviews([]);
      
      // Optional: Navigate to products page
      // navigate("/products");

    } catch (err) {
      console.error("Upload failed:", err);
      let errorMessage = "Failed to upload product.";
      
      if (err.response) {
        errorMessage = err.response.data?.message || err.response.statusText;
      } else if (err.request) {
        errorMessage = "No response from server. Check your connection.";
      }
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Add New Product</h1>
                <p className="text-blue-100 mt-2">Fill in the product details below</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={generateNewId}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  title="Generate new ID"
                >
                  🔄 New ID
                </button>
                <div className="text-right">
                  <div className="text-sm opacity-90">Product ID</div>
                  <div className="text-xl font-mono font-bold">PROD-{formData.productId}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiShoppingCart className="mr-2" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="Separate with commas (e.g., iPhone 15, Smartphone)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional: Other names customers might search for</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2" /> Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Price
                    </label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiPackage className="mr-2" /> Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Brand
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column - Images & Description */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2" /> Product Images *
                  </label>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-3 mb-3">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{imagePreviews.length} image(s) selected</p>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    <FiUpload className="text-3xl text-gray-400 mx-auto mb-3" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-gray-600 font-medium mb-1">Click to upload images</div>
                      <div className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</div>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the product features, specifications, etc."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading Product...
                      </>
                    ) : (
                      "Upload Product"
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    * Required fields. All product information will be saved to our database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: AdminAllProductView.jsx
```javascript
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiCopy, 
  FiDownload, 
  FiRefreshCw,
  FiPlus
} from "react-icons/fi";
import { MdGridView, MdList } from "react-icons/md";
import Swal from "sweetalert2";

export default function AdminAllProductView() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productsData = res.data?.data || res.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load products',
          confirmButtonColor: '#d33',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, token]);

  // Get unique categories and brands for filters
  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category).filter(Boolean);
    return ["all", ...new Set(allCategories)];
  }, [products]);

  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand).filter(Boolean);
    return ["all", ...new Set(allBrands)];
  }, [products]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.productName?.toLowerCase().includes(term) ||
        product.productId?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.altNames?.some(name => name.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== "all") {
      result = result.filter(product => product.brand === selectedBrand);
    }

    // Sorting
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "stock":
        result.sort((a, b) => b.stock - a.stock);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchTerm, selectedCategory, selectedBrand, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleDelete = async (productId, productName) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      html: `Are you sure you want to delete <strong>"${productName}"</strong>?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Product has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });

        // Remove from state
        setProducts(prev => prev.filter(p => p.productId !== productId));
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: err.response?.data?.message || 'Failed to delete product',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Selection',
        text: 'Please select products to delete',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Bulk Delete?',
      html: `Are you sure you want to delete ${selectedProducts.size} product(s)?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Delete ${selectedProducts.size} Items`,
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        const deletePromises = Array.from(selectedProducts).map(productId =>
          axios.delete(`http://localhost:4000/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        await Promise.all(deletePromises);

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `${selectedProducts.size} product(s) deleted`,
          timer: 2000,
          showConfirmButton: false
        });

        // Refresh products
        setProducts(prev => prev.filter(p => !selectedProducts.has(p.productId)));
        setSelectedProducts(new Set());
      } catch (err) {
        console.error("Bulk delete error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: 'Failed to delete selected products',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === currentProducts.length) {
      setSelectedProducts(new Set());
    } else {
      const allIds = new Set(currentProducts.map(p => p.productId));
      setSelectedProducts(allIds);
    }
  };

  const handleSelectProduct = (productId) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Product ID copied to clipboard',
      timer: 1500,
      showConfirmButton: false
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Products Management</h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} products • {selectedProducts.size} selected
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            onClick={() => navigate("/admin/dashboard/addproducts")}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 transition"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            title="Refresh"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, ID, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded ${viewMode === "table" ? "bg-white shadow" : "text-gray-600"}`}
            >
              <MdList size={20} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded ${viewMode === "grid" ? "bg-white shadow" : "text-gray-600"}`}
            >
              <MdGridView size={20} />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand === "all" ? "All Brands" : brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Stock: High to Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bulk Actions</label>
            <div className="flex space-x-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Action</option>
                <option value="delete">Delete Selected</option>
                <option value="export">Export Selected</option>
              </select>
              <button
                onClick={() => bulkAction === "delete" && handleBulkDelete()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                disabled={!bulkAction}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Selection */}
        {selectedProducts.size > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="text-blue-700 font-medium">
              {selectedProducts.size} product(s) selected
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedProducts(new Set())}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table (Table View) */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.size === currentProducts.length && currentProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr key={product.productId} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.productId)}
                          onChange={() => handleSelectProduct(product.productId)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            {product.images?.[0] ? (
                              <img
                                className="h-16 w-16 object-cover rounded-lg"
                                src={product.images[0]}
                                alt={product.productName}
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.productName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <span className="font-mono">{product.productId}</span>
                              <button
                                onClick={() => copyToClipboard(product.productId)}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                                title="Copy ID"
                              >
                                <FiCopy size={14} />
                              </button>
                            </div>
                            <div className="text-xs text-gray-400 truncate max-w-xs">
                              {product.description?.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          ${parseFloat(product.price).toFixed(2)}
                        </div>
                        {product.lastPrices && product.lastPrices > product.price && (
                          <div className="text-xs text-gray-500 line-through">
                            ${parseFloat(product.lastPrices).toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock} units
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/product/${product.productId}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => navigate("/admin/dashboard/editproducts", { state: { product } })}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product.productId, product.productName)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-lg mb-2">No products found</div>
                      <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                          setSelectedBrand("all");
                        }}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Clear all filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.productId} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="relative">
                  {product.images?.[0] ? (
                    <img
                      className="w-full h-48 object-cover"
                      src={product.images[0]}
                      alt={product.productName}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.productId)}
                    onChange={() => handleSelectProduct(product.productId)}
                    className="absolute top-2 left-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{product.productName}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-blue-600">${parseFloat(product.price).toFixed(2)}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate("/admin/dashboard/editproducts", { state: { product } })}
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.productId, product.productName)}
                        className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">{product.category}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📦</div>
              <div className="text-gray-600 text-xl mb-2">No products found</div>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## File: dashboard.jsx
```javascript
import React, { useEffect, useState } from "react";
import { 
  RxHamburgerMenu, 
  RxDashboard, 
  RxPerson, 
  RxExit 
} from "react-icons/rx";
import { 
  MdOutlineGridView, 
  MdAddBox, 
  MdEdit, 
  MdNotifications,
  MdShoppingCart,
  MdBarChart,
  MdSettings,
  MdChevronRight,
  MdChevronLeft
} from "react-icons/md";
import { 
  FiUsers, 
  FiPackage, 
  FiDollarSign, 
  FiTrendingUp 
} from "react-icons/fi";
import { Link, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AddProducts from "./addProducts";
import AdminAllProductView from "./AdminAllProductView";
import EditProducts from "./EditProducts";
import Notification from "./notification";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Stats for dashboard
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    newUsers: 0,
  });

  // Auth check
  const authcheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'Only administrators can access this dashboard',
          confirmButtonColor: '#d33',
        }).then(() => {
          navigate("/");
        });
        return;
      }
      setUser(decoded);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      // Mock data for now
      setStats({
        totalProducts: 128,
        totalOrders: 45,
        totalRevenue: 12500,
        newUsers: 12,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    authcheck();
    fetchStats();
    window.addEventListener("authChange", authcheck);
    setLoading(false);
    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: "Are you sure you want to logout?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Top Bar - Only on Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-teal-500 p-4 flex justify-between items-center z-50 shadow-lg">
        <div className="flex items-center">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mr-4 text-white"
          >
            <RxHamburgerMenu size={28} />
          </button>
          <h1 className="text-white text-xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm text-blue-100">Welcome</div>
            <div className="text-white font-semibold">{user?.name || "Admin"}</div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">
              {user?.name?.charAt(0) || "A"}
            </span>
          </div>
        </div>
      </div>

      {/* SIDEBAR - Always visible on desktop, collapsible on mobile */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 shadow-xl z-40 transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link to="/admin/dashboard" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mr-3">
              <RxDashboard className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-gray-800">AdminPanel</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{user?.name || "Admin User"}</div>
              <div className="text-sm text-gray-500">{user?.email || "admin@example.com"}</div>
              <div className="text-xs mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full inline-block">
                Administrator
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-2">
            {/* Main Navigation */}
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
              Navigation
            </div>

            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-blue-600">
                <RxDashboard size={20} />
              </div>
              <span>Overview</span>
            </Link>

            <Link
              to="/admin/dashboard/adminviewproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-green-600">
                <MdOutlineGridView size={20} />
              </div>
              <span>View Products</span>
            </Link>

            <Link
              to="/admin/dashboard/addproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-purple-600">
                <MdAddBox size={20} />
              </div>
              <span>Add Product</span>
            </Link>


                        <Link
              to="/admin/dashboard/addproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-purple-600">
                <MdAddBox size={20} />
              </div>
              <span>Ads Managements</span>
            </Link>

            <Link
              to="/admin/dashboard/notification"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-red-600 relative">
                <MdNotifications size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <span>Notifications</span>
              <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                3 new
              </span>
            </Link>

            {/* Additional Sections */}
            <>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider my-4 px-2">
                Analytics
              </div>

              <Link
                to="/admin/dashboard/orders"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-indigo-600">
                  <MdShoppingCart size={20} />
                </div>
                <span>Orders</span>
                <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">45</span>
              </Link>

              <Link
                to="/admin/dashboard/users"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-teal-600">
                  <FiUsers size={20} />
                </div>
                <span>Users</span>
              </Link>

              <Link
                to="/admin/dashboard/analytics"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-amber-600">
                  <MdBarChart size={20} />
                </div>
                <span>Analytics</span>
              </Link>

              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider my-4 px-2">
                Settings
              </div>

              <Link
                to="/admin/dashboard/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-gray-600">
                  <MdSettings size={20} />
                </div>
                <span>Settings</span>
              </Link>
            </>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium bg-red-50 text-red-600 hover:bg-red-100 transition group"
          >
            <RxExit size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className=" w-full lg:ml-10">
        {/* Overlay for mobile sidebar */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Dashboard Header */}
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Welcome back, {user?.name?.split(' ')[0] || "Admin"}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your store today.
              </p>
            </div>
            <div className="mt-2 lg:mt-0">
              <div className="text-sm text-gray-500">Last updated</div>
              <div className="text-md font-semibold text-gray-700">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { 
                title: "Total Products", 
                value: stats.totalProducts, 
                icon: <FiPackage className="text-blue-600" size={24} />, 
                change: "+12%", 
                color: "bg-blue-50", 
                textColor: "text-blue-600" 
              },
              { 
                title: "Total Orders", 
                value: stats.totalOrders, 
                icon: <MdShoppingCart className="text-green-600" size={24} />, 
                change: "+8%", 
                color: "bg-green-50", 
                textColor: "text-green-600" 
              },
              { 
                title: "Total Revenue", 
                value: `$${stats.totalRevenue.toLocaleString()}`, 
                icon: <FiDollarSign className="text-purple-600" size={24} />, 
                change: "+23%", 
                color: "bg-purple-50", 
                textColor: "text-purple-600" 
              },
              { 
                title: "New Users", 
                value: stats.newUsers, 
                icon: <FiUsers className="text-orange-600" size={24} />, 
                change: "+5%", 
                color: "bg-orange-50", 
                textColor: "text-orange-600" 
              },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className={`text-sm font-semibold ${stat.textColor}`}>
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTERED CONTENT AREA */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[500px] flex flex-col">
              <Routes>
                <Route index element={
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6">📊</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
                    <p className="text-gray-600 max-w-2xl mb-8">
                      Select a section from the sidebar to manage products, view notifications, or access other admin features.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                      <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
                        <div className="text-blue-600 font-bold text-lg mb-2">📦 Products</div>
                        <div className="text-gray-600 text-sm">Manage your product inventory</div>
                      </div>
                      <div className="p-6 bg-green-50 border border-green-100 rounded-xl text-center">
                        <div className="text-green-600 font-bold text-lg mb-2">🛒 Orders</div>
                        <div className="text-gray-600 text-sm">View and manage customer orders</div>
                      </div>
                      <div className="p-6 bg-purple-50 border border-purple-100 rounded-xl text-center">
                        <div className="text-purple-600 font-bold text-lg mb-2">📈 Analytics</div>
                        <div className="text-gray-600 text-sm">Track store performance</div>
                      </div>
                    </div>
                  </div>
                } />
                <Route path="adminviewproducts" element={<AdminAllProductView />} />
                <Route path="addproducts" element={<AddProducts />} />
                <Route path="editproducts" element={<EditProducts />} />
                <Route path="notification" element={<Notification />} />
                <Route path="*" element={
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6">🔍</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 max-w-md mb-8">
                      The page you're looking for doesn't exist in the admin dashboard.
                    </p>
                    <button 
                      onClick={() => navigate('/admin/dashboard')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-200">
          <p>Admin Dashboard v1.0 • © {new Date().getFullYear()} Your Company</p>
        </div>
      </div>
    </div>
  );
}
```

## File: EditProducts.jsx
```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { 
  FiEdit, 
  FiSave, 
  FiTrash2, 
  FiImage, 
  FiPackage, 
  FiDollarSign, 
  FiTag, 
  FiGrid,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiBox
} from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  
  // Status options
  const statusOptions = [
    { value: "pending", label: "Pending", icon: FiClock, color: "bg-yellow-100 text-yellow-800" },
    { value: "ready", label: "Ready", icon: FiCheckCircle, color: "bg-green-100 text-green-800" },
    { value: "delivered", label: "Delivered", icon: FiTruck, color: "bg-blue-100 text-blue-800" },
    { value: "out_of_stock", label: "Out of Stock", icon: FiBox, color: "bg-red-100 text-red-800" },
  ];

  // Categories and brands for dropdown
  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food", "Office"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "HP", "Microsoft", "Other"];

  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    altNames: "",
    price: "",
    lastPrices: "",
    stock: "",
    description: "",
    category: "General",
    brand: "Unbranded",
    status: "pending", // Added status field
  });

  // Fetch product data
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        let productData;
        
        if (location.state?.product) {
          productData = location.state.product;
        } else if (id) {
          const response = await axios.get(
            `http://localhost:4000/api/products/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          productData = response.data;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Product Selected',
            text: 'Please select a product to edit',
            confirmButtonColor: '#d33',
          }).then(() => navigate("/admin/products"));
          return;
        }

        // Set form data including status
        setFormData({
          productId: productData.productId || "",
          productName: productData.productName || "",
          altNames: productData.altNames?.join(", ") || "",
          price: productData.price || "",
          lastPrices: productData.lastPrices || productData.price || "",
          stock: productData.stock || "",
          description: productData.description || "",
          category: productData.category || "General",
          brand: productData.brand || "Unbranded",
          status: productData.status || "pending", // Set status from API
        });

        if (productData.images && Array.isArray(productData.images)) {
          setExistingImageUrls(productData.images);
        }

      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load product data',
          confirmButtonColor: '#d33',
        }).then(() => navigate("/admin/products"));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [token, navigate, location.state, id]);

  // Handle new image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove new image preview
  const removeNewImage = (index) => {
    const newImagesCopy = [...newImages];
    const newPreviews = [...imagePreviews];
    
    URL.revokeObjectURL(newPreviews[index]);
    newImagesCopy.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setNewImages(newImagesCopy);
    setImagePreviews(newPreviews);
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    Swal.fire({
      title: 'Remove Image?',
      text: "This image will be removed from the product",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newExistingImages = [...existingImageUrls];
        newExistingImages.splice(index, 1);
        setExistingImageUrls(newExistingImages);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Quick status update handler
  const handleQuickStatusUpdate = (newStatus) => {
    Swal.fire({
      title: `Change Status to ${newStatus.toUpperCase()}?`,
      text: `Are you sure you want to change product status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update status!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(prev => ({ ...prev, status: newStatus }));
        Swal.fire({
          icon: 'success',
          title: 'Status Updated!',
          text: `Product status changed to ${newStatus}`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Product name is required',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Price',
        text: 'Please enter a valid price',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    if (existingImageUrls.length === 0 && newImages.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No Images',
        text: 'Please add at least one product image',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    
    try {
      // Upload new images
      const uploadedImages = newImages.length > 0 
        ? await Promise.all(newImages.map(uploadMediaToSupabase))
        : [];

      // Prepare payload including status
      const payload = {
        ...formData,
        altNames: formData.altNames 
          ? formData.altNames.split(",").map(n => n.trim()).filter(n => n)
          : [],
        price: parseFloat(formData.price),
        lastPrices: formData.lastPrices ? parseFloat(formData.lastPrices) : parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: [...existingImageUrls, ...uploadedImages],
        status: formData.status, // Include status in payload
        updatedAt: new Date().toISOString(),
      };

      // Update product
      await axios.patch(
        `http://localhost:4000/api/products/${formData.productId}`,
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      // Success alert
      await Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        text: 'Product has been successfully updated',
        showConfirmButton: false,
        timer: 2000
      });

      // Reset image states
      setNewImages([]);
      setImagePreviews([]);

      // Navigate back
      navigate("/admin/dashboard/adminviewproducts");

    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update product. Please try again.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading product data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Status */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <p className="text-blue-100 mt-2">Update product information</p>
              </div>
              <div className="mt-4 md:mt-0 space-y-2">
                <div className="text-sm opacity-90">Product ID</div>
                <div className="text-xl font-mono font-bold">{formData.productId}</div>
                
                {/* Current Status Display */}
                <div className="flex items-center space-x-2 mt-3">
                  <div className="text-sm opacity-90">Current Status:</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
                  }`}>
                    {statusOptions.find(s => s.value === formData.status)?.label || "Unknown"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Product Info */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiPackage className="mr-2" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                {/* Alternate Names */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="Separate with commas"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2" /> Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Price
                    </label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiGrid className="mr-2" /> Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Status Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Status
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {statusOptions.map((status) => (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() => handleQuickStatusUpdate(status.value)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                          formData.status === status.value
                            ? 'border-blue-500 bg-blue-50 scale-105'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <status.icon className={`h-6 w-6 mb-2 ${
                          formData.status === status.value ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          formData.status === status.value ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {status.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Select product status from dropdown or click on status cards above
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Right Column - Images */}
              <div className="space-y-6">
                {/* Existing Images */}
                {existingImageUrls.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Images ({existingImageUrls.length})
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {existingImageUrls.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Product ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Preview */}
                {imagePreviews.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Images to Add ({imagePreviews.length})
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`New ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <MdClose size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2" /> Add More Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FiImage className="text-4xl text-gray-400 mx-auto mb-4" />
                      <div className="text-gray-600 font-medium mb-2">Click to upload new images</div>
                      <div className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</div>
                    </label>
                  </div>
                </div>

                {/* Status Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <FiCheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Status Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
                      }`}>
                        {statusOptions.find(s => s.value === formData.status)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Stock Level:</span>
                      <span className={`font-medium ${
                        parseInt(formData.stock) > 10 ? 'text-green-600' : 
                        parseInt(formData.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {formData.stock || 0} units
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-3">
                      💡 <strong>Status Guide:</strong> Pending → Ready → Delivered
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 space-y-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Update Product
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate("/admin/dashboard/adminviewproducts")}
                      className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: 'Update Only Status?',
                          text: 'Would you like to update just the status without saving other changes?',
                          icon: 'question',
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: 'Save All Changes',
                          denyButtonText: 'Update Status Only',
                          cancelButtonText: 'Cancel'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleSave();
                          } else if (result.isDenied) {
                            // Update only status
                            const statusOnlyPayload = { status: formData.status };
                            axios.patch(
                              `http://localhost:4000/api/products/${formData.productId}`,
                              statusOnlyPayload,
                              { 
                                headers: { 
                                  Authorization: `Bearer ${token}`,
                                  'Content-Type': 'application/json'
                                } 
                              }
                            ).then(() => {
                              Swal.fire({
                                icon: 'success',
                                title: 'Status Updated!',
                                text: 'Product status has been updated',
                                timer: 1500,
                                showConfirmButton: false
                              });
                            }).catch(error => {
                              console.error("Status update failed:", error);
                              Swal.fire({
                                icon: 'error',
                                title: 'Status Update Failed',
                                text: 'Failed to update product status',
                                confirmButtonColor: '#d33',
                              });
                            });
                          }
                        });
                      }}
                      className="w-full px-6 py-3 border border-blue-300 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Preview</h3>
            <div className={`px-4 py-1 rounded-full text-sm font-medium ${
              statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
            }`}>
              {statusOptions.find(s => s.value === formData.status)?.label}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Preview */}
            <div className="md:w-1/3">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                {existingImageUrls.length > 0 || imagePreviews.length > 0 ? (
                  <img
                    src={existingImageUrls[0] || imagePreviews[0]}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Product Status</div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    formData.status === 'pending' ? 'bg-yellow-500' :
                    formData.status === 'ready' ? 'bg-green-500' :
                    formData.status === 'delivered' ? 'bg-blue-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className="text-gray-700">{statusOptions.find(s => s.value === formData.status)?.label}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {formData.status === 'pending' && 'Product is awaiting processing'}
                  {formData.status === 'ready' && 'Product is ready for delivery'}
                  {formData.status === 'delivered' && 'Product has been delivered'}
                  {formData.status === 'out_of_stock' && 'Product is currently out of stock'}
                </p>
              </div>
            </div>
            
            {/* Info Preview */}
            <div className="md:w-2/3">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{formData.productName || "Product Name"}</h4>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-blue-600 mr-3">
                  ${parseFloat(formData.price || 0).toFixed(2)}
                </span>
                {formData.lastPrices && parseFloat(formData.lastPrices) > parseFloat(formData.price) && (
                  <span className="text-lg text-gray-500 line-through">
                    ${parseFloat(formData.lastPrices).toFixed(2)}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{formData.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Brand</div>
                  <div className="font-medium">{formData.brand}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Stock</div>
                  <div className={`font-medium ${
                    parseInt(formData.stock) > 10 ? 'text-green-600' : 
                    parseInt(formData.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {formData.stock || 0} units
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Product ID</div>
                  <div className="font-mono font-medium">{formData.productId}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Availability</div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    formData.status === 'out_of_stock' 
                      ? 'bg-red-100 text-red-800' 
                      : parseInt(formData.stock) > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {formData.status === 'out_of_stock' 
                      ? 'Out of Stock' 
                      : parseInt(formData.stock) > 0 
                        ? 'In Stock' 
                        : 'Low Stock'}
                  </div>
                  {formData.status === 'delivered' && (
                    <div className="text-sm text-gray-600 flex items-center">
                      <FiTruck className="h-4 w-4 mr-1" /> Delivered
                    </div>
                  )}
                </div>
              </div>
              <div className="text-gray-600">
                {formData.description || "No description provided"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: notification.jsx
```javascript
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
          headers: { Authorization: `Bearer ${token}` },
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
            Authorization: `Bearer ${token}`,
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
```

## File: payment.jsx
```javascript
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Shield, Lock, CheckCircle, ArrowLeft, 
  Truck, Package, Wallet, DollarSign 
} from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (!orderData) {
      Swal.fire({
        icon: 'error',
        title: 'Order Data Missing',
        text: 'Please complete the shipping process first.',
      }).then(() => {
        navigate('/shipping');
      });
      return;
    }

    // Get user info from order data or fetch from API
    const token = localStorage.getItem('token');
    if (token && orderData.userInfo) {
      setUserInfo(orderData.userInfo);
    }
  }, [orderData, navigate]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
    } 
    // Format CVV to max 3-4 digits
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    }
    // Format expiry month/year
    else if (name === 'expiryMonth') {
      const formatted = value.replace(/\D/g, '').slice(0, 2);
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    }
    else if (name === 'expiryYear') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    }
    else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateCardDetails = () => {
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
      return 'Please enter a valid 16-digit card number';
    }
    if (!cardDetails.cardName) {
      return 'Please enter the name on card';
    }
    if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
      return 'Please enter card expiry date';
    }
    const month = parseInt(cardDetails.expiryMonth);
    const year = parseInt(cardDetails.expiryYear);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    if (month < 1 || month > 12) {
      return 'Invalid expiry month';
    }
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      return 'Please enter a valid CVV';
    }
    return null;
  };

  const handlePlaceOrder = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please log in to complete your order.',
    });
    navigate('/login');
    return;
  }

  if (!orderData) {
    Swal.fire({
      icon: 'error',
      title: 'Order Error',
      text: 'Order data is missing. Please try again.',
    });
    return;
  }

  if (paymentMethod === 'card') {
    const validationError = validateCardDetails();
    if (validationError) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: validationError,
      });
      return;
    }
  }

  // Confirm with Swal first
  const result = await Swal.fire({
    title: 'Confirm Order',
    html: `... your summary HTML ...`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Place Order',
    cancelButtonText: 'Cancel'
  });

  if (!result.isConfirmed) return;

  setLoading(true);

  try {
    // Send order to backend
    const response = await axios.post(
      'http://localhost:4000/api/orders', // your backend route
      {
        ...orderData,
        paymentMethod,
        cardDetails: paymentMethod === 'card' ? cardDetails : null
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const savedOrder = response.data;

    // Show success Swal
    await Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      html: `
        <p>Order #${savedOrder._id} has been placed successfully.</p>
        <p>Total: Rs. ${savedOrder.total?.toFixed(2)}</p>
      `,
      showConfirmButton: true
    });

    navigate('/orders'); // go to order list page
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Order Failed',
      text: error.response?.data?.message || 'Something went wrong!',
    });
  } finally {
    setLoading(false);
  }
};


  const handleBackToShipping = () => {
    navigate('/shipping', { state: { quoteData: orderData } });
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Order Found</h2>
          <p className="text-gray-600 mb-4">Please complete the shipping process first.</p>
          <button
            onClick={() => navigate('/shipping')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Shipping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackToShipping}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Shipping
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-500 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
              <p className="text-gray-600">Secure payment gateway - Your information is protected</p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-8 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Cart</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
            
            <div className="flex-1 h-1 bg-green-500 mx-4"></div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Shipping</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
            
            <div className="flex-1 h-1 bg-green-500 mx-4"></div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Payment</p>
                <p className="text-xs text-gray-500">Current Step</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                Select Payment Method
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'card' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <CreditCard className={`h-5 w-5 ${paymentMethod === 'card' ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-500">Pay with Visa, MasterCard</p>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'wallet' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'wallet' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <Wallet className={`h-5 w-5 ${paymentMethod === 'wallet' ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Digital Wallet</p>
                    <p className="text-sm text-gray-500">Apple Pay, Google Pay</p>
                  </div>
                  {paymentMethod === 'wallet' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'bank' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'bank' ? 'bg-purple-100' : 'bg-gray-100'}`}>
          <DollarSign className={`h-5 w-5 ${paymentMethod === 'bank' ? 'text-purple-600' : 'text-gray-600'}`} />

                  </div>
                  <div className="text-left">
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Direct bank payment</p>
                  </div>
                  {paymentMethod === 'bank' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'cod' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'cod' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <Truck className={`h-5 w-5 ${paymentMethod === 'cod' ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive</p>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-blue-500" />
                    Card Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        maxLength="19"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardDetails.cardName}
                        onChange={handleCardInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Month *
                        </label>
                        <input
                          type="text"
                          name="expiryMonth"
                          value={cardDetails.expiryMonth}
                          onChange={handleCardInputChange}
                          placeholder="MM"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          maxLength="2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Year *
                        </label>
                        <input
                          type="text"
                          name="expiryYear"
                          value={cardDetails.expiryYear}
                          onChange={handleCardInputChange}
                          placeholder="YYYY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          maxLength="4"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          maxLength="4"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-sm text-gray-600">
                        Your card details are encrypted and secure. We do not store your card information.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Payment Method Messages */}
              {paymentMethod !== 'card' && (
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <Shield className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {paymentMethod === 'wallet' && 'Digital Wallet Payment'}
                        {paymentMethod === 'bank' && 'Bank Transfer'}
                        {paymentMethod === 'cod' && 'Cash on Delivery'}
                      </h4>
                      <p className="text-gray-600">
                        {paymentMethod === 'wallet' && 'You will be redirected to your preferred digital wallet for secure payment.'}
                        {paymentMethod === 'bank' && 'Bank transfer details will be provided after order confirmation.'}
                        {paymentMethod === 'cod' && 'Pay when your order is delivered. Additional charges may apply.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2 text-amber-500" />
                Order Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rs. {orderData.labeledTotal?.toFixed(2)}</span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>- Rs. {orderData.discount?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Total Amount</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">Rs. {orderData.total?.toFixed(2)}</p>
                      {orderData.discount > 0 && (
                        <p className="text-sm text-green-600">
                          You saved Rs. {orderData.discount?.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Items in Order ({orderData.items?.length || 0})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {orderData.items?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.images?.[0] ? (
                            <img src={item.images[0]} alt={item.productName} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Package className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <p className="font-semibold">Rs. {(item.lastPrice * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Summary & Button */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Security Assurance */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Secure Payment
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>PCI DSS compliant</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>No card details stored</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Money-back guarantee</span>
                  </li>
                </ul>
              </div>

              {/* Payment Summary & Button */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Payment Summary</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Order #{orderData.orderId}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items Total</span>
                      <span>Rs. {orderData.labeledTotal?.toFixed(2)}</span>
                    </div>
                    {orderData.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>- Rs. {orderData.discount?.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total to Pay</span>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">Rs. {orderData.total?.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">including all taxes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mb-6">
                  <div className="flex items-start mb-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-purple-600 rounded mt-1 mr-2"
                      defaultChecked
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <button className="text-purple-600 hover:text-purple-700">Terms & Conditions</button>{' '}
                      and{' '}
                      <button className="text-purple-600 hover:text-purple-700">Privacy Policy</button>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    By completing this purchase, you agree to our terms and authorize the charge to your selected payment method.
                  </p>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>
                        Pay Rs. {orderData.total?.toFixed(2)}
                      </span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Secured by SSL encryption
                </p>
              </div>

              {/* Support Info */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Need help?{' '}
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Contact Customer Support
                  </button>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  You can cancel your order within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: repomix.config.json
```json
{
  "$schema": "https://repomix.com/schemas/latest/schema.json",
  "input": {
    "maxFileSize": 52428800
  },
  "output": {
    "filePath": "repomix-output.md",
    "style": "markdown",
    "parsableStyle": false,
    "fileSummary": true,
    "directoryStructure": true,
    "files": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "compress": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "truncateBase64": false,
    "copyToClipboard": false,
    "includeFullDirectoryStructure": false,
    "tokenCountTree": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": false,
      "includeLogs": false,
      "includeLogsCount": 50
    }
  },
  "include": [],
  "ignore": {
    "useGitignore": true,
    "useDotIgnore": true,
    "useDefaultPatterns": true,
    "customPatterns": []
  },
  "security": {
    "enableSecurityCheck": true
  },
  "tokenCount": {
    "encoding": "o200k_base"
  }
}
```
`````

## File: src/components/pages/admin/repomix.config.json
`````json
{
  "$schema": "https://repomix.com/schemas/latest/schema.json",
  "input": {
    "maxFileSize": 52428800
  },
  "output": {
    "filePath": "repomix-output.md",
    "style": "markdown",
    "parsableStyle": false,
    "fileSummary": true,
    "directoryStructure": true,
    "files": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "compress": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "truncateBase64": false,
    "copyToClipboard": false,
    "includeFullDirectoryStructure": false,
    "tokenCountTree": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": false,
      "includeLogs": false,
      "includeLogsCount": 50
    }
  },
  "include": [],
  "ignore": {
    "useGitignore": true,
    "useDotIgnore": true,
    "useDefaultPatterns": true,
    "customPatterns": []
  },
  "security": {
    "enableSecurityCheck": true
  },
  "tokenCount": {
    "encoding": "o200k_base"
  }
}
`````

## File: src/components/pages/NotFound.jsx
`````javascript
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
`````

## File: src/components/pages/service.jsx
`````javascript
import React from 'react';

export default function Service() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>
      <p className="text-gray-700 text-lg">
        Here you can describe the services your company offers. Add details to help
        users understand what you provide.
      </p>
    </div>
  );
}
`````

## File: src/components/pages/singUp.jsx
`````javascript
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: "customer",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/users/signup", formData);
      console.log("User created:", response.data);
      setLoading(false);
      navigate("/login"); // redirect after signup
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="border p-2 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL (optional)"
          value={formData.profileImage}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
`````

## File: src/components/utils/cart.jsx
`````javascript
export function loadCart() {
  const cart = localStorage.getItem("cart");
  if (cart != null) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

export function addToCart(productId, qty) {
  const cart = loadCart();
  const index = cart.findIndex((item) => {
    return item.productId == productId;
  });
  if (index == -1) {
    cart.push({ productId, qty });
  } else {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].qty = newQty;
    }
  }
  saveCart(cart);
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function deleteItem(productId) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId == productId);
  if (index != -1) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}




// මේක ඔයාගේ cart.js ෆයිල් එකේ අන්තිමට එකතු කරන්න

export function updateItemQty(productId, qty) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId == productId);
  
  if (index != -1) {
    if (qty <= 0) {
      // ප්‍රමාණය 0 හෝ ඊට අඩු නම් item එක ඉවත් කරන්න
      cart.splice(index, 1);
    } else {
      // නැත්නම් අලුත් ප්‍රමාණය set කරන්න
      cart[index].qty = qty;
    }
    saveCart(cart);
  }
}
`````

## File: src/components/utils/mediaupload.jsx
`````javascript
import { createClient } from "@supabase/supabase-js";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc2JlZWxmZHFqaGZ5Z2hnb3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMzA2NjgsImV4cCI6MjA3OTgwNjY2OH0.WbA2YyeUh9XiZo2yJpLt0Lj4Fs9u44N7E3W94oAGhkY";

const url = "https://sosbeelfdqjhfyghgoqm.supabase.co";

const supabase = createClient(url, key);

export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("File not added");
    }

    let fileName = file.name;
    const extension = fileName.split(".")[fileName.split(".").length - 1];
    const timestamp = new Date().getTime();
    fileName = timestamp + file.name + "." + extension;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;
        resolve(publicUrl);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
`````

## File: src/components/utils/voice.jsx
`````javascript
export function speakText(text) {
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";       // Change language if needed
  utterance.rate = 1;             // Speed of speech
  utterance.pitch = 1;            // Voice pitch
  window.speechSynthesis.speak(utterance);
}
`````

## File: src/index.css
`````css
@import "tailwindcss";
`````

## File: src/main.jsx
`````javascript
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(

    <App />

)
`````

## File: vercel.json
`````json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
`````

## File: .gitignore
`````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
.env

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`````

## File: aichatbot.text
`````
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function AiChatbot() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [adminMessageCount, setAdminMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);
  const inputRef = useRef(null);
  const notificationSoundRef = useRef(null);

  // Initialize notification sound
  useEffect(() => {
    notificationSoundRef.current = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
    );
    notificationSoundRef.current.volume = 0.3;
  }, []);

  // Fetch messages and check for admin messages
  const fetchMessages = async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      setMessages([]);
      return;
    }
    try {
      const res = await axios.get("http://localhost:4000/api/messages/getMessages", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      const fetchedMessages = res.data.messages || [];
      setMessages(fetchedMessages);
      
      // Check for admin messages (messages sent by admin)
      const hasAdminMessage = fetchedMessages.some(msg => 
        msg.text && msg.text.includes("admin:") || msg.text.includes("Admin:")
      );
      
      if (hasAdminMessage && !open) {
        triggerAdminNotification();
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Listen for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem("token"));
      fetchMessages();
    };
    
    const handleLogout = () => {
      setMessages([]);
      setToken(null);
    };

    // Listen for admin messages (you can trigger this from backend)
    const handleAdminMessage = (event) => {
      if (event.detail && event.detail.adminMessage) {
        triggerAdminNotification();
      }
    };

    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("logout", handleLogout);
    window.addEventListener("adminMessageReceived", handleAdminMessage);

    fetchMessages();

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("logout", handleLogout);
      window.removeEventListener("adminMessageReceived", handleAdminMessage);
    };
  }, [open]);

  // Setup speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
        stopSpeaking();
        sendHandle(transcript, true);
      };

      recognition.current.onend = () => setListening(false);
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [open]);

  // Trigger admin notification
  const triggerAdminNotification = () => {
    setAdminMessageCount(prev => prev + 1);
    setShowNotification(true);
    
    // Play notification sound
    if (notificationSoundRef.current) {
      notificationSoundRef.current.play().catch(e => console.log("Sound play error:", e));
    }
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Close notification
  const closeNotification = () => {
    setShowNotification(false);
    setAdminMessageCount(0);
  };

  // Voice controls
  const handleVoice = () => {
    if (!recognition.current) return;
    if (listening) {
      recognition.current.stop();
      setListening(false);
    } else {
      recognition.current.start();
      setListening(true);
      stopSpeaking();
    }
  };

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    setSpeaking(true);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.onend = () => setSpeaking(false);
    speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  // Fetch AI reply
  const fetchAiReply = async (userText) => {
    try {
      setIsTyping(true);
      const currentToken = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:4000/api/simai/reply",
        { query: userText },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
      setIsTyping(false);
      return res.data.reply || "No response from AI.";
    } catch (err) {
      setIsTyping(false);
      console.error("Error fetching AI reply:", err);
      return "Sorry, I couldn't find an answer in my knowledge base.";
    }
  };

  // Send message
  const sendHandle = async (voiceInput = null, isVoice = false) => {
    const textToSend = voiceInput || input;
    if (!textToSend?.trim()) return;

    const newMessage = {
      sender: "user",
      text: textToSend,
      _id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Admin message handling (user sending to admin)
    if (textToSend.toLowerCase().includes("@admin")) {
      const textAfterAdmin = textToSend.split("@admin")[1]?.trim();
      if (!textAfterAdmin) {
        console.error("You must type a message after @admin");
        alert("You must type a message after @admin");
        return;
      }

      try {
        const currentToken = localStorage.getItem("token");
        await axios.post(
          "http://localhost:4000/api/simai/admin/message",
          { message: textToSend },
          { headers: { Authorization: `Bearer ${currentToken}`, "Content-Type": "application/json" } }
        );
      } catch (err) {
        console.error("Admin endpoint error:", err);
      }

      const adminMessageObj = {
        sender: "ai",
        text: "✅ Your message has been sent to the admin. They will respond shortly.",
        _id: (Date.now() + 1).toString(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, adminMessageObj]);
      if (isVoice) speakText(adminMessageObj.text);
      return;
    }

    // Normal AI message
    try {
      const currentToken = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/api/messages/sendMessages",
        { input: textToSend },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
    } catch (err) {
      console.error("Error sending user message:", err);
    }

    const aiText = await fetchAiReply(newMessage.text);
    const aiMessage = {
      sender: "ai",
      text: aiText,
      _id: (Date.now() + 2).toString(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, aiMessage]);
    if (isVoice) speakText(aiText);
  };

  return (
    <>
      {/* Admin Notification Alert */}
      {showNotification && !open && (
        <div className="fixed top-4 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-slideIn">
          <div className="relative">
            <span className="text-xl">🔔</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
          </div>
          <div>
            <p className="font-medium">New message from admin!</p>
            <p className="text-sm opacity-90">Click the chat button to view</p>
          </div>
          <button
            onClick={closeNotification}
            className="ml-2 p-1 hover:bg-white/20 rounded-full"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Button */}
      {!open && (<button
  onClick={() => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: "warning",
          title: "Not Logged In",
          text: "You need to log in to use the chatbot.",
          showCancelButton: true,
          confirmButtonText: "Go to Login",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });
      } else {
        alert("Please login to use the chatbot");
      }
      return;
    }
    setOpen(true);
    closeNotification(); // Close notification when opening chat
  }}
  className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40"
>
  <div className="relative">
    <span className="text-2xl">🤖</span>
    {adminMessageCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
        {adminMessageCount > 9 ? '9+' : adminMessageCount}
      </span>
    )}
  </div>
</button>)}

      {/* Chat Widget */}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                {speaking && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <div className="flex items-center gap-2 text-xs opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online</span>
                  {isTyping && <span className="ml-2 animate-pulse">Typing...</span>}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={stopSpeaking}
                disabled={!speaking}
                className={`p-2 rounded-lg ${speaking ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 cursor-not-allowed'} transition-colors`}
                title="Stop speaking"
              >
                <span className="text-sm">⏹</span>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title="Close chat"
              >
                <span className="text-sm">✕</span>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
                <div className="text-4xl mb-4 opacity-50">👋</div>
                <h3 className="text-lg font-semibold mb-2">Welcome to AI Assistant</h3>
                <p className="text-center text-sm text-gray-600 mb-6">
                  Start a conversation with me! I can help you with questions, explanations, and more.
                </p>
                <div className="text-xs text-gray-500">
                  💡 Tip: Use <code className="bg-gray-200 px-2 py-1 rounded">@admin</code> to contact administrators
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                          : message.text.includes("admin:") || message.text.includes("Admin:")
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-bl-none border-l-4 border-yellow-400"
                          : "bg-gradient-to-r from-gray-100 to-white border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.text.includes("admin:") || message.text.includes("Admin:") ? (
                          <>
                            <span className="text-sm">👑</span>
                            <span className="text-xs opacity-90">Admin</span>
                          </>
                        ) : message.sender === "ai" ? (
                          <span className="text-xs opacity-90">AI Assistant</span>
                        ) : null}
                      </div>
                      <div className="whitespace-pre-wrap break-words text-sm">
                        {message.text.replace("admin:", "").replace("Admin:", "").trim()}
                      </div>
                      <div className={`text-xs mt-2 ${message.sender === "user" ? "text-blue-200" : "text-gray-300"}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                        {message.sender === "user" && message.text.includes("@admin") && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-700 rounded-full text-xs">
                            To Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-bl-none p-4 bg-gradient-to-r from-gray-100 to-white border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <button
                onClick={handleVoice}
                className={`p-2.5 rounded-full flex-shrink-0 transition-all ${
                  listening 
                    ? "animate-pulse bg-red-100 text-red-600 border-2 border-red-300" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                title={listening ? "Stop listening" : "Start voice input"}
              >
                {listening ? "⏹" : "🎤"}
              </button>
              
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                onKeyDown={(e) => e.key === "Enter" && sendHandle()}
              />
              
              <button
                onClick={() => sendHandle()}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium flex-shrink-0"
              >
                Send
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 flex justify-between px-1">
              <span>Press Enter to send</span>
              <span>Shift+Enter for new line</span>
            </div>
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </>
  );
}
`````

## File: src/components/Card.jsx
`````javascript
import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  productId,
  lastPrices, // now price
  images = [],
  productName,
  price, // old price
}) {
  const firstImageUrl = images.length > 0 ? images[0] : null;

  // Convert to numbers
  const nowPriceNum = lastPrices ? Number(lastPrices) : null; // current price
  const oldPriceNum = Number(price); // previous price

  // Check if product is on sale
  const isSale = oldPriceNum && oldPriceNum > nowPriceNum;

  // Compute discount percentage
  const discountPercentage = isSale
    ? Math.round(((oldPriceNum - nowPriceNum) / oldPriceNum) * 100)
    : 0;

  return (
    <Link to={`/productoverview/${productId}`}>
      <div className="max-w-xs mx-auto my-4 bg-white rounded-xl w-[300px] h-[480px] shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          {firstImageUrl ? (
            <img
              src={firstImageUrl}
              alt={`Image of ${productName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              [Image Not Available]
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col justify-between h-[220px]">
          <h3
            className="text-xl font-bold text-gray-800 mb-2 truncate"
            title={productName}
          >
            {productName}
          </h3>

          {/* Price Section */}
          <div className="mt-2">
            {isSale ? (
              <div className="flex items-center space-x-2">
                {/* Old Price */}
                <span className="text-gray-400 line-through text-sm">
                  Rs.{oldPriceNum}
                </span>

                {/* Current Price */}
                <span className="text-lg font-bold text-green-600">
                  Rs.{nowPriceNum}
                </span>

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                Rs.{nowPriceNum}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
`````

## File: src/components/newadds.jsx
`````javascript
import React, { useState, useRef, useEffect } from 'react';

export default function Marquee({ 
  children, 
  direction = 'left',
  speed = 50,
  pauseOnHover = true,
  gradient = true,
  className = ''
}) {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  // Get keyframes based on direction
  const getKeyframes = () => {
    if (direction === 'right') {
      return `
        @keyframes marquee {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `;
    } else {
      return `
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `;
    }
  };

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  };

  const innerStyle = {
    display: 'flex',
    width: 'max-content',
    whiteSpace: 'nowrap',
    animation: `marquee ${speed}s linear infinite`,
    animationPlayState: isPaused ? 'paused' : 'running',
  };

  const contentStyle = {
    flexShrink: 0,
    display: 'flex',
  };

  const gradientStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100px',
    pointerEvents: 'none',
    zIndex: 2,
  };

  const gradientLeftStyle = {
    ...gradientStyle,
    left: 0,
    background: 'linear-gradient(to right, white, transparent)',
  };

  const gradientRightStyle = {
    ...gradientStyle,
    right: 0,
    background: 'linear-gradient(to left, white, transparent)',
  };

  return (
    <div 
      className={className}
      style={containerStyle}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <style>{getKeyframes()}</style>
      
      <div 
        style={innerStyle}
        ref={marqueeRef}
      >
        <div style={contentStyle}>
          {children}
        </div>
        <div style={contentStyle} aria-hidden="true">
          {children}
        </div>
      </div>
      
      {gradient && (
        <>
          <div style={gradientLeftStyle}></div>
          <div style={gradientRightStyle}></div>
        </>
      )}
    </div>
  );
}
`````

## File: src/components/pages/ProfilePage.jsx
`````javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Edit, 
  Save,
  X,
  Package,
  ShoppingBag,
  Calendar,
  Shield,
  LogOut,
  CreditCard,
  Truck,
  CheckCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: ''
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch user profile and orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile
        const userRes = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/users/me', {
          headers: getAuthHeader()
        });

        if (userRes.data && userRes.data.user) {
          const userData = userRes.data.user;
          setUser(userData);
          setEditForm({
            name: userData.name || '',
            lastname: userData.lastname || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: userData.address || ''
          });
        }

        // Fetch user orders
        try {
          const ordersRes = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/orders/my-orders', {
            headers: getAuthHeader()
          });
          
          if (ordersRes.data.success) {
            setOrders(ordersRes.data.orders || []);
          }
        } catch (orderError) {
          console.log('Could not fetch orders:', orderError.message);
        }

      } catch (error) {
        console.error('Error fetching profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load profile. Please try again.',
        }).then(() => {
          navigate('/login');
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!editForm.name || !editForm.email) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Name and email are required fields.',
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(import.meta.env.VITE_BACKEND_URL+'/api/users/me', editForm, {
        headers: getAuthHeader()
      });

      if (res.data) {
        setUser(res.data.user || res.data);
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been updated successfully.',
          timer: 1500,
          showConfirmButton: false
        });
        setEditing(false);
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Change Password',
      html: `
        <input id="current-password" type="password" class="swal2-input" placeholder="Current Password">
        <input id="new-password" type="password" class="swal2-input" placeholder="New Password">
        <input id="confirm-password" type="password" class="swal2-input" placeholder="Confirm New Password">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const current = document.getElementById('current-password').value;
        const newPass = document.getElementById('new-password').value;
        const confirm = document.getElementById('confirm-password').value;

        if (!current || !newPass || !confirm) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        if (newPass !== confirm) {
          Swal.showValidationMessage('New passwords do not match');
          return false;
        }

        if (newPass.length < 6) {
          Swal.showValidationMessage('Password must be at least 6 characters');
          return false;
        }

        return { currentPassword: current, newPassword: newPass };
      }
    });

    if (formValues) {
      try {
        setLoading(true);
        // Note: You need to add a change password endpoint to your backend
        // await axios.put('/api/users/change-password', formValues, {
        //   headers: getAuthHeader()
        // });
        
        Swal.fire({
          icon: 'success',
          title: 'Password Updated!',
          text: 'Your password has been changed successfully.',
          timer: 1500
        });
      } catch (error) {
        console.error('Password change error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: error.response?.data?.message || 'Failed to change password.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-amber-100 text-amber-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalSpent = () => {
    return orders
      .filter(order => order.paymentStatus === 'paid')
      .reduce((total, order) => total + (order.total || 0), 0);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No User Found</h2>
          <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">Manage your account and view your orders</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-xl font-bold">{orders.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-xl font-bold">Rs. {getTotalSpent().toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <Truck className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Orders</p>
                  <p className="text-xl font-bold">
                    {orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-xl font-bold">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  Personal Information
                </h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                    disabled={loading}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setEditForm({
                          name: user.name || '',
                          lastname: user.lastname || '',
                          email: user.email || '',
                          phone: user.phone || '',
                          address: user.address || ''
                        });
                      }}
                      className="flex items-center px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      disabled={loading}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading}
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.name || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="lastname"
                        value={editForm.lastname}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading}
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.lastname || 'N/A'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{user.email || 'N/A'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading}
                    />
                  ) : (
                    <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{user.phone || 'N/A'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  {editing ? (
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="flex items-start px-4 py-2 bg-gray-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="whitespace-pre-line">{user.address || 'No address provided'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Security
                </h3>
                <button
                  onClick={handleChangePassword}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                  disabled={loading}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-amber-500" />
                  Recent Orders
                </h2>
                <button
                  onClick={() => navigate('/orders')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All Orders
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order._id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{order.orderId}</h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(order.createdAt)} • {order.items?.length || 0} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">Rs. {(order.total || 0).toLocaleString()}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status?.charAt(0)?.toUpperCase() + order.status?.slice(1) || 'Unknown'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          {order.items?.slice(0, 2).map(item => item.productName).join(', ')}
                          {order.items?.length > 2 && ` and ${order.items.length - 2} more`}
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => navigate('/orders')}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </button>
                        {order.status === 'processing' && (
                          <button
                            onClick={() => navigate('/orders')}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Account Info & Actions */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <div className="flex items-center mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrator' : 'Customer'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{formatDate(user.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                >
                  <Package className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium">View All Orders</p>
                    <p className="text-sm text-gray-500">Check your order history</p>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/addresses')}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                >
                  <MapPin className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium">Manage Addresses</p>
                    <p className="text-sm text-gray-500">Update shipping addresses</p>
                  </div>
                </button>
                <button
                  onClick={handleChangePassword}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                >
                  <Lock className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-gray-500">Update your password</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 mb-4">Our support team is here to help you</p>
              <button
                onClick={() => navigate('/chat')}
                className="w-full px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`````

## File: vite.config.js
`````javascript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
`````

## File: src/components/utils/notificationDrop.jsx
`````javascript
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
`````

## File: text.text
`````
MTgyODI4MjEzMzc5Mjk2MzExMzM5MjM0NDU5MjE4OTE0NjUxMDI=
`````

## File: src/App.jsx
`````javascript
import Homepage from "./components/pages/Homepage.jsx";
import NotFound from "./components/pages/NotFound.jsx"; // import new page
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";



function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
`````

## File: src/components/pages/admin/AdminAllProductView.jsx
`````javascript
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiCopy, 
  FiDownload, 
  FiRefreshCw,
  FiPlus
} from "react-icons/fi";
import { MdGridView, MdList } from "react-icons/md";
import Swal from "sweetalert2";

export default function AdminAllProductView() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productsData = res.data?.data || res.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load products',
          confirmButtonColor: '#d33',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, token]);

  // Get unique categories and brands for filters
  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category).filter(Boolean);
    return ["all", ...new Set(allCategories)];
  }, [products]);

  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand).filter(Boolean);
    return ["all", ...new Set(allBrands)];
  }, [products]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.productName?.toLowerCase().includes(term) ||
        product.productId?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.altNames?.some(name => name.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== "all") {
      result = result.filter(product => product.brand === selectedBrand);
    }

    // Sorting
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "stock":
        result.sort((a, b) => b.stock - a.stock);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchTerm, selectedCategory, selectedBrand, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleDelete = async (productId, productName) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      html: `Are you sure you want to delete <strong>"${productName}"</strong>?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(import.meta.env.VITE_BACKEND_URL+`/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Product has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });

        // Remove from state
        setProducts(prev => prev.filter(p => p.productId !== productId));
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: err.response?.data?.message || 'Failed to delete product',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Selection',
        text: 'Please select products to delete',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Bulk Delete?',
      html: `Are you sure you want to delete ${selectedProducts.size} product(s)?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Delete ${selectedProducts.size} Items`,
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        const deletePromises = Array.from(selectedProducts).map(productId =>
          axios.delete(import.meta.env.VITE_BACKEND_URL+`/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        await Promise.all(deletePromises);

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `${selectedProducts.size} product(s) deleted`,
          timer: 2000,
          showConfirmButton: false
        });

        // Refresh products
        setProducts(prev => prev.filter(p => !selectedProducts.has(p.productId)));
        setSelectedProducts(new Set());
      } catch (err) {
        console.error("Bulk delete error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: 'Failed to delete selected products',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === currentProducts.length) {
      setSelectedProducts(new Set());
    } else {
      const allIds = new Set(currentProducts.map(p => p.productId));
      setSelectedProducts(allIds);
    }
  };

  const handleSelectProduct = (productId) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Product ID copied to clipboard',
      timer: 1500,
      showConfirmButton: false
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Products Management</h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} products • {selectedProducts.size} selected
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            onClick={() => navigate("/admin/dashboard/addproducts")}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 transition"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            title="Refresh"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, ID, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded ${viewMode === "table" ? "bg-white shadow" : "text-gray-600"}`}
            >
              <MdList size={20} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded ${viewMode === "grid" ? "bg-white shadow" : "text-gray-600"}`}
            >
              <MdGridView size={20} />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand === "all" ? "All Brands" : brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Stock: High to Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bulk Actions</label>
            <div className="flex space-x-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Action</option>
                <option value="delete">Delete Selected</option>
                <option value="export">Export Selected</option>
              </select>
              <button
                onClick={() => bulkAction === "delete" && handleBulkDelete()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                disabled={!bulkAction}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Selection */}
        {selectedProducts.size > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="text-blue-700 font-medium">
              {selectedProducts.size} product(s) selected
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedProducts(new Set())}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table (Table View) */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.size === currentProducts.length && currentProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr key={product.productId} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.productId)}
                          onChange={() => handleSelectProduct(product.productId)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            {product.images?.[0] ? (
                              <img
                                className="h-16 w-16 object-cover rounded-lg"
                                src={product.images[0]}
                                alt={product.productName}
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.productName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <span className="font-mono">{product.productId}</span>
                              <button
                                onClick={() => copyToClipboard(product.productId)}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                                title="Copy ID"
                              >
                                <FiCopy size={14} />
                              </button>
                            </div>
                            <div className="text-xs text-gray-400 truncate max-w-xs">
                              {product.description?.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          ${parseFloat(product.price).toFixed(2)}
                        </div>
                        {product.lastPrices && product.lastPrices > product.price && (
                          <div className="text-xs text-gray-500 line-through">
                            ${parseFloat(product.lastPrices).toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock} units
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/product/${product.productId}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => navigate("/admin/dashboard/editproducts", { state: { product } })}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product.productId, product.productName)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-lg mb-2">No products found</div>
                      <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                          setSelectedBrand("all");
                        }}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Clear all filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.productId} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="relative">
                  {product.images?.[0] ? (
                    <img
                      className="w-full h-48 object-cover"
                      src={product.images[0]}
                      alt={product.productName}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.productId)}
                    onChange={() => handleSelectProduct(product.productId)}
                    className="absolute top-2 left-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{product.productName}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-blue-600">${parseFloat(product.price).toFixed(2)}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate("/admin/dashboard/editproducts", { state: { product } })}
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.productId, product.productName)}
                        className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">{product.category}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📦</div>
              <div className="text-gray-600 text-xl mb-2">No products found</div>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
`````

## File: src/components/pages/admin/Dashboard/DashboardRoutes.jsx
`````javascript
// DashboardRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProducts from "../addProducts";
import AdminAllProductView from "../AdminAllProductView";
import EditProducts from "../EditProducts";
import Notification from "../notification";
import StatCard from "../Dashboard/StatCard";
import { FiPackage, FiUsers, FiDollarSign } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";

export default function DashboardRoutes({ stats }) {
  return (
    <Routes>
      <Route
        index
        element={
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-6">📊</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
            <p className="text-gray-600 max-w-2xl mb-8">
              Select a section from the sidebar to manage products, view notifications, or access other admin features.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
              <StatCard icon={<FiPackage size={24} />} title="Total Products" value={stats.totalProducts} color="text-green-600" />
              <StatCard icon={<MdShoppingCart size={24} />} title="Total Orders" value={stats.totalOrders} color="text-indigo-600" />
              <StatCard icon={<FiDollarSign size={24} />} title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} color="text-amber-600" />
              <StatCard icon={<FiUsers size={24} />} title="New Users" value={stats.newUsers} color="text-teal-600" />
            </div>
          </div>
        }
      />
      <Route path="adminviewproducts" element={<AdminAllProductView />} />
      <Route path="addproducts" element={<AddProducts />} />
      <Route path="editproducts/:id" element={<EditProducts />} />
      <Route path="notification" element={<Notification />} />
    </Routes>
  );
}
`````

## File: src/components/pages/admin/payment.jsx
`````javascript
import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { clearCart } from '@/components/utils/cart'; // 🛒 ඔයාගේ cart functions තියෙන path එක මෙතනට දාන්න

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderedata = location.state;

  // 1. Cash on Delivery (COD) Function
  const handleCOD = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to place this order as Cash on Delivery?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, place order!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:4000/api/payment/cod', orderedata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then((res) => {
          
          // ✅ සාර්ථක වූ පසු Cart එක clear කිරීම
          clearCart(); 

          Swal.fire({
            title: 'Success!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            navigate('/orders'); 
          });
        }).catch((err) => {
          Swal.fire('Error!', err.response?.data?.message || 'Order failed', 'error');
        });
      }
    });
  };

  // 2. Card Payment Function (PayHere Redirect Method)
  const handleCardPayment = async () => {
    try {
      // පේමන්ට් එක ලෑස්ති කරන අතරතුර Loading එකක් පෙන්වමු
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we redirect you to PayHere',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const formattedItems = orderedata.orderedItems.map(item => ({
        productId: item.productId,
        name: item.productName || item.name,
        qty: item.qty,
        price: item.lastPrice || item.price 
      }));

      // Backend එකට දත්ත යවා Hash එක සහ Order ID එක ලබා ගැනීම
      const response = await axios.post('http://localhost:4000/api/payment/generate-hash', {
        items: formattedItems,
        userDetails: {
          firstName: "Himash", 
          email: "himash@example.com",
          phone: "0771234567"
        }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const paymentData = response.data;
      
      // ✅ පේමන්ට් එකට Redirect වෙන්න කලින් Cart එක clear කිරීම
      clearCart(); 
      Swal.close(); 

      const payment = {
        sandbox: true,
        merchant_id: paymentData.merchant_id,
        return_url: "http://localhost:3001/orders", 
        cancel_url: "http://localhost:3001/cancel",
        notify_url: "http://localhost:4000/api/payment/notify", 
        order_id: paymentData.order_id,
        items: "Online Purchase",
        amount: paymentData.amount, 
        currency: paymentData.currency,
        hash: paymentData.hash,
        first_name: paymentData.first_name,
        last_name: paymentData.last_name,
        email: paymentData.email,
        phone: paymentData.phone,
        address: "No.1, Colombo Road",
        city: "Colombo",
        country: "Sri Lanka",
      };

      // Hidden Form එකක් සාදා Submit කිරීම
      const form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('action', 'https://sandbox.payhere.lk/pay/checkout');

      Object.keys(payment).forEach(key => {
        const hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', payment[key]);
        form.appendChild(hiddenField);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      Swal.fire('Error!', 'Card payment initialization failed.', 'error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-12 rounded-3xl shadow-2xl border border-blue-100 text-center max-w-lg w-full">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Checkout</h2>
        <p className="text-slate-500 mb-8 font-medium">කරුණාකර ඔබ කැමති ගෙවීම් ක්‍රමය තෝරන්න</p>
        
        <div className="flex flex-col gap-4">
          {/* Cash on Delivery Button */}
          <button 
            onClick={handleCOD}
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-4 px-12 rounded-2xl transition duration-300 transform hover:scale-105"
          >
            Cash on Delivery (COD)
          </button>

          {/* Card Payment Button */}
          <button 
            onClick={handleCardPayment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-2xl transition duration-300 transform hover:scale-105 shadow-xl"
          >
            Pay with Card (PayHere)
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-slate-400 text-sm">Safe & Secure Payments by PayHere</p>
        </div>
      </div>
    </div>
  );
}
`````

## File: src/components/pages/orderpage.jsx
`````javascript
import React from 'react'

export default function orderpage() {
  return (
    <div>orderpage</div>
  )
}
`````

## File: src/components/pages/shipping.jsx
`````javascript
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Shipping() {
  const location = useLocation();
  const orderData = location.state;
  const navigate = useNavigate();

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No order data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Shipping Details
        </h1>

        {/* Order Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Total Amount</p>
          <p className="text-xl font-semibold text-green-600">
            Rs. {orderData.total?.toFixed(2)}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Items ({orderData.orderedItems?.length})
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            {orderData.orderedItems?.map((item) => (
              <li key={item.productId}>
                • {item.productName} × {item.qty}
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => navigate("/payment", { state: orderData })}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Proceed to Payment
        </button>

      </div>
    </div>
  );
}
`````

## File: package.json
`````json
{
  "name": "app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "@supabase/supabase-js": "^2.86.0",
    "@tailwindcss/vite": "^4.1.17",
    "axios": "^1.13.2",
    "dotenv": "^17.2.3",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^0.556.0",
    "lz-string": "^1.5.0",
    "md5": "^2.3.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.6",
    "sweetalert2": "^11.26.10",
    "tailwindcss": "^4.1.17",
    "uuid": "^13.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
`````

## File: src/components/pages/admin/addProducts.jsx
`````javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "../../utils/mediaupload.jsx";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import { FiUpload, FiImage, FiDollarSign, FiPackage, FiTag, FiShoppingCart } from "react-icons/fi";

export default function AddProducts() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    productId: uuidv4().substring(0, 8).toUpperCase(),
    productName: "",
    altNames: "",
    price: "",
    lastPrices: "",
    stock: "",
    description: "",
    category: "General",
    brand: "Unbranded",
  });

  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "Other"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        alert("Only administrators can add products.");
        navigate("/");
      }
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // Generate new product ID
  const generateNewId = () => {
    setFormData(prev => ({
      ...prev,
      productId: uuidv4().substring(0, 8).toUpperCase()
    }));
  };

  // Handle image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove image
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      alert("Product name is required");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert("Please enter a valid price");
      return false;
    }
    if (images.length === 0) {
      alert("Please upload at least one image");
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setUploading(true);
    const token = localStorage.getItem("token");
    
    try {
      // Upload images to Supabase
      const imgUrls = await Promise.all(
        images.map(file => uploadMediaToSupabase(file))
      );

      // Prepare payload
      const payload = {
        ...formData,
        productId: `PROD-${formData.productId}`,
        altNames: formData.altNames ? formData.altNames.split(",").map(n => n.trim()).filter(n => n) : [],
        price: parseFloat(formData.price),
        lastPrices: formData.lastPrices ? parseFloat(formData.lastPrices) : parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: imgUrls,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Send to backend
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/products",
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      console.log("Product saved:", res.data);
      
      // Show success message and reset form
      alert("✅ Product uploaded successfully!");
      
      // Reset form
      setFormData({
        productId: uuidv4().substring(0, 8).toUpperCase(),
        productName: "",
        altNames: "",
        price: "",
        lastPrices: "",
        stock: "",
        description: "",
        category: "General",
        brand: "Unbranded",
      });
      setImages([]);
      setImagePreviews([]);
      
      // Optional: Navigate to products page
      // navigate("/products");

    } catch (err) {
      console.error("Upload failed:", err);
      let errorMessage = "Failed to upload product.";
      
      if (err.response) {
        errorMessage = err.response.data?.message || err.response.statusText;
      } else if (err.request) {
        errorMessage = "No response from server. Check your connection.";
      }
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Add New Product</h1>
                <p className="text-blue-100 mt-2">Fill in the product details below</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={generateNewId}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  title="Generate new ID"
                >
                  🔄 New ID
                </button>
                <div className="text-right">
                  <div className="text-sm opacity-90">Product ID</div>
                  <div className="text-xl font-mono font-bold">PROD-{formData.productId}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiShoppingCart className="mr-2" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="Separate with commas (e.g., iPhone 15, Smartphone)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional: Other names customers might search for</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2" /> Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Price
                    </label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiPackage className="mr-2" /> Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Brand
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column - Images & Description */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2" /> Product Images *
                  </label>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-3 mb-3">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{imagePreviews.length} image(s) selected</p>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    <FiUpload className="text-3xl text-gray-400 mx-auto mb-3" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-gray-600 font-medium mb-1">Click to upload images</div>
                      <div className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</div>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the product features, specifications, etc."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading Product...
                      </>
                    ) : (
                      "Upload Product"
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    * Required fields. All product information will be saved to our database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`````

## File: src/components/pages/admin/EditProducts.jsx
`````javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "../../utils/mediaupload.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { 
  FiEdit, 
  FiSave, 
  FiTrash2, 
  FiImage, 
  FiPackage, 
  FiDollarSign, 
  FiTag, 
  FiGrid,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiBox
} from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  
  // Status options
  const statusOptions = [
    { value: "pending", label: "Pending", icon: FiClock, color: "bg-yellow-100 text-yellow-800" },
    { value: "ready", label: "Ready", icon: FiCheckCircle, color: "bg-green-100 text-green-800" },
    { value: "delivered", label: "Delivered", icon: FiTruck, color: "bg-blue-100 text-blue-800" },
    { value: "out_of_stock", label: "Out of Stock", icon: FiBox, color: "bg-red-100 text-red-800" },
  ];

  // Categories and brands for dropdown
  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food", "Office"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "HP", "Microsoft", "Other"];

  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    altNames: "",
    price: "",
    lastPrices: "",
    stock: "",
    description: "",
    category: "General",
    brand: "Unbranded",
    status: "pending", // Added status field
  });

  // Fetch product data
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        let productData;
        
        if (location.state?.product) {
          productData = location.state.product;
        } else if (id) {
          const response = await axios.get(
            import.meta.env.VITE_BACKEND_URL+`/api/products/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          productData = response.data;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Product Selected',
            text: 'Please select a product to edit',
            confirmButtonColor: '#d33',
          }).then(() => navigate("/admin/products"));
          return;
        }

        // Set form data including status
        setFormData({
          productId: productData.productId || "",
          productName: productData.productName || "",
          altNames: productData.altNames?.join(", ") || "",
          price: productData.price || "",
          lastPrices: productData.lastPrices || productData.price || "",
          stock: productData.stock || "",
          description: productData.description || "",
          category: productData.category || "General",
          brand: productData.brand || "Unbranded",
          status: productData.status || "pending", // Set status from API
        });

        if (productData.images && Array.isArray(productData.images)) {
          setExistingImageUrls(productData.images);
        }

      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load product data',
          confirmButtonColor: '#d33',
        }).then(() => navigate("/admin/products"));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [token, navigate, location.state, id]);

  // Handle new image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove new image preview
  const removeNewImage = (index) => {
    const newImagesCopy = [...newImages];
    const newPreviews = [...imagePreviews];
    
    URL.revokeObjectURL(newPreviews[index]);
    newImagesCopy.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setNewImages(newImagesCopy);
    setImagePreviews(newPreviews);
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    Swal.fire({
      title: 'Remove Image?',
      text: "This image will be removed from the product",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newExistingImages = [...existingImageUrls];
        newExistingImages.splice(index, 1);
        setExistingImageUrls(newExistingImages);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Quick status update handler
  const handleQuickStatusUpdate = (newStatus) => {
    Swal.fire({
      title: `Change Status to ${newStatus.toUpperCase()}?`,
      text: `Are you sure you want to change product status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update status!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(prev => ({ ...prev, status: newStatus }));
        Swal.fire({
          icon: 'success',
          title: 'Status Updated!',
          text: `Product status changed to ${newStatus}`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Product name is required',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Price',
        text: 'Please enter a valid price',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    if (existingImageUrls.length === 0 && newImages.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No Images',
        text: 'Please add at least one product image',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    
    try {
      // Upload new images
      const uploadedImages = newImages.length > 0 
        ? await Promise.all(newImages.map(uploadMediaToSupabase))
        : [];

      // Prepare payload including status
      const payload = {
        ...formData,
        altNames: formData.altNames 
          ? formData.altNames.split(",").map(n => n.trim()).filter(n => n)
          : [],
        price: parseFloat(formData.price),
        lastPrices: formData.lastPrices ? parseFloat(formData.lastPrices) : parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: [...existingImageUrls, ...uploadedImages],
        status: formData.status, // Include status in payload
        updatedAt: new Date().toISOString(),
      };

      // Update product
      await axios.patch(
        import.meta.env.VITE_API_URL + `/api/products/${formData.productId}`,
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      // Success alert
      await Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        text: 'Product has been successfully updated',
        showConfirmButton: false,
        timer: 2000
      });

      // Reset image states
      setNewImages([]);
      setImagePreviews([]);

      // Navigate back
      navigate("/admin/dashboard/adminviewproducts");

    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update product. Please try again.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading product data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Status */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <p className="text-blue-100 mt-2">Update product information</p>
              </div>
              <div className="mt-4 md:mt-0 space-y-2">
                <div className="text-sm opacity-90">Product ID</div>
                <div className="text-xl font-mono font-bold">{formData.productId}</div>
                
                {/* Current Status Display */}
                <div className="flex items-center space-x-2 mt-3">
                  <div className="text-sm opacity-90">Current Status:</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
                  }`}>
                    {statusOptions.find(s => s.value === formData.status)?.label || "Unknown"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Product Info */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiPackage className="mr-2" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                {/* Alternate Names */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="Separate with commas"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2" /> Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Price
                    </label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiGrid className="mr-2" /> Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Status Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Status
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {statusOptions.map((status) => (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() => handleQuickStatusUpdate(status.value)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                          formData.status === status.value
                            ? 'border-blue-500 bg-blue-50 scale-105'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <status.icon className={`h-6 w-6 mb-2 ${
                          formData.status === status.value ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          formData.status === status.value ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {status.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Select product status from dropdown or click on status cards above
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Right Column - Images */}
              <div className="space-y-6">
                {/* Existing Images */}
                {existingImageUrls.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Images ({existingImageUrls.length})
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {existingImageUrls.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Product ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Preview */}
                {imagePreviews.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Images to Add ({imagePreviews.length})
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`New ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <MdClose size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2" /> Add More Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FiImage className="text-4xl text-gray-400 mx-auto mb-4" />
                      <div className="text-gray-600 font-medium mb-2">Click to upload new images</div>
                      <div className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</div>
                    </label>
                  </div>
                </div>

                {/* Status Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <FiCheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Status Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
                      }`}>
                        {statusOptions.find(s => s.value === formData.status)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Stock Level:</span>
                      <span className={`font-medium ${
                        parseInt(formData.stock) > 10 ? 'text-green-600' : 
                        parseInt(formData.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {formData.stock || 0} units
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-3">
                      💡 <strong>Status Guide:</strong> Pending → Ready → Delivered
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 space-y-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Update Product
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate("/admin/dashboard/adminviewproducts")}
                      className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: 'Update Only Status?',
                          text: 'Would you like to update just the status without saving other changes?',
                          icon: 'question',
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: 'Save All Changes',
                          denyButtonText: 'Update Status Only',
                          cancelButtonText: 'Cancel'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleSave();
                          } else if (result.isDenied) {
                            // Update only status
                            const statusOnlyPayload = { status: formData.status };
                            axios.patch(
                              import.meta.env.VITE_API_URL + `/api/products/${formData.productId}`,
                              statusOnlyPayload,
                              { 
                                headers: { 
                                  Authorization: `Bearer ${token}`,
                                  'Content-Type': 'application/json'
                                } 
                              }
                            ).then(() => {
                              Swal.fire({
                                icon: 'success',
                                title: 'Status Updated!',
                                text: 'Product status has been updated',
                                timer: 1500,
                                showConfirmButton: false
                              });
                            }).catch(error => {
                              console.error("Status update failed:", error);
                              Swal.fire({
                                icon: 'error',
                                title: 'Status Update Failed',
                                text: 'Failed to update product status',
                                confirmButtonColor: '#d33',
                              });
                            });
                          }
                        });
                      }}
                      className="w-full px-6 py-3 border border-blue-300 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Preview</h3>
            <div className={`px-4 py-1 rounded-full text-sm font-medium ${
              statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
            }`}>
              {statusOptions.find(s => s.value === formData.status)?.label}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Preview */}
            <div className="md:w-1/3">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                {existingImageUrls.length > 0 || imagePreviews.length > 0 ? (
                  <img
                    src={existingImageUrls[0] || imagePreviews[0]}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Product Status</div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    formData.status === 'pending' ? 'bg-yellow-500' :
                    formData.status === 'ready' ? 'bg-green-500' :
                    formData.status === 'delivered' ? 'bg-blue-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className="text-gray-700">{statusOptions.find(s => s.value === formData.status)?.label}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {formData.status === 'pending' && 'Product is awaiting processing'}
                  {formData.status === 'ready' && 'Product is ready for delivery'}
                  {formData.status === 'delivered' && 'Product has been delivered'}
                  {formData.status === 'out_of_stock' && 'Product is currently out of stock'}
                </p>
              </div>
            </div>
            
            {/* Info Preview */}
            <div className="md:w-2/3">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{formData.productName || "Product Name"}</h4>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-blue-600 mr-3">
                  ${parseFloat(formData.price || 0).toFixed(2)}
                </span>
                {formData.lastPrices && parseFloat(formData.lastPrices) > parseFloat(formData.price) && (
                  <span className="text-lg text-gray-500 line-through">
                    ${parseFloat(formData.lastPrices).toFixed(2)}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{formData.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Brand</div>
                  <div className="font-medium">{formData.brand}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Stock</div>
                  <div className={`font-medium ${
                    parseInt(formData.stock) > 10 ? 'text-green-600' : 
                    parseInt(formData.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {formData.stock || 0} units
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Product ID</div>
                  <div className="font-mono font-medium">{formData.productId}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Availability</div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    formData.status === 'out_of_stock' 
                      ? 'bg-red-100 text-red-800' 
                      : parseInt(formData.stock) > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {formData.status === 'out_of_stock' 
                      ? 'Out of Stock' 
                      : parseInt(formData.stock) > 0 
                        ? 'In Stock' 
                        : 'Low Stock'}
                  </div>
                  {formData.status === 'delivered' && (
                    <div className="text-sm text-gray-600 flex items-center">
                      <FiTruck className="h-4 w-4 mr-1" /> Delivered
                    </div>
                  )}
                </div>
              </div>
              <div className="text-gray-600">
                {formData.description || "No description provided"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`````

## File: src/components/pages/HomeContainer.jsx
`````javascript
import React, { useEffect, useState, useRef, useCallback } from "react";
import Card from "@/components/Card";
import axios from "axios";
import NewAdsTitles from "@/components/newadds";
import Banners from "@/components/Banners";

export default function HomeContainer() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Initial fetch loading state
  const [loadingMore, setLoadingMore] = useState(false); // Infinite scroll/button loading state
  const [error, setError] = useState(null); // <--- NEW: State to store fetch error
  const [visibleCount, setVisibleCount] = useState(8);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  // --- 1. Initial Data Fetch ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products");
        if (Array.isArray(response.data)) {
          const products = response.data;
          setAllProducts(products);
          setDisplayedProducts(products.slice(0, visibleCount));
          setHasMore(products.length > visibleCount);
        } else {
          setAllProducts([]);
          setDisplayedProducts([]);
          setHasMore(false);
          // Optional: Set a specific error if data format is unexpected
          // setError("Received data in an unexpected format.");
        }
      } catch (e) {
        console.error("Error fetching products:", e);
        // <--- UPDATED: Set the error state on failure
        setError("Failed to fetch products. Please check the server connection " +(import.meta.env.VITE_BACKEND_URL));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 2. Load More Logic (No change needed here) ---
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const newCount = visibleCount + 8;
      setVisibleCount(newCount);
      setDisplayedProducts(allProducts.slice(0, newCount));
      setHasMore(allProducts.length > newCount);
      setLoadingMore(false);
    }, 500);
  }, [allProducts, loadingMore, hasMore, visibleCount]);

  // --- 3. Intersection Observer (No change needed here) ---
  useEffect(() => {
    // Only observe if there is more data and no loading is currently active
    if (!hasMore || loading || loadingMore || error) return; // <--- Check for error

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5, rootMargin: "100px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadingMore, loadMore, error]); // <--- Added error dependency

  // --- 4. Initial Load Spinner UI ---
  // A. Show spinner while fetching
  if (loading && displayedProducts.length === 0) {
    return (
      <div className="min-h-screen p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        <span className="ml-3 text-teal-600">Fetching initial products...</span>
      </div>
    );
  }

  // B. Show persistent error message if fetch failed
  if (error) {
    return (
      <div className="min-h-screen p-8 flex flex-col justify-center items-center bg-red-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
        <p className="text-red-600 text-center max-w-lg">{error}</p>
        <p className="text-gray-500 text-sm mt-4">Check your console for more details on the fetch error.</p>
      </div>
    );
  }

  // --- 5. Main Render ---
  return (
    <div className="min-h-screen">
      <div className="">
        <NewAdsTitles direction="left" speed={100}>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
        </NewAdsTitles>
      </div>
      <div className="p-4 md:p-8">
        {/*banners casorle here */}

        <div className="mt-2">
          <Banners images={[]} />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <Card
              key={product._id || product.productId}
              productId={product.productId}
              productName={product.productName}
              lastPrices={product.lastPrices}
              price={product.price}
              images={product.images}
            />
          ))}
        </div>

        {/* --- 6. Loading More Indicator UI --- */}
        {loadingMore && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mr-3"></div>
              <span className="text-teal-600">Loading more products...</span>
            </div>
          </div>
        )}

        {/* Observer target for Intersection Observer */}
        {/* Only visible when there's a chance of loading more */}
        {hasMore && <div ref={observerTarget} className="h-10"></div>}


        {/* --- 7. Fallback "Load More" Button UI --- */}
        {hasMore && !loadingMore && (
          <div className="text-center py-8">
            <div className="mb-4 text-gray-600 text-sm">
              Scroll down to load more or click below
            </div>
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Load More ({allProducts.length - displayedProducts.length}{" "}
              remaining)
            </button>
          </div>
        )}

        {/* --- 8. All Loaded Message UI --- */}
        {!hasMore && allProducts.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-block px-6 py-3 bg-green-100 text-green-800 rounded-full">
              🎉 All {allProducts.length} products loaded!
            </div>
            <p className="text-gray-500 text-sm mt-2">
              You've reached the end of our products
            </p>
          </div>
        )}

        {/* Scroll indicator for mobile */}
        {hasMore && displayedProducts.length > 8 && (
          <div className="fixed bottom-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg text-sm animate-bounce lg:hidden">
            ↓ Scroll for more
          </div>
        )}
      </div>
    </div>
  );
}
`````

## File: src/components/pages/Login.jsx
`````javascript
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        { email, password }
      );

      // Save token
      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("authChange"));

      // Navigate
      if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
            <p className="text-gray-600 mt-1">Enter your credentials to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`````

## File: src/components/pages/viewCart.jsx
`````javascript
import React, { useEffect, useState } from "react";
// Added 'updateItemQty' to imports
import { loadCart, deleteItem, updateItemQty } from "@/components/utils/cart";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// Added 'Minus' and 'Plus' icons
import { Trash2, ShoppingBag, AlertCircle, ChevronRight, Package, Tag, CreditCard, Shield, Truck, Minus, Plus } from "lucide-react";

const initialQuoteState = {
  orderedItems: [],
  total: 0,
  labeledTotal: 0,
  discount: 0,
  message: "Calculating prices...",
};

export default function ViewCart() {
  const [quoteData, setQuoteData] = useState(initialQuoteState);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Check auth and load token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setToken(null);
      setQuoteData({ ...initialQuoteState, message: "Please log in to view your cart." });
      return;
    }
    setToken(storedToken);
  }, []);

  // 2. Fetch Quote Function
  const fetchQuote = async (currentToken) => {
    const cart = loadCart();
    
    if (!cart.length) {
      setQuoteData({ ...initialQuoteState, message: "Your cart is empty." });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders/quote",
        { orderedItems: cart },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );
      setQuoteData(data);
    } catch (error) {
      console.error("Quote API Error:", error);
      
      const serverMessage = error.response?.data?.message;

      // Handle Stock Errors (400) specifically so user sees "Insufficient stock"
      if (error.response?.status === 400 && serverMessage) {
         setQuoteData({ 
            ...initialQuoteState, 
            orderedItems: loadCart(), // Keep showing items even on error
            message: serverMessage 
         });
         // Optional: Toast for better visibility
         Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: serverMessage,
            showConfirmButton: false,
            timer: 3000
         });
      } else if (error.response?.status === 401) {
        setQuoteData({ ...initialQuoteState, message: "Session expired. Please login again." });
      } else {
        setQuoteData({ ...initialQuoteState, message: "Failed to fetch prices." });
      }
    } finally {
      setLoading(false);
    }
  };

  // 3. Trigger Fetch when token is ready
  useEffect(() => {
    if (token) {
      fetchQuote(token);
    }
  }, [token]);

  // --- NEW FEATURE: Handle Quantity Change ---
  const handleQtyChange = (productId, currentQty, change) => {
    const newQty = currentQty + change;

    // Prevent going below 1 (User should use 'Remove' button for that)
    if (newQty < 1) return;

    // 1. Update Local Storage
    updateItemQty(productId, newQty);

    // 2. Re-fetch quote to update totals and check stock
    if (token) {
        fetchQuote(token);
    }
  };

  // Delete item with confirmation
  const handleDelete = (productId, productName) => {
    Swal.fire({
      title: 'Remove Item',
      text: `Are you sure you want to remove "${productName}" from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(productId);
        
        const updatedCart = loadCart();
        if (updatedCart.length === 0) {
           setQuoteData({ ...initialQuoteState, message: "Your cart is empty." });
        } else {
           fetchQuote(token);
        }

        Swal.fire({
          icon: 'success',
          title: 'Item Removed',
          text: 'The item has been removed from your cart.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Clear entire cart
  const handleClearCart = () => {
    Swal.fire({
      title: 'Clear Cart',
      text: 'Are you sure you want to clear all items from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, clear all!',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cart");
        setQuoteData({ ...initialQuoteState, message: "Your cart has been cleared." });
        
        Swal.fire({
          icon: 'success',
          title: 'Cart Cleared',
          text: 'All items have been removed from your cart.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Checkout
  const handleCheckout = () => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "Please log in to proceed to checkout.",
        confirmButtonColor: "#f59e0b",
        backdrop: 'rgba(0,0,0,0.5)'
      });
      navigate("/login");
      return;
    }

    if (!quoteData.orderedItems.length || quoteData.total <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text: "Your cart is empty or calculation failed. Please add items to proceed.",
        confirmButtonColor: "#f59e0b",
        backdrop: 'rgba(0,0,0,0.5)'
      });
      return;
    }

    Swal.fire({
      title: "Confirm Checkout",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to place an order for:</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <p class="font-semibold text-lg">Rs. ${quoteData.total.toFixed(2)}</p>
            <p class="text-sm text-gray-600">${quoteData.orderedItems.length} item(s) in your cart</p>
          </div>
          <p class="text-sm text-gray-600">You will be redirected to the shipping details page.</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Proceed to Shipping",
      cancelButtonText: "Review Order",
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/shipping/", { state: quoteData });
      }
    });
  };

  const { orderedItems, total, labeledTotal, discount, message } = quoteData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-amber-500 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          </div>
          <p className="text-gray-600">Review and manage your items before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {/* Message Banner */}
            {message && (
              <div className="mb-6">
                <div className={`flex items-center p-4 rounded-lg ${
                  message.includes("Please log in") || message.includes("Failed") || message.includes("Session") || message.includes("Insufficient")
                    ? "bg-red-50 border border-red-200"
                    : message.includes("empty")
                    ? "bg-amber-50 border border-amber-200"
                    : "bg-blue-50 border border-blue-200"
                }`}>
                  <AlertCircle className={`h-5 w-5 mr-3 ${
                    message.includes("Please log in") || message.includes("Failed") || message.includes("Session") || message.includes("Insufficient")
                      ? "text-red-500"
                      : message.includes("empty")
                      ? "text-amber-500"
                      : "text-blue-500"
                  }`} />
                  <span className={`text-sm ${
                    message.includes("Please log in") || message.includes("Failed") || message.includes("Session") || message.includes("Insufficient")
                      ? "text-red-700"
                      : message.includes("empty")
                      ? "text-amber-700"
                      : "text-blue-700"
                  }`}>{message}</span>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Cart Items ({orderedItems.length})
                  </h2>
                  {orderedItems.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>

              {token && orderedItems.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {orderedItems.map((item) => (
                    <div key={item.productId} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-amber-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.productName}</h3>
                              <p className="text-sm text-gray-500 mt-1">Product ID: {item.productId}</p>
                              
                              {/* --- UPDATED: Quantity Controls --- */}
                              <div className="flex items-center space-x-3 mt-3">
                                <button 
                                  onClick={() => handleQtyChange(item.productId, item.qty, -1)}
                                  disabled={loading || item.qty <= 1}
                                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  title="Decrease quantity"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                
                                <span className="font-semibold text-gray-900 w-6 text-center">
                                  {item.qty}
                                </span>
                                
                                <button 
                                  onClick={() => handleQtyChange(item.productId, item.qty, 1)}
                                  disabled={loading}
                                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  title="Increase quantity"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              {/* ---------------------------------- */}
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                {item.discount > 0 && (
                                  <span className="text-sm text-gray-400 line-through">
                                    Rs. {(item.price * item.qty).toFixed(2)}
                                  </span>
                                )}
                                <span className="text-lg font-bold text-gray-900">
                                  Rs. {(item.lastPrice * item.qty).toFixed(2)}
                                </span>
                              </div>
                              {item.discount > 0 && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                  <Tag className="h-3 w-3 mr-1" />
                                  Save Rs. {(item.discount * item.qty).toFixed(2)}
                                </span>
                              )}
                              <button
                                onClick={() => handleDelete(item.productId, item.productName)}
                                className="mt-3 flex items-center text-sm text-red-600 hover:text-red-700 font-medium ml-auto"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-8">Add some products to get started!</p>
                  <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Continue Shopping
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              )}
            </div>

            {/* Security Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Secure Payment</h4>
                  <p className="text-sm text-gray-500">100% safe and secure</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over Rs. 5000</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Easy Returns</h4>
                  <p className="text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({orderedItems.length} items)</span>
                    <span className="font-medium">Rs. {labeledTotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-700 font-medium">Discount</span>
                      </div>
                      <span className="font-bold text-green-700">- Rs. {discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>

                  <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Included</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between py-4 border-t border-gray-200">
                    <div>
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <p className="text-sm text-gray-500">Including all taxes</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">Rs. {total.toFixed(2)}</div>
                      {labeledTotal > 0 && (
                        <div className="text-sm text-gray-500 line-through">Rs. {labeledTotal.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={!token || total <= 0 || loading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    total > 0 && token && !loading
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Proceed to Checkout</span>
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                >
                  Continue Shopping
                </button>

                {/* Help Text */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Need help?{" "}
                    <button className="text-amber-600 hover:text-amber-700 font-medium">
                      Contact Support
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Tips */}
            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Shopping Tips
              </h3>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Free shipping on orders above Rs. 5000
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Prices are inclusive of all taxes
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  You can modify your order before checkout
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  30-day return policy applies to all items
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`````

## File: src/components/Navbar.jsx
`````javascript
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import NotificationsDropdown from "@/components/utils/notificationDrop";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Auth check
  const authCheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsAdmin(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAdmin(decoded.role === "admin");
    } catch {
      setUser(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    authCheck();
    window.addEventListener("authChange", authCheck);
    return () => window.removeEventListener("authChange", authCheck);
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const userId = user?.id || "";

  return (
    <nav className="bg-gray-100 shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          MyBrand
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/service">Service</Link>

          {user && (
            <>
              <Link to={`/viewcart?userId=${userId}`}>Cart</Link>
              <Link to={`/orders?userId=${userId}`}>Orders</Link>
            </>
          )}

          {/* Admin notifications */}
          {isAdmin && <NotificationsDropdown />}
          {isAdmin && <Link to="/admin/dashboard">Admin Dashboard</Link>}

          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
              <Link to={`/profile?userId=${userId}`}>Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded shadow">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/service" onClick={() => setMenuOpen(false)}>Service</Link>

          {user && (
            <>
              <Link to={`/viewcart?userId=${userId}`} onClick={() => setMenuOpen(false)}>Cart</Link>
              <Link to={`/orders?userId=${userId}`} onClick={() => setMenuOpen(false)}>Orders</Link>
            </>
          )}

          {isAdmin && (
            <Link to="/admin/dashboard/notification" onClick={() => setMenuOpen(false)}>
              Notifications
            </Link>
          )}
          {isAdmin && <Link to="/admin/dashboard">Admin Dashboard</Link>}

          {user ? (
            <>
              <Link to={`/profile?userId=${userId}`}>Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
`````

## File: src/components/pages/admin/notification.jsx
`````javascript
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
`````

## File: src/components/pages/productoverview.jsx
`````javascript
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageSlider from "@/components/imageSlider";
import { addToCart } from "../utils/cart";
import {
  FiShoppingCart,
  FiTag,
  FiInfo,
  FiArrowLeft,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import Swal from "sweetalert2";

export default function ProductOverview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/api/products/${productId}`
        );

        if (response.data && response.data.product) {
          setProduct(response.data);
        } else {
          setError("Product data not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  console.log(product);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyNow = () => {
    if (!product?.product || product.product.stock <= 0) return;

    Swal.fire({
      title: "Proceed to Checkout?",
      text: `Buy "${product.product.productName}" for LKR ${(
        product.product.lastPrices * quantity
      ).toFixed(2)}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Continue shopping",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(
          `/shipping/?P_id=${
            product.product._id
          }&productName=${encodeURIComponent(
            product.product.productName
          )}&productId=${product.product.productId}`,
          {
            state: {
              orderedItems: [
                {
                  productId: product.product.productId,
                  productName: product.product.productName,
                  price: product.product.price,
                  lastPrice: product.product.lastPrices,
                  qty: quantity,
                  image: product.product.images?.[0] || "",
                },
              ],
              total: product.product.lastPrices * quantity,
              labeledTotal: product.product.price * quantity,
              discount:
                (product.product.price - product.product.lastPrices) * quantity,
              message: "Buying single product now",
            },
          }
        );
      }
    });
  };

  const handleAddToCart = async () => {
    if (!product?.product || product.product.stock <= 0) return;

    setAddingToCart(true);
    try {
      addToCart(product.product.productId, quantity);

      await Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${quantity} × "${product.product.productName}" added to your cart`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add",
        text: "Could not add item to cart. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Product Details
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch the product information...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product?.product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {error || "Product Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for might not exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <FiArrowLeft /> Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const data = product.product;
  const discountPercentage =
    data.price > 0
      ? Math.round(((data.price - data.lastPrices) / data.price) * 100)
      : 0;
  const hasDiscount = data.price > data.lastPrices;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <FiArrowLeft /> Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6">
              <ImageSlider
                images={data.images}
                showThumbnails={true}
                autoplay={true}
              />

              {/* Product Highlights */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <FiTruck className="text-blue-600" />
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <FiShield className="text-green-600" />
                  <span className="text-sm font-medium">1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                  <MdOutlineInventory2 className="text-purple-600" />
                  <span className="text-sm font-medium">
                    In Stock: {data.stock}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* Product ID & Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  SKU: {data.productId}
                </span>
                <div className="flex items-center gap-2">
                  <FiTag className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {data.category}
                  </span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {data.productName}
              </h1>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold text-green-600">
                    {formatPrice(data.lastPrices)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-2xl text-gray-400 line-through">
                        {formatPrice(data.price)}
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-full">
                        -{discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div
                className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  data.stock > 10
                    ? "bg-green-100 text-green-800"
                    : data.stock > 0
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    data.stock > 10
                      ? "bg-green-500"
                      : data.stock > 0
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="font-medium">
                  {data.stock > 10
                    ? "In Stock"
                    : data.stock > 0
                    ? `Only ${data.stock} left`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={data.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= data.stock) setQuantity(val);
                    }}
                    className="w-20 text-center border border-gray-300 rounded-lg py-2"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= data.stock}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    Max: {data.stock} units
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={data.stock <= 0 || addingToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <FiShoppingCart /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={data.stock <= 0}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FiInfo className="text-gray-600" />
                  Product Description
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {data.description ||
                      "No description available for this product."}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold text-gray-800">{data.category}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Brand</p>
                  <p className="font-semibold text-gray-800">{data.brand}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`````

## File: src/components/pages/Homepage.jsx
`````javascript
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "@/components/pages/HomeContainer";
import Login from "./Login";
import Dashboard from "@/components/pages/admin/Dashboard/dashboard";
import NotFound from "@/components/pages/NotFound";
import Signup from "@/components/pages/singUp";
import Productoverview from "./productoverview";
import ViewCartPage from "./viewCart";
import ShipingPage from "@/components/pages/shipping";
import AboutPage from "@/components/pages/about.jsx";
import ServicePage from "@/components/pages/service.jsx";
import { jwtDecode } from "jwt-decode"; // FIXED IMPORT
import AiChatBot from "@/components/aiChatBot";
import PaymentPage from "@/components/pages/admin/payment";
import OrderPage from "@/components/pages/orderpage.jsx";
import ProfilePage from "@/components/pages/ProfilePage.jsx";



export default function Homepage() {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState("customer");

  useEffect(() => {
    const authcheck = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser("customer");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setUser(decoded.role === "admin" ? "admin" : "customer");
      } catch {
        setUser("customer");
      }
    };

    authcheck(); // first check
    window.addEventListener("authChange", authcheck);

    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      {/* Main content area */}
      <div className="w-full h-[calc(100vh-100px)]">
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/viewcart" element={<ViewCartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shipping/" element={<ShipingPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />

          <Route path="/orders" element={<OrderPage />} />
          <Route path="/orders/:orderId" element={<OrderPage />} />


          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin/dashboard/*" element={<Dashboard />} />



          <Route path="*" element={<NotFound />} />

          <Route
            path="/productoverview/:productId"
            element={<Productoverview />}
          />
        </Routes>
      </div>

      {/* Show chatbot only for customer */}
      {user === "customer" && <AiChatBot />}
    </div>
  );
}
`````

## File: src/components/aiChatBot.jsx
`````javascript
import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import axios from "axios";

// ----------------------
// Message Bubble Component
// ----------------------
const MessageBubble = memo(({ msg }) => {
  const isUser = msg.sender === "user";
  const isAdmin = msg.sender === "admin";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} animate-in`}>
      <div
        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-slate-900 text-white rounded-t-2xl rounded-bl-2xl"
            : isAdmin
            ? "bg-blue-600 text-white rounded-t-2xl rounded-br-2xl"
            : "bg-slate-100 text-slate-700 border border-slate-200 rounded-t-2xl rounded-br-2xl"
        }`}
      >
        {msg.text}
      </div>
      <span className="text-[10px] text-slate-400 mt-1 font-semibold uppercase tracking-wider">
        {isUser ? "You" : isAdmin ? "Admin Representative" : "AI Assistant"}
      </span>
    </div>
  );
});

// ----------------------
// ChatBot Component
// ----------------------
export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // ----------------------
  // Fetch Admin Replies
  // ----------------------
  const fetchAdminReplies = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:4000/api/messages/getadminreplies", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.messages && res.data.messages.length > 0) {
        setMessages((prev) => {
          const existingTexts = prev.map((m) => m.text);
          const newReplies = res.data.messages.filter((m) => !existingTexts.includes(m.text));
          if (newReplies.length === 0) return prev;
          return [...prev, ...newReplies];
        });
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
    }
  }, []);

  // ----------------------
  // Polling Admin Replies
  // ----------------------
  useEffect(() => {
    let interval;
    if (isOpen) {
      fetchAdminReplies();
      interval = setInterval(fetchAdminReplies, 4000);
    }
    return () => clearInterval(interval);
  }, [isOpen, fetchAdminReplies]);

  // ----------------------
  // Fetch Initial Messages (User + AI)
  // ----------------------
  const fetchLatestMessages = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:4000/api/messages/getmessages", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.messages && Array.isArray(res.data.messages)) {
        const formatted = res.data.messages.map((msg) => ({
          sender: msg.sender,
          text: msg.text,
        }));
        setMessages(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchLatestMessages();
  }, [isOpen, fetchLatestMessages]);

  // ----------------------
  // Scroll to bottom on new messages
  // ----------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ----------------------
  // Handle Sending Messages (Pessimistic Update)
  // ----------------------
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const token = localStorage.getItem("token");
    const messageText = input.trim();

    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/messages/sendmessage",
        { message: messageText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.messages && Array.isArray(data.messages)) {
        setMessages((prev) => [...prev, ...data.messages]);
      }
    } catch (err) {
      console.error("Send failed:", err);
      alert("Message sending failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------
  // Render
  // ----------------------
  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-2xl shadow-xl"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[360px] h-[600px] bg-white rounded-[32px] flex flex-col shadow-2xl overflow-hidden border">
          {/* Header */}
          <header className="p-6 border-b flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Support Center</h3>
          </header>

          {/* Messages */}
          <main className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-slate-50/30">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} msg={msg} />
            ))}
            {loading && (
              <div className="text-[11px] text-slate-400 italic">Sending...</div>
            )}
            <div ref={messagesEndRef} />
          </main>

          {/* Footer */}
          <footer className="p-4 bg-white border-t">
            <form
              onSubmit={handleSend}
              className="flex gap-2 bg-slate-100 rounded-2xl p-1.5 pl-4"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something or @admin..."
                disabled={loading}
                className="flex-1 bg-transparent outline-none text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white p-2 rounded-xl disabled:opacity-50"
              >
                ➤
              </button>
            </form>
          </footer>
        </div>
      )}
    </div>
  );
}
`````
