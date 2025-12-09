import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react"; 

export default function AiChatBot() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false); // Separate state for sending messages
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null); 

  // 💡 FIX 1: Remove loading from dependencies to prevent infinite loop
  const loadMessages = useCallback(async () => {
    if (loading) return; 

    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/chat/getMessagesbyid", {
        headers: { Authorization: token },
      });
      // Check if response has the correct structure
      if (res.data && res.data.messages) {
        setMessages(res.data.messages);
      } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
        // Alternative response format
        setMessages(res.data.data);
      } else {
        console.error("Unexpected response format:", res.data);
        setMessages([]);
      }
    } catch (err) {
      console.error("Error loading messages:", err);
      if (err.response) {
        console.error("Response error:", err.response.data);
        console.error("Status:", err.response.status);
      }
    } finally {
      setLoading(false);
    }
  }, [token]); // ❌ Remove loading from dependencies

  // 2. Load messages when chat opens
  useEffect(() => {
    if (open && token) {
      loadMessages();
    } else {
      setMessages([]);
    }
  }, [open]); // ❌ Remove loadMessages from dependencies

  // 3. Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll when messages change
  useEffect(() => {
    if (open && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, open]);

  // Handle reply
  const handleReply = async () => {
    if (!newMessage.trim() || sending) return;
    
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
      await axios.post(
        "http://localhost:4000/api/chat/sendMessage",
        { text: messageToSend }, 
        { 
          headers: { 
            Authorization: token,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      // Wait a bit before reloading messages to allow backend to process
      setTimeout(() => {
        loadMessages();
      }, 500);
      
    } catch (error) {
      console.error("Message sending failed:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Status:", error.response.status);
        
        // Show error message
        if (error.response.status === 401) {
          alert("Session expired. Please login again.");
          // Optional: Redirect to login
          // window.location.href = "/login";
        } else if (error.response.status === 403) {
          alert("You don't have permission to send messages.");
        }
      }
      
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg._id !== localMessage._id));
      setNewMessage(messageToSend);
    } finally {
      setSending(false);
    }
  };

  // Debug: Check token
  useEffect(() => {
    if (!token) {
      console.warn("No token found in localStorage");
    } else {
      console.log("Token found, length:", token.length);
    }
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button */}
      <button
        className="bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-2">
            <h3 className="font-semibold">
              AI ChatBot 
              {(loading || sending) && "..."}
            </h3>
            <button 
              onClick={() => setOpen(false)} 
              className="text-lg hover:text-gray-200"
            >
              ✖
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {/* Loading Indicator */}
            {loading && messages.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
                Loading history...
              </div>
            )}

            {/* No messages */}
            {!loading && messages.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No messages yet. Start the conversation!
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message._id}
                className={`p-2 rounded-md shadow-sm ${
                  message.sender !== "User"
                    ? "bg-blue-100 text-left"
                    : "bg-gray-100 text-right"
                } max-w-[80%] ${
                  message.sender !== "User" ? "mr-auto" : "ml-auto"
                }`}
              >
                <p className="text-sm">
                  <span className="font-bold">{message.sender || "Unknown"}:</span>{" "}
                  {message.text} 
                </p>
                <small className="text-xs text-gray-500 block mt-1">
                  {new Date(message.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </small>
              </div>
            ))}
            
            {/* Sending indicator */}
            {sending && (
              <div className="text-center text-gray-500 py-2">
                <div className="inline-block animate-pulse">Sending...</div>
              </div>
            )}
            
            {/* Scroll Ref */}
            <div ref={messagesEndRef} /> 
          </div>

          {/* Footer with Reply */}
          <div className="border-t p-2 flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a reply..."
              disabled={loading || sending}
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              onKeyPress={(e) => { 
                if (e.key === 'Enter' && !sending && newMessage.trim()) {
                  handleReply();
                }
              }}
            />
            <button
              onClick={handleReply}
              disabled={loading || sending || !newMessage.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}