import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // මෙහි [{sender, text}] ලෙස objects තැන්පත් වේ
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // 🔄 Chat එක open කරන විට history එක load කිරීම
  useEffect(() => {
    if (isOpen) fetchAllMessages();
  }, [isOpen]);

  // 📜 පණිවිඩ ලැබෙන විට auto-scroll වීම
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 🛠️ AI Chat සහ Admin Replies දෙකම ලබාගෙන එකතු කරන function එක
  const fetchAllMessages = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // 1. AI Chat History එක ලබා ගැනීම (String Array එකක් එන්නේ: ["user: hi", "ai: hello"])
      const resAI = await axios.get("http://localhost:4000/api/messages/getmessages", {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 2. Admin Replies ලබා ගැනීම (Object Array එකක් එන්නේ: [{sender: "admin", text: "..."}])
      const resAdmin = await axios.get("http://localhost:4000/api/messages/getadminreplies", {
        headers: { Authorization: `Bearer ${token}` }
      });

      let combinedMessages = [];

      // AI පණිවිඩ (Strings) ටික Object format එකට හරවා ගැනීම
      if (resAI.data.messages) {
        const formattedAI = resAI.data.messages.map(msg => {
          const isUser = msg.startsWith("user:");
          return {
            sender: isUser ? "user" : "ai",
            text: msg.replace("user:", "").replace("ai:", "").trim()
          };
        });
        combinedMessages = [...formattedAI];
      }

      // Admin පණිවිඩ කෙලින්ම එකතු කිරීම (ඒවා දැනටමත් Objects නිසා)
      if (resAdmin.data.messages) {
        combinedMessages = [...combinedMessages, ...resAdmin.data.messages];
      }

      setMessages(combinedMessages);
    } catch (err) {
      console.error("Fetch history error:", err);
    }
  };

  // පණිවිඩයක් යැවීම
  // handleSend function එක මේ විදියට update කරන්න (aiChatBot.jsx)
const handleSend = async (e) => {
  e.preventDefault();
  if (!input.trim() || loading) return;

  const token = localStorage.getItem("token");
  const userText = input;
  setInput(""); 
  setLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:4000/api/messages/sendmessage",
      { message: userText },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // ✅ මෙතනදී Backend එකෙන් එන messages ටික කෙලින්ම set කරනවා
    if (res.data.messages) {
      setMessages(prev => [...prev, ...res.data.messages]);
    } else {
      fetchAllMessages(); // මොකක් හරි අවුලක් නම් විතරක් මුල ඉඳන් fetch කරනවා
    }
  } catch (err) {
    console.error("Send error:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <style>{`
        @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
        .dot { display: inline-block; width: 6px; height: 6px; background: #999; border-radius: 50%; margin-right: 3px; animation: bounce 1.4s infinite ease-in-out; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* Floating Button */}
      <button onClick={() => setIsOpen(!isOpen)} style={styles.fab}>
        {isOpen ? "✖" : "💬"}
      </button>

      {isOpen && (
        <div style={styles.chatContainer}>
          <div style={styles.header}>
            <div style={styles.statusDot}></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>Assistant Support</div>
              <div style={{ fontSize: "11px", opacity: 0.9 }}>AI & Admin help center</div>
            </div>
          </div>

          <div style={styles.messageArea}>
            {messages.map((msg, idx) => {
              const isUser = msg.sender === "user";
              return (
                <div key={idx} style={isUser ? styles.userRow : styles.aiRow}>
                  <div style={isUser ? styles.userBubble : styles.aiBubble}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

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

          <form onSubmit={handleSend} style={styles.inputForm}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="මෙතන ලියන්න..."
              style={styles.inputField}
              disabled={loading}
            />
            <button type="submit" style={styles.sendBtn} disabled={loading}>➤</button>
          </form>
        </div>
      )}
    </>
  );
}

const styles = {
  fab: { position: "fixed", bottom: "30px", right: "30px", width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#7c4dff", color: "white", border: "none", fontSize: "24px", cursor: "pointer", zIndex: 1000, boxShadow: "0 6px 20px rgba(124, 77, 255, 0.4)" },
  chatContainer: { position: "fixed", bottom: "105px", right: "30px", width: "360px", height: "500px", backgroundColor: "white", borderRadius: "20px", display: "flex", flexDirection: "column", boxShadow: "0 12px 40px rgba(0,0,0,0.15)", zIndex: 1000, overflow: "hidden", border: "1px solid #f0f0f0" },
  header: { padding: "18px", backgroundColor: "#7c4dff", color: "white", display: "flex", alignItems: "center", gap: "12px" },
  statusDot: { width: "10px", height: "10px", backgroundColor: "#00e676", borderRadius: "50%", border: "2px solid white" },
  messageArea: { flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "#f9fafb" },
  userRow: { alignSelf: "flex-end", maxWidth: "80%" },
  aiRow: { alignSelf: "flex-start", maxWidth: "80%" },
  userBubble: { backgroundColor: "#7c4dff", color: "white", padding: "10px 16px", borderRadius: "18px 18px 0 18px", fontSize: "14px" },
  aiBubble: { backgroundColor: "#ffffff", color: "#333", padding: "10px 16px", borderRadius: "18px 18px 18px 0", fontSize: "14px", border: "1px solid #e5e7eb" },
  inputForm: { padding: "15px", display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid #f0f0f0" },
  inputField: { flex: 1, border: "1px solid #e5e7eb", borderRadius: "25px", padding: "10px 18px", outline: "none" },
  sendBtn: { background: "none", border: "none", color: "#7c4dff", fontSize: "22px", cursor: "pointer" }
};