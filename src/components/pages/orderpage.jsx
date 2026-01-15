import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Package,
  ShoppingBag,
  Calendar,
  X,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

// --- Constants ---
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// --- Sub-Component: Status Badge ---
const StatusBadge = ({ status }) => {
  const details = useMemo(() => {
    switch (status?.toLowerCase()) {
      case "pending":
        return { color: "bg-amber-50 text-amber-700 border-amber-100", icon: <Clock size={14} /> };
      case "delivered":
        return { color: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: <CheckCircle2 size={14} /> };
      case "processing":
        return { color: "bg-blue-50 text-blue-700 border-blue-100", icon: <Package size={14} /> };
      case "cancelled":
        return { color: "bg-rose-50 text-rose-700 border-rose-100", icon: <AlertCircle size={14} /> };
      default:
        return { color: "bg-slate-50 text-slate-700 border-slate-100", icon: <Truck size={14} /> };
    }
  }, [status]);

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[13px] font-bold ${details.color}`}>
      {details.icon}
      <span className="capitalize">{status || "Pending"}</span>
    </div>
  );
};

// --- Main Component ---
export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${BACKEND_URL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setOrders(data.orders || []);
    } catch (error) {
      console.error("Orders fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${BACKEND_URL}/api/payment/cancel/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        alert("Order cancelled successfully!");
        fetchOrders();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Could not cancel order.");
    }
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans selection:bg-blue-100">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100">
              <ShoppingBag size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Orders</h1>
              <p className="text-slate-500 font-medium">Manage and track your recent purchases</p>
            </div>
          </motion.div>
        </header>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 w-full bg-white rounded-2xl animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="grid gap-5">
            {orders.map((order, idx) => (
              <OrderCard 
                key={order._id} 
                order={order} 
                index={idx} 
                onOpen={openDetails} 
                onCancel={handleCancelOrder} 
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      <AnimatePresence>
        {showModal && selectedOrder && (
          <OrderDetailsModal order={selectedOrder} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Order Card Component ---
function OrderCard({ order, index, onOpen, onCancel }) {
  const firstItemImage = order.items[0]?.image || order.items[0]?.imageUrl;
  const [canCancel, setCanCancel] = useState(false);

  // වැදගත්ම කොටස: Card Payment ද නැද්ද කියලා මෙතනින් බලනවා
  const isCardPayment = order.paymentMethod?.toLowerCase() === "card" || 
                        order.paymentMethod?.toLowerCase() === "payhere";

  useEffect(() => {
    const checkCancelEligibility = () => {
      // 1. Card Payment එකක් නම් කිසිසේත්ම Cancel කරන්න බැහැ
      if (isCardPayment) {
        setCanCancel(false);
        return;
      }

      // 2. COD නම් විනාඩි 10ක් ඇතුළත සහ Status එක Pending නම් පමණක් Cancel කළ හැක
      const orderTime = new Date(order.createdAt).getTime();
      const currentTime = new Date().getTime();
      const diffInMinutes = (currentTime - orderTime) / (1000 * 60);

      if (diffInMinutes < 10 && order.status?.toLowerCase() === "pending") {
        setCanCancel(true);
      } else {
        setCanCancel(false);
      }
    };

    checkCancelEligibility();
    const timer = setInterval(checkCancelEligibility, 10000);
    return () => clearInterval(timer);
  }, [order.createdAt, order.status, isCardPayment]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      className="group bg-white p-5 rounded-3xl border border-slate-200/60 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300"
    >
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform">
            {firstItemImage ? (
              <img src={firstItemImage} alt="product" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400"><Package /></div>
            )}
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction ID</span>
            <h3 className="font-black text-slate-900 text-lg">#{order.orderId || order._id.slice(-8).toUpperCase()}</h3>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
            <StatusBadge status={order.status} />
            <span className="text-[10px] font-bold text-slate-400 uppercase">{order.paymentMethod}</span>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-50 flex flex-wrap justify-between items-end gap-4">
        <div className="flex gap-6">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
            <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5"><Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total</p>
            <p className="text-lg font-black text-blue-600">Rs. {order.totalAmount?.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* මෙතනදී condition එක පරීක්ෂා කරනවා */}
          {canCancel && (
            <button
              onClick={() => onCancel(order._id)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-600 hover:text-white transition-all active:scale-95"
            >
              <X size={14} /> Cancel Order
            </button>
          )}
          <button onClick={() => onOpen(order)} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95 flex items-center gap-2">
            Details <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Order Details Modal ---
function OrderDetailsModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/40" />
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white rounded-[2.5rem] max-w-lg w-full p-8 shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-900">Summary</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-all"><X size={20} /></button>
        </div>
        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <img src={item.image || item.imageUrl} className="w-14 h-14 rounded-xl object-cover bg-white" alt="" />
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                <p className="text-xs text-slate-500 font-bold">{item.qty} x Rs. {item.price.toLocaleString()}</p>
              </div>
              <p className="font-black text-slate-900">Rs. {(item.price * item.qty).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-blue-50 rounded-3xl flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-blue-600 font-bold uppercase text-[10px]">Grand Total</span>
            <span className="text-[10px] text-blue-400 font-bold">{order.paymentMethod?.toUpperCase()}</span>
          </div>
          <span className="text-3xl font-black text-blue-700">Rs. {order.totalAmount?.toLocaleString()}</span>
        </div>
      </motion.div>
    </div>
  );
}

// --- Empty State ---
function EmptyState() {
  return (
    <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100">
      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200"><ShoppingBag size={48} /></div>
      <h2 className="text-2xl font-black text-slate-900">No orders found</h2>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black">Shop Now <ArrowRight size={18} /></Link>
    </div>
  );
}