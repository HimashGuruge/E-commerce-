import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Truck, CheckCircle, Clock, XCircle, ArrowLeft,
  Search, Eye, MapPin, CreditCard, RefreshCw, AlertCircle
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

  // Fetch orders
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
          Swal.fire('Error', res.data.message || 'Failed to load orders', 'error');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        Swal.fire('Error', error.response?.data?.message || 'Failed to load orders', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders
  useEffect(() => {
    let result = orders;

    if (statusFilter !== 'all') result = result.filter(o => o.status === statusFilter);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(o =>
        o.orderId.toLowerCase().includes(term) ||
        o.items?.some(item => item.productName?.toLowerCase().includes(term))
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
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch { return dateString || 'Unknown date'; }
  };

  const handleViewOrderDetails = (order) => setSelectedOrder(order);
  const handleCloseOrderDetails = () => setSelectedOrder(null);

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

    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:4000/api/orders/${orderId}/cancel`, {}, {
        headers: getAuthHeader()
      });

      if (res.data.success) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: 'cancelled' } : o));
        Swal.fire({ icon: 'success', title: 'Cancelled!', text: res.data.message || 'Order cancelled.', timer: 1500, showConfirmButton: false });
      } else Swal.fire('Error', res.data.message || 'Failed to cancel order', 'error');
    } catch (error) {
      console.error('Cancel order error:', error);
      Swal.fire('Error', error.response?.data?.message || 'Failed to cancel order.', 'error');
    } finally { setLoading(false); }
  };

  const handleTrackOrder = (orderId) => {
    Swal.fire('Track Order', `Tracking for order ${orderId} is not available yet.`, 'info');
  };

  const handleDownloadInvoice = (orderId) => {
    Swal.fire('Invoice Download', `Invoice for order ${orderId} will be available soon.`, 'info');
  };

  const handleReorder = (order) => {
    Swal.fire({
      title: 'Reorder Items?',
      text: 'Add all items from this order to your cart?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add to cart'
    }).then(res => {
      if (res.isConfirmed) {
        console.log('Adding to cart:', order.items);
        Swal.fire({ icon: 'info', title: 'Feature Coming Soon', text: 'Reorder feature coming soon.', timer: 2000 });
      }
    });
  };

  const handleRefreshOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/api/orders/my-orders', { headers: getAuthHeader() });
      if (res.data.success) setOrders(res.data.orders || []);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  const getOrderCountByStatus = (status) => status === 'all' ? orders.length : orders.filter(o => o.status === status).length;
  const getTotalSpent = () => orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + (o.total || 0), 0);

  if (loading && orders.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" /> Go Back
            </button>
            <button onClick={handleRefreshOrders} disabled={loading} className="flex items-center text-blue-600 hover:text-blue-700 disabled:opacity-50">
              <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
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
            {['all', 'processing', 'shipped', 'delivered'].map((status, idx) => {
              const icons = [Package, Clock, Truck, CheckCircle];
              const titles = ['All Orders', 'Processing', 'Shipped', 'Delivered'];
              const colors = ['blue', 'amber', 'green', 'purple'];
              const Icon = icons[idx];
              return (
                <div key={status} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className={`p-2 bg-${colors[idx]}-100 rounded-lg mr-3`}>
                      <Icon className={`h-5 w-5 text-${colors[idx]}-600`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{titles[idx]}</p>
                      <p className="text-xl font-bold">{getOrderCountByStatus(status)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search orders by ID or product name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
                  <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Start Shopping</button>
                </>
              ) : (
                <>
                  <AlertCircle className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
                  <button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Clear Filters</button>
                </>
              )}
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Order Header */}
                <div className="border-b border-gray-200 p-4 flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{order.orderId}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1)}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">Ordered on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">Rs. {(order.total || 0).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{order.items?.length || 0} item(s)</p>
                  </div>
                </div>

                {/* Order Items & Actions */}
                <div className="p-4">
                  <div className="space-y-3">
                    {order.items?.map(item => (
                      <div key={item.productId || Math.random()} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.image ? <img src={item.image} alt={item.productName} className="w-full h-full object-cover rounded-lg" /> : <Package className="h-6 w-6 text-gray-400" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.productName}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.qty} × Rs. {(item.lastPrice || 0).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Rs. {(item.lastPrice * item.qty).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
                    <button onClick={() => handleViewOrderDetails(order)} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700">
                      <Eye className="h-4 w-4 mr-2" /> View Details
                    </button>
                    {order.status === 'processing' && <button onClick={() => handleCancelOrder(order._id)} className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center hover:bg-red-700"><XCircle className="h-4 w-4 mr-2" /> Cancel Order</button>}
                    {order.status === 'shipped' && <button onClick={() => handleTrackOrder(order._id)} className="px-4 py-2 bg-amber-600 text-white rounded-lg flex items-center hover:bg-amber-700"><Truck className="h-4 w-4 mr-2" /> Track Order</button>}
                    {order.status === 'delivered' && <button onClick={() => handleReorder(order)} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700"><Package className="h-4 w-4 mr-2" /> Reorder</button>}
                    <button onClick={() => handleDownloadInvoice(order._id)} className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center hover:bg-gray-700"><CreditCard className="h-4 w-4 mr-2" /> Invoice</button>
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
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                    <p className="text-gray-600">{selectedOrder.orderId}</p>
                  </div>
                  <button onClick={handleCloseOrderDetails} className="text-gray-400 hover:text-gray-600"><XCircle className="h-6 w-6" /></button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left - Status & Payment */}
                  <div>
                    {/* Timeline */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center"><Truck className="h-5 w-5 mr-2" />Order Status</h3>
                      <div className="space-y-4">
                        {['processing', 'shipped', 'delivered'].map((step, idx) => {
                          const stepNames = { processing: 'Order Placed', shipped: 'Shipped', delivered: 'Delivered' };
                          const stepColors = { processing: 'bg-blue-100 text-blue-600', shipped: 'bg-amber-100 text-amber-600', delivered: 'bg-green-100 text-green-600' };
                          const isCompleted = ['processing', 'shipped', 'delivered'].indexOf(step) <= ['processing', 'shipped', 'delivered'].indexOf(selectedOrder.status);
                          return (
                            <div key={step} className="flex items-center">
                              <div className={`p-2 rounded-full mr-3 ${isCompleted ? stepColors[step] : 'bg-gray-100 text-gray-400'}`}>
                                {step === 'processing' && <Package className="h-4 w-4" />}
                                {step === 'shipped' && <Truck className="h-4 w-4" />}
                                {step === 'delivered' && <CheckCircle className="h-4 w-4" />}
                              </div>
                              <div>
                                <p className="font-medium">{stepNames[step]}</p>
                                <p className={`text-sm ${selectedOrder.status === 'cancelled' ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                                  {selectedOrder.status === 'cancelled' ? 'Order Cancelled' :
                                  step === 'processing' ? formatDate(selectedOrder.createdAt) :
                                  step === 'delivered' && selectedOrder.status === 'delivered' ? formatDate(selectedOrder.updatedAt) : 'Pending'}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center"><CreditCard className="h-5 w-5 mr-2" />Payment Info</h3>
                      <div className="flex justify-between mb-2"><span>Status</span><span className={`${getPaymentStatusColor(selectedOrder.paymentStatus)} px-2 py-1 rounded-full text-sm`}>{selectedOrder.paymentStatus}</span></div>
                      <div className="flex justify-between mb-2"><span>Subtotal</span><span>Rs. {(selectedOrder.total - (selectedOrder.shippingFee || 0)).toLocaleString()}</span></div>
                      <div className="flex justify-between mb-2"><span>Shipping</span><span className="text-green-600">{selectedOrder.shippingFee > 0 ? `Rs. ${selectedOrder.shippingFee.toLocaleString()}` : 'FREE'}</span></div>
                      <div className="flex justify-between font-bold text-gray-900"><span>Total</span><span>Rs. {(selectedOrder.total || 0).toLocaleString()}</span></div>
                    </div>
                  </div>

                  {/* Right - Items */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center"><Package className="h-5 w-5 mr-2" />Items</h3>
                    <div className="space-y-4">
                      {selectedOrder.items?.map(item => (
                        <div key={item.productId || Math.random()} className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.image ? <img src={item.image} alt={item.productName} className="w-full h-full object-cover rounded-lg" /> : <Package className="h-6 w-6 text-gray-400" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.productName}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.qty} × Rs. {(item.lastPrice || 0).toLocaleString()}</p>
                          </div>
                          <div className="text-right font-semibold">Rs. {(item.lastPrice * item.qty).toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-right">
                  <button onClick={handleCloseOrderDetails} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
