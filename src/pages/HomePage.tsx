import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Carousel } from '../components/Carousel';
import { ArrowRight, ShieldCheck, Truck, Cpu, Award, Zap, Gauge, Radio, ChevronRight, Star } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, categories, setSelectedCategorySlug, setCurrentPage, setSelectedProductId } = useStore();

  const featuredProducts = products.filter(p => p.isFeatured);
  const bestSellers = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);

  const handleShopNow = (categorySlug?: string) => {
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
    }
    setCurrentPage('shop');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[620px] sm:min-h-[700px] flex items-center bg-[#0B0F19] overflow-hidden border-b border-[#1E293B]">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85"
            alt="High Performance RC Racing Chassis"
            className="w-full h-full object-cover object-center opacity-30 scale-105 transform hover:scale-100 transition-transform duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/40 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              <Cpu className="w-3.5 h-3.5" />
              <span>Next-Gen RC Powertrains & Chassis</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.1]">
              Uncompromising <span className="text-[#38BDF8]">Speed</span>, Precision & RC Engineering.
            </h1>

            <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed max-w-xl">
              Dyno-verified brushless motors, ultra-low internal resistance 6S LiPo packs, low-latency 2.4GHz telemetry radios, and CNC 7075 aluminum chassis upgrades for competition racers.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-shop-all-btn"
                onClick={() => handleShopNow()}
                className="px-8 py-4 bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold rounded-xl shadow-xl shadow-sky-950/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore RC Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-view-tuning-btn"
                onClick={() => setCurrentPage('blogs')}
                className="px-8 py-4 bg-[#131D31] hover:bg-[#1E293B] text-[#F8FAFC] border border-[#1E293B] hover:border-[#0284C7] text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Tuning Guides & Dyno Specs</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#1E293B]">
              <div>
                <div className="font-serif text-2xl font-extrabold text-[#F8FAFC]">100%</div>
                <div className="text-[11px] text-[#94A3B8]">Dyno Load Tested</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-extrabold text-[#38BDF8]">120C+</div>
                <div className="text-[11px] text-[#94A3B8]">LiPo Burst Discharge</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-extrabold text-[#F59E0B]">3ms</div>
                <div className="text-[11px] text-[#94A3B8]">Ultra-Low Radio Latency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid / Carousel Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
              Engineered Components
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#38BDF8] mt-1">
              Shop by RC Category
            </h2>
          </div>
          <button
            id="categories-view-all-btn"
            onClick={() => handleShopNow()}
            className="text-xs font-bold text-[#38BDF8] hover:text-[#0284C7] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All RC Hardware</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <Carousel
          id="categories-carousel"
          itemClassName="w-[82vw] sm:w-[320px] lg:w-[380px] flex-shrink-0 snap-start"
        >
          {categories.map(cat => (
            <div
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => handleShopNow(cat.name)}
              className="group relative h-64 rounded-2xl overflow-hidden bg-[#131D31] border border-[#1E293B] hover:border-[#0284C7] shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-end p-6"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#38BDF8] bg-[#0B0F19]/80 px-2.5 py-1 rounded-md border border-[#1E293B] inline-block">
                  {cat.itemCount || 4}+ Products
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#38BDF8] group-hover:translate-x-1 transition-transform">
                  <span>Explore Upgrades</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Featured Hardware Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Top-Tier Upgrades
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#38BDF8] mt-1">
              Featured Competition RC Parts
            </h2>
          </div>
          <button
            id="featured-view-all-btn"
            onClick={() => handleShopNow()}
            className="text-xs font-bold text-[#38BDF8] hover:text-[#0284C7] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>See Complete Lineup</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <Carousel
          id="featured-carousel"
          itemClassName="w-[78vw] sm:w-[280px] lg:w-[290px] flex-shrink-0 snap-start"
        >
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </section>

      {/* Engineering Showcase & Technical Banner */}
      <section className="bg-[#131D31] border-y border-[#1E293B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/30 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              <Gauge className="w-3.5 h-3.5" />
              <span>Tested on the Track & Dyno</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#38BDF8] leading-tight">
              Engineered for Thermal Headroom & Maximum Acceleration
            </h2>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Every rotor, speed controller, and battery pack in our lineup is subjected to sustained high-amperage dyno test runs. We verify zero cogging, minimum voltage sag, and thermal dissipation stability before a single unit ships to your pit table.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B] space-y-1">
                <h4 className="font-serif text-sm font-bold text-[#F8FAFC]">CNC 6061 Heatsink Cans</h4>
                <p className="text-[11px] text-[#94A3B8]">Optimized fin geometry for 35% cooler continuous motor runs.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B] space-y-1">
                <h4 className="font-serif text-sm font-bold text-[#F8FAFC]">Pure Graphene Anodes</h4>
                <p className="text-[11px] text-[#94A3B8]">High burst discharge rates without catastrophic cell puffing.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="engineering-lab-btn"
                onClick={() => setCurrentPage('about')}
                className="px-6 py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-sky-950/30"
              >
                <span>Read Full Lab Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-4/3 rounded-3xl overflow-hidden border border-[#1E293B] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="Brushless Motor Dyno Testing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#0B0F19]/95 backdrop-blur-md p-5 rounded-2xl border border-[#1E293B] shadow-xl max-w-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8]">
                <Cpu className="w-4 h-4" />
                <span>Zero-Latency Response</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                32-bit ARM Cortex processing inside our brushless ESCs ensures instantaneous throttle trigger tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#10B981]">
              Racer Verified
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#38BDF8] mt-1">
              Most Popular RC Upgrades
            </h2>
          </div>
          <button
            id="bestsellers-view-all-btn"
            onClick={() => handleShopNow()}
            className="text-xs font-bold text-[#38BDF8] hover:text-[#0284C7] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Browse Full Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <Carousel
          id="bestsellers-carousel"
          itemClassName="w-[78vw] sm:w-[280px] lg:w-[290px] flex-shrink-0 snap-start"
        >
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </section>

      {/* Racer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
            Pitwall Feedback
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#38BDF8]">
            What Competition Drivers Say
          </h2>
        </div>

        <Carousel
          id="reviews-carousel"
          itemClassName="w-[84vw] sm:w-[350px] lg:w-[380px] flex-shrink-0 snap-start"
        >
          <div className="p-6 rounded-2xl bg-[#131D31] border border-[#1E293B] space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center text-[#F59E0B] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed italic">
                "Swapped out the stock electronics on my 1/10 touring car for the Vortex-X motor and AeroPulse 120A ESC. Picked up 12 mph on the straightaway with zero thermal shutdown."
              </p>
            </div>
            <div className="border-t border-[#1E293B] pt-3 text-xs">
              <h5 className="font-bold text-[#F8FAFC]">Derek K.</h5>
              <span className="text-[11px] text-[#64748B]">Regional ROAR Touring Champion</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131D31] border border-[#1E293B] space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center text-[#F59E0B] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed italic">
                "The GrapheneCore 6S packs hold voltage better under full load than any other brand in our FPV team arsenal. Essential gear for podium finishes."
              </p>
            </div>
            <div className="border-t border-[#1E293B] pt-3 text-xs">
              <h5 className="font-bold text-[#F8FAFC]">Samantha T.</h5>
              <span className="text-[11px] text-[#64748B]">MultiGP Drone Pilot</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131D31] border border-[#1E293B] space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center text-[#F59E0B] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed italic">
                "The 3K carbon fiber chassis fit with zero modification required. Torsional stiffness is top notch, and corner entry response is surgical."
              </p>
            </div>
            <div className="border-t border-[#1E293B] pt-3 text-xs">
              <h5 className="font-bold text-[#F8FAFC]">Lucas M.</h5>
              <span className="text-[11px] text-[#64748B]">RC Drift & Track Builder</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131D31] border border-[#1E293B] space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center text-[#F59E0B] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed italic">
                "Fastest shipping in the RC hobby. Ordered replacement pinions and rotor bearings on Thursday, arrived in time for Saturday track qualifying."
              </p>
            </div>
            <div className="border-t border-[#1E293B] pt-3 text-xs">
              <h5 className="font-bold text-[#F8FAFC]">Marcus V.</h5>
              <span className="text-[11px] text-[#64748B]">1/8 Buggy Off-Road Racer</span>
            </div>
          </div>
        </Carousel>
      </section>
    </div>
  );
};
