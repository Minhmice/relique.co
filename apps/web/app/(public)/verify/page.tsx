"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QRScanInput } from "@/components/verify/QRScanInput";
import { VerifyLoading } from "@/components/verify/VerifyLoading";
import { VerifyResultEnhanced } from "@/components/verify/VerifyResultEnhanced";
import { verifyService } from "@/lib/services/verifyService";
import { toast } from "sonner";
import { Save } from "lucide-react";
import type { VerifyResult as VerifyResultType } from "@relique/shared/domain";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResultType | null>(null);
  const [saved, setSaved] = useState(false);

  // Handle URL params
  useEffect(() => {
    const codeParam = searchParams.get("code");
    if (codeParam && !result && !loading) {
      setProductId(codeParam);
      handleVerify(codeParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
          <VerifyResultEnhanced
            result={result}
            onSave={handleSaveResult}
            saved={saved}
          />
          <div className="flex gap-4">
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
