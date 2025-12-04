import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  productId,
  lastPrices, // now price
  images = [],
  productName,
  price, // old price
}) {
  const firstImageUrl = images.length > 0 ? images[0] : null;

  // Convert to numbers
  const nowPriceNum = lastPrices ? Number(lastPrices) : null; // current price
  const oldPriceNum = Number(price); // previous price

  // Check if product is on sale
  const isSale = oldPriceNum && oldPriceNum > nowPriceNum;

  // Compute discount percentage
  const discountPercentage = isSale
    ? Math.round(((oldPriceNum - nowPriceNum) / oldPriceNum) * 100)
    : 0;

  return (
    <Link to={`/productoverview/${productId}`}>
      <div className="max-w-xs mx-auto my-4 bg-white rounded-xl w-[300px] h-[480px] shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          {firstImageUrl ? (
            <img
              src={firstImageUrl}
              alt={`Image of ${productName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              [Image Not Available]
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col justify-between h-[220px]">
          <h3
            className="text-xl font-bold text-gray-800 mb-2 truncate"
            title={productName}
          >
            {productName}
          </h3>

          {/* Price Section */}
          <div className="mt-2">
            {isSale ? (
              <div className="flex items-center space-x-2">
                {/* Old Price */}
                <span className="text-gray-400 line-through text-sm">
                  Rs.{oldPriceNum}
                </span>

                {/* Current Price */}
                <span className="text-lg font-bold text-green-600">
                  Rs.{nowPriceNum}
                </span>

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                Rs.{nowPriceNum}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
