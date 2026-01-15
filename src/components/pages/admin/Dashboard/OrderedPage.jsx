import React, { useEffect, useState, useCallback } from "react";
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
   * සියලුම ඇණවුම් ලබා ගැනීම
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

      setOrders(response.data.orders || []);
    } catch (err) {
      console.error("Order Fetch Error:", err);
      setError("ඇණවුම් ලබා ගැනීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.");
    } finally {
      setLoading(false);
    }
  };




  const fetchCustomerDetails = async (userId) => {
    if (!userId || userInfo[userId]) return;

    try {
      setLoadingUserId(userId);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Backend එකෙන් එන data structure එක අනුව මෙතන ගැලපිය යුතුයි
      const data = response.data.user || response.data;

      console.log(data)

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
   * Order Status එක Update කිරීම
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
      alert("තත්වය යාවත්කාලීන කිරීම අසාර්ථකයි.");
    } finally {
      setUpdatingId(null);
    }
  };

  /**
   * Row එක Click කළ විට ක්‍රියාත්මක වන Function එක
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

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse">
        Orders පූරණය වෙමින් පවතී...
      </div>
    );
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Admin Orders Center
        </h2>
        <button
          onClick={loadAllOrders}
          className="text-sm bg-white border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Order ID</th>
              <th className="p-4 font-semibold text-gray-600">Customer</th>
              <th className="p-4 font-semibold text-gray-600">Total (Rs.)</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
              <th className="p-4 font-semibold text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr
                  onClick={() => onRowClick(order)}
                  className={`cursor-pointer transition-colors hover:bg-blue-50/30 ${
                    expandedOrderId === order._id ? "bg-blue-50/50" : ""
                  }`}
                >
                  <td className="p-4 font-medium text-blue-600">
                    #{order.orderId}
                  </td>
                  <td className="p-4">{order.userId?.name || "නමක් නොමැත"}</td>
                  <td className="p-4 font-bold text-gray-700">
                    {order.totalAmount?.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        handleStatusUpdate(order._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>

                {/* Expanded Details Row */}
                {expandedOrderId === order._id && (
                  <tr className="bg-gray-50/50">
                    <td colSpan="6" className="p-6 border-l-4 border-blue-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2 underline">
                            Customer Details
                          </h4>
                          {loadingUserId === order.userId?._id ? (
                            <p className="text-sm italic text-gray-500">
                              විස්තර ලබා ගනිමින් පවතී...
                            </p>
                          ) : userInfo[order.userId?._id] ? (
                            <div className="space-y-1 text-sm text-gray-700">
                              <p>
                                <span className="font-semibold">Email:</span>{" "}
                                {userInfo[order.userId._id].email}
                              </p>
                              <p>
                                <span className="font-semibold">Phone:</span>{" "}
                                {userInfo[order.userId._id].phone ||
                                  "ලබා දී නැත"}
                              </p>
                              <p className="mt-2">
                                <span className="font-semibold">Address:</span>
                                <br />
                                {userInfo[order.userId._id].address ||
                                  (userInfo[order.userId._id].shippingAddress
                                    ? `${
                                        userInfo[order.userId._id]
                                          .shippingAddress.addressLine1
                                      }, ${
                                        userInfo[order.userId._id]
                                          .shippingAddress.city
                                      }`
                                    : "ලිපිනයක් නොමැත")}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-red-400">
                              විස්තර පෙන්වීමට නොහැකිය.
                            </p>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2 underline">
                            Order Summary
                          </h4>
                          <div className="text-sm space-y-1">
                            <p>
                              <span className="font-semibold">Payment:</span>{" "}
                              {order.paymentMethod}
                            </p>
                            <p>
                              <span className="font-semibold">Paid:</span>{" "}
                              {order.isPaid ? "✅ Yes" : "❌ No"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
