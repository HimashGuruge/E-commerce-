import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Package,
  ArrowLeft,
  Search,
  Eye,
  MoreVertical,
  Calendar,
  User,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Filter,
  Download,
  ChevronDown,
  ShoppingBag,
  CreditCard,
  RefreshCw,
  Truck
} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

export default function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId: pathOrderId } = useParams();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // 1. URL Logic: Pretty URL Update සහ පේමන්ට් Alerts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const statusCode = queryParams.get("status_code");
    const queryOrderId = queryParams.get("order_id");

    // ✨ Pretty URL Redirect: 
    // ?order_id=123 ලෙස එන එක /orders/123 ලෙස පිරිසිදු කරයි
    if (queryOrderId && !pathOrderId) {
      navigate(`/orders/${queryOrderId}${location.search}`, { replace: true });
      return;
    }


    console.log(queryOrderId)

    // ✨ පේමන්ට් එකෙන් පසු එන Status පරීක්ෂාව
    if (statusCode) {
      if (statusCode === "2") {
        localStorage.removeItem("cart");
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `ඔබගේ ඇණවුම (${queryOrderId || pathOrderId}) සාර්ථකයි.`,
          timer: 3000,
          showConfirmButton: false,
        });
      } else if (statusCode === "-1") {
        Swal.fire({ icon: "info", title: "Payment Canceled", text: "ඔබ පේමන්ට් එක අවලංගු කළා." });
      } else if (statusCode === "-2") {
        Swal.fire({ icon: "error", title: "Payment Failed", text: "පේමන්ට් එක අසාර්ථක විය." });
      }

      // Alert එකෙන් පසු URL එකේ ඇති Query Params සම්පූර්ණයෙන්ම අයින් කර Pretty URL එක ඉතිරි කරයි
      const cleanUrl = pathOrderId ? `/orders/${pathOrderId}` : "/orders";
      window.history.replaceState({}, document.title, cleanUrl);
    }

    fetchOrders();
  }, [location.search, pathOrderId, navigate]);

  // 2. දත්ත ලබා ගැනීම (Fetch Orders)
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      const res = await axios.get(
        "http://localhost:4000/api/orders/my-orders",
        { headers: getAuthHeader() }
      );

      if (res.data.success) {
        // Transform your existing order data to match table structure
        const transformedOrders = res.data.orders.map(order => ({
          ...order,
          // Map your existing data to table fields
          user: "You", // Since these are user's own orders
          project: order.items?.[0]?.name || "Shopping Order",
          address: order.shippingAddress || "Not specified",
          date: formatTimeAgo(order.createdAt),
          status: mapStatus(order.status)
        }));
        
        setOrders(transformedOrders);
        setFilteredOrders(transformedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire("Error", "දත්ත ලබා ගැනීම අසාර්ථකයි.", "error");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Map your existing status to table status
  const mapStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "In Progress";
      case "confirmed": return "Approved";
      case "delivered": return "Complete";
      case "cancelled": return "Rejected";
      default: return "Pending";
    }
  };

  // 3. Filtering Logic (Search & Status)
  useEffect(() => {
    let result = orders;
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status?.toLowerCase() === statusFilter.toLowerCase());
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderId?.toLowerCase().includes(term) ||
          o.user?.toLowerCase().includes(term) ||
          o.project?.toLowerCase().includes(term) ||
          o.address?.toLowerCase().includes(term)
      );
    }
    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter]);

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "in progress":
      case "pending":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: <Clock className="h-3 w-3" />,
          dot: "bg-blue-500"
        };
      case "complete":
      case "delivered":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: <CheckCircle className="h-3 w-3" />,
          dot: "bg-emerald-500"
        };
      case "approved":
      case "confirmed":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          icon: <CheckCircle className="h-3 w-3" />,
          dot: "bg-green-500"
        };
      case "rejected":
      case "cancelled":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          icon: <XCircle className="h-3 w-3" />,
          dot: "bg-red-500"
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: <AlertCircle className="h-3 w-3" />,
          dot: "bg-gray-500"
        };
    }
  };

  const StatusBadge = ({ status }) => {
    const config = getStatusConfig(status);
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${config.bg} ${config.border} border ${config.text} text-xs font-medium`}>
        <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`}></span>
        {status}
      </div>
    );
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-10 w-10 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order List</h1>
              <p className="text-gray-500 mt-1">Track and manage all your orders</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Shop
              </button>
              <button
                onClick={fetchOrders}
                className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by Order ID, item name, or user..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <div className="col-span-2">Order ID</div>
            <div className="col-span-2">User</div>
            <div className="col-span-2">Project/Items</div>
            <div className="col-span-3">Address</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Status</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No orders found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div 
                  key={order._id} 
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="col-span-2 flex items-center">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">#{order.orderId}</span>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.user}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <p className="text-gray-900 font-medium truncate">{order.project}</p>
                    <p className="text-gray-500 text-sm">{order.items?.length || 0} items</p>
                  </div>
                  
                  <div className="col-span-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{order.address}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{order.date}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <div>
            Showing <span className="font-medium">{filteredOrders.length}</span> of <span className="font-medium">{orders.length}</span> orders
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium">
              Total: Rs. {filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
                  <p className="text-sm text-gray-500">#{selectedOrder.orderId}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <p className="font-medium">{new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <p className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {selectedOrder.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  {getStatusConfig(selectedOrder.status).icon}
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>
                    <p className="font-medium">{selectedOrder.status}</p>
                  </div>
                </div>
                <StatusBadge status={selectedOrder.status} />
              </div>

              {/* Items List */}
              <div>
                <p className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Ordered Items ({selectedOrder.items?.length || 0})
                </p>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">Rs. {(item.price * item.qty).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Rs. {item.price?.toLocaleString()} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">Total Amount</p>
                    <p className="text-sm text-gray-500">Including all charges</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      Rs. {selectedOrder.totalAmount?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}