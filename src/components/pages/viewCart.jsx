import React, { useEffect, useState } from "react";
import { loadCart, deleteItem } from "@/components/utils/cart";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, AlertCircle, ChevronRight, Package, Tag, CreditCard, Shield, Truck } from "lucide-react";

const initialQuoteState = {
  orderedItems: [],
  total: 0,
  labeledTotal: 0,
  discount: 0,
  message: "Calculating prices...",
};

export default function ViewCart() {
  const [quoteData, setQuoteData] = useState(initialQuoteState);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setQuoteData({ ...initialQuoteState, message: "Please log in to view your cart." });
      return;
    }
    setUser(token);
  }, []);

  // Load cart and fetch quote
  useEffect(() => {
    if (!user) return;

    const cart = loadCart();
    if (!cart.length) {
      setQuoteData({ ...initialQuoteState, message: "Your cart is empty." });
      return;
    }

    const fetchQuote = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post("http://localhost:4000/api/orders/quote", { orderedItems: cart });
        setQuoteData(data);
      } catch (error) {
        console.error("Quote API Error:", error);
        setQuoteData({ ...initialQuoteState, message: "Failed to fetch prices." });
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [user]);

  // Delete item with confirmation
  const handleDelete = (productId, productName) => {
    Swal.fire({
      title: 'Remove Item',
      text: `Are you sure you want to remove "${productName}" from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(productId);

        const updatedItems = quoteData.orderedItems.filter(item => item.productId !== productId);
        const newLabeledTotal = updatedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
        const newTotal = updatedItems.reduce((sum, i) => sum + i.lastPrice * i.qty, 0);
        const newDiscount = newLabeledTotal - newTotal;

        setQuoteData({
          orderedItems: updatedItems,
          labeledTotal: newLabeledTotal,
          total: newTotal,
          discount: newDiscount,
          message: updatedItems.length === 0 ? "Your cart is empty." : "Cart updated successfully!",
        });

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Item Removed',
          text: 'The item has been removed from your cart.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Clear entire cart
  const handleClearCart = () => {
    Swal.fire({
      title: 'Clear Cart',
      text: 'Are you sure you want to clear all items from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, clear all!',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cart");
        setQuoteData({ ...initialQuoteState, message: "Your cart has been cleared." });
        
        Swal.fire({
          icon: 'success',
          title: 'Cart Cleared',
          text: 'All items have been removed from your cart.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Checkout
  const handleCheckout = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "Please log in to proceed to checkout.",
        confirmButtonColor: "#f59e0b",
        backdrop: 'rgba(0,0,0,0.5)'
      });
      navigate("/login");
      return;
    }

    if (!quoteData.orderedItems.length || quoteData.total <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text: "Your cart is empty or calculation failed. Please add items to proceed.",
        confirmButtonColor: "#f59e0b",
        backdrop: 'rgba(0,0,0,0.5)'
      });
      return;
    }

    Swal.fire({
      title: "Confirm Checkout",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to place an order for:</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <p class="font-semibold text-lg">Rs. ${quoteData.total.toFixed(2)}</p>
            <p class="text-sm text-gray-600">${quoteData.orderedItems.length} item(s) in your cart</p>
          </div>
          <p class="text-sm text-gray-600">You will be redirected to the shipping details page.</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Proceed to Shipping",
      cancelButtonText: "Review Order",
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/shipping/", { state: quoteData });
      }
    });
  };

  const { orderedItems, total, labeledTotal, discount, message } = quoteData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-amber-500 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          </div>
          <p className="text-gray-600">Review and manage your items before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {/* Message Banner */}
            {message && (
              <div className="mb-6">
                <div className={`flex items-center p-4 rounded-lg ${
                  message.includes("Please log in") || message.includes("Failed") 
                    ? "bg-red-50 border border-red-200"
                    : message.includes("empty")
                    ? "bg-amber-50 border border-amber-200"
                    : "bg-blue-50 border border-blue-200"
                }`}>
                  <AlertCircle className={`h-5 w-5 mr-3 ${
                    message.includes("Please log in") || message.includes("Failed")
                      ? "text-red-500"
                      : message.includes("empty")
                      ? "text-amber-500"
                      : "text-blue-500"
                  }`} />
                  <span className={`text-sm ${
                    message.includes("Please log in") || message.includes("Failed")
                      ? "text-red-700"
                      : message.includes("empty")
                      ? "text-amber-700"
                      : "text-blue-700"
                  }`}>{message}</span>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Cart Items ({orderedItems.length})
                  </h2>
                  {orderedItems.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>

              {user && orderedItems.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {orderedItems.map((item) => (
                    <div key={item.productId} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start space-x-4">
                        {/* Product Image Placeholder */}
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-amber-600" />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.productName}</h3>
                              <p className="text-sm text-gray-500 mt-1">Product ID: {item.productId}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  Qty: {item.qty}
                                </span>
                              </div>
                            </div>
                            
                            {/* Price and Actions */}
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                {item.discount > 0 && (
                                  <span className="text-sm text-gray-400 line-through">
                                    Rs. {(item.price * item.qty).toFixed(2)}
                                  </span>
                                )}
                                <span className="text-lg font-bold text-gray-900">
                                  Rs. {(item.lastPrice * item.qty).toFixed(2)}
                                </span>
                              </div>
                              {item.discount > 0 && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                  <Tag className="h-3 w-3 mr-1" />
                                  Save Rs. {(item.discount * item.qty).toFixed(2)}
                                </span>
                              )}
                              <button
                                onClick={() => handleDelete(item.productId, item.productName)}
                                className="mt-3 flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-8">Add some products to get started!</p>
                  <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Continue Shopping
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              )}
            </div>

            {/* Security Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Secure Payment</h4>
                  <p className="text-sm text-gray-500">100% safe and secure</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over Rs. 5000</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Easy Returns</h4>
                  <p className="text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({orderedItems.length} items)</span>
                    <span className="font-medium">Rs. {labeledTotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-700 font-medium">Discount</span>
                      </div>
                      <span className="font-bold text-green-700">- Rs. {discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>

                  <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Included</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between py-4 border-t border-gray-200">
                    <div>
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <p className="text-sm text-gray-500">Including all taxes</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">Rs. {total.toFixed(2)}</div>
                      {labeledTotal > 0 && (
                        <div className="text-sm text-gray-500 line-through">Rs. {labeledTotal.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={!user || total <= 0 || loading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    total > 0 && user && !loading
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Proceed to Checkout</span>
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                >
                  Continue Shopping
                </button>

                {/* Help Text */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Need help?{" "}
                    <button className="text-amber-600 hover:text-amber-700 font-medium">
                      Contact Support
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Tips */}
            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Shopping Tips
              </h3>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Free shipping on orders above Rs. 5000
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Prices are inclusive of all taxes
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  You can modify your order before checkout
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  30-day return policy applies to all items
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}