import React, { useEffect, useState, useRef, useCallback, useMemo, memo } from "react";
import axios from "axios";
import { Loader2, ArrowDown, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

// Components imports
import Card from "@/components/Card";
import NewAdsTitles from "@/components/newadds";

// --- 1. Internal Banners Component (Focal Point / Object Position ලොජික් එක සහිතව) ---
const InternalBannerSlider = ({ ads }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto play logic - තත්පර 5න් 5ට මාරු වේ
  useEffect(() => {
    if (!ads.length) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === ads.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [ads.length]);

  if (!ads.length) return null;

  return (
    <div className="relative w-full h-full group overflow-hidden bg-slate-100">
  {ads.map((ad, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        index === currentIndex ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={ad.imageUrl}
        alt={`Banner ${index}`}
        className={`w-full h-full object-cover transition-transform duration-[5000ms] scale-105 ${
          index === currentIndex ? "scale-100" : ""
        }`}
      />
      {/* Title එක සහ Gradient overlay එක මෙතනින් ඉවත් කළා */}
    </div>
  ))}

  {/* Navigation Indicators (Dots) */}
  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
    {ads.map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentIndex(i)}
        className={`h-1.5 transition-all duration-500 rounded-full shadow-sm ${
          i === currentIndex ? "w-10 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
        }`}
      />
    ))}
  </div>
</div>
  );
};

// --- Promo Bar එක (නිතර re-render වීම වැළැක්වීමට memo පාවිච්චි කළා) ---
const PROMO_DATA = ["🔥 Hot Deals Today!", "🚀 Free Shipping!", "✨ New Arrivals!", "🎁 Limited Offers!"];
const MemoizedPromoBar = memo(() => (
  <div className="bg-slate-900 py-3 shadow-lg overflow-hidden border-b border-white/5">
    <NewAdsTitles speed={25}>
      <div className="flex items-center">
        {PROMO_DATA.map((text, i) => (
          <span key={i} className="mx-8 md:mx-12 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-95 antialiased">
            {text}
          </span>
        ))}
      </div>
    </NewAdsTitles>
  </div>
));

// Loading වෙලාවට පේන Skeleton Card
const SkeletonCard = () => (
  <div className="bg-slate-200 animate-pulse rounded-2xl h-80 w-full" />
);

const ITEMS_PER_PAGE = 8;

// --- MAIN HOME CONTAINER ---
export default function HomeContainer() {
  const [allProducts, setAllProducts] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef(null);

  // API එකෙන් දත්ත ලබා ගැනීම (Optimized with AbortController)
  const fetchData = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const [productsRes, bannersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, { signal }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ads`, { signal })
      ]);
      
      setAllProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      setAdsData(Array.isArray(bannersRes.data) ? bannersRes.data : []);
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError("Oops! Something went wrong while loading data.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  // Pagination Logic
  const displayedProducts = useMemo(() => allProducts.slice(0, visibleCount), [allProducts, visibleCount]);
  const hasMore = allProducts.length > visibleCount;

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      setLoadingMore(false);
    }, 400);
  }, [loadingMore, hasMore]);

  // Infinite Scroll Logic
  useEffect(() => {
    const target = observerTarget.current;
    if (!hasMore || loading || !target) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && loadMore(), { 
      threshold: 0.1, 
      rootMargin: "200px" 
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  if (error) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <AlertCircle className="text-red-500" size={48} />
      <p className="text-slate-600 font-medium">{error}</p>
      <button onClick={() => fetchData()} className="px-6 py-2 bg-slate-900 text-white rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors shadow-lg">
        <RefreshCw size={18} /> Retry
      </button>
    </div>
  );

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen font-sans">
      <MemoizedPromoBar />

      {/* --- Banner Section --- */}
      <section className="w-full bg-slate-200">
        {/* Aspect ratio එක මගින් Banner එක හැම Screen එකකටම ගැළපෙන විදිහට හැඩගැහේ */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/7] lg:aspect-[25/6] max-h-[650px] overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <Loader2 className="animate-spin text-slate-400" size={32} />
            </div>
          ) : adsData.length > 0 ? (
            <InternalBannerSlider ads={adsData} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300 italic font-medium">
              No promotions available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* --- Product Grid --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <header className="mt-16 mb-10 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Our Collection</h2>
          <div className="h-1.5 w-14 bg-blue-600 mt-2 rounded-full" />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {loading ? (
             [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            displayedProducts.map(product => (
              <Card key={product._id || product.productId} {...product} />
            ))
          )}
        </div>

        {/* --- Load More Section --- */}
        <div className="mt-16 flex flex-col items-center min-h-[140px]">
          {hasMore ? (
            <>
              <div ref={observerTarget} className="h-10 w-full" />
              <button 
                onClick={loadMore} 
                disabled={loadingMore} 
                className="group flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              >
                {loadingMore ? (
                  <Loader2 className="animate-spin" size={18}/> 
                ) : (
                  <>View More <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform"/></>
                )}
              </button>
            </>
          ) : (
            !loading && allProducts.length > 0 && (
              <div className="flex flex-col items-center gap-2 py-12 opacity-60 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <CheckCircle2 className="text-green-500" size={30} />
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">You've seen it all</p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}