import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import axios from "axios";

export default function HomeContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch products කරන function එක
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array - component mount වෙද්දි විතරක් run වෙනවා

  // Loading state එක check කරන්න
  if (loading) {
    return (
      <div className="bg-teal-900 min-h-screen p-8 flex justify-center items-center">
        <div className="text-white text-xl">පොඩ්ඩක් ඉන්න... භාණ්ඩ ගෙනෙනවා</div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-teal-900 min-h-screen p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {products.map((product, index) => (
            <Card
              key={index}
              productId={product.productId}
              productName={product.productName}
              lastPrices={product.lastPrices}
              price={product.price}
              images={product.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
