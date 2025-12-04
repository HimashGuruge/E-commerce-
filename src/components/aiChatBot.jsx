// File: components/ChatbotButton.jsx
import React from "react";

export default function ChatbotButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
    >
      💬 Chatbot
    </button>
  );
}
