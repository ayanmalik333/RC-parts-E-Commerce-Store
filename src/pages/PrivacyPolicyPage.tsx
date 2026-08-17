import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Mail, Home } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  useEffect(() => {
    document.title = 'Privacy Policy | TechRcPro';
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
          id="privacy-back-home-btn"
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] hover:text-[#0284C7] transition-colors cursor-pointer group bg-[#131D31] px-4 py-2 rounded-xl border border-[#1E293B]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#F8FAFC]">Home</button>
          <span>/</span>
          <span className="font-medium text-[#F8FAFC]">Privacy Policy</span>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/30 text-xs font-bold text-[#38BDF8]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Data Protection & Privacy Standards</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed max-w-2xl">
          At TechRcPro, we value your trust and are committed to protecting your racer account, telemetry data, and order details with 256-bit encryption.
        </p>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
        <section className="bg-[#131D31] p-6 sm:p-8 rounded-3xl border border-[#1E293B] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#38BDF8]">
            <Lock className="w-5 h-5 text-[#38BDF8]" />
            <h2>1. Information We Collect</h2>
          </div>
          <p>
            We collect contact and shipping details strictly to fulfill your RC parts orders, coordinate trackside dispatch, and provide technical tuning assistance. We never sell your personal data.
          </p>
        </section>

        <section className="bg-[#131D31] p-6 sm:p-8 rounded-3xl border border-[#1E293B] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#38BDF8]">
            <Eye className="w-5 h-5 text-[#38BDF8]" />
            <h2>2. Payment & Checkout Security</h2>
          </div>
          <p>
            All direct checkout transactions are processed through tokenized payment gateways. TechRcPro servers never store full credit card credentials.
          </p>
        </section>
      </div>
    </div>
  );
};
