import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageSlider from "@/components/imageSlider";
import { addToCart } from "../utils/cart";
import {
  FiShoppingCart,
  FiTag,
  FiInfo,
  FiArrowLeft,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import Swal from "sweetalert2";

// Delivery Fee එක මෙතන fix කරලා තියෙනවා
const DELIVERY_FEE = 350;

export default function ProductOverview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/api/products/${productId}`
        );
        if (response.data && response.data.product) {
          setProduct(response.data);
        } else {
          setError("Product data not found");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  // --- FIXED BUY NOW HANDLER ---
  const handleBuyNow = () => {
    if (!product?.product || product.product.stock <= 0) return;

    const subtotal = product.product.lastPrices * quantity;
    const finalTotal = subtotal + DELIVERY_FEE; // Delivery fee එක එකතු කිරීම

    Swal.fire({
      title: "Proceed to Checkout?",
      html: `
        <div class="text-left text-sm bg-gray-50 p-3 rounded-lg">
          <p>Product: <b>${product.product.productName}</b></p>
          <p>Subtotal: <b>Rs. ${subtotal.toLocaleString()}</b></p>
          <p class="text-blue-600">Delivery Fee: <b>Rs. ${DELIVERY_FEE.toLocaleString()}</b></p>
          <hr class="my-2"/>
          <p class="text-lg text-green-600">Total: <b>Rs. ${finalTotal.toLocaleString()}</b></p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      confirmButtonText: "Yes, Buy Now",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(
          `/shipping/?P_id=${product.product._id}&productId=${product.product.productId}`,
          {
            state: {
              orderedItems: [
                {
                  productId: product.product.productId,
                  productName: product.product.productName,
                  price: product.product.price,
                  lastPrice: product.product.lastPrices,
                  qty: quantity,
                  image: product.product.images?.[0] || "",
                },
              ],
              total: subtotal, // Original items total
              deliveryFee: DELIVERY_FEE, // Delivery fee එක pass කරනවා
              finalTotal: finalTotal, // මුළු මුදල pass කරනවා
              labeledTotal: product.product.price * quantity,
              discount: (product.product.price - product.product.lastPrices) * quantity,
              message: "Direct buy now",
            },
          }
        );
      }
    });
  };

  const handleAddToCart = async () => {
    if (!product?.product || product.product.stock <= 0) return;
    setAddingToCart(true);
    try {
      addToCart(product.product.productId, quantity);
      await Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  if (loading) return <div className="text-center mt-20 font-bold text-gray-600">Loading Product...</div>;
  if (error || !product?.product) return <div className="text-center mt-20 text-red-500 font-bold">{error || "Product Not Found"}</div>;

  const data = product.product;
  const hasDiscount = data.price > data.lastPrices;
  const discountPercentage = hasDiscount ? Math.round(((data.price - data.lastPrices) / data.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-white shadow-sm mb-6">
        <div className="container mx-auto px-4 py-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 font-bold">
            <FiArrowLeft /> Back
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Images */}
          <div className="lg:w-1/2 bg-white rounded-3xl p-6 shadow-sm">
            <ImageSlider images={data.images} showThumbnails={true} />
            <div className="mt-6 flex gap-4">
               <div className="flex-1 bg-blue-50 p-3 rounded-xl flex items-center gap-2 text-blue-700 font-bold text-sm">
                 <FiTruck /> Free Shipping
               </div>
               <div className="flex-1 bg-green-50 p-3 rounded-xl flex items-center gap-2 text-green-700 font-bold text-sm">
                 <FiShield /> Warranty
               </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-1/2 bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-sm text-gray-400 font-bold mb-2 uppercase tracking-widest">SKU: {data.productId}</p>
            <h1 className="text-3xl font-black text-gray-800 mb-4">{data.productName}</h1>
            
            <div className="mb-6 flex items-center gap-4">
              <span className="text-4xl font-black text-green-600">{formatPrice(data.lastPrices)}</span>
              {hasDiscount && (
                <span className="text-xl text-gray-300 line-through font-bold">{formatPrice(data.price)}</span>
              )}
            </div>

            <div className="mb-8 p-4 bg-gray-50 rounded-2xl">
              <label className="block text-xs font-black text-gray-400 uppercase mb-3">Select Quantity</label>
              <div className="flex items-center gap-4">
                <button onClick={() => handleQuantityChange(-1)} className="w-12 h-12 bg-white border rounded-xl font-bold hover:bg-gray-100 transition">-</button>
                <span className="text-xl font-black w-10 text-center">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="w-12 h-12 bg-white border rounded-xl font-bold hover:bg-gray-100 transition">+</button>
                <span className="text-sm text-gray-400 ml-4 font-bold">Only {data.stock} left in stock</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 bg-slate-800 text-white rounded-2xl font-black hover:bg-slate-900 transition flex items-center justify-center gap-2"
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 py-4 px-6 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-8 border-t pt-6">
               <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
                 <FiInfo /> Description
               </h3>
               <p className="text-gray-600 leading-relaxed">{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}