"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, QrCode } from "lucide-react";
import { toast } from "sonner";

interface QRScanInputProps {
  onCodeScanned: (code: string) => void;
}

export function QRScanInput({ onCodeScanned }: QRScanInputProps) {
  const [pastedCode, setPastedCode] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      toast.info("QR code image uploaded (mock: extracting code...)");
      setTimeout(() => {
        const mockCode = `REL-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
        onCodeScanned(mockCode);
        setPastedCode(mockCode);
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = () => {
    if (pastedCode.trim()) {
      onCodeScanned(pastedCode.trim());
    }
  };

  return (
    <Tabs defaultValue="manual" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="manual">Enter Code</TabsTrigger>
        <TabsTrigger value="qr">QR Scan</TabsTrigger>
      </TabsList>
      <TabsContent value="manual" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code-input">Enter RLQ Certification #</Label>
          <Input
            id="code-input"
            placeholder="e.g., REL-2024-001"
            value={pastedCode}
            onChange={(e) => setPastedCode(e.target.value)}
          />
        </div>
        <Button onClick={handlePaste} className="w-full" disabled={!pastedCode.trim()}>
          Use Code
        </Button>
      </TabsContent>
      <TabsContent value="qr" className="space-y-4">
        <div className="space-y-2">
          <Label>Upload QR Code Image</Label>
          <div className="border-2 border-dashed p-8 text-center space-y-4">
            <QrCode className="w-12 h-12 mx-auto text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Upload an image containing a QR code
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="paste-code">Or Paste Code</Label>
          <Input
            id="paste-code"
            placeholder="Paste code here"
            value={pastedCode}
            onChange={(e) => setPastedCode(e.target.value)}
          />
          <Button onClick={handlePaste} className="w-full" disabled={!pastedCode.trim()}>
            Use Pasted Code
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}

