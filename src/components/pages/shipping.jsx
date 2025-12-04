import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Shipping() {
  const location = useLocation();
  const quoteData = location.state;

  // State for shipping info
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handle final order confirmation
  const handleConfirm = () => {
    if (quoteData && quoteData.total > 0) {
      // Here you would make the final API call to save the order with shippingInfo
      console.log("Final Order Data:", {
        quoteData,
        shippingInfo
      });

      alert(`Order Confirmed for Rs. ${quoteData.total.toFixed(2)}!\nShipping to: ${shippingInfo.name}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, Phone: ${shippingInfo.phone}`);
      // After successful API call, you can navigate to a success page
    } else {
      alert('Cannot confirm order. Order data is missing or total is zero.');
    }
  };

  return (
    <div className="shipping-container p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Shipping & Final Confirmation 🚚</h2>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">Order Summary</h3>
        {quoteData ? (
          <>
            <p className="text-lg mb-1">
              Final Total: <span className="font-bold text-green-700">Rs. {quoteData.total?.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-700">
              Message: <span className="italic ml-2">{quoteData.message || "No message provided."}</span>
            </p>
          </>
        ) : (
          <p className="text-red-500 font-semibold">No order data was passed. Please return to the cart.</p>
        )}
      </div>

      {/* Shipping Form */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h3>
        <div className="space-y-4 p-4 bg-white border border-dashed border-gray-300 rounded-md">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Street address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Postal code"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., +94 7XXXXXXX"
            />
          </div>

        </div>
      </div>

      {/* Confirm Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={handleConfirm}
          className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white transition duration-150 ease-in-out ${
            quoteData && quoteData.total > 0
              ? "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!quoteData || quoteData.total <= 0}
        >
          Confirm Order (Rs. {quoteData && quoteData.total > 0 ? quoteData.total.toFixed(2) : '0.00'})
        </button>
      </div>
    </div>
  );
}
