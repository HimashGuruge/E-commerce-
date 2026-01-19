import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FiImage, FiPackage, FiTag, FiDollarSign, FiHash, 
  FiRefreshCw, FiArrowLeft, FiTrash2, FiEdit2, 
  FiUpload, FiInfo, FiCheck, FiPercent, FiBox
} from "react-icons/fi";
import { 
  TbCategory, TbBarcode,
  TbTrendingUp, TbTrendingDown 
} from "react-icons/tb";
import Swal from "sweetalert2";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const productData = location.state?.product;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [formData, setFormData] = useState({
    productId: "", 
    productName: "", 
    altNames: "", 
    price: "", 
    lastPrices: "", 
    stock: "", 
    description: "", 
    category: "General", 
    brand: "Unbranded",
    tags: [],
    discount: 0
  });

  const categories = [
    { value: "electronics", label: "Electronics", icon: "💻" },
    { value: "clothing", label: "Fashion", icon: "👕" },
    { value: "home", label: "Home & Garden", icon: "🏠" },
    { value: "sports", label: "Sports", icon: "⚽" },
    { value: "books", label: "Books", icon: "📚" },
    { value: "beauty", label: "Beauty", icon: "💄" },
    { value: "general", label: "General", icon: "📦" }
  ];

  const brands = [
    { value: "apple", label: "Apple", icon: "🍎" },
    { value: "samsung", label: "Samsung", icon: "📱" },
    { value: "nike", label: "Nike", icon: "👟" },
    { value: "sony", label: "Sony", icon: "🎮" },
    { value: "unbranded", label: "Unbranded", icon: "🏷️" }
  ];

  useEffect(() => {
    if (!productData) {
      Swal.fire({
        icon: 'error',
        title: 'No Product Data',
        text: 'Please select a product to edit',
        background: '#1e293b',
        color: '#f8fafc',
        confirmButtonColor: '#3b82f6'
      });
      navigate("/admin/dashboard/adminviewproducts");
      return;
    }
    setFormData({
      productId: productData.productId || "",
      productName: productData.productName || "",
      altNames: productData.altNames?.join(", ") || "",
      price: productData.price || "",
      lastPrices: productData.lastPrices || productData.price || "",
      stock: productData.stock || "",
      description: productData.description || "",
      category: productData.category || "General",
      brand: productData.brand || "Unbranded",
      tags: productData.tags || [],
      discount: productData.discount || 0
    });
    setExistingImageUrls(productData.images || []);
    setLoading(false);
  }, [productData, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const calculateDiscountPercentage = () => {
    if (!formData.price || !formData.lastPrices) return 0;
    const diff = formData.lastPrices - formData.price;
    return ((diff / formData.lastPrices) * 100).toFixed(1);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.slice(0, 6 - existingImageUrls.length - newImages.length);
    setNewImages(prev => [...prev, ...validFiles]);
  };

  const removeImage = (index, type = 'existing') => {
    if (type === 'existing') {
      setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
    } else {
      setNewImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    if (!formData.productName || !formData.price) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Product name and price are required',
        background: '#1e293b',
        color: '#f8fafc',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    setSaving(true);
    try {
      let uploadedUrls = [];
      if (newImages.length > 0) {
        uploadedUrls = await Promise.all(
          newImages.map(file => uploadMediaToSupabase(file, "images"))
        );
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        lastPrices: parseFloat(formData.lastPrices),
        stock: parseInt(formData.stock) || 0,
        altNames: formData.altNames.split(",").map(n => n.trim()).filter(n => n),
        images: [...existingImageUrls, ...uploadedUrls],
        updatedAt: new Date().toISOString(),
        discountPercentage: calculateDiscountPercentage()
      };

      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`, 
        payload, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        text: 'Changes have been saved successfully',
        timer: 2000,
        showConfirmButton: false,
        background: '#1e293b',
        color: '#f8fafc'
      });
      
      setTimeout(() => {
        navigate("/admin/dashboard/adminviewproducts");
      }, 1500);
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Please try again',
        background: '#1e293b',
        color: '#f8fafc',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Loading product editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 font-sans">
      <button
        onClick={() => navigate("/admin/dashboard/adminviewproducts")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Products</span>
      </button>

      <div className="max-w-6xl mx-auto pt-8">
        <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 mb-6 border border-gray-100 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-100">
                <FiPackage className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  Edit Product
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg border border-blue-200">Editing Mode</span>
                </h1>
                <p className="text-gray-600 mt-1">Update product information, media, and pricing</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Product ID</div>
                <div className="flex items-center gap-2">
                  <TbBarcode className="text-blue-500" />
                  <code className="font-mono font-bold text-lg text-gray-900 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                    {formData.productId}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <FiEdit2 className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FiTag className="text-blue-500" />
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition hover:border-gray-400"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FiHash className="text-cyan-500" />
                    Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition hover:border-gray-400"
                    placeholder="iPhone 15 Pro, Smartphone, Mobile"
                  />
                  <p className="text-xs text-gray-500 mt-2 italic">Separate multiple names with commas</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <TbCategory className="text-purple-600" />
                    Category & Brand
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400"
                      >
                        {brands.map(brand => (
                          <option key={brand.value} value={brand.value}>
                            {brand.icon} {brand.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                  <FiDollarSign className="text-emerald-600 text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Pricing & Stock</h2>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <TbTrendingDown className="text-emerald-600" />
                      Current Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:border-gray-400"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <TbTrendingUp className="text-amber-600" />
                      Previous Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        name="lastPrices"
                        value={formData.lastPrices}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 hover:border-gray-400"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <FiPercent className="text-rose-600" />
                      Discount
                    </label>
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
                      <div className="text-2xl font-bold text-rose-700 text-center">
                        {calculateDiscountPercentage()}%
                      </div>
                      <div className="text-xs text-rose-600 text-center mt-1">Savings</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FiBox className="text-blue-600" />
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    placeholder="Enter stock quantity"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 rounded-lg border border-rose-100">
                    <FiImage className="text-rose-600 text-xl" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Media Gallery</h2>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {existingImageUrls.length + newImages.length}/6
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {existingImageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-rose-400 transition">
                        <img src={url} alt="Product" className="w-full h-full object-cover" />
                      </div>
                      <button onClick={() => removeImage(index, 'existing')} className="absolute -top-2 -right-2 bg-rose-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {newImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-xl overflow-hidden border-2 border-blue-300 bg-blue-50">
                        <img src={URL.createObjectURL(file)} alt="New upload" className="w-full h-full object-cover" />
                      </div>
                      <button onClick={() => removeImage(index, 'new')} className="absolute -top-2 -right-2 bg-rose-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {existingImageUrls.length + newImages.length < 6 && (
                    <label className="aspect-square flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group">
                      <FiUpload className="text-gray-400 group-hover:text-blue-500 text-xl" />
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
                  <FiInfo className="text-purple-600 text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Description</h2>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none hover:border-gray-400"
                placeholder="Describe product features..."
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="space-y-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
                >
                  {saving ? (
                    <><FiRefreshCw className="animate-spin" /> Saving...</>
                  ) : (
                    <><FiCheck /> Update Product</>
                  )}
                </button>

                <button
                  onClick={() => navigate("/admin/dashboard/adminviewproducts")}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 border border-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}