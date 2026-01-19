import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Loader2, ArrowDown, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

import Card from "@/components/Card";
import NewAdsTitles from "@/components/newadds";

// --- 1. Banner Slider (පින්තූර මාරු වන කොටස) ---
const InternalBannerSlider = ({ ads }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (ads.length === 0) return;
    
    // තත්පර 5කට සැරයක් ඊළඟ පින්තූරයට යන්න
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === ads.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [ads.length]);

  return (
    <div className="relative w-full h-full group overflow-hidden bg-slate-100">
      {ads.map((ad, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={ad.imageUrl} className="w-full h-full object-cover transition-transform duration-[5000ms] scale-105" alt="" />
        </div>
      ))}
      
      {/* යටින් තියෙන පොඩි රවුම් (Dots) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {ads.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === currentIndex ? "w-10 bg-white" : "w-2 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- 2. Main Container ---
export default function HomeContainer() {
  const [allProducts, setAllProducts] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const observerTarget = useRef(null);

  // ඉන්ටර්නෙට් එකෙන් දත්ත ගේන හැටි (Fetching Data)
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
      const adsRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ads`);
      
      setAllProducts(productRes.data);
      setAdsData(adsRes.data);
    } catch (err) {
      setError("දත්ත ලබා ගැනීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // "තව පෙන්වන්න" වැඩේ කරන්න (Load More)
  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  // පහළට යද්දී ඉබේම Load වෙන්න (Infinite Scroll Logic)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && allProducts.length > visibleCount) {
        loadMore();
      }
    }, { threshold: 0.1 });

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [allProducts.length, visibleCount]);

  if (error) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <AlertCircle className="text-red-500" size={48} />
      <p>{error}</p>
      <button onClick={fetchData} className="px-6 py-2 bg-slate-900 text-white rounded-full flex items-center gap-2">
        <RefreshCw size={18} /> Retry
      </button>
    </div>
  );

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      
      {/* උඩින්ම යන Promo Bar එක */}
      <div className="bg-slate-900 py-3 overflow-hidden border-b border-white/5">
        <NewAdsTitles speed={25}>
          <div className="flex text-white font-black text-xs uppercase tracking-widest">
            <span className="mx-10">🔥 Hot Deals Today!</span>
            <span className="mx-10">🚀 Free Shipping!</span>
            <span className="mx-10">✨ New Arrivals!</span>
          </div>
        </NewAdsTitles>
      </div>

      {/* Banner එක */}
      <section className="w-full bg-slate-200">
        <div className="relative w-full aspect-[16/9] md:aspect-[25/6] max-h-[650px] overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="animate-spin" /></div>
          ) : (
            <InternalBannerSlider ads={adsData} />
          )}
        </div>
      </section>

      {/* බඩු ටික පෙන්වන තැන (Product Grid) */}
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <header className="mt-16 mb-10 flex flex-col items-center">
          <h2 className="text-3xl font-black uppercase italic">Our Collection</h2>
          <div className="h-1.5 w-14 bg-blue-600 mt-2 rounded-full" />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {allProducts.slice(0, visibleCount).map((product) => (
            <Card key={product._id} {...product} />
          ))}
        </div>

        {/* Load More Button සහ Infinite Scroll සෙන්සර් එක */}
        <div className="mt-16 flex flex-col items-center">
          {allProducts.length > visibleCount ? (
            <div ref={observerTarget} className="flex flex-col items-center">
              <button onClick={loadMore} className="px-10 py-4 bg-slate-900 text-white rounded-2xl flex items-center gap-3">
                View More <ArrowDown size={18} />
              </button>
            </div>
          ) : (
            !loading && (
              <div className="flex flex-col items-center opacity-60">
                <CheckCircle2 className="text-green-500" size={30} />
                <p className="mt-2 text-[10px] uppercase tracking-widest">You've seen it all</p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}