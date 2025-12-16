import React, { useEffect, useState, useRef, useCallback } from "react";
import Card from "@/components/Card";
import axios from "axios";
import NewAdsTitles from "@/components/newadds";
import Banners from "@/components/Banners";

export default function HomeContainer() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Initial fetch loading state
  const [loadingMore, setLoadingMore] = useState(false); // Infinite scroll/button loading state
  const [error, setError] = useState(null); // <--- NEW: State to store fetch error
  const [visibleCount, setVisibleCount] = useState(8);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  // --- 1. Initial Data Fetch ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        if (Array.isArray(response.data)) {
          const products = response.data;
          setAllProducts(products);
          setDisplayedProducts(products.slice(0, visibleCount));
          setHasMore(products.length > visibleCount);
        } else {
          setAllProducts([]);
          setDisplayedProducts([]);
          setHasMore(false);
          // Optional: Set a specific error if data format is unexpected
          // setError("Received data in an unexpected format.");
        }
      } catch (e) {
        console.error("Error fetching products:", e);
        // <--- UPDATED: Set the error state on failure
        setError("Failed to fetch products. Please check the server connection (http://localhost:4000).");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 2. Load More Logic (No change needed here) ---
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const newCount = visibleCount + 8;
      setVisibleCount(newCount);
      setDisplayedProducts(allProducts.slice(0, newCount));
      setHasMore(allProducts.length > newCount);
      setLoadingMore(false);
    }, 500);
  }, [allProducts, loadingMore, hasMore, visibleCount]);

  // --- 3. Intersection Observer (No change needed here) ---
  useEffect(() => {
    // Only observe if there is more data and no loading is currently active
    if (!hasMore || loading || loadingMore || error) return; // <--- Check for error

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5, rootMargin: "100px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadingMore, loadMore, error]); // <--- Added error dependency

  // --- 4. Initial Load Spinner UI ---
  // A. Show spinner while fetching
  if (loading && displayedProducts.length === 0) {
    return (
      <div className="min-h-screen p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        <span className="ml-3 text-teal-600">Fetching initial products...</span>
      </div>
    );
  }

  // B. Show persistent error message if fetch failed
  if (error) {
    return (
      <div className="min-h-screen p-8 flex flex-col justify-center items-center bg-red-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
        <p className="text-red-600 text-center max-w-lg">{error}</p>
        <p className="text-gray-500 text-sm mt-4">Check your console for more details on the fetch error.</p>
      </div>
    );
  }

  // --- 5. Main Render ---
  return (
    <div className="min-h-screen">
      <div className="">
        <NewAdsTitles direction="left" speed={100}>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
          <span className="mr-8">🚀 Free Shipping!</span>
          <span className="mr-8">🎉 Big Savings!</span>
          <span className="mr-8">🎁 Limited Time Offers!</span>
          <span className="mr-8">✨ New Arrivals!</span>
          <span className="mr-8">🔥 Hot Deals Today!</span>
        </NewAdsTitles>
      </div>
      <div className="p-4 md:p-8">
        {/*banners casorle here */}

        <div className="mt-2">
          <Banners images={[]} />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <Card
              key={product._id || product.productId}
              productId={product.productId}
              productName={product.productName}
              lastPrices={product.lastPrices}
              price={product.price}
              images={product.images}
            />
          ))}
        </div>

        {/* --- 6. Loading More Indicator UI --- */}
        {loadingMore && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mr-3"></div>
              <span className="text-teal-600">Loading more products...</span>
            </div>
          </div>
        )}

        {/* Observer target for Intersection Observer */}
        {/* Only visible when there's a chance of loading more */}
        {hasMore && <div ref={observerTarget} className="h-10"></div>}


        {/* --- 7. Fallback "Load More" Button UI --- */}
        {hasMore && !loadingMore && (
          <div className="text-center py-8">
            <div className="mb-4 text-gray-600 text-sm">
              Scroll down to load more or click below
            </div>
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Load More ({allProducts.length - displayedProducts.length}{" "}
              remaining)
            </button>
          </div>
        )}

        {/* --- 8. All Loaded Message UI --- */}
        {!hasMore && allProducts.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-block px-6 py-3 bg-green-100 text-green-800 rounded-full">
              🎉 All {allProducts.length} products loaded!
            </div>
            <p className="text-gray-500 text-sm mt-2">
              You've reached the end of our products
            </p>
          </div>
        )}

        {/* Scroll indicator for mobile */}
        {hasMore && displayedProducts.length > 8 && (
          <div className="fixed bottom-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg text-sm animate-bounce lg:hidden">
            ↓ Scroll for more
          </div>
        )}
      </div>
    </div>
  );
}