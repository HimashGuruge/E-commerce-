import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Truck, Package, CreditCard, Shield, CheckCircle, ArrowLeft, Lock, MapPin, User, Phone, Edit, Plus, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Shipping() {
  const location = useLocation();
  const navigate = useNavigate();
  const quoteData = location.state;

  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);

  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    phone: '+94 77 123 4567',
    email: 'john@example.com'
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    type: 'Home',
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
    isDefault: false
  });

  // ✅ FIX: Proper auth header with Bearer prefix
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ✅ FIX: Fetch addresses from API with correct endpoint and headers
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to continue',
      });
      navigate('/login');
      return;
    }

    const fetchAddresses = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/addresses', {
          headers: getAuthHeader()
        });
        
        if (res.data && Array.isArray(res.data)) {
          // ✅ FIX: Map _id to id for frontend compatibility
          const mappedAddresses = res.data.map(addr => ({
            id: addr._id, // Map MongoDB _id to id
            ...addr
          }));
          
          setAddresses(mappedAddresses);
          const defaultAddr = mappedAddresses.find(addr => addr.isDefault) || mappedAddresses[0];
          setSelectedAddress(defaultAddr || null);
        } else {
          console.error('Invalid response format:', res.data);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load addresses. Please try again.',
          timer: 3000,
        });
      }
    };
    
    fetchAddresses();
  }, []);




  // ✅ FIX: Fetch user info with correct endpoint
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/users/me', {
          headers: getAuthHeader()
        });
        
        if (res.data) {
          const userData = res.data.user || res.data;
          setUserInfo({
            name: userData.name || 'John Doe',
            phone: userData.phone || '+94 77 123 4567',
            email: userData.email || 'john@example.com'
          });
          
          // Pre-fill address form with user info
          setAddressForm(prev => ({
            ...prev,
            name: userData.name || '',
            phone: userData.phone || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    
    fetchUserInfo();
  }, []);

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // ✅ FIX: Save or update address with correct endpoint and headers
  const handleSaveAddress = async () => {
    if (!addressForm.name || !addressForm.phone || !addressForm.addressLine1 || !addressForm.city) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields (Name, Phone, Address, City)',
      });
      return;
    }

    try {
      setLoading(true);
      let response;

      if (editingAddressIndex !== null) {
        // Update existing address
        const addrId = addresses[editingAddressIndex].id;
        response = await axios.put(
          import.meta.env.VITE_BACKEND_URL+`/api/addresses/${addrId}`,
          addressForm,
          { headers: getAuthHeader() }
        );

        // ✅ FIX: Map response _id to id
        const updatedAddress = {
          id: response.data._id,
          ...response.data
        };

        const updatedAddresses = [...addresses];
        updatedAddresses[editingAddressIndex] = updatedAddress;
        setAddresses(updatedAddresses);
        setSelectedAddress(updatedAddress);

        Swal.fire({
          icon: 'success',
          title: 'Address Updated',
          timer: 1500,
          showConfirmButton: false
        });

      } else {
        // Add new address
        response = await axios.post(
          import.meta.env.VITE_BACKEND_URL+'/api/addresses',
          addressForm,
          { headers: getAuthHeader() }
        );

        // ✅ FIX: Map response _id to id
        const newAddress = {
          id: response.data._id,
          ...response.data
        };

        let updatedAddresses = [...addresses];
        if (addressForm.isDefault) {
          updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: false }));
        }

        updatedAddresses.push(newAddress);
        setAddresses(updatedAddresses);
        if (addressForm.isDefault || updatedAddresses.length === 1) {
          setSelectedAddress(newAddress);
        }

        Swal.fire({
          icon: 'success',
          title: 'Address Added',
          timer: 1500,
          showConfirmButton: false
        });
      }

      // Reset form
      setAddressForm({
        type: 'Home',
        name: userInfo.name,
        phone: userInfo.phone,
        addressLine1: '',
        addressLine2: '',
        city: '',
        province: '',
        postalCode: '',
        isDefault: false
      });
      setShowAddressForm(false);
      setEditingAddressIndex(null);

    } catch (error) {
      console.error('Save address error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX: Delete address with correct endpoint and headers
  const handleDeleteAddress = async (index) => {
    const addressId = addresses[index].id;

    const result = await Swal.fire({
      title: 'Delete Address?',
      text: 'Are you sure you want to delete this address?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(import.meta.env.VITE_BACKEND_URL+`/api/addresses/${addressId}`, {
          headers: getAuthHeader()
        });

        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);

        if (selectedAddress?.id === addressId) {
          setSelectedAddress(updatedAddresses[0] || null);
        }

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Address has been deleted successfully.',
          timer: 1500,
          showConfirmButton: false
        });

      } catch (error) {
        console.error('Delete address error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to delete address',
        });
      }
    }
  };

  // Edit address
  const handleEditAddress = (index) => {
    const address = addresses[index];
    setAddressForm({
      type: address.type || 'Home',
      name: address.name || '',
      phone: address.phone || '',
      addressLine1: address.addressLine1 || '',
      addressLine2: address.addressLine2 || '',
      city: address.city || '',
      province: address.province || '',
      postalCode: address.postalCode || '',
      isDefault: address.isDefault || false
    });
    setEditingAddressIndex(index);
    setShowAddressForm(true);
  };

  // ✅ FIX: Set default address with correct endpoint
  const handleSetDefaultAddress = async (index) => {
    try {
      const addrId = addresses[index].id;
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL+`/api/addresses/${addrId}`,
        { isDefault: true },
        { headers: getAuthHeader() }
      );

      const updatedAddresses = addresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index
      }));

      setAddresses(updatedAddresses);
      setSelectedAddress(updatedAddresses[index]);

      Swal.fire({
        icon: 'success',
        title: 'Default Address Updated',
        timer: 1500,
        showConfirmButton: false
      });

    } catch (error) {
      console.error('Set default address error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to set default address',
      });
    }
  };

  // ✅ FIX: Update user info with correct endpoint
  const handleUserInfoUpdate = async () => {
    const { value: formData } = await Swal.fire({
      title: 'Update Contact Information',
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Full Name" value="${userInfo.name}">
        <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${userInfo.phone}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${userInfo.email}" disabled>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: () => {
        const name = document.getElementById('swal-name').value;
        const phone = document.getElementById('swal-phone').value;
        const email = userInfo.email;
        
        if (!name || !phone) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }
        return { name, phone, email };
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (formData) {
      try {
        setLoading(true);
        const res = await axios.put(
          import.meta.env.VITE_BACKEND_URL+'/api/users/me',
          formData,
          { headers: getAuthHeader() }
        );
        
        const updatedUser = res.data.user || res.data;
        setUserInfo({
          name: updatedUser.name || userInfo.name,
          phone: updatedUser.phone || userInfo.phone,
          email: updatedUser.email || userInfo.email
        });
        
        // Update address form with new user info
        setAddressForm(prev => ({
          ...prev,
          name: updatedUser.name || '',
          phone: updatedUser.phone || ''
        }));

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Your contact information has been updated.',
          timer: 1500,
          showConfirmButton: false
        });

      } catch (error) {
        console.error('Update user info error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to update info',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Proceed to payment
  const handleProceedToPayment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({ 
        icon: 'warning', 
        title: 'Authentication Required', 
        text: 'Please log in to continue.' 
      });
      navigate('/login');
      return;
    }

    if (!quoteData || quoteData.total <= 0) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Order Error', 
        text: 'Cannot proceed to payment. Order data missing or total is zero.' 
      });
      return;
    }
    
    if (!selectedAddress) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Shipping Address Required', 
        text: 'Please select or add a shipping address.' 
      });
      return;
    }

    setLoading(true);
    try {
      await Swal.fire({ 
        title: 'Processing Order...', 
        html: 'Preparing your order for payment', 
        allowOutsideClick: false, 
        timer: 1000, 
        didOpen: () => Swal.showLoading() 
      });
      
      navigate(`/payment/?username=${userInfo.name}/&productName=${encodeURIComponent(quoteData.orderedItems[0].productName)}`, {
        state: { 
          orderData: { 
            ...quoteData, 
            items: quoteData.orderedItems, 
            timestamp: new Date().toISOString(), 
            orderId: `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random()*1000)}`, 
            shippingAddress: selectedAddress, 
            userInfo: userInfo 
          } 
        }
      });
    } catch (error) {
      console.error('Proceed to payment error:', error);
      Swal.fire({ 
        icon: 'error', 
        title: 'Processing Failed', 
        text: 'There was an error processing your order.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoToCart = () => {
    navigate('/viewcart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleGoToCart}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shipping & Order Confirmation</h1>
              <p className="text-gray-600">Review your order and shipping details before payment</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary & Shipping */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  Shipping Address
                </h2>
                <button
                  onClick={() => {
                    setAddressForm({
                      type: 'Home',
                      name: userInfo.name,
                      phone: userInfo.phone,
                      addressLine1: '',
                      addressLine2: '',
                      city: '',
                      province: '',
                      postalCode: '',
                      isDefault: false
                    });
                    setEditingAddressIndex(null);
                    setShowAddressForm(true);
                  }}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Address
                </button>
              </div>

              {/* Contact Information */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Contact Information
                  </h3>
                  <button
                    onClick={handleUserInfoUpdate}
                    className="text-sm text-blue-600 hover:text-blue-700"
                    disabled={loading}
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="font-medium">{userInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-medium">{userInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{userInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* Address Selection */}
              {showAddressForm ? (
                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                  <h3 className="font-bold text-gray-800 mb-4">
                    {editingAddressIndex !== null ? 'Edit Address' : 'Add New Address'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Type
                      </label>
                      <select
                        name="type"
                        value={addressForm.type}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={addressForm.name}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={addressForm.phone}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={addressForm.addressLine1}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={addressForm.addressLine2}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={addressForm.city}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Province
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={addressForm.province}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={addressForm.postalCode}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={addressForm.isDefault}
                      onChange={handleAddressFormChange}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      id="defaultAddress"
                      disabled={loading}
                    />
                    <label htmlFor="defaultAddress" className="ml-2 text-sm text-gray-700">
                      Set as default shipping address
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveAddress}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : (editingAddressIndex !== null ? 'Update Address' : 'Save Address')}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddressIndex(null);
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.length > 0 ? (
                    addresses.map((address, index) => (
                      <div
                        key={address.id || index}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedAddress?.id === address.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedAddress(address)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className={`p-1 rounded mr-2 ${
                              address.type === 'Home' ? 'bg-green-100 text-green-800' :
                              address.type === 'Work' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              <span className="text-xs font-medium">{address.type || 'Home'}</span>
                            </div>
                            {address.isDefault && (
                              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAddress(index);
                              }}
                              className="p-1 text-gray-500 hover:text-blue-600"
                              disabled={loading}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(index);
                              }}
                              className="p-1 text-gray-500 hover:text-red-600"
                              disabled={loading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">{address.name}</p>
                          <p className="text-gray-600">{address.phone}</p>
                          <p className="mt-2">{address.addressLine1}</p>
                          {address.addressLine2 && (
                            <p>{address.addressLine2}</p>
                          )}
                          <p>{address.city}{address.province ? `, ${address.province}` : ''} {address.postalCode || ''}</p>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          {!address.isDefault && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetDefaultAddress(index);
                              }}
                              className="text-xs text-blue-600 hover:text-blue-700"
                              disabled={loading}
                            >
                              Set as Default
                            </button>
                          )}
                          {selectedAddress?.id === address.id && (
                            <span className="text-xs text-green-600 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Selected
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No addresses saved yet.</p>
                      <p className="text-sm text-gray-400 mt-1">Add an address to continue</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-amber-500" />
                  Order Summary
                </h2>
                <span className="text-sm font-medium text-gray-500">
                  {quoteData?.orderedItems?.length || 0} item(s)
                </span>
              </div>

              {quoteData ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900">Rs. {quoteData.total?.toFixed(2)}</p>
                        {quoteData.discount > 0 && (
                          <p className="text-sm text-green-600 mt-1">
                            You saved Rs. {quoteData.discount?.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <CreditCard className="h-8 w-8 text-amber-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>Rs. {quoteData.labeledTotal?.toFixed(2)}</span>
                    </div>
                    {quoteData.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>- Rs. {quoteData.discount?.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-lg">Rs. {quoteData.total?.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Order Items:</h3>
                    <div className="space-y-3">
                      {quoteData.orderedItems?.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.productName} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <Package className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.productName}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              Rs. {(item.lastPrice * item.qty).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              Rs. {item.lastPrice.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No order data found. Please return to cart.</p>
                  <button
                    onClick={handleGoToCart}
                    className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Go to Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Confirmation & Payment Button */}
          <div className="lg:col-span-1 space-y-6">
            {/* Payment Methods Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                Payment Options
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Credit/Debit Card</p>
                    <p className="text-xs text-gray-500 mt-1">Visa, MasterCard, American Express</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <svg className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Digital Wallets</p>
                    <p className="text-xs text-gray-500 mt-1">Apple Pay, Google Pay, Samsung Pay</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <svg className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Bank Transfer</p>
                    <p className="text-xs text-gray-500 mt-1">Direct bank payment</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Cash on Delivery</p>
                    <p className="text-xs text-gray-500 mt-1">Pay when you receive</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Security Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                Secure Checkout
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
                  <span>Your data is protected</span>
                </li>
              </ul>
            </div>

            {/* Order Confirmation Button */}
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Ready to Pay</h3>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Amount to Pay</p>
                    <p className="text-xs text-gray-500">Order #{quoteData ? `ORD-${Date.now().toString().slice(-6)}` : '-----'}</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    Rs. {quoteData?.total?.toFixed(2) || '0.00'}
                  </p>
                  {quoteData?.discount > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      You saved Rs. {quoteData.discount.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Payment Button */}
                <button
                  onClick={handleProceedToPayment}
                  disabled={!quoteData || quoteData.total <= 0 || loading || !selectedAddress}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    quoteData && quoteData.total > 0 && !loading && selectedAddress
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Preparing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By proceeding, you agree to our{' '}
                  <button className="text-purple-600 hover:text-purple-700">Terms & Conditions</button>
                </p>
              </div>

              {/* Help Text */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Need help?{' '}
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Contact Support
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}