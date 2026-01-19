import type { VerifyResult } from "@relique/shared/domain";
import { formatDate, getStatusLabel, getStatusColor } from "@/lib/utils/verify";

interface VerifyResultDisplayProps {
  result: VerifyResult;
  productId: string;
}

/**
 * Verify result display component
 * Shows verification result details
 */
export function VerifyResultDisplay({ result, productId }: VerifyResultDisplayProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primaryBlue">
          Authentication Result
        </h3>
        <span
          className={`px-3 py-1 ${getStatusColor(result.status)} text-[10px] font-black uppercase tracking-widest`}
        >
          {getStatusLabel(result.status)}
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-[10px] font-black uppercase text-textSec">Product ID</span>
          <span className="text-sm font-bold">{result.productId || productId}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-[10px] font-black uppercase text-textSec">Item Name</span>
          <span className="text-sm font-bold text-right">{result.itemName || "N/A"}</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-[10px] font-black uppercase text-textSec">Analysis Date</span>
          <span className="text-sm font-bold">
            {formatDate(result.date || result.dateOfAnalysis)}
          </span>
        </div>
      </div>
      <div className="aspect-square bg-bgDark border border-white/5 flex items-center justify-center p-8">
        <div className="w-full h-full border-4 border-primaryBlue/30 flex items-center justify-center relative">
          <span className="text-6xl font-black text-white/20">VALID</span>
        </div>
      </div>
    </div>
  );
}
