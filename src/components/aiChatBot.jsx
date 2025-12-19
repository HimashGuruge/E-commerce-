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

      // trigger notification if last message is from admin
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

  /* 🧠 UI */
  return (
    <>
      {showNotification && !open && (
        <div className="fixed top-4 right-6 bg-purple-600 text-white px-4 py-3 rounded-lg shadow-xl z-50">
          🔔 New message from admin
        </div>
      )}

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
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white text-2xl shadow-xl"
        >
          🤖
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col">
          <div className="bg-blue-600 text-white px-5 py-4 flex justify-between">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m._id}
                className={`mb-2 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg text-sm ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white"
                      : m.sender === "admin"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {aiTypingMessage && (
              <div className="bg-gray-200 px-4 py-2 rounded-lg text-sm">{aiTypingMessage}</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t flex gap-2">
            <button onClick={handleVoice}>{listening ? "⏹" : "🎤"}</button>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendHandle()}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Type a message..."
            />
            <button onClick={() => sendHandle()} className="bg-blue-600 text-white px-4 rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
