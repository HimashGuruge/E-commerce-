import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  productId,
  lastPrices,
  images = [],
  productName,
  price,
}) {
  const firstImageUrl = images.length > 0 ? images[0] : null;
  const isSale = lastPrices !== undefined && price < lastPrices;

  const formattedLastPrice =
    lastPrices !== undefined ? `LKR. ${lastPrices.toFixed(2)}` : null;
  const formattedCurrentPrice =
    price !== undefined ? `LKR. ${price.toFixed(2)}` : "N/A";

  const discountPercentage = isSale
    ? Math.round(((lastPrices - price) / lastPrices) * 100)
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

          {isSale ? (
            <div className="mb-2">
              <p className="text-sm text-gray-500 line-through">
                Was: {formattedLastPrice}
              </p>
              <p className="text-green-600 font-extrabold text-2xl">
                {formattedCurrentPrice}
              </p>
              <p className="text-red-500 font-semibold text-xs">
                You save {discountPercentage}%
              </p>
            </div>
          ) : (
            <p className="text-teal-700 font-extrabold text-2xl">
              {formattedCurrentPrice}
            </p>
          )}

          <button className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
