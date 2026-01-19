import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Lock, Edit, Save, X, Package, ShoppingBag, 
  Shield, LogOut, CreditCard, Truck, CheckCircle 
} from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: ''
  });

  /* ===========================================================
  🟢 NEW: IDENTIFY AUTHENTICATION METHOD
  මෙමගින් පරිශීලකයා Google ද Manual ද යන්න හඳුනා ගනී.
  ===========================================================
  */
  const isGoogleUser = user && user.googleId;
  /* ======================================================= */

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userRes = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/me', {
          headers: getAuthHeader()
        });

        if (userRes.data && userRes.data.user) {
          const userData = userRes.data.user;
          setUser(userData);
          setEditForm({
            name: userData.name || '',
            lastname: userData.lastname || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: userData.address || ''
          });
        }

        const ordersRes = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/orders/my-orders', {
          headers: getAuthHeader()
        });
        
        if (ordersRes.data.success) {
          setOrders(ordersRes.data.orders || []);
        }
      } catch (error) {
        console.error('Error:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  /* ===========================================================
  🟢 NOTE: ADDRESS & PHONE UPDATE WORK FOR ALL USERS
  මෙම function එක Google සහ Manual යන දෙපාර්ශවයටම Address update කිරීමට ඉඩ දෙයි.
  ===========================================================
  */
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.put(import.meta.env.VITE_BACKEND_URL + '/api/users/me', editForm, {
        headers: getAuthHeader()
      });
      if (res.data) {
        setUser(res.data.user || res.data);
        Swal.fire({ icon: 'success', title: 'Profile Updated!', timer: 1500, showConfirmButton: false });
        setEditing(false);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Update Failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    /* ===========================================================
    🟢 UPDATED: PREVENT PASSWORD CHANGE FOR GOOGLE USERS
    Google users ලාට Password වෙනස් කිරීමට ඉඩ නොදේ.
    ===========================================================
    */
    if (isGoogleUser) {
      Swal.fire({ 
        icon: 'info', 
        title: 'Google Login Active', 
        text: 'You don\'t have a local password. Please manage security via Google.' 
      });
      return;
    }
    /* ======================================================= */

    const { value: formValues } = await Swal.fire({
      title: 'Change Password',
      html: `
        <input id="current-password" type="password" class="swal2-input" placeholder="Current Password">
        <input id="new-password" type="password" class="swal2-input" placeholder="New Password">
        <input id="confirm-password" type="password" class="swal2-input" placeholder="Confirm New Password">
      `,
      showCancelButton: true,
      preConfirm: () => {
        const current = document.getElementById('current-password').value;
        const newPass = document.getElementById('new-password').value;
        const confirm = document.getElementById('confirm-password').value;
        if (!current || !newPass || !confirm) return Swal.showValidationMessage('Fill all fields');
        return { currentPassword: current, newPassword: newPass };
      }
    });

    if (formValues) {
       Swal.fire({ icon: 'success', title: 'Success!' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading && !user) return <div className="text-center mt-20">Loading Profile...</div>;
  if (!user) return <div className="text-center mt-20">No user logged in.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            My Account
            {isGoogleUser && <span className="ml-3 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full border border-blue-200">Google User</span>}
          </h1>
          <button onClick={handleLogout} className="text-red-600 flex items-center font-medium"><LogOut className="h-5 w-5 mr-2" /> Logout</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center"><User className="h-5 w-5 mr-2 text-blue-500" /> Personal Details</h2>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="text-blue-600 flex items-center"><Edit className="h-4 w-4 mr-1" /> Edit Profile</button>
                ) : (
                  <div className="flex space-x-2">
                    <button onClick={handleSaveProfile} className="bg-green-600 text-white px-4 py-1.5 rounded-lg flex items-center shadow-sm hover:bg-green-700 transition-colors"><Save className="h-4 w-4 mr-1" /> Save Details</button>
                    <button onClick={() => setEditing(false)} className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg flex items-center hover:bg-gray-200 transition-colors"><X className="h-4 w-4 mr-1" /> Cancel</button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">First Name</label>
                  {editing ? <input name="name" value={editForm.name} onChange={handleEditChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" /> : <p className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">{user.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">Last Name</label>
                  {editing ? <input name="lastname" value={editForm.lastname} onChange={handleEditChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" /> : <p className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">{user.lastname || 'N/A'}</p>}
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">Phone Number</label>
                  {editing ? <input name="phone" value={editForm.phone} onChange={handleEditChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" /> : <p className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">{user.phone || 'Not provided'}</p>}
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">Email (Read-only)</label>
                  <p className="p-2.5 bg-gray-100 rounded-lg border border-gray-200 text-gray-500 flex items-center"><Mail className="h-4 w-4 mr-2" /> {user.email}</p>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-semibold text-gray-600 mb-1 block">Delivery Address</label>
                {editing ? (
                  <textarea name="address" value={editForm.address} onChange={handleEditChange} rows="3" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter your full shipping address"></textarea>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                    <p className="text-gray-700">{user.address || 'No address added yet.'}</p>
                  </div>
                )}
              </div>

              {/* ===========================================================
              🟢 UPDATED: SECURITY SECTION (CONDITIONAL)
              Google user කෙනෙක් වුවද ඉහත Address update කිරීමට ඉඩ ඇති අතර, 
              පහත Password කොටස පමණක් වෙනස් වේ.
              ===========================================================
              */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center"><Shield className="h-5 w-5 mr-2 text-green-500" /> Account Security</h3>
                
                {isGoogleUser ? (
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start text-blue-700">
                    <Shield className="h-5 w-5 mr-3 mt-1" />
                    <div>
                      <p className="font-bold text-sm">Linked with Google</p>
                      <p className="text-xs mt-1 leading-relaxed">Your account is secured by Google. Addresses and other info can be updated here, but password settings are managed by Google security.</p>
                    </div>
                  </div>
                ) : (
                  <button onClick={handleChangePassword} className="flex items-center text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 transition-all font-medium">
                    <Lock className="h-4 w-4 mr-2" /> Change Password
                  </button>
                )}
              </div>
              {/* ======================================================= */}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <button onClick={() => navigate('/orders')} className="w-full text-left p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center transition-colors">
                  <Package className="h-5 w-5 mr-3 text-amber-500" /> 
                  <span className="font-medium text-gray-700">My Orders</span>
                </button>
                
                {/* =======================================================
                🟢 UPDATED: Visual feedback for Password action
                ======================================================= */}
                <button 
                  onClick={handleChangePassword} 
                  disabled={isGoogleUser}
                  className={`w-full text-left p-3.5 rounded-xl flex items-center transition-all ${
                    isGoogleUser ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Lock className={`h-5 w-5 mr-3 ${isGoogleUser ? 'text-gray-300' : 'text-blue-500'}`} /> 
                  <div>
                    <p className={`text-sm font-semibold ${isGoogleUser ? 'text-gray-400' : 'text-gray-700'}`}>Security Settings</p>
                    {isGoogleUser && <p className="text-[10px] text-blue-500 uppercase font-bold tracking-wider">Google Managed</p>}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}