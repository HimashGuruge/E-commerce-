import React, { useEffect, useState, useRef, useCallback } from "react";
import Card from "@/components/Card";
import axios from "axios";
import NewAdsTitles from "@/components/newadds";
import Banners from "@/components/Banners";
export default function HomeContainer() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        if (Array.isArray(response.data)) {
          setAllProducts(response.data);
          setDisplayedProducts(response.data.slice(0, visibleCount));
          setHasMore(response.data.length > visibleCount);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
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
  }, [hasMore, loading, loadingMore, loadMore]);

  // Window scroll listener (alternative method)
  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Load more when 300px from bottom
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, loadingMore, loadMore]);

  if (loading && displayedProducts.length === 0) {
    return (
      <div className="min-h-screen p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

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

        {/* Loading indicator */}
        {loadingMore && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mr-3"></div>
              <span className="text-teal-600">Loading more products...</span>
            </div>
          </div>
        )}

        {/* Observer target for Intersection Observer */}
        <div ref={observerTarget} className="h-10"></div>

        {/* Show load more button as fallback */}
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

        {/* All loaded message */}
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
