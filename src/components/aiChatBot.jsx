import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
  memo,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

/* =====================
   Constants
===================== */
const API_BASE = "http://localhost:4000/api/messages";
const POLL_INTERVAL = 3000;

/* =====================
   Message Bubble Component
===================== */
const MessageBubble = memo(({ msg }) => {
  const isUser = msg.sender === "user";
  const isAdmin = msg.sender === "admin";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-3 animate-in fade-in slide-in-from-bottom-1`}>
      <div className={`max-w-[85%] px-4 py-2.5 text-sm shadow-sm ${isUser ? "bg-slate-900 text-white rounded-t-2xl rounded-bl-2xl" : "bg-white border rounded-t-2xl rounded-br-2xl text-slate-700"}`}>
        {msg.text}
      </div>
      <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">
        {isUser ? "You" : isAdmin ? "Admin" : "AI"}
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
  const [voiceMode, setVoiceMode] = useState(false);

  const mainRef = useRef(null);
  const token = localStorage.getItem("token");

  useLayoutEffect(() => {
    if (isOpen && mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  }, [messages.length, loading, isOpen]);

  /* =====================
      2. Text-to-Speech (With Auto-Reset)
  ===================== */
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); 

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    // AI කතා කර අවසන් වූ පසු ස්වයංක්‍රීයව voiceMode එක Off කරයි
    utterance.onend = () => {
      setVoiceMode(false);
    };

    // Error එකක් වුවහොත් (උදා: voice block වුවහොත්) voiceMode එක Off කරයි
    utterance.onerror = () => {
      setVoiceMode(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const fetchMessages = useCallback(async (endpoint) => {
    if (!token || !isOpen) return;
    try {
      const { data } = await axios.get(`${API_BASE}/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!data?.messages?.length) return;
      setMessages((prev) => {
        const newItems = data.messages.filter(m => !prev.some(p => p._id === m._id));
        if (newItems.length === 0) return prev;
        const combined = [...prev, ...newItems];
        return combined.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      });
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, [isOpen, token]);

  useEffect(() => {
    if (!isOpen) return;
    fetchMessages("getmessages");
    const interval = setInterval(() => fetchMessages("getadminreplies"), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isOpen, fetchMessages]);

  useEffect(() => {
    if (voiceMode && messages.length > 0) {
      const latest = messages[messages.length - 1];
      if (latest.sender === "ai") {
        speak(latest.text);
      }
    }
  }, [messages, voiceMode, speak]);

  const sendMessage = async (text, viaVoice = false) => {
    const trimmedText = text?.trim();
    if (!trimmedText || loading) return;

    // Mic එකෙන් එවන විට පමණක් voiceMode activate වේ
    setVoiceMode(viaVoice);
    if (!viaVoice) window.speechSynthesis.cancel();

    const tempId = Date.now().toString();
    const optimisticMsg = {
      _id: tempId,
      text: trimmedText,
      sender: "user",
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE}/sendmessage`, { message: trimmedText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data?.messages) {
        setMessages((prev) => {
          const filtered = prev.filter(m => m._id !== tempId);
          const combined = [...filtered, ...data.messages];
          return combined.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });
      }
    } catch {
      setMessages((prev) => prev.filter(m => m._id !== tempId));
      setVoiceMode(false);
      Swal.fire("Error", "Failed to send message", "error");
    } finally {
      setLoading(false);
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const t = e.results[0][0].transcript.trim();
      if (t) sendMessage(t, true);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      <button 
        onClick={() => (token ? setIsOpen(!isOpen) : navigate("/login"))} 
        className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center text-lg hover:scale-105 active:scale-95 transition-all"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[340px] h-[550px] bg-white rounded-[30px] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
          <header className="p-5 bg-slate-900 text-white flex justify-between items-center shrink-0">
            <div className="flex flex-col">
              <h3 className="font-bold text-sm">Customer Support</h3>
              {isListening ? (
                <span className="text-[9px] text-green-400 font-bold tracking-widest animate-pulse">
                  ● LISTENING...
                </span>
              ) : voiceMode ? (
                <span className="text-[9px] text-blue-400 font-bold tracking-widest animate-pulse">
                  ● AI SPEAKING...
                </span>
              ) : null}
            </div>
            {voiceMode && (
              <button 
                onClick={() => { setVoiceMode(false); window.speechSynthesis.cancel(); }}
                className="text-[10px] bg-red-500/20 hover:bg-red-500 border border-red-500/50 px-2 py-1 rounded-md transition-all"
              >
                Stop
              </button>
            )}
          </header>

          <main ref={mainRef} className="flex-1 p-4 overflow-y-auto bg-slate-50">
            {messages.map((m) => (
              <MessageBubble key={m._id} msg={m} />
            ))}
            {loading && (
              <div className="flex justify-start mb-3">
                <p className="text-[10px] italic text-slate-400 bg-white border rounded-t-2xl rounded-br-2xl px-3 py-1 animate-pulse">Typing...</p>
              </div>
            )}
          </main>

          <footer className="p-3 border-t bg-white shrink-0">
            <form 
              onSubmit={(e) => { e.preventDefault(); sendMessage(input, false); }} 
              className="flex items-center gap-2 bg-slate-100 rounded-2xl px-3"
            >
              <button 
                type="button" 
                onClick={startVoiceInput} 
                className={`text-lg transition-all ${isListening ? "text-red-500 scale-125" : "text-slate-500 hover:text-slate-700"}`} 
                disabled={isListening}
              >
                🎤
              </button>
              <input 
                className="flex-1 bg-transparent outline-none text-sm py-2 text-slate-700" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder={isListening ? "Listening..." : "Type a message..."} 
                disabled={isListening || loading} 
              />
              <button 
                type="submit" 
                disabled={!input.trim() || loading || isListening} 
                className="text-lg text-slate-900 opacity-70 hover:opacity-100 disabled:opacity-20"
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