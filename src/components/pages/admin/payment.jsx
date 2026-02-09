import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearCart } from "@/components/utils/cart";
import { CreditCard, Truck, ShoppingBag, ShieldCheck, ChevronLeft, Sparkles, Lock, CheckCircle, Clock, Package } from "lucide-react";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/payment`;

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderedata = location.state;
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [progress, setProgress] = useState(0);

  // --- Accurate Price Computation ---
  const { subTotal, deliveryFee, finalTotal, items } = useMemo(() => {
    const sub = orderedata?.total || 0;
    const delivery = orderedata?.deliveryFee || 350;
    const final = orderedata?.finalTotal || (sub + delivery);
    const orderItems = orderedata?.orderedItems || [];

    return { subTotal: sub, deliveryFee: delivery, finalTotal: final, items: orderItems };
  }, [orderedata]);

  useEffect(() => {
    if (!orderedata) navigate("/cart");
    
    // Animated progress
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + 0.5));
    }, 20);
    
    return () => clearInterval(interval);
  }, [orderedata, navigate]);

  // --- PayHere Event Handlers ---
  useEffect(() => {
    if (window.payhere) {
      window.payhere.onCompleted = () => {
        clearCart();
        Swal.fire({ 
          title: "Payment Successful!", 
          text: "Your order has been placed successfully.",
          icon: "success", 
          timer: 3000, 
          showConfirmButton: false 
        }).then(() => navigate("/orders"));
      };

      window.payhere.onDismissed = () => {
        setLoading(false);
        Swal.fire({ title: "Cancelled", text: "Payment was not completed.", icon: "info" });
      };

      window.payhere.onError = () => {
        setLoading(false);
        Swal.fire({ title: "Error", text: "Gateway Error. Please try again.", icon: "error" });
      };
    }
  }, [navigate]);

  // --- 1. CARD PAYMENT HANDLER ---
  const handleCardPayment = async () => {
    if (!window.payhere || !orderedata) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/generate-hash`, {
          amount: finalTotal,
          currency: "LKR",
          orderedItems: items,
          shippingAddress: orderedata.shippingAddress,
          contactPhone: orderedata.contactPhone,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (data.success) {
        window.payhere.startPayment({
          sandbox: true,
          merchant_id: data.merchant_id,
          return_url: `${window.location.origin}/orders`,
          cancel_url: `${window.location.origin}/payment`,
          notify_url: `${import.meta.env.VITE_BACKEND_URL}/api/payment/notify`,
          order_id: data.order_id,
          items: items.map(i => i.productName).join(", "),
          amount: data.amount, 
          currency: "LKR",
          hash: data.hash,
          first_name: orderedata.userFirstName || "Customer",
          last_name: orderedata.userLastName || "",
          email: orderedata.userEmail || "",
          phone: orderedata.contactPhone,
          address: orderedata.shippingAddress,
          city: "Sri Lanka",
          country: "Sri Lanka",
        });
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({ title: "Error", text: "Failed to initiate card payment.", icon: "error" });
    }
  };

  // --- 2. COD PAYMENT HANDLER ---
  // --- 2. COD PAYMENT HANDLER (Updated) ---
