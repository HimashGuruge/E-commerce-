import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { 
  Loader2, 
  ArrowDown, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Sparkles, 
  Shield, 
  Truck, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  Gift,
  Award,
  Clock
} from "lucide-react";
import Card from "@/components/Card";
import NewAdsTitles from "@/components/newadds";

// --- 1. Full-Width Premium Banner Slider ---
const InternalBannerSlider = ({ ads }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (ads.length === 0 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === ads.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [ads.length, isHovered]);

  const goToPrev = () => setCurrentIndex(currentIndex === 0 ? ads.length - 1 : currentIndex - 1);
  const goToNext = () => setCurrentIndex(currentIndex === ads.length - 1 ? 0 : currentIndex + 1);

  if (!ads || ads.length === 0) return null;

  return (
    <div 
      className="relative w-full h-[50vh] md:h-[70vh] lg:h-[85vh] group overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10 pointer-events-none" />
      
      {/* Navigation Controls */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-4 md:px-8 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
        <button onClick={goToPrev} className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all active:scale-90 shadow-2xl">
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button onClick={goToNext} className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all active:scale-90 shadow-2xl">
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>

      {ads.map((ad, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
            index === currentIndex ? "opacity-100 scale-100 visible" : "opacity-0 scale-110 invisible"
          }`}
        >
          <img 
            src={ad.imageUrl} 
            className="w-full h-full object-cover object-center"
            alt={`Promotion ${index + 1}`} 
          />
        </div>
      ))}
      
      {/* Minimalist Progress Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-3 z-20">
        {ads.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-700 rounded-full h-1 ${
              i === currentIndex ? "w-16 bg-white" : "w-4 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// --- 2. Premium Features Section ---
const PremiumFeatures = () => {
  const features = [
    { icon: Shield, title: "Secure Payment", desc: "SSL Encrypted" },
    { icon: Truck, title: "Free Shipping", desc: "Orders over 5k" },
    { icon: Zap, title: "Fast Delivery", desc: "1-2 Days" },
    { icon: Gift, title: "Gift Cards", desc: "Perfect Gifting" },
    { icon: Award, title: "Quality Assured", desc: "Premium Only" },
    { icon: Clock, title: "24/7 Support", desc: "Always Here" },
  ];

  return (
    <div className="py-16 bg-white border-b border-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-6 rounded-[2rem] bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-transparent hover:border-blue-50">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 shadow-xl">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-widest">{feature.title}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 text-center">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 3. Main Container ---
export default function HomeContainer() {
  const [allProducts, setAllProducts] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productRes, adsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ads`)
      ]);
      setAllProducts(productRes.data);
      setAdsData(adsRes.data);
    } catch (err) {
      setError("Failed to synchronize with server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && allProducts.length > visibleCount && !isLoadingMore) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setVisibleCount(prev => prev + 8);
          setIsLoadingMore(false);
        }, 800);
      }
    }, { threshold: 0.1 });

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [allProducts.length, visibleCount, isLoadingMore]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-12 h-12 text-slate-900 animate-spin mb-4" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Initializing Storefront</span>
    </div>
  );

  return (
    <div className="w-full bg-white min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Promo Ticker (Full Width) */}
      <div className="bg-slate-950 py-3.5 border-b border-white/5">
        <NewAdsTitles speed={35}>
          <div className="flex text-white font-black text-[10px] uppercase tracking-[0.3em]">
            <span className="mx-12 flex items-center gap-2"><Sparkles size={12} className="text-blue-400"/> New Arrivals Available Now</span>
            <span className="mx-12 flex items-center gap-2"><Star size={12} className="text-blue-400"/> Premium Curation 2026</span>
            <span className="mx-12 flex items-center gap-2"><Zap size={12} className="text-blue-400"/> Islandwide Fast Tracking</span>
          </div>
        </NewAdsTitles>
      </div>

      {/* 2. Full Width Hero Section */}
      <section className="w-full">
         <InternalBannerSlider ads={adsData} />
      </section>

      {/* 3. Contained Content Sections */}
      <div className="max-w-7xl mx-auto px-4">
        <PremiumFeatures />

        <main className="pb-32">
          <header className="py-24 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase mb-6 border border-slate-100">
              Handpicked Styles
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter mb-6">THE EDIT</h2>
            <p className="text-slate-400 font-bold max-w-lg mx-auto uppercase text-xs tracking-[0.2em] leading-relaxed">
              Experience the fusion of craftsmanship and modern design
            </p>
          </header>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {allProducts.slice(0, visibleCount).map((product) => (
              <Card key={product._id} {...product} />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          <div ref={observerTarget} className="h-40 w-full flex flex-col items-center justify-center mt-12">
            {isLoadingMore && (
              <>
                <Loader2 className="w-8 h-8 text-slate-300 animate-spin mb-2" />
                <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Loading More</span>
              </>
            )}
            {!isLoadingMore && visibleCount >= allProducts.length && (
               <div className="flex flex-col items-center">
                  <div className="w-12 h-px bg-slate-100 mb-4" />
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">End of Collection</p>
               </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}