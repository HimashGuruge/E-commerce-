import React, { useEffect, useState } from "react";
import { loadCart, deleteItem } from "@/components/utils/cart";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialQuoteState = {
  orderedItems: [],
  total: 0,
  labeledTotal: 0,
  discount: 0,
  message: "Calculating prices...",
};

export default function ViewCart() {
  const [quoteData, setQuoteData] = useState(initialQuoteState);
  const [user, setUser] = useState(null); // null = not logged in
  const navigate = useNavigate();

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setQuoteData({ ...initialQuoteState, message: "Please log in to view your cart." });
      return;
    }
    setUser(token); // you can decode if you need role
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
      try {
        const { data } = await axios.post("http://localhost:4000/api/orders/quote", { orderedItems: cart });
        setQuoteData(data);
      } catch (error) {
        console.error("Quote API Error:", error);
        setQuoteData({ ...initialQuoteState, message: "Failed to fetch prices." });
      }
    };

    fetchQuote();
  }, [user]);

  // Delete item
  const handleDelete = (productId) => {
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
      message: updatedItems.length === 0 ? "Your cart is empty." : "Updated cart.",
    });
  };

  // Checkout
  const handleCheckout = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to proceed to checkout.",
        confirmButtonColor: "#ffc107",
      });
      navigate("/login");
      return;
    }

    if (!quoteData.orderedItems.length || quoteData.total <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text: "Your cart is empty or calculation failed. Please add items to proceed.",
        confirmButtonColor: "#ffc107",
      });
      return;
    }

    Swal.fire({
      title: "Confirm Checkout",
      text: `You are about to place an order for Rs. ${quoteData.total.toFixed(2)}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed!",
      cancelButtonText: "Review Order",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/shipping/", { state: quoteData });
      }
    });
  };

  const { orderedItems, total, labeledTotal, discount, message } = quoteData;

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        🛒 Your Order Summary
      </h2>

      <p className="p-3 text-sm text-yellow-700 bg-yellow-100 rounded-lg text-center mb-6">
        {message}
      </p>

      {user && orderedItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Product", "Price", "Qty", "Subtotal", "Action"].map((title) => (
                  <th key={title} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {orderedItems.map((item) => {
                const subtotal = item.qty * item.lastPrice;
                return (
                  <tr key={item.productId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.productName}
                      <span className="text-xs text-gray-500 block">({item.productId})</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {item.lastPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.qty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">Rs. {subtotal.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold cursor-pointer">
                      <button onClick={() => handleDelete(item.productId)} className="hover:underline">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr className="bg-gray-100 border-t border-gray-300">
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-600">Price Total</td>
                <td className="px-6 py-3 text-sm font-bold text-gray-700">Rs. {labeledTotal.toFixed(2)}</td>
                <td></td>
              </tr>
              <tr className="bg-yellow-100 border-t border-yellow-300">
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-yellow-800">Discount</td>
                <td className="px-6 py-3 text-sm font-bold text-yellow-800">Rs. {discount.toFixed(2)}</td>
                <td></td>
              </tr>
              <tr className="bg-green-100 border-t border-green-300">
                <td colSpan="3" className="px-6 py-4 text-right text-base font-bold text-green-800">Total After Discount</td>
                <td className="px-6 py-4 text-base font-bold text-green-800">Rs. {total.toFixed(2)}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="5" className="pt-4 pb-2 text-right">
                  <button
                    onClick={handleCheckout}
                    disabled={!user || total <= 0}
                    className={`w-full sm:w-auto inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white transition duration-150 ease-in-out ${
                      total > 0 && user
                        ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Proceed to Checkout (Rs. {total.toFixed(2)})
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500">{message}</p>
      )}
    </div>
  );
}
