import React from 'react';
import { useStore } from '../context/StoreContext';
import { Cpu, ShieldCheck, Award, Zap, Gauge, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Banner */}
      <section className="relative min-h-[460px] flex items-center bg-[#0B0F19] overflow-hidden border-b border-[#1E293B]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80"
            alt="TechRcPro Engineering Lab"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
              About TechRcPro Engineering Lab
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] leading-tight">
              Pioneering High-Speed RC Hardware & Powertrains
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
              Founded by competition racers and electrical engineers, TechRcPro designs, dyno-tests, and supplies track-ready RC components built for extreme thermal resilience and victory.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/30 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
            <Gauge className="w-3.5 h-3.5" />
            <span>The Pitwall Mission</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#38BDF8] leading-tight">
            Born on the Racetrack, Perfected in the Dyno Lab
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
            <p>
              In 2021, our track team grew frustrated with off-the-shelf brushless motors that suffered catastrophic thermal shutdowns on hot summer race days. We knew the RC hobby deserved precision-tolerance engineering with true dyno-tested specifications.
            </p>
            <p>
              Today, TechRcPro engineers custom high-flux neodymium rotors, pure copper windings, graphene-matrix LiPo battery cells, and 3K quasi-isotropic carbon fiber chassis kits that withstand brutal full-throttle racing abuse.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#131D31] rounded-2xl border border-[#1E293B]">
              <div className="font-serif text-2xl font-extrabold text-[#38BDF8]">10,000+</div>
              <div className="text-xs text-[#94A3B8]">Motors & ESCs Dispatched</div>
            </div>
            <div className="p-4 bg-[#131D31] rounded-2xl border border-[#1E293B]">
              <div className="font-serif text-2xl font-extrabold text-[#F59E0B]">48+</div>
              <div className="text-xs text-[#94A3B8]">Podium Race Wins in 2025/2026</div>
            </div>
          </div>
        </div>

        <div className="aspect-4/3 rounded-3xl overflow-hidden border border-[#1E293B] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
            alt="RC Chassis Assembly"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Engineering Pillars */}
      <section className="bg-[#131D31] border-y border-[#1E293B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
              Quality Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#38BDF8]">
              Our Core Engineering Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#0B0F19] border border-[#1E293B] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0284C7]/20 border border-[#0284C7]/30 flex items-center justify-center text-[#38BDF8]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F8FAFC]">
                Aerospace-Grade Materials
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                We use 7075-T6 billet aluminum, Toray 3K carbon fiber weaves, and titanium-nitride coated steel gears for zero-compromise durability.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0B0F19] border border-[#1E293B] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0284C7]/20 border border-[#0284C7]/30 flex items-center justify-center text-[#38BDF8]">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F8FAFC]">
                Dyno-Verified Output
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Every motor batch undergoes RPM, torque, and thermal testing on calibrated dynamometers before clearance for sale.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0B0F19] border border-[#1E293B] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0284C7]/20 border border-[#0284C7]/30 flex items-center justify-center text-[#38BDF8]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F8FAFC]">
                Trackside Racer Support
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Our support team consists of active RC racers and powertrain technicians ready to help calculate FDR gear ratios and ESC timing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#38BDF8]">
          Ready to Upgrade Your RC Build?
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
          Browse our full inventory of high-speed brushless motors, batteries, transmitters, and carbon chassis hardware.
        </p>
        <div>
          <button
            id="about-shop-btn"
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-4 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-sky-950/40 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore RC Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
