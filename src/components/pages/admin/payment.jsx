import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearCart } from "@/components/utils/cart";
import { CreditCard, Truck } from "lucide-react";

// --- constants ---
const DELIVERY_FEE = 350;
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/payment`;

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderedata = location.state;
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // --- computation ---
  const { subTotal, finalTotal } = useMemo(() => {
    const sub = orderedata?.total || 0;
    const final = orderedata?.finalTotal || sub + DELIVERY_FEE;
    return { subTotal: sub, finalTotal: final };
  }, [orderedata]);

  useEffect(() => {
    if (!orderedata) {
      navigate("/cart");
    }
  }, [orderedata, navigate]);

  // --- payhere event listeners ---
  useEffect(() => {
    if (window.payhere) {
      window.payhere.onCompleted = () => {
        clearCart();
        handleSuccess("Payment Successful!", "Your order has been placed.");
      };

      window.payhere.onDismissed = () => {
        setLoading(false);
        handleInfo("Payment Cancelled", "You closed the payment popup.");
      };

      window.payhere.onError = (error) => {
        setLoading(false);
        handleError("Payment Error", "Something went wrong with the gateway.");
      };
    }
  }, [navigate]);

  // --- helper alerts ---
  const handleSuccess = (title, text) => {
    Swal.fire({ title, text, icon: "success", timer: 3000, showConfirmButton: false })
      .then(() => navigate("/orders"));
  };

  const handleError = (title, text) => {
    Swal.fire({ title, text, icon: "error" });
  };

  const handleInfo = (title, text) => {
    Swal.fire({ title, text, icon: "info" });
  };

  // --- 1. CARD PAYMENT HANDLER ---
  const handleCardPayment = async () => {
    if (!window.payhere || !orderedata) return;
    setLoading(true);

    try {
      // Backend එකට Hash එක සහ Pending Order එක සෑදීමට දත්ත යැවීම
      const { data } = await axios.post(
        `${API_URL}/generate-hash`,
        {
          amount: finalTotal,
          currency: "LKR",
          orderedItems: orderedata.orderedItems,
          shippingAddress: orderedata.shippingAddress,
          contactPhone: orderedata.contactPhone,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (data.success) {
        const payment = {
          sandbox: true, // Live යන විට false කරන්න
          merchant_id: data.merchant_id,
          return_url: `${window.location.origin}/orders`,
          cancel_url: `${window.location.origin}/payment`,
          notify_url: `${import.meta.env.VITE_BACKEND_URL}/api/payment/notify`,
          order_id: data.order_id,
          items: "Online Store Purchase",
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
        };
        window.payhere.startPayment(payment);
      }
    } catch (err) {
      console.error(err);
      handleError("Error", "Failed to initiate card payment.");
      setLoading(false);
    }
  };

  // --- 2. COD PAYMENT HANDLER ---
  const handleCOD = async () => {
    const result = await Swal.fire({
      title: "Confirm Order",
      html: `
        <div class="text-sm border-t pt-2">
          <p class="flex justify-between">Subtotal: <span>Rs. ${subTotal.toLocaleString()}</span></p>
          <p class="flex justify-between text-blue-600">Delivery: <span>Rs. ${DELIVERY_FEE}</span></p>
          <p class="flex justify-between font-bold text-lg mt-2 pt-2 border-t">Total: <span>Rs. ${finalTotal.toLocaleString()}</span></p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      confirmButtonText: "Place Order",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await axios.post(`${API_URL}/cod`, {
          orderedItems: orderedata.orderedItems,
          shippingAddress: orderedata.shippingAddress,
          contactPhone: orderedata.contactPhone,
          total: finalTotal,
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        
        clearCart();
        handleSuccess("Order Placed!", "Your COD order is confirmed.");
      } catch (err) {
        handleError("Order Failed", "Could not process your COD order.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 font-sans">
      <div className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
        {loading && (
           <div className="absolute inset-0 bg-white/80 z-50 flex items-center justify-center backdrop-blur-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
           </div>
        )}

        <div className="bg-slate-900 p-8 text-center text-white">
          <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Checkout Summary</p>
          <h1 className="text-4xl font-black">Rs. {finalTotal.toLocaleString()}</h1>
          <p className="text-slate-400 text-xs mt-2 italic">Including delivery fee of Rs. {DELIVERY_FEE}</p>
        </div>

        <div className="p-8">
          <div className="mb-8 space-y-3 bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900 font-mono">Rs. {subTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-blue-600 font-medium">
              <span>Delivery Charges</span>
              <span className="font-mono">+ Rs. {DELIVERY_FEE.toLocaleString()}</span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Select Payment Method</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PaymentOption 
              active={paymentMethod === "card"}
              onClick={() => { setPaymentMethod("card"); handleCardPayment(); }}
              icon={<CreditCard className="w-6 h-6" />}
              title="Card Payment"
              desc="Visa / Mastercard"
              color="blue"
            />
            <PaymentOption 
              active={paymentMethod === "cod"}
              onClick={() => { setPaymentMethod("cod"); handleCOD(); }}
              icon={<Truck className="w-6 h-6" />}
              title="Cash on Delivery"
              desc="Pay at doorstep"
              color="emerald"
            />
          </div>

          <button
            onClick={() => navigate(-1)}
            disabled={loading}
            className="w-full mt-8 py-3 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            ← Back to Shipping Details
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentOption({ active, onClick, icon, title, desc, color }) {
  const colorClasses = {
    blue: active ? "border-blue-500 bg-blue-50/50" : "border-slate-100 hover:border-blue-200",
    emerald: active ? "border-emerald-500 bg-emerald-50/50" : "border-slate-100 hover:border-emerald-200"
  };
  const iconColors = {
    blue: "text-blue-600",
    emerald: "text-emerald-600"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 transform active:scale-95 ${colorClasses[color]}`}
    >
      <div className={`${iconColors[color]} mb-3 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm`}>
        {icon}
      </div>
      <div className="font-bold text-slate-900">{title}</div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{desc}</div>
    </button>
  );
}