"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [authStep, setAuthStep] = useState<'login' | 'otp'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [otpValue, setOtpValue] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((loginEmail === 'admin@relique.co' || loginEmail === 'admin@gmail.com') && loginPass === 'admin123') {
      setAuthStep('otp');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue === '123456') {
      // Set session or redirect
      router.push('/admin');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen bg-bg-0 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden p-8 animate-in zoom-in-95 duration-300">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,85,255,0.5)]">
            <Lock className="text-white w-6 h-6" />
          </div>
        </div>
        {authStep === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white">Relique Admin</h1>
              <p className="text-gray-400 text-sm mt-2">Secure access to marketplace operations</p>
            </div>
            <div className="space-y-4">
              <input 
                type="email" 
                value={loginEmail} 
                onChange={e => setLoginEmail(e.target.value)} 
                required 
                placeholder="admin@relique.co" 
                className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white placeholder:text-gray-500" 
              />
              <input 
                type="password" 
                value={loginPass} 
                onChange={e => setLoginPass(e.target.value)} 
                required 
                placeholder="••••••••" 
                className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white placeholder:text-gray-500" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white">Two-Factor Auth</h1>
              <p className="text-gray-400 text-sm mt-2">Enter verification code</p>
            </div>
            <input 
              type="text" 
              maxLength={6} 
              value={otpValue} 
              onChange={e => setOtpValue(e.target.value)} 
              placeholder="123456" 
              autoFocus 
              className="w-full text-center tracking-[0.5em] text-2xl font-bold bg-white/5 border border-border rounded-lg py-4 focus:outline-none focus:border-accent text-white placeholder:text-gray-500" 
            />
            <button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 text-black font-bold py-3 rounded-lg"
            >
              Verify Identity
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
