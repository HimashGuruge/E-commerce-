import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle, 
  ArrowLeft,
  Search,
  Eye,
  MapPin,
  CreditCard,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function OrderPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/api/orders/my-orders', {
          headers: getAuthHeader()
        });
        
        if (res.data.success) {
          setOrders(res.data.orders || []);
          setFilteredOrders(res.data.orders || []);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.data.message || 'Failed to load orders',
          });
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to load orders. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter and search orders
  useEffect(() => {
    let result = orders;

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.orderId.toLowerCase().includes(term) ||
        (order.items && order.items.some(item => 
          item.productName?.toLowerCase().includes(term)
        ))
      );
    }

    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-amber-100 text-amber-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString || 'Unknown date';
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Cancel Order?',
      text: 'Are you sure you want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await axios.put(`http://localhost:4000/api/orders/${orderId}/cancel`, {}, {
          headers: getAuthHeader()
        });
        
        if (res.data.success) {
          // Update local state
          setOrders(orders.map(order => 
            order._id === orderId ? { ...order, status: 'cancelled' } : order
          ));

          Swal.fire({
            icon: 'success',
            title: 'Cancelled!',
            text: res.data.message || 'Order has been cancelled successfully.',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.data.message || 'Failed to cancel order',
          });
        }
      } catch (error) {
        console.error('Cancel order error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to cancel order. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTrackOrder = (orderId) => {
    Swal.fire({
      title: 'Track Order',
      text: `Tracking for order ${orderId} is not available yet.`,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  };

  const handleDownloadInvoice = async (orderId) => {
    try {
      // For now, show a message. You can implement actual invoice download later.
      Swal.fire({
        title: 'Invoice Download',
        html: `Invoice for order <strong>${orderId}</strong> will be available soon.`,
        icon: 'info',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Download invoice error:', error);
    }
  };

  const handleReorder = (order) => {
    Swal.fire({
      title: 'Reorder Items?',
      text: 'Add all items from this order to your cart?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add to cart',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Add items to cart (you need to implement this)
        console.log('Adding to cart:', order.items);
        Swal.fire({
          icon: 'info',
          title: 'Feature Coming Soon',
          text: 'Reorder feature will be available soon.',
          timer: 2000
        });
      }
    });
  };

  const handleRefreshOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/api/orders/my-orders', {
        headers: getAuthHeader()
      });
      
      if (res.data.success) {
        setOrders(res.data.orders || []);
        setFilteredOrders(res.data.orders || []);
        Swal.fire({
          icon: 'success',
          title: 'Refreshed!',
          text: 'Orders list updated successfully.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOrderCountByStatus = (status) => {
    if (status === 'all') return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  const getTotalSpent = () => {
    return orders
      .filter(order => order.paymentStatus === 'paid')
      .reduce((total, order) => total + (order.total || 0), 0);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
            <button
              onClick={handleRefreshOrders}
              disabled={loading}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">View and manage all your orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold">Rs. {getTotalSpent().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">All Orders</p>
                  <p className="text-xl font-bold">{getOrderCountByStatus('all')}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Processing</p>
                  <p className="text-xl font-bold">{getOrderCountByStatus('processing')}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shipped</p>
                  <p className="text-xl font-bold">{getOrderCountByStatus('shipped')}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Delivered</p>
                  <p className="text-xl font-bold">{getOrderCountByStatus('delivered')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders by ID or product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              {orders.length === 0 ? (
                <>
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                  <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </>
              ) : (
                <>
                  <AlertCircle className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </>
              )}
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Order Header */}
                <div className="border-b border-gray-200 p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-2 md:mb-0">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-bold text-lg text-gray-900">{order.orderId}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status?.charAt(0)?.toUpperCase() + order.status?.slice(1) || 'Unknown'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus?.charAt(0)?.toUpperCase() + order.paymentStatus?.slice(1) || 'Unknown'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Ordered on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">Rs. {(order.total || 0).toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{order.items?.length || 0} item(s)</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-3">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.productName} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Package className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.productName || 'Unknown Product'}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.qty} × Rs. {(item.lastPrice || 0).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Rs. {((item.lastPrice || 0) * (item.qty || 1)).toLocaleString()}</p>
                        </div>
                      </div>
                    )) || (
                      <div className="text-center py-4 text-gray-500">
                        No items found
                      </div>
                    )}
                  </div>

                  {/* Order Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleViewOrderDetails(order)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                      
                      {order.status === 'processing' && (
                        <button
                          onClick={() => handleCancelOrder(order.orderId)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                          disabled={loading}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Order
                        </button>
                      )}

                      {order.status === 'shipped' && (
                        <button
                          onClick={() => handleTrackOrder(order.orderId)}
                          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center"
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Track Order
                        </button>
                      )}

                      {order.status === 'delivered' && (
                        <button
                          onClick={() => handleReorder(order)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Reorder
                        </button>
                      )}

                      <button
                        onClick={() => handleDownloadInvoice(order.orderId)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                    <p className="text-gray-600">{selectedOrder.orderId}</p>
                  </div>
                  <button
                    onClick={handleCloseOrderDetails}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Order Summary */}
                  <div>
                    {/* Status Timeline */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Truck className="h-5 w-5 mr-2" />
                        Order Status
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                            <Package className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Order Placed</p>
                            <p className="text-sm text-gray-500">{formatDate(selectedOrder.createdAt)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>
                            <Truck className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Shipped</p>
                            {selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered' ? (
                              <p className="text-sm text-gray-500">On the way</p>
                            ) : (
                              <p className="text-sm text-gray-500">Pending</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            <CheckCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Delivered</p>
                            {selectedOrder.status === 'delivered' ? (
                              <p className="text-sm text-gray-500">{formatDate(selectedOrder.updatedAt)}</p>
                            ) : (
                              <p className="text-sm text-gray-500">Expected soon</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Payment Information
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Payment Method</p>
                            <p className="font-medium">{(selectedOrder.paymentMethod || 'Unknown').toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Payment Status</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                              {(selectedOrder.paymentStatus || 'Unknown').charAt(0)?.toUpperCase() + (selectedOrder.paymentStatus || '').slice(1)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Order Date</p>
                            <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Last Updated</p>
                            <p className="font-medium">{formatDate(selectedOrder.updatedAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Shipping & Items */}
                  <div>
                    {/* Shipping Address */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Shipping Address
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">{selectedOrder.shippingAddress?.name || 'N/A'}</p>
                        <p className="text-gray-600">{selectedOrder.shippingAddress?.phone || 'N/A'}</p>
                        <p className="mt-2">{selectedOrder.shippingAddress?.addressLine || 'N/A'}</p>
                        <p>{selectedOrder.shippingAddress?.city || ''}{selectedOrder.shippingAddress?.postalCode ? `, ${selectedOrder.shippingAddress.postalCode}` : ''}</p>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span>Rs. {(selectedOrder.subtotal || 0).toLocaleString()}</span>
                        </div>
                        {(selectedOrder.discount || 0) > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>- Rs. {(selectedOrder.discount || 0).toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="text-green-600">FREE</span>
                        </div>
                        <div className="border-t pt-3 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900">Rs. {(selectedOrder.total || 0).toLocaleString()}</p>
                              <p className="text-sm text-gray-500">including all taxes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCloseOrderDetails}
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}