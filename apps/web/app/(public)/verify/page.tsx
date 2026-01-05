"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QRScanInput } from "@/components/verify/QRScanInput";
import { VerifyLoading } from "@/components/verify/VerifyLoading";
import { VerifyResult } from "@/components/verify/VerifyResult";
import { verifyService } from "@/lib/services/verifyService";
import { toast } from "sonner";
import { Save } from "lucide-react";
import type { VerifyResult as VerifyResultType } from "@/lib/schemas/verify";

export default function VerifyPage() {
  const router = useRouter();
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResultType | null>(null);
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

    try {
      const verifyResult = await verifyService.run({
        inputType: "code",
        code: id,
      });

      setResult(verifyResult);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = async () => {
    if (!result) return;

    try {
      await verifyService.history.add(result);
      setSaved(true);
      toast.success("Result saved to your verification history");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save result"
      );
    }
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
        <VerifyLoading duration={5000} onComplete={() => {}} />
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
