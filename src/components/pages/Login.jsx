import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  // පොදු සාර්ථක වීමේ ක්‍රියාවලිය (Common Login Success Logic)
  const handleLoginResponse = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userRole", data.role);
    
    // Navbar සහ අනෙකුත් තැන් වලට දැනුම් දීම
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("authChange"));

    toast.success(data.message || "Login successful!");

    if (data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  // --- 1. Manual Login Handler ---
  const handleManualLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, formData);
      if (res.data.success) {
        handleLoginResponse(res.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Google Login Handler ---
  const handleGoogleSuccess = async (response) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
        token: response.credential 
      });
      if (res.data.success) {
        handleLoginResponse(res.data);
      }
    } catch (error) {
      toast.error("Google Authentication Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-[2rem] border border-slate-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Welcome</h2>
          <p className="text-slate-400 mt-2 font-medium italic text-sm">Sign in to your account to continue</p>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleManualLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="email" 
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* Forget Password Link */}
          <div className="flex justify-end px-1">
            <Link to="/forgot-password" size="sm" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={20}/> Sign In</>}
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-1 h-[px] bg-slate-100"></div>
          <span className="px-4 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">OR LOGIN WITH</span>
          <div className="flex-1 h-[px] bg-slate-100"></div>
        </div>

        {/* Google Login Button */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Login Failed")}
            useOneTap
            shape="pill"
            theme="outline"
            width="100%"
          />
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create Account</Link>
        </p>

      </div>
    </div>
  );
}