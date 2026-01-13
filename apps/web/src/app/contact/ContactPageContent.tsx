"use client";

import { useState } from "react";

export function ContactPageContent() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Integrate with contact service if available
    setTimeout(() => {
      setLoading(false);
      alert("Message sent! We'll respond within 24 hours.");
    }, 1000);
  };

  return (
    <div className="py-24 bg-bgDark min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primaryBlue/5 to-transparent opacity-30 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-semibold tracking-tight mb-4">
            Get In <span className="text-primaryBlue">Touch</span>
          </h1>
          <p className="text-textSec">Inquiry response time: &lt; 24 hours.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-highlightIce mb-4">Direct Access</h3>
              <a href="mailto:customersupport@relique.co" className="text-2xl font-bold hover:text-highlightIce transition-colors">
                customersupport@relique.co
              </a>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-highlightIce mb-4">Strategic Partnerships</h3>
              <a href="mailto:partners@relique.co" className="text-2xl font-bold hover:text-highlightIce transition-colors">
                partners@relique.co
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="NAME"
              required
              className="w-full bg-cardDark border border-white/10 p-4 focus:border-highlightIce outline-none text-xs font-bold uppercase tracking-widest text-white placeholder:text-textSec"
            />
            <input
              type="email"
              placeholder="EMAIL"
              required
              className="w-full bg-cardDark border border-white/10 p-4 focus:border-highlightIce outline-none text-xs font-bold uppercase tracking-widest text-white placeholder:text-textSec"
            />
            <textarea
              placeholder="MESSAGE"
              required
              className="w-full bg-cardDark border border-white/10 p-4 h-40 focus:border-highlightIce outline-none text-xs font-bold uppercase tracking-widest text-white placeholder:text-textSec resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-primaryBlue text-white font-black uppercase tracking-[0.3em] hover:bg-accentBlue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

