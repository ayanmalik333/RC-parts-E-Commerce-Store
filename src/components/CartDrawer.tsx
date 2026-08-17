import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, X, Trash2, Plus, Minus, Check, ArrowRight, ShieldCheck, Tag, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    toggleCartItemCheck,
    toggleAllCartItemsCheck,
    getCheckedTotal,
    getCheckedItemCount,
    getTotalCartItemsCount,
    setCurrentPage,
    setDirectBuyItem
  } = useStore();

  const checkedTotal = getCheckedTotal();
  const checkedCount = getCheckedItemCount();
  const totalCount = getTotalCartItemsCount();
  const allChecked = cart.length > 0 && cart.every(item => item.isChecked);
  const freeShippingThreshold = 99;
  const progressToFreeShipping = Math.min(100, (checkedTotal / freeShippingThreshold) * 100);

  const handleProceedToCheckout = () => {
    if (checkedCount === 0) return;
    setDirectBuyItem(null); // Clear direct buy mode so checkout uses checked cart items
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#0B0F19] text-[#F8FAFC] shadow-2xl h-full flex flex-col z-10 border-l border-[#1E293B]"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#1E293B] bg-[#131D31] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#0284C7]/20 border border-[#0284C7]/30 rounded-xl text-[#38BDF8]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F8FAFC]">
                    RC Parts Staging Bay
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    {totalCount} item{totalCount !== 1 ? 's' : ''} in cart ({checkedCount} ready for checkout)
                  </p>
                </div>
              </div>

              <button
                id="cart-drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-xl transition-colors cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Trackside Shipping Tracker */}
            <div className="p-4 bg-[#131D31]/60 border-b border-[#1E293B] space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#94A3B8]">
                  {checkedTotal >= freeShippingThreshold ? (
                    <span className="text-[#10B981] flex items-center gap-1 font-bold">
                      <Check className="w-3.5 h-3.5" /> FREE Tracked Express Shipping Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#38BDF8]">${(freeShippingThreshold - checkedTotal).toFixed(2)}</strong> more for Free Tracked Express
                    </span>
                  )}
                </span>
                <span className="text-[#38BDF8] font-mono">${checkedTotal.toFixed(2)} / ${freeShippingThreshold}</span>
              </div>
              <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#1E293B]">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#131D31] border border-[#1E293B] flex items-center justify-center text-[#64748B]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-bold text-[#F8FAFC]">
                      Your Staging Bay is Empty
                    </h4>
                    <p className="text-xs text-[#94A3B8] max-w-xs">
                      Explore our brushless motors, graphene LiPo packs, and high-performance carbon chassis kits.
                    </p>
                  </div>
                  <button
                    id="cart-empty-shop-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentPage('shop');
                    }}
                    className="px-6 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Browse RC Catalog
                  </button>
                </div>
              ) : (
                <>
                  {/* Select All Checkbox Header */}
                  <div className="pb-2 flex items-center justify-between text-xs text-[#94A3B8]">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        id="cart-select-all-checkbox"
                        type="checkbox"
                        checked={allChecked}
                        onChange={(e) => toggleAllCartItemsCheck(e.target.checked)}
                        className="rounded border-[#334155] text-[#0284C7] focus:ring-[#0284C7] bg-[#131D31] cursor-pointer"
                      />
                      <span>Select all items ({cart.length})</span>
                    </label>
                    <span className="text-[11px] text-[#64748B]">Only checked items proceed to checkout</span>
                  </div>

                  {cart.map(item => (
                    <div
                      key={item.product.id}
                      id={`cart-item-${item.product.id}`}
                      className={`pt-3 flex gap-3 transition-opacity ${item.isChecked ? 'opacity-100' : 'opacity-50'}`}
                    >
                      {/* Checkbox */}
                      <div className="pt-2">
                        <input
                          id={`cart-item-check-${item.product.id}`}
                          type="checkbox"
                          checked={item.isChecked}
                          onChange={() => toggleCartItemCheck(item.product.id)}
                          className="rounded border-[#334155] text-[#0284C7] focus:ring-[#0284C7] bg-[#131D31] cursor-pointer"
                          aria-label={`Select ${item.product.name} for checkout`}
                        />
                      </div>

                      {/* Thumbnail */}
                      <div className="w-18 h-18 rounded-xl bg-[#131D31] border border-[#1E293B] overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-bold text-[#F8FAFC] truncate pr-2">
                            {item.product.name}
                          </h4>
                          <button
                            id={`cart-remove-${item.product.id}`}
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#64748B] hover:text-[#EF4444] transition-colors p-1 cursor-pointer"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-xs font-semibold text-[#38BDF8]">
                          ${item.product.price.toFixed(2)}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          {/* Quantity selector */}
                          <div className="flex items-center bg-[#131D31] border border-[#1E293B] rounded-lg">
                            <button
                              id={`cart-qty-minus-${item.product.id}`}
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold text-[#F8FAFC]">
                              {item.quantity}
                            </span>
                            <button
                              id={`cart-qty-plus-${item.product.id}`}
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-mono font-bold text-[#F8FAFC]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#1E293B] bg-[#131D31] space-y-4">
                <div className="space-y-1.5 text-xs text-[#94A3B8]">
                  <div className="flex justify-between">
                    <span>Selected Items Subtotal ({checkedCount} items):</span>
                    <span className="font-mono font-bold text-[#F8FAFC]">${checkedTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tracked Express Courier:</span>
                    <span>{checkedTotal >= freeShippingThreshold || checkedTotal === 0 ? <strong className="text-[#10B981]">FREE</strong> : '$12.00'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1E293B] flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-sm font-bold text-[#F8FAFC] block">
                      Checkout Total:
                    </span>
                    <span className="text-[11px] text-[#64748B]">Taxes calculated at dispatch</span>
                  </div>
                  <span className="font-serif text-2xl font-extrabold text-[#38BDF8]">
                    ${(checkedTotal + (checkedTotal >= freeShippingThreshold || checkedTotal === 0 ? 0 : 12)).toFixed(2)}
                  </span>
                </div>

                <button
                  id="cart-checkout-proceed-btn"
                  onClick={handleProceedToCheckout}
                  disabled={checkedCount === 0}
                  className="w-full py-3.5 bg-[#0284C7] hover:bg-[#0369A1] disabled:bg-[#1E293B] disabled:text-[#64748B] text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Proceed to Direct Checkout ({checkedCount})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
