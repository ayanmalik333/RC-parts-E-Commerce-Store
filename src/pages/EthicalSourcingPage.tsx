import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Cpu, ShieldCheck, CheckCircle2, Zap, Scale, HeartHandshake, Gauge } from 'lucide-react';

export const EthicalSourcingPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  useEffect(() => {
    document.title = 'Engineering Quality & Standards | TechRcPro';
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
          id="sourcing-back-home-btn"
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] hover:text-[#0284C7] transition-colors cursor-pointer group bg-[#131D31] px-4 py-2 rounded-xl border border-[#1E293B]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#F8FAFC]">Home</button>
          <span>/</span>
          <span className="font-medium text-[#F8FAFC]">Engineering Standards</span>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/30 text-xs font-bold text-[#38BDF8]">
          <Cpu className="w-3.5 h-3.5" />
          <span>Quality Assurance & Environmental Standards</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
          Engineering Quality & Ethical Material Sourcing
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed max-w-2xl">
          At TechRcPro, high performance goes hand-in-hand with environmental responsibility, worker safety, conflict-free raw materials, and strict ISO/RoHS quality compliance.
        </p>
      </header>

      {/* Content Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
        <section className="bg-[#131D31] p-6 sm:p-8 rounded-3xl border border-[#1E293B] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#38BDF8]">
            <ShieldCheck className="w-5 h-5 text-[#38BDF8]" />
            <h2>1. Conflict-Free Neodymium & Copper Sourcing</h2>
          </div>
          <p>
            The sintered neodymium magnets and high-purity oxygen-free copper wire in our Vortex-X brushless motors are verified conflict-free. We audit our smelters annually to guarantee zero exploitation in the raw extraction chain.
          </p>
        </section>

        <section className="bg-[#131D31] p-6 sm:p-8 rounded-3xl border border-[#1E293B] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#38BDF8]">
            <Zap className="w-5 h-5 text-[#38BDF8]" />
            <h2>2. LiPo Battery Chemistry & Recycling Compliance</h2>
          </div>
          <p>
            Our GrapheneCore lithium polymer packs are manufactured under certified cleanroom conditions with zero heavy metal contaminants. We actively support Call2Recycle initiatives for depleted cells.
          </p>
        </section>

        <section className="bg-[#131D31] p-6 sm:p-8 rounded-3xl border border-[#1E293B] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#38BDF8]">
            <Gauge className="w-5 h-5 text-[#38BDF8]" />
            <h2>3. RoHS & CE Hardware Certification</h2>
          </div>
          <p>
            All TechRcPro speed controllers and radio frequency circuits are lead-free (RoHS compliant) and CE/FCC certified for interference-free 2.4GHz spectrum operation.
          </p>
        </section>
      </div>
    </div>
  );
};
