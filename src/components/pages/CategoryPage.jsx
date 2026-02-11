import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowLeft, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import Card from "@/components/Card";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(slug)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Backend එකෙන් අදාළ category එකට විතරක් products ගේනවා
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/category/${slug}`);
        setProducts(response.data);
        console.log(products)
      } catch (error) {
        console.error("Fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-slate-900 animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading Collection</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Category Hero Header */}
      <header className="bg-slate-50 border-b border-slate-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">
                Premium Selection
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase">
                {slug.replace(/-/g, ' ')}
              </h1>
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest max-w-xs leading-relaxed">
              Curated collection of the finest {slug.replace(/-/g, ' ')} crafted for modern living.
            </p>
          </div>
        </div>
      </header>

      {/* 2. Tool Bar */}
      <div className="sticky top-[80px] z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Showing {products.length} Results
          </p>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all">
            <SlidersHorizontal size={12} /> Filter
          </button>
        </div>
      </div>

      {/* 3. Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <Card key={product._id} {...product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
            <LayoutGrid className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-slate-900 font-black uppercase tracking-widest mb-2">No Items Found</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">We're updating this collection soon.</p>
          </div>
        )}
      </main>

      {/* 4. Footer Space */}
      <div className="h-32" />
    </div>
  );
}