import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Scale, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  const { setCurrentPage } = useStore();

  useEffect(() => {
    document.title = 'Terms of Service | TechRcPro';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.title = 'TechRcPro | High-Performance RC Parts & Upgrades';
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Navigation Breadcrumb & Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <button
          id="terms-back-home-btn"
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] hover:text-[#0284C7] transition-colors cursor-pointer group bg-[#131D31] px-4 py-2 rounded-xl border border-[#1E293B]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#F8FAFC]">Home</button>
          <span>/</span>
          <span className="font-medium text-[#F8FAFC]">Terms of Service</span>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/30 text-xs font-bold text-[#38BDF8]">
          <Scale className="w-3.5 h-3.5" />
          <span>Racer Terms & Store Agreement</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed max-w-2xl">
          These Terms of Service govern your access to TechRcPro. By ordering brushless hardware or accessories, you agree to our standard customer and warranty terms.
        </p>
      </header>

      {/* Content Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
        <section className="bg-[#131D31] p-6 sm:p-8 rounded-3xl border border-[#1E293B] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#38BDF8]">
            <ShoppingBag className="w-5 h-5 text-[#38BDF8]" />
            <h2>1. Orders & Component Fitment</h2>
          </div>
          <p>
            Please verify scale compatibility (e.g. 1/10 vs 1/8) and motor shaft dimensions prior to ordering. Our tech support is available to assist with gearing calculations.
          </p>
        </section>

        <section className="bg-[#131D31] p-6 sm:p-8 rounded-3xl border border-[#1E293B] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#38BDF8]">
            <Truck className="w-5 h-5 text-[#38BDF8]" />
            <h2>2. Trackside Delivery & Shipping</h2>
          </div>
          <p>
            Orders placed prior to 2:00 PM EST receive priority same-day dispatch. Free shipping automatically applies on qualifying orders over $99.
          </p>
        </section>
      </div>
    </div>
  );
};
