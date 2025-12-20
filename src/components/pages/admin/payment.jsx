import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Shield, Lock, CheckCircle, ArrowLeft, 
  Truck, Package, Wallet, DollarSign 
} from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (!orderData) {
      Swal.fire({
        icon: 'error',
        title: 'Order Data Missing',
        text: 'Please complete the shipping process first.',
      }).then(() => {
        navigate('/shipping');
      });
      return;
    }

    // Get user info from order data or fetch from API
    const token = localStorage.getItem('token');
    if (token && orderData.userInfo) {
      setUserInfo(orderData.userInfo);
    }
  }, [orderData, navigate]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
    } 
    // Format CVV to max 3-4 digits
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    }
    // Format expiry month/year
    else if (name === 'expiryMonth') {
      const formatted = value.replace(/\D/g, '').slice(0, 2);
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    }
    else if (name === 'expiryYear') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
    }
    else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateCardDetails = () => {
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
      return 'Please enter a valid 16-digit card number';
    }
    if (!cardDetails.cardName) {
      return 'Please enter the name on card';
    }
    if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
      return 'Please enter card expiry date';
    }
    const month = parseInt(cardDetails.expiryMonth);
    const year = parseInt(cardDetails.expiryYear);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    if (month < 1 || month > 12) {
      return 'Invalid expiry month';
    }
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      return 'Please enter a valid CVV';
    }
    return null;
  };

  const handlePlaceOrder = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please log in to complete your order.',
    });
    navigate('/login');
    return;
  }

  if (!orderData) {
    Swal.fire({
      icon: 'error',
      title: 'Order Error',
      text: 'Order data is missing. Please try again.',
    });
    return;
  }

  if (paymentMethod === 'card') {
    const validationError = validateCardDetails();
    if (validationError) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: validationError,
      });
      return;
    }
  }

  // Confirm with Swal first
  const result = await Swal.fire({
    title: 'Confirm Order',
    html: `... your summary HTML ...`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Place Order',
    cancelButtonText: 'Cancel'
  });

  if (!result.isConfirmed) return;

  setLoading(true);

  try {
    // Send order to backend
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + '/api/orders/payment', // your backend route
      {
        ...orderData,
        paymentMethod,
        cardDetails: paymentMethod === 'card' ? cardDetails : null
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const savedOrder = response.data;

    // Show success Swal
    await Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      html: `
        <p>Order #${savedOrder._id} has been placed successfully.</p>
        <p>Total: Rs. ${savedOrder.total?.toFixed(2)}</p>
      `,
      showConfirmButton: true
    });

    navigate('/orders'); // go to order list page
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Order Failed',
      text: error.response?.data?.message || 'Something went wrong!',
    });
  } finally {
    setLoading(false);
  }
};


  const handleBackToShipping = () => {
    navigate('/shipping', { state: { quoteData: orderData } });
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Order Found</h2>
          <p className="text-gray-600 mb-4">Please complete the shipping process first.</p>
          <button
            onClick={() => navigate('/shipping')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Shipping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackToShipping}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Shipping
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-500 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
              <p className="text-gray-600">Secure payment gateway - Your information is protected</p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-8 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Cart</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
            
            <div className="flex-1 h-1 bg-green-500 mx-4"></div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Shipping</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
            
            <div className="flex-1 h-1 bg-green-500 mx-4"></div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Payment</p>
                <p className="text-xs text-gray-500">Current Step</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                Select Payment Method
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'card' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <CreditCard className={`h-5 w-5 ${paymentMethod === 'card' ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-500">Pay with Visa, MasterCard</p>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'wallet' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'wallet' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <Wallet className={`h-5 w-5 ${paymentMethod === 'wallet' ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Digital Wallet</p>
                    <p className="text-sm text-gray-500">Apple Pay, Google Pay</p>
                  </div>
                  {paymentMethod === 'wallet' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'bank' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'bank' ? 'bg-purple-100' : 'bg-gray-100'}`}>
          <DollarSign className={`h-5 w-5 ${paymentMethod === 'bank' ? 'text-purple-600' : 'text-gray-600'}`} />

                  </div>
                  <div className="text-left">
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Direct bank payment</p>
                  </div>
                  {paymentMethod === 'bank' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                    paymentMethod === 'cod' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded ${paymentMethod === 'cod' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <Truck className={`h-5 w-5 ${paymentMethod === 'cod' ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive</p>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="ml-auto">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </button>
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-blue-500" />
                    Card Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        maxLength="19"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardDetails.cardName}
                        onChange={handleCardInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Month *
                        </label>
                        <input
                          type="text"
                          name="expiryMonth"
                          value={cardDetails.expiryMonth}
                          onChange={handleCardInputChange}
                          placeholder="MM"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          maxLength="2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Year *
                        </label>
                        <input
                          type="text"
                          name="expiryYear"
                          value={cardDetails.expiryYear}
                          onChange={handleCardInputChange}
                          placeholder="YYYY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          maxLength="4"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          maxLength="4"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-sm text-gray-600">
                        Your card details are encrypted and secure. We do not store your card information.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Payment Method Messages */}
              {paymentMethod !== 'card' && (
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <Shield className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {paymentMethod === 'wallet' && 'Digital Wallet Payment'}
                        {paymentMethod === 'bank' && 'Bank Transfer'}
                        {paymentMethod === 'cod' && 'Cash on Delivery'}
                      </h4>
                      <p className="text-gray-600">
                        {paymentMethod === 'wallet' && 'You will be redirected to your preferred digital wallet for secure payment.'}
                        {paymentMethod === 'bank' && 'Bank transfer details will be provided after order confirmation.'}
                        {paymentMethod === 'cod' && 'Pay when your order is delivered. Additional charges may apply.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2 text-amber-500" />
                Order Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rs. {orderData.labeledTotal?.toFixed(2)}</span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>- Rs. {orderData.discount?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Total Amount</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">Rs. {orderData.total?.toFixed(2)}</p>
                      {orderData.discount > 0 && (
                        <p className="text-sm text-green-600">
                          You saved Rs. {orderData.discount?.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Items in Order ({orderData.items?.length || 0})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {orderData.items?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.images?.[0] ? (
                            <img src={item.images[0]} alt={item.productName} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Package className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <p className="font-semibold">Rs. {(item.lastPrice * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Summary & Button */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Security Assurance */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Secure Payment
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>PCI DSS compliant</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>No card details stored</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Money-back guarantee</span>
                  </li>
                </ul>
              </div>

              {/* Payment Summary & Button */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Payment Summary</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Order #{orderData.orderId}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items Total</span>
                      <span>Rs. {orderData.labeledTotal?.toFixed(2)}</span>
                    </div>
                    {orderData.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>- Rs. {orderData.discount?.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total to Pay</span>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">Rs. {orderData.total?.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">including all taxes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mb-6">
                  <div className="flex items-start mb-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-purple-600 rounded mt-1 mr-2"
                      defaultChecked
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <button className="text-purple-600 hover:text-purple-700">Terms & Conditions</button>{' '}
                      and{' '}
                      <button className="text-purple-600 hover:text-purple-700">Privacy Policy</button>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    By completing this purchase, you agree to our terms and authorize the charge to your selected payment method.
                  </p>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>
                        Pay Rs. {orderData.total?.toFixed(2)}
                      </span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Secured by SSL encryption
                </p>
              </div>

              {/* Support Info */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Need help?{' '}
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Contact Customer Support
                  </button>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  You can cancel your order within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}