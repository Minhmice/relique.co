"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QRScanInput } from "@/components/verify/QRScanInput";
import { VerifyLoading } from "@/components/verify/VerifyLoading";
import { VerifyResult } from "@/components/verify/VerifyResult";
import { storage } from "@/lib/storage";
import { toast } from "sonner";
import { Save } from "lucide-react";
import type { VerifyHistoryEntry } from "@/lib/storage";

type VerifyStatus = "qualified" | "inconclusive" | "disqualified";

interface VerifyResultData {
  productId: string;
  itemName: string;
  signatures: number;
  status: VerifyStatus;
  date: string;
  certificate: string;
}

export default function VerifyPage() {
  const router = useRouter();
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResultData | null>(null);
  const [saved, setSaved] = useState(false);

  const handleCodeScanned = (code: string) => {
    setProductId(code);
    handleVerify(code);
  };

  const handleVerify = async (code?: string) => {
    const id = code || productId;
    if (!id.trim()) return;

    setLoading(true);
    setResult(null);
    setSaved(false);
  };

  const handleLoadingComplete = () => {
    const results: VerifyStatus[] = ["qualified", "inconclusive", "disqualified"];
    const randomResult = results[Math.floor(Math.random() * results.length)] as VerifyStatus;
    const itemName = `Authenticated Item ${productId}`;
    const signatures = Math.floor(Math.random() * 3) + 1;
    const certificate = productId.startsWith("REL-") ? productId : `REL-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
    
    const verifyResult: VerifyResultData = {
      productId: productId || certificate,
      itemName,
      signatures,
      status: randomResult,
      date: new Date().toISOString(),
      certificate,
    };

    setResult(verifyResult);
    setLoading(false);
  };

  const handleSaveResult = () => {
    if (!result) return;

    const history = storage.verifyHistory.get() as VerifyHistoryEntry[];
    const entry: VerifyHistoryEntry = {
      productId: result.productId,
      result: result.status,
      timestamp: new Date(result.date).getTime(),
    };

    const exists = history.some(h => h.productId === result.productId);
    if (exists) {
      const updated = history.map(h => 
        h.productId === result.productId ? entry : h
      );
      storage.verifyHistory.set(updated);
    } else {
      history.push(entry);
      storage.verifyHistory.set(history);
    }

    setSaved(true);
    toast.success("Result saved to your verification history");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-h1">Verify Product</h1>
        <p className="text-xl text-muted-foreground">
          Enter a product ID or certificate code to verify authenticity
        </p>
      </div>

      {!result && !loading && (
        <Card>
          <CardHeader>
            <CardTitle>Product Verification</CardTitle>
            <CardDescription>
              Enter the product ID or certificate code from your authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QRScanInput onCodeScanned={handleCodeScanned} />
          </CardContent>
        </Card>
      )}

      {loading && (
        <VerifyLoading duration={5000} onComplete={handleLoadingComplete} />
      )}

      {result && !loading && (
        <div className="space-y-6">
          <VerifyResult
            productId={result.productId}
            itemName={result.itemName}
            signatures={result.signatures}
            status={result.status}
            date={result.date}
          />
          <div className="flex gap-4">
            <Button
              onClick={handleSaveResult}
              disabled={saved}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saved ? "Saved" : "Save Result"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setResult(null);
                setProductId("");
                setSaved(false);
              }}
            >
              Verify Another
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/app/submissions")}
            >
              View History
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