const handleCOD = async () => {
  const { value: accept } = await Swal.fire({
    title: '<div class="flex flex-col items-center">' +
           '<div class="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/30">' +
           '<Truck className="w-10 h-10 text-white" />' +
           '</div>' +
           '<h2 class="text-2xl font-bold text-slate-900 mt-2">Confirm Cash on Delivery</h2>' +
           '</div>',
    
    html: `
      <div class="text-left font-sans">
        <!-- Order Summary Card -->
        <div class="relative bg-gradient-to-br from-emerald-50/50 to-green-50/50 rounded-2xl border border-emerald-100 p-6 mb-6">
          <div class="absolute top-4 right-4">
            <div class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full">
              <span class="text-xs font-bold text-white uppercase tracking-widest">COD</span>
            </div>
          </div>
          
          <h3 class="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            <span>Order Summary</span>
          </h3>
          
          <!-- Items List -->
          <div class="space-y-3 max-h-48 overflow-y-auto pr-2 mb-4">
            ${items.map(item => `
              <div class="flex items-center gap-3 bg-white/80 p-3 rounded-xl border border-emerald-100/50">
                <div class="relative">
                  <img src="${item.image}" class="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm" alt="${item.productName}" />
                  <div class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
                    ${item.qty}
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-semibold text-slate-800 truncate">${item.productName}</h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs text-slate-500">Rs. ${item.lastPrice.toLocaleString()} × ${item.qty}</span>
                  </div>
                </div>
                <div class="text-sm font-bold text-emerald-700">
                  Rs. ${(item.qty * item.lastPrice).toLocaleString()}
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Pricing Breakdown -->
          <div class="space-y-3 bg-white/60 rounded-xl p-4 border border-emerald-100">
            <div class="flex justify-between items-center py-1">
              <div class="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-slate-400" />
                <span class="text-slate-600 font-medium">Subtotal</span>
              </div>
              <span class="font-bold text-slate-900">Rs. ${subTotal.toLocaleString()}</span>
            </div>
            
            <div class="flex justify-between items-center py-1">
              <div class="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span class="text-slate-600 font-medium">Delivery Fee</span>
              </div>
              <span class="font-bold text-emerald-600">+ Rs. ${deliveryFee.toLocaleString()}</span>
            </div>
            
            <div class="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent my-2"></div>
            
            <div class="flex justify-between items-center pt-2">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 shadow-md">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span class="font-bold text-slate-900 text-sm">Total Payable</span>
                  <p class="text-xs text-slate-500">At delivery</p>
                </div>
              </div>
              <div class="text-right">
                <span class="font-bold text-2xl text-transparent bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text">
                  Rs. ${finalTotal.toLocaleString()}
                </span>
                <p class="text-[10px] text-slate-500 font-bold uppercase mt-1">Cash Payment</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Shipping Info -->
        <div class="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 p-5 mb-6">
          <h4 class="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
            <div class="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <span>Delivery Address</span>
          </h4>
          <div class="bg-white rounded-xl p-4 border border-slate-200">
            <p class="text-sm text-slate-700 font-medium mb-1">${orderedata?.shippingAddress || 'Address not specified'}</p>
            <p class="text-xs text-slate-500 flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              ${orderedata?.contactPhone || 'Contact number not provided'}
            </p>
          </div>
        </div>
        
        <!-- COD Terms -->
        <div class="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-2xl border border-amber-100 p-5">
          <h4 class="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
            <div class="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span>COD Terms & Conditions</span>
          </h4>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <div class="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span>Exact cash amount must be paid upon delivery</span>
            </li>
            <li class="flex items-start gap-2">
              <div class="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span>Delivery executive will contact you before arrival</span>
            </li>
            <li class="flex items-start gap-2">
              <div class="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span>Order will be delivered within 3-5 business days</span>
            </li>
            <li class="flex items-start gap-2">
              <div class="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span>Please keep the contact number active for delivery calls</span>
            </li>
          </ul>
          
          <!-- Confirmation Checkbox -->
          <div class="mt-4 p-3 bg-white/80 rounded-xl border border-emerald-200">
            <label class="flex items-start gap-3 cursor-pointer">
              <div class="relative mt-1">
                <input type="checkbox" id="codTerms" class="sr-only peer" />
                <div class="w-5 h-5 rounded border-2 border-slate-300 peer-checked:border-emerald-500 peer-checked:bg-gradient-to-br peer-checked:from-emerald-500 peer-checked:to-green-500 flex items-center justify-center transition-all">
                  <CheckCircle className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
              </div>
              <div class="text-sm text-slate-700">
                <span class="font-medium">I accept the COD terms and confirm my order</span>
                <p class="text-xs text-slate-500 mt-1">By confirming, you agree to pay Rs. ${finalTotal.toLocaleString()} in cash when the order arrives.</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    `,
    
    showCloseButton: true,
    closeButtonHtml: `
      <div class="p-2 rounded-full hover:bg-slate-100 transition-colors">
        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
    `,
    
    showCancelButton: true,
    cancelButtonText: `
      <div class="flex items-center gap-2 px-4 py-2">
        <ChevronLeft className="w-4 h-4" />
        <span>Review Order</span>
      </div>
    `,
    cancelButtonColor: '#f1f5f9',
    cancelButtonClass: '!font-medium !text-slate-600 hover:!bg-slate-100 !rounded-xl !border !border-slate-200',
    
    showConfirmButton: true,
    confirmButtonText: `
      <div class="flex items-center justify-center gap-2 px-6 py-2">
        <div class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
          <CheckCircle className="w-3 h-3" />
        </div>
        <span>Place COD Order</span>
      </div>
    `,
    confirmButtonColor: '#10b981',
    buttonsStyling: false,
    
    customClass: {
      popup: '!rounded-3xl !p-0 !overflow-hidden !max-w-2xl',
      container: '!p-4',
      title: '!p-6 !mb-0',
      htmlContainer: '!px-6 !pt-0',
      actions: '!p-6 !pt-4 !bg-gradient-to-b !from-white !to-slate-50 !border-t !border-slate-100 !gap-3',
    },
    
    preConfirm: () => {
      const checkbox = document.getElementById('codTerms');
      if (!checkbox?.checked) {
        Swal.showValidationMessage('Please accept the COD terms to continue');
        return false;
      }
      return true;
    },
    
    didOpen: () => {
      const checkbox = document.getElementById('codTerms');
      const confirmBtn = document.querySelector('.swal2-confirm');
      
      checkbox?.addEventListener('change', (e) => {
        if (confirmBtn) {
          confirmBtn.disabled = !e.target.checked;
          confirmBtn.style.opacity = e.target.checked ? '1' : '0.5';
        }
      });
      
      // Initialize confirm button as disabled
      if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.style.opacity = '0.5';
        confirmBtn.style.transition = 'all 0.3s ease';
      }
    },
  });

  if (!accept) return;

  // Process COD Order
  setLoading(true);
  try {
    await axios.post(`${API_URL}/cod`, {
      orderedItems: items,
      shippingAddress: orderedata.shippingAddress,
      contactPhone: orderedata.contactPhone,
      total: finalTotal,
      paymentMethod: "COD",
      status: "Pending",
      isPaid: false
    }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    
    clearCart();
    
    // Success Modal
    await Swal.fire({
      title: `
        <div class="flex flex-col items-center">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/40 animate-pulse">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 class="text-3xl font-bold text-slate-900">Order Confirmed!</h2>
        </div>
      `,
      html: `
        <div class="text-center font-sans">
          <p class="text-lg text-slate-600 mb-2">Your COD order has been placed successfully</p>
          <p class="text-sm text-slate-500 mb-6">You'll receive a confirmation call shortly</p>
          
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 mb-6 border border-emerald-100">
            <div class="flex items-center justify-center gap-3 mb-4">
              <div class="p-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-500">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div class="text-left">
                <p class="font-bold text-slate-900">Estimated Delivery</p>
                <p class="text-sm text-emerald-600">3-5 Business Days</p>
              </div>
            </div>
            
            <div class="bg-white rounded-xl p-4 border border-emerald-200">
              <p class="text-sm font-bold text-slate-800 mb-1">Payment Due:</p>
              <p class="text-2xl font-black text-transparent bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text">
                Rs. ${finalTotal.toLocaleString()}
              </p>
              <p class="text-xs text-slate-500 mt-2">Pay this amount to the delivery executive</p>
            </div>
          </div>
          
          <div class="text-xs text-slate-400 bg-slate-50 rounded-xl p-4">
            <p class="font-medium mb-1">📞 Keep your phone active for delivery updates</p>
            <p class="text-[10px]">Order ID: COD-${Date.now().toString().slice(-8)}</p>
          </div>
        </div>
      `,
      icon: false,
      showConfirmButton: true,
      confirmButtonText: 'View My Orders',
      confirmButtonColor: '#0f172a',
      buttonsStyling: false,
      customClass: {
        popup: '!rounded-3xl !p-8',
        confirmButton: '!px-8 !py-3 !rounded-xl !font-bold !text-white !bg-gradient-to-r !from-slate-900 !to-slate-800 hover:!shadow-lg !transition-all'
      },
      timer: 8000,
      timerProgressBar: true,
    }).then(() => navigate("/orders"));
  } catch (err) {
    setLoading(false);
    
    // Error Modal
    Swal.fire({
      title: `
        <div class="flex flex-col items-center">
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4 shadow-xl shadow-rose-500/30">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">Order Failed</h2>
        </div>
      `,
      html: `
        <div class="text-center font-sans">
          <p class="text-slate-600 mb-6">We couldn't process your COD order. Please try again.</p>
          <button onclick="window.location.reload()" class="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
            Try Again
          </button>
        </div>
      `,
      icon: false,
      showCancelButton: true,
      cancelButtonText: 'Go Back',
      cancelButtonColor: '#f1f5f9',
      showConfirmButton: false,
      customClass: {
        popup: '!rounded-3xl !p-8',
        cancelButton: '!px-8 !py-3 !rounded-xl !font-medium !text-slate-600 hover:!bg-slate-100 !mt-4'
      }
    });
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-300/30 border border-white/50 overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        {loading && (
          <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center backdrop-blur-sm rounded-3xl">
            <div className="relative">
              <div className="w-32 h-32 border-4 border-slate-100 rounded-full">
                <div className="w-full h-full rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 animate-spin"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
            </div>
            <p className="mt-6 text-slate-700 font-semibold animate-pulse">Processing Payment...</p>
            <p className="text-sm text-slate-500 mt-2">Please wait while we secure your transaction</p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="px-8 pt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30">
                <CheckCircle size={20} />
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900">Cart</p>
                <p className="text-xs text-slate-500">Items selected</p>
              </div>
            </div>
            
            <div className="flex-1 h-1 mx-4 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30">
                2
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900">Payment</p>
                <p className="text-xs text-slate-500">Checkout</p>
              </div>
            </div>
          </div>
        </div>

        {/* Amount Header */}
        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-10 text-center text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <p className="text-slate-300 text-xs font-bold uppercase tracking-widest">Complete Your Purchase</p>
            </div>
            <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-white via-blue-100 to-slate-200 bg-clip-text text-transparent mb-3">
              Rs. {finalTotal.toLocaleString()}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 text-xs font-medium">
              <ShieldCheck size={14} className="text-emerald-400 animate-pulse" />
              <span className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
                256-bit SSL Secured • PCI Compliant
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Product Summary */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Order Summary</h3>
                <p className="text-sm text-slate-500">{items.length} item{items.length !== 1 ? 's' : ''} in your order</p>
              </div>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-gradient-to-r from-white to-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all hover:shadow-md group">
                  <div className="relative">
                    <img src={item.image} className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform" alt="product" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg">
                      {item.qty}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{item.productName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-slate-500 font-medium">Rs. {item.lastPrice.toLocaleString()} each</p>
                      <span className="text-xs text-slate-300">•</span>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle size={8} />
                        In stock
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-black text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                    Rs. {(item.qty * item.lastPrice).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="mb-8 p-6 bg-gradient-to-br from-slate-50/80 to-white rounded-2xl border border-slate-100 shadow-inner space-y-4">
            <h4 className="font-bold text-slate-900 text-lg">Order Total</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={14} className="text-slate-400" />
                  <span className="text-slate-600 font-medium">Items Total</span>
                </div>
                <span className="font-bold text-slate-900">Rs. {subTotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-blue-500" />
                  <span className="text-slate-600 font-medium">Delivery Charges</span>
                </div>
                <span className="font-bold text-blue-600">+ Rs. {deliveryFee.toLocaleString()}</span>
              </div>
              
              <div className="relative pt-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl"></div>
                <div className="relative flex justify-between items-center pt-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                      <CreditCard size={16} className="text-white" />
                    </div>
                    <div>
                      <span className="font-black text-slate-900 uppercase text-sm tracking-widest">Total Amount</span>
                      <p className="text-xs text-slate-500">Including all charges</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-2xl text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                      Rs. {finalTotal.toLocaleString()}
                    </span>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">LKR • Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Selection */}
          <div className="mb-8">
            <h4 className="font-bold text-slate-900 text-lg mb-4">Select Payment Method</h4>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { setPaymentMethod("card"); handleCardPayment(); }}
                disabled={loading}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group overflow-hidden ${
                  paymentMethod === 'card' 
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl shadow-blue-500/20 ring-2 ring-blue-500/30' 
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-white'
                }`}
              >
                <div className="absolute top-4 right-4">
                  {paymentMethod === 'card' ? (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>
                  )}
                </div>
                
                <CreditCard className={`mb-4 transition-transform group-hover:scale-110 ${
                  paymentMethod === 'card' 
                    ? 'text-blue-600' 
                    : 'text-slate-400 group-hover:text-blue-500'
                }`} size={32} />
                
                <div className="font-bold text-slate-900 text-base mb-1">Credit/Debit Card</div>
                <div className="text-xs text-slate-500 font-medium mb-2">Visa • Master • Amex</div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Lock size={10} />
                  <span>Secure • Encrypted • Instant</span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => { setPaymentMethod("cod"); handleCOD(); }}
                disabled={loading}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group overflow-hidden ${
                  paymentMethod === 'cod' 
                    ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 shadow-xl shadow-emerald-500/20 ring-2 ring-emerald-500/30' 
                    : 'border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-white'
                }`}
              >
                <div className="absolute top-4 right-4">
                  {paymentMethod === 'cod' ? (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>
                  )}
                </div>
                
                <Truck className={`mb-4 transition-transform group-hover:scale-110 ${
                  paymentMethod === 'cod' 
                    ? 'text-emerald-600' 
                    : 'text-slate-400 group-hover:text-emerald-500'
                }`} size={32} />
                
                <div className="font-bold text-slate-900 text-base mb-1">Cash on Delivery</div>
                <div className="text-xs text-slate-500 font-medium mb-2">Pay when you receive</div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Clock size={10} />
                  <span>No online payment required</span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 hover:from-slate-50 hover:to-slate-100 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
              <ChevronLeft size={16} className="text-slate-600" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-slate-900 text-sm">Back to Shipping</div>
              <div className="text-xs text-slate-500">Review delivery details</div>
            </div>
            <div className="text-xs text-slate-400 font-medium px-3 py-1 rounded-full bg-slate-100">
              Step 1
            </div>
          </button>

          {/* Security Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>SSL Secured</span>
              </div>
              <div className="h-4 w-px bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <Lock size={12} className="text-blue-500" />
                <span>256-bit Encryption</span>
              </div>
              <div className="h-4 w-px bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-purple-500" />
                <span>PCI DSS Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}