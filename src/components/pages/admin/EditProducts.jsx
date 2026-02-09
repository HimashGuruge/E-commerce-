import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "../../utils/mediaupload.jsx"; // Fixed path to match your AddProducts import
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiImage,
  FiPackage,
  FiTag,
  FiDollarSign,
  FiHash,
  FiRefreshCw,
  FiArrowLeft,
  FiTrash2,
  FiEdit2,
  FiUpload,
  FiInfo,
  FiCheck,
  FiPercent,
  FiBox,
  FiShoppingCart,
} from "react-icons/fi";
import {
  TbCategory,
  TbBarcode,
  TbTrendingUp,
  TbTrendingDown,
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
    discount: 0,
  });

  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "Other"];

  useEffect(() => {
    if (!productData) {
      alert("No product data found. Redirecting...");
      navigate("/admin/dashboard/adminviewproducts");
      return;
    }
    setFormData({
      productId: productData.productId || "",
      productName: productData.productName || "",
      altNames: Array.isArray(productData.altNames) ? productData.altNames.join(", ") : productData.altNames || "",
      price: productData.price || "",
      lastPrices: productData.lastPrices || productData.price || "",
      stock: productData.stock || "",
      description: productData.description || "",
      category: productData.category || "General",
      brand: productData.brand || "Unbranded",
      discount: productData.discount || 0,
    });
    setExistingImageUrls(productData.images || []);
    setLoading(false);
  }, [productData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateDiscountPercentage = () => {
    if (!formData.price || !formData.lastPrices) return 0;
    const diff = formData.lastPrices - formData.price;
    return diff > 0 ? ((diff / formData.lastPrices) * 100).toFixed(1) : 0;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index, type = "existing") => {
    if (type === "existing") {
      setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    if (!formData.productName || !formData.price) {
      alert("Product name and price are required");
      return;
    }

    setSaving(true);
    try {
      let uploadedUrls = [];
      if (newImages.length > 0) {
        uploadedUrls = await Promise.all(
          newImages.map((file) => uploadMediaToSupabase(file))
        );
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        lastPrices: parseFloat(formData.lastPrices),
        stock: parseInt(formData.stock) || 0,
        altNames: formData.altNames.split(",").map((n) => n.trim()).filter((n) => n),
        images: [...existingImageUrls, ...uploadedUrls],
        updatedAt: new Date().toISOString(),
      };

      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${formData.productId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Product details saved successfully",
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => navigate("/admin/dashboard/adminviewproducts"), 1500);
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Action */}
        <button
          onClick={() => navigate("/admin/dashboard/adminviewproducts")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          <FiArrowLeft /> Back to Inventory
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header - Matching AddProducts Theme */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <FiEdit2 /> Edit Product
                </h1>
                <p className="text-blue-100 mt-2">Modify the existing product details and images</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 text-right">
                <div className="text-xs uppercase opacity-80 font-semibold tracking-wider">Product ID</div>
                <div className="text-xl font-mono font-bold">{formData.productId}</div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Side: General Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiShoppingCart className="mr-2 text-blue-500" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2 text-blue-500" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="e.g. iPhone, Smartphone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2 text-emerald-500" /> Sale Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price</label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {brands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiBox className="mr-2 text-amber-500" /> Stock Level
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Right Side: Media & Description */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2 text-rose-500" /> Media Gallery
                  </label>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {/* Existing Images */}
                    {existingImageUrls.map((url, index) => (
                      <div key={`old-${index}`} className="relative group aspect-square">
                        <img src={url} alt="" className="w-full h-full object-cover rounded-lg border shadow-sm" />
                        <button
                          onClick={() => removeImage(index, "existing")}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {/* New Images */}
                    {newImages.map((file, index) => (
                      <div key={`new-${index}`} className="relative group aspect-square">
                        <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover rounded-lg border-2 border-blue-400 shadow-sm" />
                        <button
                          onClick={() => removeImage(index, "new")}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                    
                    {/* Upload Slot */}
                    {(existingImageUrls.length + newImages.length) < 6 && (
                      <label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition hover:border-blue-400">
                        <FiUpload className="text-gray-400 text-xl" />
                        <span className="text-[10px] text-gray-500 mt-1 uppercase font-bold">Add</span>
                        <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Technical specs, features..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving ? <FiRefreshCw className="animate-spin" /> : <FiCheck />}
                    {saving ? "Saving Changes..." : "Update Product"}
                  </button>
                  <button
                    onClick={() => navigate("/admin/dashboard/adminviewproducts")}
                    className="px-8 py-4 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}