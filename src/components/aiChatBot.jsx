import React, { useEffect, useLayoutEffect, useState, useRef, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Send, Mic, X, MessageSquare, User, Zap, ShieldCheck } from "lucide-react";

const API_BASE = "http://localhost:4000/api/messages";
const POLL_INTERVAL = 3000;

const MessageBubble = memo(({ msg }) => {
  const isUser = msg.sender === "user";
  const isAdmin = msg.sender === "admin";
  const isAI = msg.sender === "ai";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-4 animate-in fade-in slide-in-from-bottom-2`}>
      <div className={`flex gap-2 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-auto ${isUser ? "bg-slate-200" : isAI ? "bg-indigo-600" : "bg-emerald-600"}`}>
          {isUser ? <User size={12} className="text-slate-600" /> : isAI ? <Zap size={12} className="text-white" /> : <ShieldCheck size={12} className="text-white" />}
        </div>
        <div className={`px-4 py-2.5 text-[13px] shadow-sm ${isUser ? "bg-slate-900 text-white rounded-2xl rounded-tr-none" : "bg-white border rounded-2xl rounded-tl-none text-slate-700"}`}>
          {msg.text}
        </div>
      </div>
      <span className="text-[9px] text-slate-400 mt-1 px-8 uppercase font-bold tracking-widest">
        {isUser ? "You" : isAI ? "AI Assistant" : "Admin"} • {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
});

export default function ChatBot() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const mainRef = useRef(null);
  const token = localStorage.getItem("token");

  // --- 1. Bot හට කතා කිරීමේ හැකියාව (Text-to-Speech) ---
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // කලින් කතාවක් ඇත්නම් නවත්වන්න
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // භාෂාව සකසන්න
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const updateMessages = useCallback((newMsgs) => {
    if (!newMsgs) return;
    setMessages((prev) => {
      const combined = [...prev, ...newMsgs];
      const uniqueMap = new Map();
      combined.forEach((m) => {
        const id = m._id || m.tempId || m.createdAt;
        uniqueMap.set(id, m);
      });
      return Array.from(uniqueMap.values()).sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    });
  }, []);

  useLayoutEffect(() => {
    if (isOpen && mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  }, [messages.length, loading, isOpen]);

  const fetchMessages = useCallback(async () => {
    if (!token || !isOpen) return;
    try {
      const { data } = await axios.get(`${API_BASE}/getmessages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.messages) updateMessages(data.messages);
    } catch (err) { console.error("Polling Error:", err); }
  }, [isOpen, token, updateMessages]);

  useEffect(() => {
    if (!isOpen) return;
    fetchMessages();
    const interval = setInterval(fetchMessages, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isOpen, fetchMessages]);

  // --- 2. Voice Input හරහා එන විට Voice Answer ලබා දීම ---
  const sendMessage = async (text, viaVoice = false) => {
    const trimmedText = text?.trim();
    if (!trimmedText || loading) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMsg = { tempId, text: trimmedText, sender: "user", createdAt: new Date().toISOString() };

    setMessages((prev) => [...prev, optimisticMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE}/sendmessage`, { message: trimmedText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessages((prev) => prev.filter((m) => m.tempId !== tempId));
      
      if (data?.messages) {
        updateMessages(data.messages);
        
        // පණිවිඩය හඬින් (Voice) පැමිණියේ නම් පමණක් Bot හඬින් පිළිතුරු දෙයි
        if (viaVoice) {
          const botReply = data.messages.find(m => (m.sender === "ai" || m.sender === "admin") && m.text);
          if (botReply) speak(botReply.text);
        }
      }
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.tempId !== tempId));
      Swal.fire("Error", "Message send failed", "error");
    } finally { setLoading(false); }
  };

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const t = e.results[0][0].transcript;
      if (t) sendMessage(t, true); // true ලෙස යැවීමෙන් Voice Mode එක ක්‍රියාත්මක වේ
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      <button onClick={() => (token ? setIsOpen(!isOpen) : navigate("/login"))} className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isOpen ? "bg-white text-slate-900 border" : "bg-slate-900 text-white"}`}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[340px] h-[550px] bg-white rounded-[32px] flex flex-col shadow-2xl overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-4">
          <header className="p-5 bg-slate-900 text-white flex justify-between items-center">
            <h3 className="font-bold text-sm">Support Concierge</h3>
          </header>

          <main ref={mainRef} className="flex-1 p-4 overflow-y-auto bg-slate-50/50">
            {messages.map((m) => <MessageBubble key={m._id || m.tempId || m.createdAt} msg={m} />)}
            {loading && <div className="text-[10px] text-slate-400 animate-pulse px-4 italic">Processing...</div>}
          </main>

          <footer className="p-4 bg-white border-t">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input, false); }} className="flex items-center gap-2 bg-slate-100 rounded-2xl px-3 py-1">
              <button type="button" onClick={startVoiceInput} className={isListening ? "text-red-500 animate-pulse" : "text-slate-400"}><Mic size={18} /></button>
              <input className="flex-1 bg-transparent outline-none text-sm py-2" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type @admin to talk..." disabled={loading} />
              <button type="submit" disabled={!input.trim() || loading} className="text-slate-900 disabled:opacity-20"><Send size={18} /></button>
            </form>
          </footer>
        </div>
      )}
    </div>
  );
}



// total count of codes lines = 10978