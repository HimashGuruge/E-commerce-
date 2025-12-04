import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageSlider from "@/components/imageSlider";
import { addToCart } from "../utils/cart";

export default function ProductOverview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Loading product...
      </div>
    );

  if (error || !product)
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        {error || "Product not found"}
      </div>
    );

  const data = product.product;

  // --- Buy Now Handler ---
  const handleBuyNow = () => {
    if (data.stock <= 0) return;

    navigate(`/shipping/?productId=${data.productId}&productName=${data.productName}`, {
      state: {
        orderedItems: [
          {
            productId: data.productId,
            productName: data.productName,
            price: data.price,
            lastPrice: data.lastPrices,
            qty: 1,
          },
        ],
        total: data.lastPrices,
        labeledTotal: data.price,
        discount: data.price - data.lastPrices,
        message: "Buying single product now",
      },
    });
  };

  // --- Add to Cart Handler ---
  const handleAddToCart = () => {
    if (data.stock <= 0) return;
    addToCart(data.productId, 1);
    alert("Product added to cart");
  };

  return (
    <div className="min-h-screen w-full bg-amber-50 flex flex-col lg:flex-row items-center justify-center py-6 px-4 sm:px-6 gap-6">
      {/* Left: Image Slider */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md h-full hidden lg:block">
          <ImageSlider images={data.images} />
        </div>
        <div className="w-[300px] h-[300px] lg:hidden flex items-center justify-center">
          <ImageSlider images={data.images} />
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start bg-white rounded-2xl shadow-xl p-6 sm:p-8 border max-w-lg">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center lg:text-left">
          {data.productName}
        </h1>

        {/* Price Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-4 mb-4 justify-center lg:justify-start">
          {data.price > data.lastPrices && (
            <p className="text-red-600 text-lg sm:text-xl line-through font-medium">
              LKR {data.price.toFixed(2)}
            </p>
          )}
          <p className="text-3xl sm:text-4xl text-green-600 font-bold">
            LKR {data.lastPrices.toFixed(2)}
          </p>
        </div>

        {/* Stock */}
        <p
          className={`text-center px-3 py-2 rounded-full text-white font-medium mb-6 text-base ${
            data.stock > 0 ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {data.stock > 0 ? `In Stock (${data.stock})` : "Out of Stock"}
        </p>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 text-center lg:text-left">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg text-center lg:text-left">
            {data.description}
          </p>
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow text-center sm:text-left">
            <p className="text-sm sm:text-base text-gray-500">Category</p>
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              {data.category}
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow text-center sm:text-left">
            <p className="text-sm sm:text-base text-gray-500">Brand</p>
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              {data.brand}
            </p>
          </div>
        </div>

        {/* Add to Cart & Buy Now */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
            onClick={handleAddToCart}
            disabled={data.stock <= 0}
          >
            Add to Cart
          </button>

          <button
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
            onClick={handleBuyNow}
            disabled={data.stock <= 0}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
