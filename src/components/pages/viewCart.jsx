import React, { useEffect, useState } from "react";
import { loadCart, deleteItem, updateItemQty } from "@/components/utils/cart";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, AlertCircle, Package, CreditCard, Minus, Plus, Truck } from "lucide-react";

// --- CONFIGURATION ---
const DELIVERY_FEE = 350; // මෙතන තමයි ඔයාගේ Fixed Delivery Fee එක තියෙන්නේ.

const initialQuoteState = {
  orderedItems: [],
  total: 0,
  labeledTotal: 0,
  discount: 0,
  message: "Calculating prices...",
};

export default function ViewCart() {
  const [quoteData, setQuoteData] = useState(initialQuoteState);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- 1. INITIALIZATION ---
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setToken(null);
      setQuoteData({ ...initialQuoteState, message: "Please log in to view your cart." });
      return;
    }
    setToken(storedToken);
  }, []);

  // --- 2. FETCH QUOTE ---
  const fetchQuote = async (currentToken) => {
    const cart = loadCart();
    if (!cart.length) {
      setQuoteData({ ...initialQuoteState, message: "Your cart is empty." });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders/quote",
        { orderedItems: cart },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
      setQuoteData(data);
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      if (error.response?.status === 400 && serverMessage) {
        setQuoteData(prev => ({ ...prev, message: serverMessage }));
      } else {
        setQuoteData({ ...initialQuoteState, message: "Failed to fetch prices." });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchQuote(token);
  }, [token]);

  // --- 3. CART ACTIONS ---
  const handleQtyChange = (productId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;
    updateItemQty(productId, newQty);
    if (token) fetchQuote(token);
  };

  const handleDelete = (productId, productName) => {
    Swal.fire({
      title: 'Remove Item',
      text: `Are you sure you want to remove "${productName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(productId);
        const updatedCart = loadCart();
        if (updatedCart.length === 0) {
          setQuoteData({ ...initialQuoteState, message: "Your cart is empty." });
        } else {
          fetchQuote(token);
        }
      }
    });
  };

  // --- 4. CHECKOUT HANDLER ---
  const handleCheckout = () => {
    if (!token) { navigate("/login"); return; }
    if (!quoteData.orderedItems.length || quoteData.total <= 0) return;

    const finalTotal = quoteData.total + DELIVERY_FEE;

    Swal.fire({
      title: "Confirm Checkout",
      html: `
        <div class="text-left text-sm p-2 bg-gray-50 rounded-lg">
           <div class="flex justify-between mb-1"><span>Subtotal:</span> <b>Rs. ${quoteData.total.toLocaleString()}</b></div>
           <div class="flex justify-between text-blue-600"><span>Delivery Fee:</span> <b>Rs. ${DELIVERY_FEE.toLocaleString()}</b></div>
           <hr class="my-2 border-gray-300" />
           <div class="flex justify-between text-lg text-amber-600"><span>Grand Total:</span> <b>Rs. ${finalTotal.toLocaleString()}</b></div>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      confirmButtonText: "Proceed to Shipping"
    }).then((result) => {
      if (result.isConfirmed) {
        const dataToPass = {
          ...quoteData,
          total: quoteData.total,
          deliveryFee: DELIVERY_FEE, 
          finalTotal: finalTotal, // Grand total to be paid
          orderedItems: quoteData.orderedItems.map(item => ({
            ...item,
            images: Array.isArray(item.images) ? item.images : (item.image ? [item.image] : [])
          }))
        };
        navigate("/shipping/", { state: dataToPass });
      }
    });
  };

  const { orderedItems, total, labeledTotal, discount, message } = quoteData;
  const finalTotalDisplay = total > 0 ? total + DELIVERY_FEE : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center space-x-3">
          <ShoppingBag className="h-8 w-8 text-amber-500" />
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Items */}
          <div className="lg:col-span-2">
            {message && (
              <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center text-amber-700">
                <AlertCircle className="h-5 w-5 mr-2" /> {message}
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {orderedItems.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {orderedItems.map((item) => (
                    <div key={item.productId} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50/50 transition-colors">
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                        {item.image ? (
                          <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><Package className="text-gray-400" /></div>
                        )}
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-bold text-gray-800">{item.productName}</h3>
                        <p className="text-blue-600 font-semibold">Rs. {item.lastPrice.toLocaleString()}</p>
                        
                        <div className="flex items-center justify-center sm:justify-start space-x-4 mt-4">
                          <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white">
                            <button onClick={() => handleQtyChange(item.productId, item.qty, -1)} className="p-1 hover:bg-gray-100 rounded text-gray-500"><Minus size={16}/></button>
                            <span className="px-4 font-bold text-gray-700">{item.qty}</span>
                            <button onClick={() => handleQtyChange(item.productId, item.qty, 1)} className="p-1 hover:bg-gray-100 rounded text-gray-500"><Plus size={16}/></button>
                          </div>
                          <button onClick={() => handleDelete(item.productId, item.productName)} className="text-red-500 hover:text-red-700 transition-colors"><Trash2 size={20}/></button>
                        </div>
                      </div>

                      <div className="text-right hidden sm:block">
                        <p className="text-lg font-bold text-gray-900">Rs. {(item.lastPrice * item.qty).toLocaleString()}</p>
                        {item.discount > 0 && <p className="text-xs text-green-600 font-medium italic">Saved Rs. {(item.discount * item.qty).toLocaleString()}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-20 text-center">
                  <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty.</p>
                  <button onClick={() => navigate("/")} className="mt-4 text-amber-600 font-bold hover:underline">Go Shopping →</button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
              <div className="space-y-4 text-gray-600 border-b pb-6">
                
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">Rs. {labeledTotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-600 font-bold">- Rs. {discount.toLocaleString()}</span>
                </div>

                {/* --- DELIVERY FEE DISPLAY --- */}
                <div className="flex justify-between items-center bg-blue-50/50 p-2 rounded-lg">
                    <span className="flex items-center gap-2 text-blue-700 font-medium">
                        <Truck size={18} />
                        Delivery Fee
                    </span>
                    <span className="text-blue-700 font-bold">
                        Rs. {DELIVERY_FEE.toLocaleString()}
                    </span>
                </div>

              </div>
              
              <div className="flex justify-between items-center pt-6 mb-8">
                <span className="text-xl font-bold text-gray-800">Grand Total</span>
                <span className="text-2xl font-black text-amber-600">
                    Rs. {finalTotalDisplay.toLocaleString()}
                </span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={loading || total <= 0}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black py-4 rounded-2xl shadow-lg hover:shadow-orange-200 transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              >
                {loading ? "Processing..." : <><CreditCard size={20}/> Checkout</>}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}