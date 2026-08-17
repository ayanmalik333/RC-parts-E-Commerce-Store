import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, ArrowRight, Lock, Mail, Cpu, UserCheck, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export const AuthPage: React.FC = () => {
  const { login, continueDemoMode } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email, 'customer');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Art */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284C7]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] text-white shadow-xl shadow-sky-950/50 mb-3">
          <Cpu className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
          TECH<span className="text-[#38BDF8]">RC</span><span className="text-[#F59E0B]">PRO</span>
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#94A3B8] font-bold">
          High-Performance RC Racer Portal
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="bg-[#131D31] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-[#1E293B] space-y-6">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
            <h2 className="font-serif text-xl font-bold text-[#38BDF8]">
              {isRegister ? 'Create Racer Account' : 'Sign In to TechRcPro'}
            </h2>
            <button
              id="auth-toggle-mode-btn"
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-bold text-[#38BDF8] hover:underline cursor-pointer"
            >
              {isRegister ? 'Existing Racer? Sign In' : 'New? Register'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#94A3B8] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                <input
                  id="auth-email-input"
                  type="email"
                  required
                  placeholder="racer@example.com"
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
                  id="auth-password-input"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7]"
                />
              </div>
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isRegister ? 'Complete Racer Registration' : 'Sign In Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Bypass */}
          <div className="pt-4 border-t border-[#1E293B] text-center">
            <button
              id="auth-demo-bypass-btn"
              type="button"
              onClick={continueDemoMode}
              className="text-xs text-[#94A3B8] hover:text-[#38BDF8] transition-colors cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
            >
              <UserCheck className="w-4 h-4 text-[#38BDF8]" />
              <span>Continue as Guest Pit Visitor</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
