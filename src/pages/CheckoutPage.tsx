import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, ShieldCheck, ArrowRight, Truck, ShoppingBag, ArrowLeft, Building, Phone, User, FileText, Check, Cpu, Zap } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    getCheckedCartItems,
    getCheckedTotal,
    directBuyItem,
    placeOrder,
    setCurrentPage,
    auth
  } = useStore();

  // Form Fields
  const [customerName, setCustomerName] = useState(auth.user?.name || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(auth.user?.email || '');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Credit/Debit Card (Demo)' | 'Bank Transfer (Demo)'>('Cash on Delivery');

  // Confirmation state
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  // Determine items being purchased
  const checkoutItems = directBuyItem
    ? [{
        productId: directBuyItem.product.id,
        productName: directBuyItem.product.name,
        price: directBuyItem.product.price,
        quantity: directBuyItem.quantity,
        image: directBuyItem.product.images[0]
      }]
    : getCheckedCartItems().map(ci => ({
        productId: ci.product.id,
        productName: ci.product.name,
        price: ci.product.price,
        quantity: ci.quantity,
        image: ci.product.images[0]
      }));

  const subtotal = directBuyItem
    ? directBuyItem.product.price * directBuyItem.quantity
    : getCheckedTotal();

  const freeShippingThreshold = 99;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 12;
  const grandTotal = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutItems.length === 0) return;

    const newOrder = placeOrder({
      customerName,
      phone,
      email,
      shippingAddress,
      city,
      orderNotes,
      paymentMethod,
      items: checkoutItems,
      totalAmount: grandTotal
    });

    setCompletedOrder(newOrder);
  };

  // If order was successfully created, show confirmation receipt
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
        <div className="w-20 h-20 rounded-3xl bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] mx-auto shadow-xl shadow-emerald-950/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#10B981]">
            Trackside Dispatch Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            Thank You for Ordering with TechRcPro!
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
            Your RC parts order has been logged into our warehouse fulfillment system. We have sent a confirmation email with package tracking info.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-[#131D31] rounded-3xl p-6 sm:p-8 border border-[#1E293B] text-left space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-[#1E293B] pb-4">
            <div>
              <span className="text-xs text-[#94A3B8]">Order Reference:</span>
              <div className="font-mono font-bold text-sm text-[#38BDF8]">{completedOrder.id}</div>
            </div>
            <div>
              <span className="text-xs text-[#94A3B8]">Dispatch Status:</span>
              <div className="text-xs font-bold text-[#F59E0B] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                {completedOrder.status}
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Ordered Hardware ({completedOrder.items.length} items)
            </h4>
            <div className="divide-y divide-[#1E293B]">
              {completedOrder.items.map((it: any, i: number) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={it.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-[#0B0F19]" />
                    <div>
                      <h5 className="font-bold text-[#F8FAFC]">{it.productName}</h5>
                      <span className="text-[#94A3B8]">Qty: {it.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#F8FAFC]">
                    ${(it.price * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1E293B] text-xs text-[#94A3B8]">
            <div>
              <span className="font-bold text-[#F8FAFC] block mb-1">Pit Delivery Address:</span>
              <p>{completedOrder.customerName}</p>
              <p>{completedOrder.shippingAddress}</p>
              <p>{completedOrder.city}</p>
              <p className="font-mono text-[11px]">{completedOrder.phone}</p>
            </div>
            <div>
              <span className="font-bold text-[#F8FAFC] block mb-1">Payment Method:</span>
              <p>{completedOrder.paymentMethod}</p>
              <div className="pt-2 font-serif text-base font-extrabold text-[#38BDF8]">
                Grand Total: ${completedOrder.totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="checkout-success-shop-btn"
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-3.5 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-sky-950/40 cursor-pointer"
          >
            Continue Browsing RC Catalog
          </button>
          <button
            id="checkout-success-home-btn"
            onClick={() => setCurrentPage('home')}
            className="px-8 py-3.5 bg-[#131D31] hover:bg-[#1E293B] text-[#F8FAFC] font-semibold text-xs rounded-xl border border-[#1E293B] transition-colors cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // If no items in checkout
  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#131D31] border border-[#1E293B] flex items-center justify-center text-[#64748B] mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#38BDF8]">No RC Parts Selected for Checkout</h2>
        <p className="text-xs text-[#94A3B8]">
          Your staging bay has no checked items. Please select parts from your cart or click "Direct Buy" on any product.
        </p>
        <button
          id="checkout-empty-shop-btn"
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 bg-[#0284C7] text-white text-xs font-bold rounded-xl hover:bg-[#0369A1] transition-colors cursor-pointer"
        >
          Browse RC Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Back Button */}
      <button
        id="checkout-back-btn"
        onClick={() => setCurrentPage('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#94A3B8] hover:text-[#38BDF8] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to RC Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Checkout Form */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
              Direct Fast Checkout
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] mt-1">
              Fulfillment & Dispatch Details
            </h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              Enter your pit or workshop delivery address for rapid tracked dispatch.
            </p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Customer Details */}
            <div className="bg-[#131D31] rounded-3xl p-6 sm:p-8 border border-[#1E293B] space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#38BDF8] border-b border-[#1E293B] pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-[#38BDF8]" />
                <span>1. Racer Contact Info</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                    Full Name <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                    Email for Dispatch Tracking <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    placeholder="racer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                  Contact Phone Number <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  placeholder="(346) 475-6682"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-[#131D31] rounded-3xl p-6 sm:p-8 border border-[#1E293B] space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#38BDF8] border-b border-[#1E293B] pb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#38BDF8]" />
                <span>2. Pit & Shipping Address</span>
              </h2>

              <div>
                <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                  Street Address / Track Bay <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  required
                  placeholder="742 Speed Circuit Parkway, Suite 4"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                    City & State / Region <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    placeholder="Austin, TX"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                    Order Delivery Notes (Optional)
                  </label>
                  <input
                    id="checkout-notes"
                    type="text"
                    placeholder="e.g. Leave at race pit table"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#131D31] rounded-3xl p-6 sm:p-8 border border-[#1E293B] space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#38BDF8] border-b border-[#1E293B] pb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                <span>3. Payment Gateway Option</span>
              </h2>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#1E293B] bg-[#0B0F19] hover:border-[#0284C7] cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="text-[#0284C7] focus:ring-[#0284C7]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#F8FAFC] block">Cash on Delivery / Trackside Pickup</span>
                      <span className="text-[11px] text-[#94A3B8]">Pay upon package arrival or pit pick-up.</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#10B981]">Instant Clearance</span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#1E293B] bg-[#0B0F19] hover:border-[#0284C7] cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Credit/Debit Card (Demo)'}
                      onChange={() => setPaymentMethod('Credit/Debit Card (Demo)')}
                      className="text-[#0284C7] focus:ring-[#0284C7]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#F8FAFC] block">Credit / Debit Card (Demo Simulated)</span>
                      <span className="text-[11px] text-[#94A3B8]">256-bit encrypted test gateway.</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#94A3B8]">Visa / MC / Amex</span>
                </label>
              </div>
            </div>

            <button
              id="checkout-confirm-order-btn"
              type="submit"
              className="w-full py-4 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-sky-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Transmit RC Order (${grandTotal.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Order Items Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#131D31] rounded-3xl p-6 sm:p-8 border border-[#1E293B] shadow-xl sticky top-28 space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#38BDF8] border-b border-[#1E293B] pb-3">
              Order Summary ({checkoutItems.length} items)
            </h2>

            <div className="space-y-3 max-h-80 overflow-y-auto divide-y divide-[#1E293B] pr-1">
              {checkoutItems.map((item, idx) => (
                <div key={idx} className="pt-3 flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-14 h-14 rounded-xl object-cover bg-[#0B0F19] border border-[#1E293B] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-bold text-[#F8FAFC] truncate">
                      {item.productName}
                    </h4>
                    <div className="text-[11px] text-[#94A3B8] flex justify-between pt-1">
                      <span>Qty: {item.quantity}</span>
                      <span className="font-mono font-bold text-[#38BDF8]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1E293B] pt-4 space-y-2 text-xs text-[#94A3B8]">
              <div className="flex justify-between">
                <span>Components Subtotal:</span>
                <span className="font-mono font-bold text-[#F8FAFC]">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tracked Express Courier:</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="text-[#10B981]">FREE ($0.00)</strong>
                  ) : (
                    <span className="font-mono font-bold text-[#F8FAFC]">${shippingCost.toFixed(2)}</span>
                  )}
                </span>
              </div>

              <div className="border-t border-[#1E293B] pt-3 flex justify-between items-baseline">
                <span className="font-serif text-sm font-bold text-[#F8FAFC]">
                  Grand Total Due:
                </span>
                <span className="font-serif text-2xl font-extrabold text-[#38BDF8]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B] space-y-1 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-1.5 text-[#10B981] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>30-Day Tech Warranty Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All components undergo full bench verification prior to packing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
