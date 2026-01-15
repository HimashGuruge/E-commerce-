import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Shipping() {
  const location = useLocation();
  const orderData = location.state;
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    phone: "",
  });

  // Delivery fee එක මෙතන variable එකක් විදිහට තියාගමු
  const DELIVERY_FEE = 350;

  useEffect(() => {
    const fetchUserCurrentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          setShippingInfo({
            address: res.data.user.address || "",
            phone: res.data.user.phone || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCurrentDetails();
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 font-semibold">No order data found!</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // --- FIXED HANDLE PROCEED FUNCTION ---
  const handleProceed = () => {
    // භාණ්ඩ වල මිලට delivery fee එක එකතු කරලා final total එක හදනවා
    const itemsTotal = orderData.total || 0;
    const calculatedFinalTotal = itemsTotal + DELIVERY_FEE;

    const finalOrderData = {
      ...orderData,
      shippingAddress: shippingInfo.address,
      contactPhone: shippingInfo.phone,
      deliveryFee: DELIVERY_FEE, // Payment page එකට මේක ඕනේ
      finalTotal: calculatedFinalTotal, // Payment page එකට මේක ඕනේ
    };
    
    navigate("/payment", { state: finalOrderData });
  };

  if (loading) return <div className="text-center mt-10 font-bold">Loading details...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Step Header */}
        <div className="bg-white border-b p-6 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-gray-800">Shipping</h1>
          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">Step 2 of 3</span>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-700">Delivery Information</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm font-bold text-blue-600 hover:text-blue-800 transition underline"
              >
                {isEditing ? "Cancel Editing" : "Change Address"}
              </button>
            </div>

            {!isEditing ? (
              <div className="p-5 bg-blue-50/50 rounded-xl border-2 border-dashed border-blue-200">
                <div className="mb-4">
                  <p className="text-xs uppercase text-gray-400 font-bold mb-1">Deliver To</p>
                  <p className="text-gray-700 leading-relaxed">
                    {shippingInfo.address || <span className="text-red-400 italic font-medium">Please add an address to continue</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-400 font-bold mb-1">Contact Number</p>
                  <p className="text-gray-700 font-mono">
                    {shippingInfo.phone || <span className="text-red-400 italic font-medium">No phone number</span>}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Temporary Shipping Address</label>
                  <textarea
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                    placeholder="Enter the address for this delivery..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Contact Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                    placeholder="e.g. 077 123 4567"
                  />
                </div>
              </div>
            )}
          </div>

          {/* --- TOTALS SECTION --- */}
          <div className="bg-gray-900 rounded-2xl p-6 text-white mb-8 shadow-lg space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-gray-700 pb-3">
              <span className="text-gray-400 font-medium">Items Subtotal:</span>
              <span className="font-bold">Rs. {orderData.total?.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-medium">Delivery Fee:</span>
              <span className="text-green-400 font-bold">+ Rs. {DELIVERY_FEE.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-300 font-bold uppercase tracking-wide">Total Payable:</span>
              <span className="text-2xl font-black text-white">
                Rs. {(orderData.total + DELIVERY_FEE).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleProceed}
            disabled={!shippingInfo.address || !shippingInfo.phone}
            className={`w-full py-4 rounded-xl font-black text-lg transition-all transform active:scale-95 shadow-lg ${
              !shippingInfo.address || !shippingInfo.phone
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Confirm & Pay →
          </button>
        </div>
      </div>
    </div>
  );
}