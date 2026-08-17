import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Star, Zap, Eye, Cpu } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, triggerBuyNow, setSelectedProductId, setCurrentPage } = useStore();

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProductId(product.id);
    setCurrentPage('product-detail');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, true);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerBuyNow(product, 1);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleQuickView}
      className="group bg-[#131D31] rounded-2xl overflow-hidden border border-[#1E293B] hover:border-[#0284C7] transition-all duration-300 hover:shadow-xl hover:shadow-sky-950/40 flex flex-col h-full cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 bg-[#0B0F19] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isFeatured && (
            <span className="bg-[#0284C7] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              Top Spec
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-[#0B0F19]/90 text-[#38BDF8] border border-[#0284C7]/40 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
              Save ${(product.originalPrice - product.price).toFixed(0)}
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 bg-[#0B0F19]/80 backdrop-blur-xs text-[#94A3B8] text-[10px] font-semibold px-2.5 py-0.5 rounded-md border border-[#1E293B]">
          {product.category}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <div className="flex items-center text-[#F59E0B]">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            </div>
            <span className="font-bold text-[#F8FAFC]">{product.rating.toFixed(1)}</span>
            <span className="text-[11px] text-[#64748B]">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed font-light">
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-[#1E293B] space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#64748B] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <span className="text-[11px] text-[#10B981] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              In Stock ({product.stock})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id={`add-to-cart-btn-${product.id}`}
              onClick={handleAddToCart}
              className="w-full py-2.5 bg-[#1E293B] hover:bg-[#334155] text-[#F8FAFC] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#334155]"
              aria-label={`Add ${product.name} to Cart`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Add Cart</span>
            </button>

            <button
              id={`buy-now-btn-${product.id}`}
              onClick={handleBuyNow}
              className="w-full py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-sky-900/30"
              aria-label={`Direct Buy ${product.name}`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Direct Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
