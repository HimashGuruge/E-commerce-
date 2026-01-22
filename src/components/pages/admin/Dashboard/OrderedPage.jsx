import React, { useEffect, useState } from "react";
import axios from "axios";

// Constants
const STATUS_OPTIONS = ["Pending", "Confirmed", "Delivered", "Cancelled"];
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminOrdersCenter() {
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Status states
  const [loading, setLoading] = useState(true);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  // Initial Data Fetch
  useEffect(() => {
    loadAllOrders();
  }, []);

  /**
   * Fetch all orders from the server
   */
  const loadAllOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/api/orders/userplace/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Sort orders (Newest first)
      const sortedOrders = (response.data.orders || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Order Fetch Error:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch specific customer details
   */
  const fetchCustomerDetails = async (userId) => {
    if (!userId || userInfo[userId]) return;

    try {
      setLoadingUserId(userId);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data.user || response.data;

      setUserInfo((prev) => ({
        ...prev,
        [userId]: data,
      }));
    } catch (err) {
      console.error("User Fetch Error:", err);
    } finally {
      setLoadingUserId(null);
    }
  };

  /**
   * Update the order status
   */
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_BASE_URL}/api/orders/admin/getplaceorders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      alert("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  /**
   * Handle Row Click Expansion
   */
  const onRowClick = (order) => {
    const userId = order.userId?._id;

    if (expandedOrderId === order._id) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(order._id);
      fetchCustomerDetails(userId);
    }
  };

  // --- Logic Helpers ---

  // 1. Calculate Pending Orders Count
  const pendingCount = orders.filter((order) => order.status === "Pending").length;

  // 2. Check if the order was placed today
  const isToday = (dateString) => {
    const orderDate = new Date(dateString).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Loading orders, please wait...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center text-red-500">
        <span className="text-4xl mb-2">⚠️</span>
        <p>{error}</p>
        <button onClick={loadAllOrders} className="mt-4 text-blue-500 font-bold hover:underline">
          Try Again
        </button>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">Admin Orders Center</h2>
          
          {/* --- Notification Badge --- */}
          {pendingCount > 0 && (
            <span className="flex items-center justify-center bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-bounce shadow-lg shadow-red-200">
              {pendingCount} NEW PENDING
            </span>
          )}
        </div>

        <button
          onClick={loadAllOrders}
          className="flex items-center gap-2 text-sm bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-all font-semibold text-gray-700"
        >
          <span className={loading ? "animate-spin" : ""}>🔄</span> Refresh Dashboard
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Order ID</th>
                <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Customer</th>
                <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Total (Rs.)</th>
                <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Update Status</th>
                <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Date Placed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => {
                // Determine if it's a "New" order (Today + Pending)
                const isNew = isToday(order.createdAt) && order.status === "Pending";

                return (
                  <React.Fragment key={order._id}>
                    <tr
                      onClick={() => onRowClick(order)}
                      className={`cursor-pointer transition-all duration-300 hover:bg-blue-50/30 ${
                        expandedOrderId === order._id ? "bg-blue-50/50" : ""
                      } ${isNew ? "bg-yellow-50/60 border-l-4 border-l-yellow-400" : ""}`}
                    >
                      <td className="p-4 font-bold text-blue-600 relative">
                        {isNew && (
                          <span className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-ping"></span>
                        )}
                        #{order.orderId || order._id.slice(-6)}
                      </td>
                      <td className="p-4 font-medium text-gray-700">
                        {order.userId?.name || "Anonymous User"}
                      </td>
                      <td className="p-4 font-black text-gray-800">
                        {order.totalAmount?.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : isNew
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-200 animate-pulse"
                              : "bg-orange-100 text-orange-700 border border-orange-200"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-400 transition-all cursor-pointer"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 text-xs text-gray-400 font-medium">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedOrderId === order._id && (
                      <tr className="bg-gray-50/50">
                        <td colSpan="6" className="p-8 border-l-4 border-blue-500 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Customer Info Section */}
                            <div>
                              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                                Customer Contact Details
                              </h4>
                              {loadingUserId === order.userId?._id ? (
                                <div className="flex items-center gap-2 text-gray-400 italic text-sm">
                                  <div className="w-3 h-3 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                                  Fetching details...
                                </div>
                              ) : userInfo[order.userId?._id] ? (
                                <div className="space-y-3">
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-bold">EMAIL ADDRESS</span>
                                    <span className="text-sm text-gray-700 font-semibold">{userInfo[order.userId._id].email}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-bold">PHONE NUMBER</span>
                                    <span className="text-sm text-gray-700 font-semibold">{userInfo[order.userId._id].phone || "Not Provided"}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-bold">SHIPPING ADDRESS</span>
                                    <span className="text-sm text-gray-700 font-semibold leading-relaxed">
                                      {userInfo[order.userId._id].address || 
                                       (userInfo[order.userId._id].shippingAddress ? 
                                        `${userInfo[order.userId._id].shippingAddress.addressLine1}, ${userInfo[order.userId._id].shippingAddress.city}` : 
                                        "No address on file")}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-sm text-red-400">Details unavailable.</p>
                              )}
                            </div>

                            {/* Payment Section */}
                            <div>
                              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                                Order & Payment Summary
                              </h4>
                              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500 font-medium">Payment Method</span>
                                  <span className="text-xs font-bold text-gray-700 uppercase">{order.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500 font-medium">Payment Status</span>
                                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${order.isPaid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {order.isPaid ? "PAID" : "UNPAID"}
                                  </span>
                                </div>
                                <div className="pt-2 mt-2 border-t border-gray-50 flex justify-between items-center">
                                  <span className="text-sm text-gray-800 font-bold">Grand Total</span>
                                  <span className="text-sm text-blue-600 font-black">Rs. {order.totalAmount?.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="p-20 text-center text-gray-400 font-medium">
              No orders have been placed yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}