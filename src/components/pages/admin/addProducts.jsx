import React, { useState } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function AddProducts() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect if no token
  if (!token) navigate("/login");

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

  const handleUpload = async () => {
    try {
      // Upload images
      const imgUrls = await Promise.all(
        Array.from(images).map(uploadMediaToSupabase)
      );

      // Prepare payload
      const payload = {
        ...formData,
        altNames: formData.altNames.split(",").map((n) => n.trim()),
        images: imgUrls,
      };

      const res = await axios.post(
        "http://localhost:4000/api/products",
        payload,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      console.log("Product saved:", res.data);
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  // Simple input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">Product ID</label>
          <input
            type="text"
            value={formData.productId}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">
            Alternate Names (comma separated)
          </label>
          <input
            type="text"
            name="altNames"
            value={formData.altNames}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Last Price</label>
          <input
            type="number"
            name="lastPrices"
            value={formData.lastPrices}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Product Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="w-full border p-2 rounded bg-gray-50"
          />
        </div>

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
