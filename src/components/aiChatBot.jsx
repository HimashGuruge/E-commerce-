import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // 🔄 පණිවිඩ ඉතිහාසය ලබා ගැනීම
  useEffect(() => {
    if (isOpen) {
      fetchChatHistory();
    }
  }, [isOpen]);

  // 📜 ස්වයංක්‍රීයව පහළට Scroll වීම
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const fetchChatHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:4000/api/messages/getmessages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const token = localStorage.getItem("token");
    const userText = input;
    
    setInput(""); 
    setLoading(true); // AI reply එක එනකම් loading පෙන්වන්න

    try {
      const res = await axios.post(
        "http://localhost:4000/api/messages/sendmessage",
        { message: userText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Backend එකෙන් response එක ආවට පස්සේ විතරක් UI එක update වෙනවා
      if (res.data && res.data.messages) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error("Send error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CSS for Typing Animation */}
      <style>
        {`
          @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
          .dot { display: inline-block; width: 6px; height: 6px; background: #999; border-radius: 50%; margin-right: 3px; animation: bounce 1.4s infinite ease-in-out; }
          .dot:nth-child(2) { animation-delay: 0.2s; }
          .dot:nth-child(3) { animation-delay: 0.4s; }
        `}
      </style>

      {/* Floating Button */}
      <button onClick={() => setIsOpen(!isOpen)} style={styles.fab}>
        {isOpen ? "✖" : "💬"}
      </button>

      {isOpen && (
        <div style={styles.chatContainer}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.statusDot}></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>Assistant Support</div>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>AI is ready to help</div>
            </div>
          </div>

          {/* Message Area */}
          <div style={styles.messageArea}>
            {messages.length === 0 && !loading && (
              <div style={styles.welcomeText}>How can I help you today?</div>
            )}
            
            {messages.map((msg, idx) => {
              const isUser = msg.startsWith("user:");
              const text = msg.replace(/^user: |^ai: /, "");
              return (
                <div key={idx} style={isUser ? styles.userRow : styles.aiRow}>
                  <div style={isUser ? styles.userBubble : styles.aiBubble}>
                    {text}
                  </div>
                </div>
              );
            })}
            
            {/* 💡 Typing Indicator - Professional Feedback */}
            {loading && (
              <div style={styles.aiRow}>
                <div style={styles.aiBubble}>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} style={styles.inputForm}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="මෙතන ලියන්න..."
              style={styles.inputField}
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || loading} 
              style={{...styles.sendBtn, opacity: loading ? 0.5 : 1}}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

// 🎨 Professional UI Styles
const styles = {
  fab: {
    position: "fixed", bottom: "30px", right: "30px",
    width: "60px", height: "60px", borderRadius: "50%",
    backgroundColor: "#7c4dff", color: "white", border: "none",
    fontSize: "24px", cursor: "pointer", zIndex: 1000,
    boxShadow: "0 6px 20px rgba(124, 77, 255, 0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "transform 0.2s"
  },
  chatContainer: {
    position: "fixed", bottom: "105px", right: "30px",
    width: "360px", height: "500px", backgroundColor: "white",
    borderRadius: "20px", display: "flex", flexDirection: "column",
    boxShadow: "0 12px 40px rgba(0,0,0,0.15)", zIndex: 1000,
    overflow: "hidden", border: "1px solid #f0f0f0"
  },
  header: {
    padding: "18px", backgroundColor: "#7c4dff", color: "white",
    display: "flex", alignItems: "center", gap: "12px"
  },
  statusDot: {
    width: "10px", height: "10px", backgroundColor: "#00e676",
    borderRadius: "50%", border: "2px solid white"
  },
  messageArea: {
    flex: 1, padding: "20px", overflowY: "auto",
    display: "flex", flexDirection: "column", gap: "12px",
    backgroundColor: "#f9fafb"
  },
  userRow: { alignSelf: "flex-end", maxWidth: "80%" },
  aiRow: { alignSelf: "flex-start", maxWidth: "80%" },
  userBubble: {
    backgroundColor: "#7c4dff", color: "white", padding: "10px 16px",
    borderRadius: "18px 18px 0 18px", fontSize: "14px", lineHeight: "1.4"
  },
  aiBubble: {
    backgroundColor: "#ffffff", color: "#333", padding: "10px 16px",
    borderRadius: "18px 18px 18px 0", fontSize: "14px", lineHeight: "1.4",
    border: "1px solid #e5e7eb", boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
  },
  inputForm: {
    padding: "15px", display: "flex", alignItems: "center",
    gap: "10px", borderTop: "1px solid #f0f0f0", backgroundColor: "white"
  },
  inputField: {
    flex: 1, border: "1px solid #e5e7eb", borderRadius: "25px",
    padding: "10px 18px", outline: "none", fontSize: "14px",
    transition: "border 0.2s"
  },
  sendBtn: {
    backgroundColor: "transparent", color: "#7c4dff", border: "none",
    fontSize: "22px", cursor: "pointer", padding: "0 5px"
  },
  welcomeText: {
    textAlign: "center", color: "#9ca3af", fontSize: "13px", marginTop: "20px"
  }
};