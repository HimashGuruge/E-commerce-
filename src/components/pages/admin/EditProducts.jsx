import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const existingProduct = location.state?.product || null;

  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    productId: existingProduct?.productId || uuidv4(),
    productName: existingProduct?.productName || "",
    altNames: existingProduct?.altNames?.join(",") || "",
    price: existingProduct?.price || 0,
    lastPrices: existingProduct?.lastPrices || 0,
    stock: existingProduct?.stock || 0,
    description: existingProduct?.description || "",
    category: existingProduct?.category || "General",
    brand: existingProduct?.brand || "Unbranded",
    images: existingProduct?.images || [],
  });

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  const handleUpload = async () => {
    try {
      const uploadedImages = images.length
        ? await Promise.all(Array.from(images).map(uploadMediaToSupabase))
        : [];

      const payload = {
        ...formData,
        altNames: formData.altNames.split(",").map((n) => n.trim()),
        images: [...formData.images, ...uploadedImages],
      };

      if (existingProduct) {
        await axios.patch(
          `http://localhost:4000/api/products/${formData.productId}`,
          payload,
          { headers: { Authorization: "Bearer " + token } }
        );
      } else {
        await axios.post(`http://localhost:4000/api/products`, payload, {
          headers: { Authorization: "Bearer " + token },
        });
      }

      setImages([]);
      setFormData({ ...formData, images: payload.images });

      // ✅ SweetAlert2 success alert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product saved successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/admin/dashboard/adminviewproducts");
      });
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save product. Try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

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

        {[
          "productName",
          "altNames",
          "price",
          "lastPrices",
          "stock",
          "description",
          "category",
          "brand",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            {field === "description" ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <input
                type={
                  ["price", "lastPrices", "stock"].includes(field)
                    ? "number"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            )}
          </div>
        ))}

        <div>
          <label className="block mb-1">Product Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="w-full border p-2 rounded bg-gray-50"
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {formData.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="product"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300"
        >
          {existingProduct ? "Update Product" : "Upload & Save Product"}
        </button>
      </div>
    </div>
  );
}
