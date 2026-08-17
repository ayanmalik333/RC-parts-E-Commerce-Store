import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, ArrowRight, Lock, Mail, Key, ArrowLeft, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export const ManagerAuthPage: React.FC = () => {
  const { login, continueDemoMode, setCurrentPage } = useStore();
  const [email, setEmail] = useState('admin@techrcpro.com');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleManagerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email.trim() || 'admin@techrcpro.com', 'admin');
    setCurrentPage('admin');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 mb-6">
        <button
          id="manager-back-store-btn"
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#38BDF8] transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Customer Store</span>
        </button>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="w-7 h-7 text-[#38BDF8]" />
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
            TechRcPro Admin Portal
          </h1>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#94A3B8] font-bold">
          Authorized RC Store Administrators & Inventory Managers
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="bg-[#131D31] text-[#F8FAFC] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-[#1E293B] space-y-6">
          
          {/* Warning Banner */}
          <div className="bg-[#0B0F19] p-3.5 rounded-2xl border border-[#1E293B] flex items-start gap-3 text-xs">
            <ShieldAlert className="w-5 h-5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[#94A3B8]">
              <span className="font-bold text-[#F8FAFC] block">Restricted Store Gateway</span>
              <p className="text-[11px] leading-relaxed">
                Full access to product catalogs, stock sequence management, pricing updates, and order exports.
              </p>
            </div>
          </div>

          <form onSubmit={handleManagerSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                <input
                  id="manager-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                <input
                  id="manager-password-input"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                Admin Security Passcode (Optional for Demo)
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                <input
                  id="manager-passcode-input"
                  type="password"
                  placeholder="6-digit security token"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                />
              </div>
            </div>

            <button
              id="manager-submit-btn"
              type="submit"
              className="w-full py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Access Inventory & Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
