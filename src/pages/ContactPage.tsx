import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2, ShieldCheck, Cpu, Gauge } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addInquiry, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please complete the required fields.');
      return;
    }

    addInquiry({
      name,
      email,
      phone,
      subject: subject || 'General Technical Consultation',
      message
    });

    setIsSubmitted(true);
    showToast('Inquiry logged! Our RC technicians will reply within 4 hours.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
          Pitwall Technical Support & Engineering
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F8FAFC]">
          Contact TechRcPro Tech Center
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed max-w-xl mx-auto">
          Need gear ratio calculations, ESC programming assistance, team sponsorship, or custom LiPo battery setups? Our engineers are on standby.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#131D31] border border-[#1E293B] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0284C7]/20 border border-[#0284C7]/30 flex items-center justify-center text-[#38BDF8]">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#F8FAFC]">Engineering & Support Email</h3>
            <p className="text-xs text-[#94A3B8]">Direct access to our powertrain technicians.</p>
            <p className="text-xs font-mono font-bold text-[#38BDF8]">support@techrcpro.com</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131D31] border border-[#1E293B] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0284C7]/20 border border-[#0284C7]/30 flex items-center justify-center text-[#38BDF8]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#F8FAFC]">Pit Tech Line</h3>
            <p className="text-xs text-[#94A3B8]">Mon–Sat: 8:00 AM – 7:00 PM EST.</p>
            <p className="text-xs font-mono font-bold text-[#38BDF8]">(346) 475-6682</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131D31] border border-[#1E293B] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0284C7]/20 border border-[#0284C7]/30 flex items-center justify-center text-[#38BDF8]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#F8FAFC]">Tech Lab & Dispatch Facility</h3>
            <p className="text-xs text-[#94A3B8]">
              4623 Brinkley ST.<br />
              Houston TX 77051, United States
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-2 bg-[#131D31] rounded-3xl p-6 sm:p-10 border border-[#1E293B] shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#38BDF8]">
                Technical Inquiry Transmitted!
              </h2>
              <p className="text-xs text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to TechRcPro. Your ticket has been routed to our track engineers. Expect a detailed response within 4 hours.
              </p>
              <button
                id="contact-new-inquiry-btn"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setSubject('');
                  setMessage('');
                }}
                className="px-6 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#1E293B] pb-4">
                <h2 className="font-serif text-xl font-bold text-[#38BDF8]">
                  Submit Technical or Wholesale Ticket
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Fill out your setup details below for precise engineering assistance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                    Your Name / Racer Handle <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                    Email Address <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="racer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                    Contact Phone (Optional)
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="(346) 475-6682"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                    Subject / Topic
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7] cursor-pointer"
                  >
                    <option value="">Select Topic...</option>
                    <option value="Brushless Motor & ESC Gearing Consultation">Brushless Motor & ESC Gearing Consultation</option>
                    <option value="LiPo Battery & Charging Recommendations">LiPo Battery & Charging Recommendations</option>
                    <option value="Chassis Compatibility & Fitment">Chassis Compatibility & Fitment</option>
                    <option value="Racing Team Wholesale & Sponsorship">Racing Team Wholesale & Sponsorship</option>
                    <option value="Order Tracking & Pit Delivery">Order Tracking & Pit Delivery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                  Message / Vehicle Specs <span className="text-[#EF4444]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Describe your RC vehicle, scale (1/10, 1/8), current gearing, battery voltage, and what technical help you need..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full py-3.5 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Technical Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
