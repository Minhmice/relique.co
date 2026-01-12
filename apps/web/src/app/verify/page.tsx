"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { verifyService } from "@/lib/services/verifyService";
import type { VerifyResult as VerifyResultType } from "@relique/shared/domain";
import { LoadingState } from "@/components/shared/LoadingState";

function VerifyPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResultType | "not_found" | null>(null);

  // Handle URL params
  useEffect(() => {
    const codeParam = searchParams.get("code");
    if (codeParam) {
      setQuery(codeParam);
      handleVerify(codeParam);
    }
  }, [searchParams]);

  const handleVerify = async (code?: string) => {
    const id = code || query;
    if (!id.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const verifyResult = await verifyService.run({
        inputType: "code",
        code: id.trim().toUpperCase(),
      });
      setResult(verifyResult);
    } catch (error) {
      setResult("not_found");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusLabel = (status?: string) => {
    if (!status) return "QUALIFIED";
    return status.toUpperCase();
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "qualified":
        return "bg-green-400/10 text-green-400";
      case "inconclusive":
        return "bg-amber-400/10 text-amber-400";
      case "disqualified":
        return "bg-red-400/10 text-red-400";
      default:
        return "bg-green-400/10 text-green-400";
    }
  };

  return (
    <div className="py-24 bg-bgDark min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-bold tracking-tight mb-8 leading-none">
              Trust But <span className="text-primaryBlue">Verify</span>
            </h1>
            <p className="text-textSec text-lg mb-8 leading-relaxed">
              Every relic authenticated by Relique is assigned a unique cryptographic ID. Enter yours here to see the full forensic dossier.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value.toUpperCase())}
                  placeholder="ENTER PRODUCT ID (RLQ-XXXX-XXXX)"
                  className="flex-grow bg-cardDark border border-white/10 p-5 text-sm font-black uppercase tracking-widest focus:border-highlightIce outline-none text-white"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="bg-primaryBlue px-8 font-black uppercase text-xs tracking-widest hover:bg-accentBlue transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  {loading ? "..." : "Verify"}
                </button>
              </div>
              <p className="text-[10px] text-textSec italic">Enter your product ID or certificate code</p>
            </form>

            <div className="mt-16 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-highlightIce">Status Definitions</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="text-green-400 font-bold">✓</span>
                  <p className="text-xs text-textSec leading-relaxed">
                    <span className="text-white font-bold">QUALIFIED:</span> The item meets all criteria and is confirmed authentic by our forensic panel.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-amber-400 font-bold">◈</span>
                  <p className="text-xs text-textSec leading-relaxed">
                    <span className="text-white font-bold">INCONCLUSIVE:</span> Analysis could not definitively confirm or deny authenticity due to lack of evidence.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-cardDark border border-white/5 p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primaryBlue/5 -mr-16 -mt-16 rotate-45" />

            {loading && (
              <div className="text-center py-20">
                <LoadingState />
              </div>
            )}

            {result === "not_found" && (
              <div className="text-center py-20 text-red-400 font-bold">Item Not Found</div>
            )}

            {!result && !loading && (
              <div className="text-center py-20 text-white/10 font-bold">Enter an ID to start</div>
            )}

            {result && result !== "not_found" && !loading && (
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primaryBlue">Authentication Result</h3>
                  <span className={`px-3 py-1 ${getStatusColor(result.status)} text-[10px] font-black uppercase tracking-widest`}>
                    {getStatusLabel(result.status)}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[10px] font-black uppercase text-textSec">Product ID</span>
                    <span className="text-sm font-bold">{result.productId || query}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[10px] font-black uppercase text-textSec">Item Name</span>
                    <span className="text-sm font-bold text-right">{result.itemName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[10px] font-black uppercase text-textSec">Analysis Date</span>
                    <span className="text-sm font-bold">{formatDate(result.date || result.dateOfAnalysis)}</span>
                  </div>
                </div>
                <div className="aspect-square bg-bgDark border border-white/5 flex items-center justify-center p-8">
                  <div className="w-full h-full border-4 border-primaryBlue/30 flex items-center justify-center relative">
                    <span className="text-6xl font-black text-white/20">VALID</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyPageContent />
    </Suspense>
  );
}
