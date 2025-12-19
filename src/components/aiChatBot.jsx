import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AiChatbot() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [aiTypingMessage, setAiTypingMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [adminMessageCount, setAdminMessageCount] = useState(0);

  const messagesEndRef = useRef(null);
  const recognition = useRef(null);
  const inputRef = useRef(null);
  const notificationSoundRef = useRef(null);

  /* 📥 Fetch messages */
  const fetchMessages = async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) return setMessages([]);

    try {
      const res = await axios.get(
        "http://localhost:4000/api/messages/getMessages",
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );

      const fetchedMessages = res.data.messages || [];
      setMessages(fetchedMessages);

      const lastMsg = fetchedMessages.at(-1);
      if (lastMsg?.sender === "admin" && !open) {
        triggerAdminNotification();
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  /* 🔐 Auth listeners */
  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem("token"));
      fetchMessages();
    };
    const handleLogout = () => {
      setMessages([]);
      setToken(null);
    };

    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("logout", handleLogout);

    fetchMessages();

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("logout", handleLogout);
    };
  }, [open]);

  /* 🎤 Speech recognition */
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
    recognition.current.continuous = false;
    recognition.current.lang = "en-US";

    recognition.current.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      stopSpeaking();
      sendHandle(transcript, true);
    };

    recognition.current.onend = () => setListening(false);
  }, []);

  /* ⬇ Auto scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTypingMessage]);

  /* 🎯 Focus input */
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [open]);

  /* 🔔 Notifications */
  const triggerAdminNotification = () => {
    setAdminMessageCount((p) => p + 1);
    setShowNotification(true);
    notificationSoundRef.current?.play().catch(() => {});
    setTimeout(() => setShowNotification(false), 5000);
  };

  const closeNotification = () => {
    setShowNotification(false);
    setAdminMessageCount(0);
  };

  /* 🎙 Voice controls */
  const handleVoice = () => {
    if (!recognition.current) return;
    if (listening) recognition.current.stop();
    else {
      recognition.current.start();
      stopSpeaking();
    }
    setListening(!listening);
  };

  /* 🔊 Speech synthesis */
  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;

    speechSynthesis.cancel();
    setSpeaking(true);

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    utter.pitch = 1.1;
    utter.volume = 1;

    const setVoice = () => {
      const voices = speechSynthesis.getVoices();
      const female =
        voices.find(
          (v) => v.lang.startsWith("en") && /female|zira|aria|susan|woman/i.test(v.name)
        ) || voices.find((v) => v.lang.startsWith("en"));
      if (female) utter.voice = female;
      speechSynthesis.speak(utter);
    };

    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    if (speechSynthesis.getVoices().length === 0) speechSynthesis.onvoiceschanged = setVoice;
    else setVoice();
  };

  const stopSpeaking = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  /* 🤖 AI reply */
  const fetchAiReply = async (userText) => {
    try {
      setIsTyping(true);
      const res = await axios.post(
        "http://localhost:4000/api/admin/reply",
        { query: userText },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setIsTyping(false);
      return res.data.reply || "No response from AI.";
    } catch {
      setIsTyping(false);
      return "Sorry, I couldn't find an answer.";
    }
  };

  /* ⌨ Typing animation */
  const typeAiMessage = (fullText) => {
    setAiTypingMessage("");
    let i = 0;
    const interval = setInterval(() => {
      setAiTypingMessage((p) => p + fullText[i]);
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 30);
  };

  /* 📤 Send message */
  const sendHandle = async (voiceInput = null, isVoice = false) => {
    const text = voiceInput || input;
    if (!text.trim()) return;

    const isAdmin = text.toLowerCase().includes("@admin");
    const adminText = isAdmin ? text.split("@admin")[1]?.trim() : null;

    if (isAdmin && !adminText) {
      const warn = {
        _id: Date.now(),
        sender: "ai",
        text: "⚠️ Please type a message after @admin.",
        timestamp: new Date(),
      };
      setMessages((p) => [...p, warn]);
      if (isVoice) speakText(warn.text);
      return;
    }

    const userMsg = {
      _id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((p) => [...p, userMsg]);
    setInput("");

    if (isAdmin) {
      await axios.post(
        "http://localhost:4000/api/admin/message",
        { message: adminText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const confirm = {
        _id: Date.now() + 1,
        sender: "ai",
        text: "✅ Your message has been sent to the admin.",
        timestamp: new Date(),
      };
      setMessages((p) => [...p, confirm]);
      if (isVoice) speakText(confirm.text);
      return;
    }

    // Send user message to backend
    await axios.post(
      "http://localhost:4000/api/messages/sendMessages",
      { text, sender: "user" },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    // Get AI reply
    const aiText = await fetchAiReply(text);
    typeAiMessage(aiText);
    if (isVoice) speakText(aiText);

    setTimeout(() => {
      setMessages((p) => [
        ...p,
        {
          _id: Date.now() + 2,
          sender: "ai",
          text: aiText,
          timestamp: new Date(),
        },
      ]);
      setAiTypingMessage("");
    }, aiText.length * 30 + 50);
  };

  return (
    <>
      {/* Hidden audio element for notification sound (optional) */}
      <audio ref={notificationSoundRef} src="/notification.mp3" preload="auto" />

      {/* Notification Badge - Glassmorphism */}
      {showNotification && !open && (
        <div className="fixed top-4 right-6 z-50 animate-bounce">
          <div className="relative">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-2 font-medium">
              🔔 New message from admin
              {adminMessageCount > 1 && (
                <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {adminMessageCount}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Button - Glassmorphism Inspired */}
      {!open && (
        <button
          onClick={() => {
            if (!token) {
              Swal.fire({
                icon: "warning",
                title: "Not Logged In",
                text: "Please log in first",
              });
              return;
            }
            setOpen(true);
            closeNotification();
          }}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-40 hover:scale-105 active:scale-95"
          aria-label="Open AI Assistant"
        >
          🤖
        </button>
      )}

      {/* Chat Window - Full Glass Effect */}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[550px] rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl flex flex-col z-40">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-4 flex justify-between items-center">
            <span className="font-semibold">AI Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200 text-xl w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/10 transition"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-white/5 backdrop-blur-sm">
            {messages.map((m) => (
              <div
                key={m._id}
                className={`mb-3 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm font-medium ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md"
                      : m.sender === "admin"
                      ? "bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-bl-md"
                      : "bg-white/20 text-gray-800 backdrop-blur-sm border border-white/30 rounded-tl-md"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {aiTypingMessage ? (
              <div className="flex justify-start mb-3">
                <div className="px-4 py-2.5 bg-white/20 text-gray-800 backdrop-blur-sm border border-white/30 rounded-2xl rounded-tl-md text-sm">
                  {aiTypingMessage}
                </div>
              </div>
            ) : isTyping ? (
              <div className="flex justify-start mb-3">
                <div className="px-4 py-2.5 bg-white/20 text-gray-500 backdrop-blur-sm border border-white/30 rounded-2xl rounded-tl-md">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/20 bg-white/5 backdrop-blur">
            <div className="flex gap-2 items-center">
              <button
                onClick={handleVoice}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  listening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-white/20 hover:bg-white/30 text-gray-700"
                }`}
                aria-label={listening ? "Stop listening" : "Start voice input"}
              >
                {listening ? "⏹" : "🎤"}
              </button>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendHandle()}
                className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                placeholder="Type a message..."
              />
              <button
                onClick={() => sendHandle()}
                disabled={!input.trim()}
                className={`px-4 py-2.5 rounded-xl font-medium transition ${
                  input.trim()
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90"
                    : "bg-gray-300/50 text-gray-500 cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for Glass & Animation (in case Tailwind doesn't cover everything) */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}