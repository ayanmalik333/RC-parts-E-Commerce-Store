import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, ArrowUpDown, Cpu, X, Tag } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategorySlug,
    setSelectedCategorySlug,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState<'sequence' | 'price-low' | 'price-high' | 'rating'>('sequence');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category filter
        if (selectedCategorySlug && selectedCategorySlug !== 'All' && p.category !== selectedCategorySlug) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          const matchesCat = p.category.toLowerCase().includes(q);
          const matchesTags = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
          if (!matchesName && !matchesDesc && !matchesCat && !matchesTags) {
            return false;
          }
        }
        // In Stock filter
        if (inStockOnly && (!p.inStock || p.stock <= 0)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: Sequence Order
        return (a.sequenceOrder || 99) - (b.sequenceOrder || 99);
      });
  }, [products, selectedCategorySlug, searchQuery, inStockOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#131D31] rounded-3xl p-8 sm:p-12 border border-[#1E293B] text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
          Performance Engineering Lineup
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F8FAFC]">
          High-Performance RC Parts Catalog
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-light max-w-xl mx-auto leading-relaxed">
          Explore dyno-rated brushless motors, high-discharge LiPo batteries, precision telemetry radios, and carbon fiber chassis hardware.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
          <input
            id="shop-search-input"
            type="text"
            placeholder="Search brushless motor, 6S LiPo, 45kg servo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7] placeholder-[#64748B]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-2">
        <button
          id="cat-pill-all"
          onClick={() => setSelectedCategorySlug(null)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
            !selectedCategorySlug || selectedCategorySlug === 'All'
              ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-md shadow-sky-950/30'
              : 'bg-[#131D31] text-[#94A3B8] border-[#1E293B] hover:border-[#38BDF8] hover:text-[#F8FAFC]'
          }`}
        >
          All RC Hardware ({products.length})
        </button>

        {categories.map(cat => {
          const isSelected = selectedCategorySlug === cat.name;
          return (
            <button
              key={cat.id}
              id={`cat-pill-${cat.id}`}
              onClick={() => setSelectedCategorySlug(cat.name)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-md shadow-sky-950/30'
                  : 'bg-[#131D31] text-[#94A3B8] border-[#1E293B] hover:border-[#38BDF8] hover:text-[#F8FAFC]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#1E293B]">
        <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
          <span>
            Showing <strong className="text-[#F8FAFC]">{filteredProducts.length}</strong> components
          </span>

          {/* In Stock toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              id="shop-in-stock-filter"
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-[#334155] text-[#0284C7] focus:ring-[#0284C7] bg-[#131D31] cursor-pointer"
            />
            <span className="text-[#F8FAFC]">Ready to Dispatch Only</span>
          </label>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-xs text-[#94A3B8]">Sort by:</span>
          <select
            id="shop-sort-select"
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-[#131D31] text-xs text-[#F8FAFC] border border-[#1E293B] rounded-xl px-3 py-2 focus:outline-none focus:border-[#0284C7] cursor-pointer"
          >
            <option value="sequence">Featured & Engineering Rank</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Racer Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 text-center bg-[#131D31] rounded-3xl border border-[#1E293B] space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0B0F19] border border-[#1E293B] flex items-center justify-center text-[#64748B] mx-auto">
            <Filter className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-[#F8FAFC]">No Matching RC Components Found</h3>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              Try adjusting your search query or selecting a different category from the filters above.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategorySlug(null);
              setInStockOnly(false);
            }}
            className="px-6 py-2.5 bg-[#0284C7] text-white text-xs font-bold rounded-xl hover:bg-[#0369A1] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
