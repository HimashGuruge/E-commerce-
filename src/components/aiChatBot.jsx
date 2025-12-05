import axios from "axios";
import React, { useState } from "react";

export default function AiChatBot() {

  // 1. State Declarations
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Message එක type කරන්න අලුත් state එකක්
  const [message, setMessage] = useState(""); 

  // 2. 🚀 Toggle Chat Function
  const toggleChat = async () => {
    // Chat එක close කරන්න නම් කෙලින්ම වහලා දානවා
    if (showChat) {
      setShowChat(false);
      return;
    }
    
    // Login check එක (Click කරන වෙලාවෙම token එක ගන්නවා)
    const token = localStorage.getItem("token");

    if (!token) {
      alert("First, you need to log in to chat with us.");
      return;
    }

    // ⛔ User data දැනටමත් තියෙනවා නම් ආයෙ call කරන්නේ නෑ
    if (!user) {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/users/", {
          headers: { Authorization: "Bearer " + token }
        });
        
        // Backend එකෙන් එන විදිය බලලා data set කරනවා (Safe check)
        const userData = res.data.user || res.data.users;
        setUser(userData); 
        console.log("User Data Loaded:", userData); 

      } catch (err) {
        console.error("API Error:", err);
        alert("Could not fetch user data. Please login again.");
        setLoading(false);
        return; // Error නම් Chat open කරන්නේ නෑ
      } finally {
        setLoading(false);
      }
    }
    
    // හැමදේම හරි නම් chat එක open කරනවා
    setShowChat(true); 
  };

  // Message යවන function එක (Placeholder)
  const handleSendMessage = () => {
    if (!message.trim()) return;
    console.log("Sending message:", message);
    // මෙතනට ඔයාගේ AI API call එක දාන්න පුළුවන්
    setMessage(""); // Input එක clear කරනවා
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        disabled={loading}
        className={`fixed bottom-4 right-4 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition z-50 
          ${loading ? 'bg-gray-500 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        <span className="text-2xl">
          {loading ? '...' : showChat ? "✕" : "💬"}
        </span>
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200 animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-indigo-600 text-white px-4 py-3 font-semibold text-lg flex justify-between items-center shadow-sm">
            <span>AI Assistant <span className="text-xs font-normal opacity-75">({user ? user.name : 'Guest'})</span></span>
            <button onClick={toggleChat} className="text-xl leading-none opacity-80 hover:opacity-100">
              ✕
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {loading && <div className="text-center text-xs text-gray-500">Loading user data...</div>}
            
            <div className="text-center text-gray-400 mt-2 text-sm">
              Hello {user?.name}! <br/> How can I help you today?
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message} // State එකට connect කළා
                onChange={(e) => setMessage(e.target.value)} // Typing update කරනවා
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Enter ගැහුවම යවනවා
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                disabled={!message.trim()} // Empty නම් button disable
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}