import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Menu, X, Search, ChevronDown, User, Cpu, Gauge, Radio, Shield } from 'lucide-react';
import { ViewPage } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    getTotalCartItemsCount,
    setIsCartOpen,
    categories,
    setSelectedCategorySlug,
    auth,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const cartCount = getTotalCartItemsCount();

  const handleNavClick = (page: ViewPage, categorySlug?: string) => {
    setCurrentPage(page);
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
    }
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('shop');
      setShowSearchInput(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#1E293B] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F8FAFC] hover:bg-[#131D31] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center">
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="text-left cursor-pointer group flex items-center gap-2.5"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors flex items-center gap-1">
                <span>TECH</span>
                <span className="text-[#38BDF8]">RC</span>
                <span className="text-[#F59E0B]">PRO</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#94A3B8] -mt-1 font-sans font-semibold">
                Authorized Dealer
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
          <button
            id="nav-link-home"
            onClick={() => handleNavClick('home')}
            className={`transition-colors py-2 cursor-pointer ${
              currentPage === 'home'
                ? 'text-[#38BDF8] font-semibold border-b-2 border-[#0284C7]'
                : 'text-[#F8FAFC] hover:text-[#38BDF8]'
            }`}
          >
            Home
          </button>

          <button
            id="nav-link-shop"
            onClick={() => handleNavClick('shop')}
            className={`transition-colors py-2 cursor-pointer ${
              currentPage === 'shop'
                ? 'text-[#38BDF8] font-semibold border-b-2 border-[#0284C7]'
                : 'text-[#F8FAFC] hover:text-[#38BDF8]'
            }`}
          >
            RC Catalog
          </button>

          {/* Categories Dropdown */}
          <div className="relative group">
            <button
              id="nav-categories-dropdown-btn"
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              className="flex items-center gap-1.5 py-2 text-[#F8FAFC] hover:text-[#38BDF8] transition-colors cursor-pointer"
            >
              <span>RC Categories</span>
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-[#94A3B8]" />
            </button>

            {categoriesDropdownOpen && (
              <div
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
                className="absolute top-full left-0 w-72 bg-[#131D31] border border-[#1E293B] rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 backdrop-blur-xl"
              >
                <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                  RC Parts Categories
                </div>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    id={`nav-cat-${cat.id}`}
                    onClick={() => handleNavClick('shop', cat.name)}
                    className="w-full text-left px-4 py-2 text-sm text-[#F8FAFC] hover:bg-[#1E293B] hover:text-[#38BDF8] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-[#94A3B8] bg-[#0B0F19] px-2 py-0.5 rounded-full border border-[#1E293B]">
                      {cat.itemCount || ''}
                    </span>
                  </button>
                ))}
                <div className="border-t border-[#1E293B] mt-2 pt-2 px-4">
                  <button
                    id="nav-cat-view-all"
                    onClick={() => handleNavClick('shop')}
                    className="text-xs font-semibold text-[#38BDF8] hover:underline cursor-pointer"
                  >
                    View Full Catalog &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            id="nav-link-about"
            onClick={() => handleNavClick('about')}
            className={`transition-colors py-2 cursor-pointer ${
              currentPage === 'about'
                ? 'text-[#38BDF8] font-semibold border-b-2 border-[#0284C7]'
                : 'text-[#F8FAFC] hover:text-[#38BDF8]'
            }`}
          >
            Engineering & Lab
          </button>

          <button
            id="nav-link-blogs"
            onClick={() => handleNavClick('blogs')}
            className={`transition-colors py-2 cursor-pointer ${
              currentPage === 'blogs' || currentPage === 'blog-detail'
                ? 'text-[#38BDF8] font-semibold border-b-2 border-[#0284C7]'
                : 'text-[#F8FAFC] hover:text-[#38BDF8]'
            }`}
          >
            Tuning Guides
          </button>

          <button
            id="nav-link-contact"
            onClick={() => handleNavClick('contact')}
            className={`transition-colors py-2 cursor-pointer ${
              currentPage === 'contact'
                ? 'text-[#38BDF8] font-semibold border-b-2 border-[#0284C7]'
                : 'text-[#F8FAFC] hover:text-[#38BDF8]'
            }`}
          >
            Tech Support
          </button>
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search Toggle Button */}
          <div className="relative">
            {showSearchInput ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  id="nav-search-input"
                  type="text"
                  placeholder="Search motors, ESCs, LiPo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-44 sm:w-64 px-3 py-1.5 text-xs bg-[#131D31] border border-[#1E293B] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#0284C7]"
                />
                <button
                  type="button"
                  onClick={() => setShowSearchInput(false)}
                  className="p-1 text-[#94A3B8] hover:text-[#F8FAFC] ml-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                id="nav-search-toggle-btn"
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-[#F8FAFC] hover:bg-[#131D31] rounded-xl transition-colors cursor-pointer"
                aria-label="Search Catalog"
              >
                <Search className="w-5 h-5 text-[#94A3B8] hover:text-[#38BDF8]" />
              </button>
            )}
          </div>

          {/* User Profile / Portal Link */}
          {auth.user ? (
            <div className="flex items-center gap-2">
              <button
                id="nav-user-account-btn"
                onClick={() => handleNavClick(auth.role === 'admin' ? 'admin' : 'shop')}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#131D31] border border-[#1E293B] hover:border-[#0284C7] transition-colors cursor-pointer text-xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-[10px]">
                  {auth.user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline font-medium text-[#F8FAFC] max-w-[100px] truncate">
                  {auth.user.name}
                </span>
                {auth.role === 'admin' && (
                  <span className="hidden sm:inline-block bg-[#0284C7]/20 text-[#38BDF8] text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border border-[#0284C7]/30">
                    Admin
                  </span>
                )}
              </button>
            </div>
          ) : (
            <button
              id="nav-sign-in-btn"
              onClick={() => setCurrentPage('auth')}
              className="p-2 text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#131D31] rounded-xl transition-colors cursor-pointer"
              aria-label="Sign In"
            >
              <User className="w-5 h-5" />
            </button>
          )}

          {/* Cart Drawer Trigger */}
          <button
            id="nav-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-[#131D31] hover:bg-[#1E293B] text-[#F8FAFC] border border-[#1E293B] hover:border-[#0284C7] rounded-xl transition-all cursor-pointer group shadow-sm"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#38BDF8] group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#0284C7] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19] border-b border-[#1E293B] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <button
              id="mobile-nav-home"
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-[#F8FAFC] hover:bg-[#131D31] transition-colors"
            >
              Home
            </button>
            <button
              id="mobile-nav-shop"
              onClick={() => handleNavClick('shop')}
              className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-[#F8FAFC] hover:bg-[#131D31] transition-colors"
            >
              RC Catalog
            </button>
            <button
              id="mobile-nav-about"
              onClick={() => handleNavClick('about')}
              className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-[#F8FAFC] hover:bg-[#131D31] transition-colors"
            >
              Engineering & Lab
            </button>
            <button
              id="mobile-nav-blogs"
              onClick={() => handleNavClick('blogs')}
              className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-[#F8FAFC] hover:bg-[#131D31] transition-colors"
            >
              Tuning Guides
            </button>
            <button
              id="mobile-nav-contact"
              onClick={() => handleNavClick('contact')}
              className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-[#F8FAFC] hover:bg-[#131D31] transition-colors"
            >
              Tech Support
            </button>
          </div>

          <div className="pt-3 border-t border-[#1E293B]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2 px-3">
              RC Categories
            </div>
            <div className="grid grid-cols-1 gap-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  id={`mobile-nav-cat-${cat.id}`}
                  onClick={() => handleNavClick('shop', cat.name)}
                  className="w-full text-left px-3 py-2 text-xs text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#131D31] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-[#64748B]">{cat.itemCount || ''} items</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
