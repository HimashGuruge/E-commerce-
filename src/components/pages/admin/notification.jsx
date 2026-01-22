import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import { 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send,
  Zap,
  RefreshCw,
  ChevronRight,
  Bell,
  Shield,
  Sparkles
} from "lucide-react";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/notifications`;

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const pollingRef = useRef(null);

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.isRead;
    if (activeFilter === 'archived') return n.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchNotifications = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/getNotifications`);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotifications(false);
  };

  useEffect(() => {
    fetchNotifications(true);
    pollingRef.current = setInterval(() => fetchNotifications(false), 5000);
    return () => clearInterval(pollingRef.current);
  }, [fetchNotifications]);

  // --- 1. REFINED MESSAGE BUBBLES ---
  const renderMessageHtml = (msg) => {
    const isAdmin = msg.sender === 'admin';
    return `
      <div style="display: flex; flex-direction: column; align-items: ${isAdmin ? 'flex-end' : 'flex-start'}; margin-bottom: 20px; width: 100%; animation: slideIn 0.3s ease-out;">
        <div style="
          max-width: 85%;
          padding: 14px 18px;
          font-size: 0.92rem;
          line-height: 1.5;
          border-radius: ${isAdmin ? '22px 22px 4px 22px' : '22px 22px 22px 4px'};
          background: ${isAdmin ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : '#ffffff'}; 
          color: ${isAdmin ? '#ffffff' : '#1e293b'};
          box-shadow: ${isAdmin ? '0 10px 15px -3px rgba(79, 70, 229, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'};
          border: ${isAdmin ? 'none' : '1px solid #e2e8f0'};
          font-weight: ${isAdmin ? '500' : '400'};
        ">
          ${msg.text}
        </div>
        <div style="font-size: 0.65rem; color: #94a3b8; margin-top: 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px; padding: 0 4px;">
          ${isAdmin ? 'You' : 'User'} • ${new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    `;
  };

  // --- 2. REFINED CHAT MODAL ---
  const openChatModal = async (notification) => {
    try {
      const { data: chatHistory } = await axios.get(`${API_BASE_URL}/getChat/${notification.userId}`);
      
      const renderBubble = (msg) => {
        const isAdmin = msg.sender === 'admin';
        return `
          <div style="display: flex; flex-direction: column; align-items: ${isAdmin ? 'flex-end' : 'flex-start'}; margin-bottom: 20px;">
            <div style="
              max-width: 80%;
              padding: 12px 16px;
              font-size: 0.9rem;
              line-height: 1.5;
              border-radius: ${isAdmin ? '20px 20px 4px 20px' : '20px 20px 20px 4px'};
              background: ${isAdmin ? '#4f46e5' : '#f1f5f9'}; 
              color: ${isAdmin ? '#ffffff' : '#334155'};
              box-shadow: ${isAdmin ? '0 4px 12px rgba(79, 70, 229, 0.25)' : 'none'};
            ">
              ${msg.text}
            </div>
            <span style="font-size: 0.65rem; color: #94a3b8; margin-top: 6px; font-weight: 500; margin-${isAdmin ? 'right' : 'left'}: 8px;">
              ${new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        `;
      };

      const chatHtml = chatHistory.map(msg => renderBubble(msg)).join('');

      Swal.fire({
        html: `
          <div style="display: flex; flex-direction: column; height: 600px; text-align: left; font-family: sans-serif;">
            
            <div style="padding: 24px; background: #ffffff; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="position: relative;">
                  <img src="${notification.userImage || 'https://ui-avatars.com/api/?name=' + notification.userId}" 
                       style="width: 44px; height: 44px; border-radius: 12px; object-fit: cover;">
                  <div style="position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px; background: #22c55e; border: 2px solid #fff; border-radius: 50%;"></div>
                </div>
                <div>
                  <h4 style="margin: 0; font-size: 1rem; font-weight: 700; color: #1e293b;">${notification.userName || 'Guest User'}</h4>
                  <p style="margin: 0; font-size: 0.75rem; color: #64748b;">Support Ticket: #${notification.userId.slice(-5).toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div id="chat-box" style="flex: 1; overflow-y: auto; padding: 24px; background: #ffffff; display: flex; flex-direction: column;">
              ${chatHtml || '<p style="text-align: center; color: #94a3b8; font-size: 0.8rem; margin-top: 50px;">Starting a new conversation...</p>'}
            </div>

            <div style="padding: 20px; background: #ffffff; border-top: 1px solid #f1f5f9;">
              <div style="display: flex; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 6px 6px 6px 16px; transition: border-color 0.2s;" id="input-wrap">
                <input id="inline-input" type="text" placeholder="Type a message..." 
                  style="flex: 1; border: none; background: transparent; outline: none; font-size: 0.9rem; color: #334155; padding: 8px 0;">
                <button id="inline-send-btn" style="background: #4f46e5; color: white; border: none; width: 38px; height: 38px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </div>

          </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: '500px',
        padding: '0',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-3xl shadow-2xl border-none',
          closeButton: 'bg-slate-100 rounded-full p-1'
        },
        didOpen: () => {
          const chatBox = document.getElementById('chat-box');
          const input = document.getElementById('inline-input');
          const btn = document.getElementById('inline-send-btn');
          const wrap = document.getElementById('input-wrap');

          chatBox.scrollTop = chatBox.scrollHeight;
          input.focus();

          input.onfocus = () => wrap.style.borderColor = '#4f46e5';
          input.onblur = () => wrap.style.borderColor = '#e2e8f0';

          const sendMessage = async () => {
            const message = input.value.trim();
            if (!message || btn.disabled) return;
            btn.disabled = true;
            try {
              await axios.post(`${API_BASE_URL}/reply/${notification.userId}`, { message });
              chatBox.insertAdjacentHTML('beforeend', renderBubble({ sender: 'admin', text: message, createdAt: new Date() }));
              input.value = '';
              chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
              fetchNotifications();
            } catch (err) { console.error(err); } 
            finally { btn.disabled = false; input.focus(); }
          };

          btn.onclick = sendMessage;
          input.onkeydown = (e) => { if (e.key === 'Enter') sendMessage(); };
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.post(`${API_BASE_URL}/markAllRead`);
      fetchNotifications(false);
    } catch (err) {
      console.error("Mark all read error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Support Hub</h1>
              <p className="text-slate-500 font-medium text-sm flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                System active and monitoring user requests
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button 
                onClick={handleRefresh}
                className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
              >
                <RefreshCw className={`w-5 h-5 text-slate-600 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button 
                onClick={markAllAsRead}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Mark All Read
              </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Tickets" value={notifications.length} icon={<MessageSquare className="text-blue-600" />} color="blue" />
          <StatCard title="Unread" value={unreadCount} icon={<Bell className="text-rose-600" />} color="rose" />
          <StatCard title="SLA Status" value="99.9%" icon={<Shield className="text-emerald-600" />} color="emerald" />
          <StatCard title="Avg Time" value="4m" icon={<Clock className="text-amber-600" />} color="amber" />
        </div>

        {/* Filter Section */}
        <div className="flex gap-2 mb-6">
          {['all', 'unread', 'archived'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeFilter === filter ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">
                  <th className="px-8 py-5">User Account</th>
                  <th className="px-8 py-5">Message Snippet</th>
                  <th className="px-8 py-5">Time Received</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr><td colSpan="4" className="py-20 text-center animate-pulse text-slate-400 font-bold uppercase text-xs tracking-widest">Initialising Secure Stream...</td></tr>
                ) : filteredNotifications.length === 0 ? (
                  <tr><td colSpan="4" className="py-20 text-center text-slate-300 italic">No messages match your filter.</td></tr>
                ) : (
                  filteredNotifications.map((n) => (
                    <tr key={n._id} className={`group transition-all ${!n.isRead ? "bg-indigo-50/30" : "hover:bg-slate-50/50"}`}>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-2xl overflow-hidden flex items-center justify-center transition-all ${!n.isRead ? 'ring-2 ring-indigo-600 ring-offset-2 shadow-lg shadow-indigo-100' : 'bg-slate-100'}`}>
                            {n.userImage ? (
                               <img src={n.userImage} alt="" className="w-full h-full object-cover" />
                            ) : (
                               <User className={`w-5 h-5 ${!n.isRead ? 'text-indigo-600' : 'text-slate-400'}`} />
                            )}
                          </div>
                          <div className="flex flex-col">
                             <span className="text-sm font-bold text-slate-800">{n.userName || "Unknown User"}</span>
                             <span className="font-mono text-[10px] font-bold text-slate-400">USR-{n.userId.slice(-6).toUpperCase()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className={`text-sm max-w-xs truncate ${!n.isRead ? 'font-bold text-slate-900' : 'text-slate-500 font-medium'}`}>{n.message}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">{new Date(n.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{new Date(n.updatedAt).toDateString()}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => openChatModal(n)}
                          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${!n.isRead ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600'}`}
                        >
                          OPEN CHAT
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = { blue: 'bg-blue-50 text-blue-600', rose: 'bg-rose-50 text-rose-600', emerald: 'bg-emerald-50 text-emerald-600', amber: 'bg-amber-50 text-amber-600' };
  return (
    <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm shadow-slate-200/50 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
    </div>
  );
}