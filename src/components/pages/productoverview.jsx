import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageSlider from "@/components/imageSlider";
import { addToCart } from "../utils/cart";
import { FiShoppingCart, FiTag, FiInfo, FiArrowLeft, FiTruck, FiShield } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import Swal from "sweetalert2";

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
        
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL+`/api/products/${productId}`);
        
        if (response.data && response.data.product) {
          setProduct(response.data);
        } else {
          setError("Product data not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || "Failed to load product. Please try again.");
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






  

  const handleBuyNow = () => {
    if (!product?.product || product.product.stock <= 0) return;

    Swal.fire({
      title: 'Proceed to Checkout?',
      text: `Buy "${product.product.productName}" for LKR ${(product.product.lastPrices * quantity).toFixed(2)}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Continue shopping'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/shipping/?productId=${product.product.productId}&productName=${encodeURIComponent(product.product.productName)}`, {
          state: {
            orderedItems: [
              {
                productId: product.product.productId,
                productName: product.product.productName,
                price: product.product.price,
                lastPrice: product.product.lastPrices,
                qty: quantity,
                image: product.product.images?.[0] || '',
              },
            ],
            total: product.product.lastPrices * quantity,
            labeledTotal: product.product.price * quantity,
            discount: (product.product.price - product.product.lastPrices) * quantity,
            message: "Buying single product now",
          },
        });
      }
    });
  };















  const handleAddToCart = async () => {
    if (!product?.product || product.product.stock <= 0) return;

    setAddingToCart(true);
    try {
      addToCart(product.product.productId, quantity);
      
      await Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: `${quantity} × "${product.product.productName}" added to your cart`,
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add',
        text: 'Could not add item to cart. Please try again.',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Product Details</h2>
          <p className="text-gray-500">Please wait while we fetch the product information...</p>
        </div>
      </div>
    );
  }

  if (error || !product?.product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {error || "Product Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for might not exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <FiArrowLeft /> Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const data = product.product;
  const discountPercentage = data.price > 0 
    ? Math.round(((data.price - data.lastPrices) / data.price) * 100) 
    : 0;
  const hasDiscount = data.price > data.lastPrices;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <FiArrowLeft /> Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6">
              <ImageSlider 
                images={data.images} 
                showThumbnails={true}
                autoplay={true}
              />
              
              {/* Product Highlights */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <FiTruck className="text-blue-600" />
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <FiShield className="text-green-600" />
                  <span className="text-sm font-medium">1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                  <MdOutlineInventory2 className="text-purple-600" />
                  <span className="text-sm font-medium">In Stock: {data.stock}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* Product ID & Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">SKU: {data.productId}</span>
                <div className="flex items-center gap-2">
                  <FiTag className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{data.category}</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {data.productName}
              </h1>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold text-green-600">
                    {formatPrice(data.lastPrices)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-2xl text-gray-400 line-through">
                        {formatPrice(data.price)}
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-full">
                        -{discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                data.stock > 10 ? 'bg-green-100 text-green-800' : 
                data.stock > 0 ? 'bg-amber-100 text-amber-800' : 
                'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  data.stock > 10 ? 'bg-green-500' : 
                  data.stock > 0 ? 'bg-amber-500' : 
                  'bg-red-500'
                }`}></div>
                <span className="font-medium">
                  {data.stock > 10 ? 'In Stock' : 
                   data.stock > 0 ? `Only ${data.stock} left` : 
                   'Out of Stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={data.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= data.stock) setQuantity(val);
                    }}
                    className="w-20 text-center border border-gray-300 rounded-lg py-2"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= data.stock}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    Max: {data.stock} units
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={data.stock <= 0 || addingToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <FiShoppingCart /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={data.stock <= 0}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FiInfo className="text-gray-600" />
                  Product Description
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {data.description || "No description available for this product."}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold text-gray-800">{data.category}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Brand</p>
                  <p className="font-semibold text-gray-800">{data.brand}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
