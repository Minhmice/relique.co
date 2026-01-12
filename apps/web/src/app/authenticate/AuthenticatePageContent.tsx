"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { consignService } from "@/lib/services/consignService";
import { toast } from "sonner";

export function AuthenticatePageContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    itemName: "",
    year: "",
    category: "",
    estimatedValue: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("Please accept the Terms of Service");
      return;
    }

    setLoading(true);
    try {
      const draft = await consignService.drafts.save({
        name: formData.fullName,
        email: formData.email,
        itemDescription: formData.itemName,
        category: formData.category || undefined,
        estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : undefined,
      });

      await consignService.submitMock(String(draft.timestamp));

      toast.success("Item submitted for review");
      router.push("/consign/success");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-bgDark min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-primaryBlue font-black uppercase text-xs tracking-widest mb-4 block">Service Portal</span>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-8">
            Submit Item for <span className="text-highlightIce">Authentication</span>
          </h1>
          <p className="text-textSec text-lg mb-12">
            Submit your items to our expert panel for rigorous forensic analysis and digital twin certification.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-12 bg-cardDark border border-white/5 p-8 md:p-12">
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase italic border-l-4 border-primaryBlue pl-4">1. Your Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="FULL NAME"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-bgDark border border-white/10 p-4 text-xs font-bold uppercase tracking-widest focus:border-highlightIce outline-none text-white placeholder:text-textSec"
              />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-bgDark border border-white/10 p-4 text-xs font-bold uppercase tracking-widest focus:border-highlightIce outline-none text-white placeholder:text-textSec"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase italic border-l-4 border-primaryBlue pl-4">2. Item Details</h3>
            <input
              type="text"
              placeholder="ITEM NAME / DESCRIPTION"
              required
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              className="w-full bg-bgDark border border-white/10 p-4 text-xs font-bold uppercase tracking-widest focus:border-highlightIce outline-none text-white placeholder:text-textSec"
            />
            <div className="grid md:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="YEAR"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="bg-bgDark border border-white/10 p-4 text-xs font-bold uppercase tracking-widest focus:border-highlightIce outline-none text-white placeholder:text-textSec"
              />
              <input
                type="text"
                placeholder="CATEGORY (e.g. Jersey)"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-bgDark border border-white/10 p-4 text-xs font-bold uppercase tracking-widest focus:border-highlightIce outline-none text-white placeholder:text-textSec"
              />
              <input
                type="text"
                placeholder="ESTIMATED VALUE ($)"
                value={formData.estimatedValue}
                onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                className="bg-bgDark border border-white/10 p-4 text-xs font-bold uppercase tracking-widest focus:border-highlightIce outline-none text-white placeholder:text-textSec"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase italic border-l-4 border-primaryBlue pl-4">7. Image Uploads</h3>
            <div className="border-2 border-dashed border-white/10 p-12 text-center hover:border-highlightIce/50 transition-colors cursor-pointer group">
              <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform">📸</span>
              <p className="text-xs font-black uppercase tracking-widest text-textSec">
                Drag & Drop Images (Front, Back, Tags, Details)
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-5 h-5 accent-primaryBlue"
              />
              <span className="text-[10px] font-bold uppercase text-textSec group-hover:text-white transition-colors">
                I accept the Relique Terms of Service and Authentication Protocol.
              </span>
            </label>
            <button
              type="submit"
              disabled={loading || !termsAccepted}
              className="w-full py-5 bg-primaryBlue text-white font-black uppercase tracking-[0.3em] hover:bg-accentBlue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit for Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

