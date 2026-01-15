import React, { useEffect, useState, useRef, useCallback, useMemo, memo } from "react";
import axios from "axios";
import { Loader2, ArrowDown, CheckCircle2 } from "lucide-react";

// Components imports
import Card from "@/components/Card";
import NewAdsTitles from "@/components/newadds";
import Banners from "@/components/Banners";

// 1. Constants - මම මේවා එළියට ගත්තා Render වෙද්දී අලුතින් හැදෙන්නේ නැති වෙන්න
const PROMO_DATA = ["🔥 Hot Deals Today!", "🚀 Free Shipping!", "✨ New Arrivals!", "🎁 Limited Offers!"];
const ITEMS_PER_PAGE = 8;

// 2. Memoized Promo Bar - මේක වෙනම Component එකක් විදිහට ගත්තම Main Page එක Render වෙද්දී මේක නැවත Render වෙන්නේ නැහැ
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

export default function HomeContainer() {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef(null);

  // 3. Optimized Fetch - Axios shortcut පාවිච්චි කළා
  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
      setAllProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 4. Turbo Processing - UseMemo මගින් array එක ඉතා වේගයෙන් slice කරයි
  const displayedProducts = useMemo(() => 
    allProducts.slice(0, visibleCount), 
    [allProducts, visibleCount]
  );

  const hasMore = allProducts.length > visibleCount;

  // 5. Smooth Load More
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    // UI එක හිර නොවී වැඩ කිරීමට කුඩා පමාවක් (Micro-task)
    requestAnimationFrame(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      setLoadingMore(false);
    });
  }, [loadingMore, hasMore]);

  // 6. Intersection Observer - Infinite Scroll
  useEffect(() => {
    if (!hasMore || loading) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      { threshold: 0.1, rootMargin: "400px" } // 400px කලින් Load වෙනවා (Fast UX)
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Store...</p>
    </div>
  );

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <MemoizedPromoBar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="mt-6 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60">
          <Banners images={[]} />
        </div>

        {/* 7. Product Grid - GPU optimized rendering */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.map(product => (
            <Card key={product._id || product.productId} {...product} />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-16 flex flex-col items-center">
          {hasMore ? (
            <>
              <div ref={observerTarget} className="h-10 w-full" />
              <button 
                onClick={loadMore}
                className="group flex items-center gap-3 px-12 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-xl shadow-slate-200"
              >
                {loadingMore ? <Loader2 className="animate-spin" size={18}/> : <>Load More <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform"/></>}
              </button>
            </>
          ) : (
            allProducts.length > 0 && (
              <div className="flex flex-col items-center gap-2 py-10 opacity-50">
                <CheckCircle2 className="text-green-500" size={24} />
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">End of Collection</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}