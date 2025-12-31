import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Shipping() {
  const location = useLocation();
  const orderData = location.state;
  const navigate = useNavigate();

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No order data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Shipping Details
        </h1>

        {/* Order Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Total Amount</p>
          <p className="text-xl font-semibold text-green-600">
            Rs. {orderData.total?.toFixed(2)}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Items ({orderData.orderedItems?.length})
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            {orderData.orderedItems?.map((item) => (
              <li key={item.productId}>
                • {item.productName} × {item.qty}
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => navigate("/payment", { state: orderData })}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Proceed to Payment
        </button>

      </div>
    </div>
  );
}
