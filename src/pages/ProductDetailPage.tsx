import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ShoppingBag, Star, Zap, ShieldCheck, Truck, ArrowLeft, Check, ChevronRight, Cpu, Gauge, Share2 } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    triggerBuyNow,
    setCurrentPage,
    setSelectedCategorySlug,
    showToast
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'shipping'>('specs');

  if (!product) return null;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
  };

  const handleDirectBuy = () => {
    triggerBuyNow(product, quantity);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1E293B]">
        <button
          id="product-detail-back-btn"
          onClick={() => setCurrentPage('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#94A3B8] hover:text-[#38BDF8] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to RC Parts Catalog</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#F8FAFC]">Home</button>
          <span>/</span>
          <button
            onClick={() => {
              setSelectedCategorySlug(product.category);
              setCurrentPage('shop');
            }}
            className="hover:text-[#F8FAFC]"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="font-medium text-[#F8FAFC] truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Images Gallery */}
        <div className="space-y-4">
          <div className="aspect-4/3 rounded-3xl overflow-hidden bg-[#131D31] border border-[#1E293B] shadow-2xl relative">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isFeatured && (
              <span className="absolute top-4 left-4 bg-[#0284C7] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                Competition Spec
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  id={`product-thumb-${idx}`}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#131D31] flex-shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#0284C7] scale-105 shadow-md shadow-sky-900/30'
                      : 'border-[#1E293B] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Purchase Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] bg-[#131D31] px-3 py-1 rounded-md border border-[#1E293B]">
                {product.category}
              </span>
              <button
                id="share-product-btn"
                onClick={handleShare}
                className="p-2 text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#131D31] rounded-xl transition-colors cursor-pointer"
                title="Share Component"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] pt-1">
              <div className="flex items-center text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#F59E0B] text-[#F59E0B]'
                        : 'text-[#334155]'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-[#F8FAFC]">{product.rating.toFixed(1)}</span>
              <span>•</span>
              <span className="text-[#38BDF8] underline">{product.reviewCount} verified driver reviews</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-5 rounded-2xl bg-[#131D31] border border-[#1E293B] flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#64748B] line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-[#0284C7]/20 border border-[#0284C7]/40 text-[#38BDF8] text-xs font-bold px-2 py-0.5 rounded">
                  Save ${(product.originalPrice - product.price).toFixed(0)}
                </span>
              )}
            </div>

            <div className="text-xs text-right">
              <span className="text-[#10B981] font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Ready to Dispatch
              </span>
              <span className="text-[11px] text-[#94A3B8]">{product.stock} units in pit stock</span>
            </div>
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
            {product.description}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-[#131D31] border border-[#1E293B] rounded-xl p-1">
                <button
                  id="pdp-qty-minus-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 font-mono font-bold text-sm text-[#F8FAFC]">{quantity}</span>
                <button
                  id="pdp-qty-plus-btn"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1 text-sm font-bold text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-[#94A3B8]">
                Subtotal: <strong className="text-[#F8FAFC]">${(product.price * quantity).toFixed(2)}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                id="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#1E293B] hover:bg-[#334155] text-[#F8FAFC] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#334155]"
              >
                <ShoppingBag className="w-4 h-4 text-[#38BDF8]" />
                <span>Add to Staging Bay</span>
              </button>

              <button
                id="pdp-direct-buy-btn"
                onClick={handleDirectBuy}
                className="w-full py-4 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-sky-950/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Direct Checkout Now</span>
              </button>
            </div>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1E293B] text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#38BDF8]" />
              <span>100% Dyno Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#38BDF8]" />
              <span>Same-Day Trackside Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              <span>30-Day Tech Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#38BDF8]" />
              <span>High-Grade 7075 & 3K Carbon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications / Tuning Info / Shipping */}
      <div className="bg-[#131D31] rounded-3xl p-6 sm:p-10 border border-[#1E293B] space-y-6">
        <div className="flex border-b border-[#1E293B] gap-6">
          <button
            id="tab-specs-btn"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === 'specs'
                ? 'text-[#38BDF8] border-[#0284C7]'
                : 'text-[#94A3B8] border-transparent hover:text-[#F8FAFC]'
            }`}
          >
            Engineering Specs
          </button>
          <button
            id="tab-desc-btn"
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === 'description'
                ? 'text-[#38BDF8] border-[#0284C7]'
                : 'text-[#94A3B8] border-transparent hover:text-[#F8FAFC]'
            }`}
          >
            Overview & Compatibility
          </button>
          <button
            id="tab-shipping-btn"
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === 'shipping'
                ? 'text-[#38BDF8] border-[#0284C7]'
                : 'text-[#94A3B8] border-transparent hover:text-[#F8FAFC]'
            }`}
          >
            Trackside Shipping & Warranty
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#F8FAFC]">
              Bench & Technical Specifications
            </h3>
            {product.specs ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-3 bg-[#0B0F19] rounded-xl border border-[#1E293B] flex justify-between text-xs">
                    <span className="text-[#94A3B8] font-medium">{key}</span>
                    <span className="font-mono font-bold text-[#F8FAFC]">{val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#94A3B8]">Standard competition specs apply.</p>
            )}
          </div>
        )}

        {activeTab === 'description' && (
          <div className="space-y-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            <h3 className="font-serif text-lg font-bold text-[#F8FAFC]">
              Engineering Overview
            </h3>
            <p>{product.description}</p>
            <p>
              Designed for high-stress competition RC applications. Compatible with standard 1/10 and 1/8 racing chassis, buggies, crawlers, and high-speed multi-rotor platforms.
            </p>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            <h3 className="font-serif text-lg font-bold text-[#F8FAFC]">
              Dispatch & Warranty Policies
            </h3>
            <p>
              Orders placed before 2:00 PM EST ship same day via Tracked Express Courier. Free shipping automatically applies on all orders exceeding $99.
            </p>
            <p>
              All TechRcPro components come backed by our 30-day pit guarantee against factory material defects.
            </p>
          </div>
        )}
      </div>

      {/* Related RC Upgrades */}
      {relatedProducts.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                Complementary Gear
              </span>
              <h2 className="font-serif text-2xl font-extrabold text-[#38BDF8] mt-1">
                More Upgrades in {product.category}
              </h2>
            </div>
            <button
              id="related-view-all-btn"
              onClick={() => {
                setSelectedCategorySlug(product.category);
                setCurrentPage('shop');
              }}
              className="text-xs font-bold text-[#38BDF8] hover:text-[#0284C7] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
