import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { clearCart } from '@/components/utils/cart'; // 🛒 ඔයාගේ cart functions තියෙන path එක මෙතනට දාන්න

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderedata = location.state;

  // 1. Cash on Delivery (COD) Function
  const handleCOD = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to place this order as Cash on Delivery?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, place order!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:4000/api/payment/cod', orderedata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then((res) => {
          
          // ✅ සාර්ථක වූ පසු Cart එක clear කිරීම
          clearCart(); 

          Swal.fire({
            title: 'Success!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            navigate('/orders'); 
          });
        }).catch((err) => {
          Swal.fire('Error!', err.response?.data?.message || 'Order failed', 'error');
        });
      }
    });
  };

  // 2. Card Payment Function (PayHere Redirect Method)
  const handleCardPayment = async () => {
    try {
      // පේමන්ට් එක ලෑස්ති කරන අතරතුර Loading එකක් පෙන්වමු
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we redirect you to PayHere',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const formattedItems = orderedata.orderedItems.map(item => ({
        productId: item.productId,
        name: item.productName || item.name,
        qty: item.qty,
        price: item.lastPrice || item.price 
      }));

      // Backend එකට දත්ත යවා Hash එක සහ Order ID එක ලබා ගැනීම
      const response = await axios.post('http://localhost:4000/api/payment/generate-hash', {
        items: formattedItems,
        userDetails: {
          firstName: "Himash", 
          email: "himash@example.com",
          phone: "0771234567"
        }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const paymentData = response.data;
      
      // ✅ පේමන්ට් එකට Redirect වෙන්න කලින් Cart එක clear කිරීම
      clearCart(); 
      Swal.close(); 

      const payment = {
        sandbox: true,
        merchant_id: paymentData.merchant_id,
        return_url: "http://localhost:3001/orders", 
        cancel_url: "http://localhost:3001/cancel",
        notify_url: "http://localhost:4000/api/payment/notify", 
        order_id: paymentData.order_id,
        items: "Online Purchase",
        amount: paymentData.amount, 
        currency: paymentData.currency,
        hash: paymentData.hash,
        first_name: paymentData.first_name,
        last_name: paymentData.last_name,
        email: paymentData.email,
        phone: paymentData.phone,
        address: "No.1, Colombo Road",
        city: "Colombo",
        country: "Sri Lanka",
      };

      // Hidden Form එකක් සාදා Submit කිරීම
      const form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('action', 'https://sandbox.payhere.lk/pay/checkout');

      Object.keys(payment).forEach(key => {
        const hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', payment[key]);
        form.appendChild(hiddenField);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      Swal.fire('Error!', 'Card payment initialization failed.', 'error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-12 rounded-3xl shadow-2xl border border-blue-100 text-center max-w-lg w-full">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Checkout</h2>
        <p className="text-slate-500 mb-8 font-medium">කරුණාකර ඔබ කැමති ගෙවීම් ක්‍රමය තෝරන්න</p>
        
        <div className="flex flex-col gap-4">
          {/* Cash on Delivery Button */}
          <button 
            onClick={handleCOD}
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-4 px-12 rounded-2xl transition duration-300 transform hover:scale-105"
          >
            Cash on Delivery (COD)
          </button>

          {/* Card Payment Button */}
          <button 
            onClick={handleCardPayment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-2xl transition duration-300 transform hover:scale-105 shadow-xl"
          >
            Pay with Card (PayHere)
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-slate-400 text-sm">Safe & Secure Payments by PayHere</p>
        </div>
      </div>
    </div>
  );
}