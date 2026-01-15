import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google"; // 👈 Google login import කළා
import {
  User as UserIcon,
  Mail,
  Lock,
  Image as ImageIcon,
  UserCircle,
  ArrowRight,
  Loader2,
  Camera,
  Phone,
  MapPin
} from "lucide-react";
import uploadMediaToSupabase from "@/components/utils/mediaupload";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "user",
    profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Google Login Logic ---
  const googlelogin = useGoogleLogin({
    onSuccess: async (res) => {
      setLoading(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, { 
          token: res.access_token 
        });

        const data = response.data;
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("authChange"));

        if (data.message === 'User created') {
          toast.success("Account created and logged in!");
        } else {
          toast.success("Login successful!");
        }

        // Role එක අනුව Navigate කිරීම
        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        toast.error("Google login failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => toast.error("Google authentication failed")
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = formData.profileImage;

      if (selectedFile) {
        try {
          imageUrl = await uploadMediaToSupabase(selectedFile);
        } catch (uploadErr) {
          throw new Error("Image upload failed. Please try again.");
        }
      }

      const finalData = { ...formData, profileImage: imageUrl };
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, finalData);

      toast.success("Registration successful!");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        
        <div className="bg-blue-600 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
            <UserCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Join Us</h2>
          <p className="text-blue-100 text-sm mt-1">Create your account to get started</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          {/* Google Sign In Button - Added Here */}
          <button
            type="button"
            onClick={() => googlelogin()}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl hover:bg-slate-50 transition-all shadow-sm mb-6 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or Register with Email</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Preview & Upload */}
            <div className="flex flex-col items-center mb-6">
              <label className="relative cursor-pointer group">
                <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group-hover:border-blue-400 transition-all">
                  {selectedFile ? (
                    <img src={URL.createObjectURL(selectedFile)} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="text-slate-300 group-hover:text-blue-500" size={24} />
                  )}
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg shadow-lg border-2 border-white">
                  <ImageIcon size={12} />
                </div>
              </label>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">First Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input type="text" name="name" placeholder="John" value={formData.name} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">Last Name</label>
                <input type="text" name="lastname" placeholder="Doe" value={formData.lastname} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input type="email" name="email" placeholder="john@mail.com" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input type="text" name="phone" placeholder="077..." value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input type="text" name="address" placeholder="123 Street, Colombo" value={formData.address} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required minLength={6} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Register Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 text-sm font-medium">
            Already a member?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}