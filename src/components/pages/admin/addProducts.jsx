import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode"; // Correct import

export default function AddProducts() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    productId: uuidv4(),
    productName: "",
    altNames: "",
    price: 0,
    lastPrices: 0,
    stock: 0,
    description: "",
    category: "General",
    brand: "Unbranded",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        alert("You are not authorized to access this page.");
        navigate("/"); // redirect non-admin users
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const imgUrls = await Promise.all(
        Array.from(images).map(uploadMediaToSupabase)
      );

      const payload = {
        ...formData,
        altNames: formData.altNames.split(",").map((n) => n.trim()),
        images: imgUrls,
      };

      const res = await axios.post(
        "http://localhost:4000/api/products",
        payload,
        { headers: { Authorization: "Bearer " + token } }
      );

      console.log("Product saved:", res.data);
      alert("Product uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Failed to upload product.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <div className="space-y-4">
        {/* Form fields */}
        <input
          type="text"
          value={formData.productId}
          readOnly
          className="w-full border p-2 rounded bg-gray-100 text-gray-600"
        />
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="altNames"
          value={formData.altNames}
          onChange={handleChange}
          placeholder="Alternate Names"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="lastPrices"
          value={formData.lastPrices}
          onChange={handleChange}
          placeholder="Last Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="w-full border p-2 rounded bg-gray-50"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload & Save Product
        </button>
      </div>
    </div>
  );
}
