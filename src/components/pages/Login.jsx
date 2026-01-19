import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
  try {
    // 1. Google වලින් ලැබෙන ID Token එක Backend එකට යැවීම
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
      token: response.credential 
    });

    // 2. ලැබෙන JWT Token එක LocalStorage හි 'token' ලෙස Save කිරීම
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      
      // ඔබට අවශ්‍ය නම් User ගේ අනෙක් විස්තරත් Save කළ හැක
      localStorage.setItem("userRole", res.data.role);

      // Auth state එක වෙනස් වූ බව දැනුම් දීමට Event එකක් Dispatch කිරීම (Optional)
      window.dispatchEvent(new Event("storage"));

      toast.success("Login successful!");

      // 3. Role එක අනුව අදාළ Dashboard එකට යැවීම
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  } catch (error) {
    console.error("Login Error:", error);
    toast.error(error.response?.data?.message || "Google Authentication Failed");
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-2xl font-bold text-center">Welcome Back</h2>
        
        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => toast.error("Login Failed")}
          useOneTap
          shape="pill"
        />
      </div>
    </div>
  );
}