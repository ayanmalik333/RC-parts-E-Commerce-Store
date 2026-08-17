import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Carousel } from './Carousel';
import { Cpu, ShieldCheck, Truck, Mail, ArrowRight, Instagram, Youtube, Heart, Zap, Gauge } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategorySlug, categories, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const brandValues = [
    {
      id: 'dyno-tested',
      icon: Gauge,
      title: '100% Dyno Tested',
      desc: 'Every brushless motor and high-voltage ESC is load tested for peak efficiency.'
    },
    {
      id: 'cnc-precision',
      icon: Cpu,
      title: 'CNC 7075 & 3K Carbon',
      desc: 'Aerospace-grade billet aluminum and high-tensile carbon fiber components.'
    },
    {
      id: 'express-dispatch',
      icon: Truck,
      title: 'Trackside Rapid Dispatch',
      desc: 'Same-day handling and tracked express courier for weekend race readiness.'
    },
    {
      id: 'tech-guarantee',
      icon: ShieldCheck,
      title: '30-Day Tech Warranty',
      desc: 'Comprehensive warranty support and dedicated engineering consultation.'
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast('Welcome to TechRcPro Pitwall! Tuning updates & exclusive discounts sent.');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#070A10] text-[#F8FAFC] pt-16 pb-12 border-t border-[#1E293B]">
      {/* Brand Values Banner Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-12 border-b border-[#1E293B]">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
            Engineering Standards & Guarantees
          </span>
        </div>

        <Carousel
          id="footer-brand-values"
          itemClassName="w-[78vw] sm:w-[280px] md:w-[280px] lg:w-[275px] flex-shrink-0 snap-start"
          showArrows={true}
          showDots={true}
        >
          {brandValues.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="h-full flex flex-col items-start bg-[#131D31] p-5 rounded-2xl border border-[#1E293B] shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0284C7]/20 border border-[#0284C7]/30 flex items-center justify-center text-[#38BDF8] mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#F8FAFC] mb-1.5">{item.title}</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </Carousel>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0284C7] flex items-center justify-center text-white">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-serif text-2xl font-extrabold tracking-tight text-[#F8FAFC] block">
              TECH<span className="text-[#38BDF8]">RC</span><span className="text-[#F59E0B]">PRO</span>
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
            High-performance RC engineering, competition brushless systems, graphene LiPo packs, low-latency telemetry radios, and carbon fiber chassis upgrades.
          </p>

          <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
            <label htmlFor="newsletter-email" className="block text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-2">
              Join Pitwall VIP Tech Bulletins
            </label>
            <div className="flex items-center bg-[#131D31] border border-[#1E293B] rounded-xl overflow-hidden focus-within:border-[#0284C7]">
              <Mail className="w-4 h-4 text-[#94A3B8] ml-3 flex-shrink-0" />
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter racer email for tuning tips..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                aria-label="Subscribe"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#38BDF8] mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs text-[#94A3B8]">
            <li>
              <button
                id="footer-nav-home"
                onClick={() => setCurrentPage('home')}
                className="hover:text-[#38BDF8] hover:underline cursor-pointer transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                id="footer-nav-shop"
                onClick={() => setCurrentPage('shop')}
                className="hover:text-[#38BDF8] hover:underline cursor-pointer transition-colors"
              >
                RC Parts Catalog
              </button>
            </li>
            <li>
              <button
                id="footer-nav-about"
                onClick={() => setCurrentPage('about')}
                className="hover:text-[#38BDF8] hover:underline cursor-pointer transition-colors"
              >
                Engineering & Lab Specs
              </button>
            </li>
            <li>
              <button
                id="footer-nav-blogs"
                onClick={() => setCurrentPage('blogs')}
                className="hover:text-[#38BDF8] hover:underline cursor-pointer transition-colors"
              >
                RC Tuning Guides
              </button>
            </li>
            <li>
              <button
                id="footer-nav-contact"
                onClick={() => setCurrentPage('contact')}
                className="hover:text-[#38BDF8] hover:underline cursor-pointer transition-colors"
              >
                Tech Support & Pit Help
              </button>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#38BDF8] mb-4">
            RC Categories
          </h4>
          <ul className="space-y-2 text-xs text-[#94A3B8]">
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  id={`footer-cat-${cat.id}`}
                  onClick={() => {
                    setSelectedCategorySlug(cat.name);
                    setCurrentPage('shop');
                  }}
                  className="hover:text-[#38BDF8] hover:underline cursor-pointer transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Lab Contact */}
        <div>
          <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#38BDF8] mb-4">
            Tech Center & Lab
          </h4>
          <div className="space-y-2 text-xs text-[#94A3B8] leading-relaxed">
            <p>TechRcPro Engineering Lab</p>
            <p>500 Speed Circuit Blvd, Suite 100</p>
            <p className="pt-1 font-mono text-[11px] text-[#38BDF8]">support@techrcpro.com</p>
            <p className="font-mono text-[11px]">(346) 475-6682</p>
          </div>
        </div>
      </div>

      {/* Copyright Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
        <p className="flex items-center gap-2 flex-wrap">
          <span>&copy; {new Date().getFullYear()} TechRcPro Performance Engineering. All rights reserved.</span>
          <span>•</span>
          <button
            id="footer-manager-link"
            onClick={() => setCurrentPage('manager-auth')}
            className="text-[#64748B] hover:text-[#38BDF8] transition-colors cursor-pointer underline-offset-2 hover:underline"
          >
            Manager Portal
          </button>
        </p>
        <div className="flex items-center space-x-6">
          <button
            id="footer-privacy-policy-link"
            onClick={() => setCurrentPage('privacy-policy')}
            className="text-[#64748B] hover:text-[#38BDF8] transition-colors cursor-pointer underline-offset-2 hover:underline"
          >
            Privacy Policy
          </button>
          <button
            id="footer-terms-service-link"
            onClick={() => setCurrentPage('terms-of-service')}
            className="text-[#64748B] hover:text-[#38BDF8] transition-colors cursor-pointer underline-offset-2 hover:underline"
          >
            Terms of Service
          </button>
          <button
            id="footer-ethical-sourcing-link"
            onClick={() => setCurrentPage('ethical-sourcing')}
            className="text-[#64748B] hover:text-[#38BDF8] transition-colors cursor-pointer underline-offset-2 hover:underline"
          >
            Engineering Standards
          </button>
        </div>
      </div>
    </footer>
  );
};
