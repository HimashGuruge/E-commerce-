import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Send, Mic, MicOff, X, Volume2, VolumeX, Paperclip, Smile } from "lucide-react";

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
  const chatContainerRef = useRef(null);

  /* 📥 Fetch messages */
  const fetchMessages = async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) return setMessages([]);

    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/api/messages/getMessages",
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

  /* 🔔 Enhanced Notifications */
  const triggerAdminNotification = () => {
    setAdminMessageCount((p) => p + 1);
    setShowNotification(true);
    notificationSoundRef.current?.play().catch(() => {});
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
      if (showNotification) {
        setShowNotification(false);
      }
    }, 8000);
  };

  const closeNotification = () => {
    setShowNotification(false);
    setAdminMessageCount(0);
  };

  /* 🎙 Voice controls */
  const handleVoice = () => {
    if (!recognition.current) return;
    if (listening) {
      recognition.current.stop();
    } else {
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

  const toggleSpeech = () => {
    if (speaking) {
      stopSpeaking();
    } else if (messages.length > 0) {
      const lastAiMessage = [...messages].reverse().find(m => m.sender === 'ai');
      if (lastAiMessage) {
        speakText(lastAiMessage.text);
      }
    }
  };

  /* 🤖 AI reply */
  const fetchAiReply = async (userText) => {
    try {
      setIsTyping(true);
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL+"//api/admin/reply",
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
        import.meta.env.VITE_BACKEND_URL+"/api/admin/message",
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
      import.meta.env.VITE_BACKEND_URL+"/api/messages/sendMessages",
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

  /* 💬 Quick suggestions */
  const quickSuggestions = [
    "Hello! 👋",
    "How can you help me?",
    "What can you do?",
    "Tell me about features"
  ];

  const handleQuickSuggestion = (text) => {
    setInput(text);
  };

  return (
    <>
      <audio ref={notificationSoundRef} src="/notification.mp3" preload="auto" />

      {/* Enhanced Notification */}
      {showNotification && !open && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className="relative group">
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/30 flex items-center gap-3 font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  🔔
                </div>
                {adminMessageCount > 1 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                    {adminMessageCount}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold">New message from admin</p>
                <p className="text-white/80 text-sm">Click to open chat</p>
              </div>
              <button
                onClick={closeNotification}
                className="text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <X size={18} />
              </button>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rotate-45 rounded-sm"></div>
          </div>
        </div>
      )}

      {/* Enhanced Floating Button */}
      {!open && (
        <button
          onClick={() => {
            if (!token) {
              Swal.fire({
                icon: "warning",
                title: "Not Logged In",
                text: "Please log in first",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#3b82f6',
              });
              return;
            }
            setOpen(true);
            closeNotification();
          }}
          className="fixed bottom-8 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 flex flex-col items-center justify-center z-40 hover:scale-110 active:scale-95 group animate-float"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <div className="text-3xl">🤖</div>
            {showNotification && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            )}
          </div>
          <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
            AI Assistant
          </span>
        </button>
      )}

      {/* Enhanced Chat Window */}
      {open && (
        <div 
          ref={chatContainerRef}
          className="fixed bottom-8 right-8 w-[420px] h-[600px] rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border border-white/20 shadow-2xl flex flex-col z-40 transition-all duration-300"
        >
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-5 flex justify-between items-center border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="text-xl">🤖</div>
              </div>
              <div>
                <h2 className="font-bold text-lg">AI Assistant</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/80">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSpeech}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title={speaking ? "Stop speech" : "Read last message"}
              >
                {speaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Enhanced Messages Area */}
          <div className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-transparent to-gray-900/50">
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m._id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} animate-slide-in`}
                >
                  <div className={`flex flex-col max-w-[85%] ${m.sender === "user" ? "items-end" : "items-start"}`}>
                    {/* Sender Badge */}
                    {m.sender !== "user" && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 ${
                          m.sender === "ai"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        }`}>
                          {m.sender === "ai" ? "🤖 AI Assistant" : "👨‍💼 Admin"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div className={`relative px-5 py-3 rounded-2xl text-sm font-medium backdrop-blur-sm ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none shadow-lg"
                        : m.sender === "admin"
                        ? "bg-gradient-to-r from-purple-500/20 to-fuchsia-600/20 text-white border border-purple-500/30 rounded-bl-none"
                        : "bg-white/10 text-gray-200 border border-white/20 rounded-tl-none"
                    }`}>
                      {m.text}
                      {/* Message tail */}
                      <div className={`absolute top-0 w-3 h-3 ${
                        m.sender === "user"
                          ? "-right-3 bg-blue-500"
                          : m.sender === "admin"
                          ? "-left-3 bg-purple-500/20 border-l border-t border-purple-500/30"
                          : "-left-3 bg-white/10 border-l border-t border-white/20"
                      }`} style={{
                        clipPath: m.sender === "user" 
                          ? 'polygon(0 0, 100% 0, 0 100%)'
                          : 'polygon(100% 0, 100% 100%, 0 0)'
                      }}></div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Enhanced Typing Indicator */}
              {aiTypingMessage ? (
                <div className="flex justify-start animate-slide-in">
                  <div className="flex flex-col max-w-[85%]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        🤖 AI Assistant
                      </span>
                    </div>
                    <div className="px-5 py-3 bg-white/10 text-gray-200 backdrop-blur-sm border border-white/20 rounded-2xl rounded-tl-none text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                        </div>
                        <span className="text-blue-300">Typing...</span>
                      </div>
                      <div className="mt-2 text-gray-300">{aiTypingMessage}</div>
                    </div>
                  </div>
                </div>
              ) : isTyping ? (
                <div className="flex justify-start">
                  <div className="px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl rounded-tl-none">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                      </div>
                      <span className="text-sm text-blue-300 font-medium">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Quick Suggestions */}
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <div className="text-2xl">✨</div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Welcome to AI Assistant!</h3>
                  <p className="text-gray-400 text-sm mb-4">How can I help you today?</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickSuggestion(suggestion)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 transition-all hover:scale-105"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Enhanced Input Area */}
          <div className="p-4 border-t border-white/10 bg-gradient-to-t from-gray-900 to-transparent">
            <div className="flex gap-3 items-end">
              <button
                onClick={handleVoice}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  listening
                    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse shadow-lg"
                    : "bg-white/10 hover:bg-white/20 text-gray-300 hover:scale-105"
                }`}
                aria-label={listening ? "Stop listening" : "Start voice input"}
              >
                {listening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Smile size={20} className="text-gray-500" />
                </div>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendHandle()}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-12 py-3.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm transition-all"
                  placeholder="Type your message here..."
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Paperclip size={20} className="text-gray-500 hover:text-gray-400 cursor-pointer" />
                </div>
              </div>
              
              <button
                onClick={() => sendHandle()}
                disabled={!input.trim()}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  input.trim()
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:scale-105"
                    : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send size={20} />
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              <span className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Press Enter to send • Use @admin to contact support
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Custom Styles */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
}