"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Download, Upload, RotateCcw, CheckCircle2, Settings } from "lucide-react";
import { applyPreset, resetAllStorage, exportStorageData, importStorageData, getCurrentPreset, type PresetName } from "@/lib/presets/loader";
import { getSimulationConfig, setSimulationConfig, type LatencyProfile, type ErrorMode } from "@/lib/simulation";
import { toast } from "sonner";

export function DemoToolsDrawer({ onClose }: { onClose: () => void }) {
  const [selectedPreset, setSelectedPreset] = useState<PresetName>("collector");
  const [latency, setLatency] = useState<LatencyProfile>("normal");
  const [errors, setErrors] = useState<ErrorMode>("off");
  const [isApplying, setIsApplying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmPreset, setConfirmPreset] = useState(false);

  const [demoMode, setDemoMode] = useState(false);
  const [currentPreset, setCurrentPreset] = useState<PresetName | null>(null);

  useEffect(() => {
    // Load current settings
    getCurrentPreset().then((preset) => {
      if (preset) {
        setSelectedPreset(preset);
        setCurrentPreset(preset);
      }
    });
    
    const config = getSimulationConfig();
    const isDemoMode = config.latency === "verify" && config.errors === "off";
    setDemoMode(isDemoMode);
    setLatency(config.latency || "normal");
    setErrors(config.errors || "off");
  }, []);

  const handleApplyPreset = async () => {
    if (!confirmPreset) {
      setConfirmPreset(true);
      return;
    }
    
    setIsApplying(true);
    try {
      await applyPreset(selectedPreset);
      setCurrentPreset(selectedPreset);
      toast.success(`Preset "${selectedPreset}" applied successfully`);
      setConfirmPreset(false);
    } catch (error) {
      toast.error(`Failed to apply preset: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsApplying(false);
    }
  };

  const handleToggleDemoMode = () => {
    const newDemoMode = !demoMode;
    setDemoMode(newDemoMode);
    if (newDemoMode) {
      // Demo mode: fixed 5s latency, zero errors
      setSimulationConfig({ latency: "verify", errors: "off" });
      setLatency("verify");
      setErrors("off");
      toast.success("Demo mode enabled (fixed 5s latency, zero errors)");
    } else {
      // Normal mode: restore previous settings
      setSimulationConfig({ latency: "normal", errors: "off" });
      setLatency("normal");
      setErrors("off");
      toast.success("Demo mode disabled");
    }
  };

  const handleReset = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    
    setIsResetting(true);
    try {
      resetAllStorage();
      toast.success("All storage cleared");
      setConfirmReset(false);
    } catch (error) {
      toast.error(`Failed to reset: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsResetting(false);
    }
  };

  const handleExport = async () => {
    try {
      const data = await exportStorageData();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relique-storage-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Storage data exported");
    } catch (error) {
      toast.error(`Failed to export: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleImport = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        const text = await file.text();
        await importStorageData(text);
        toast.success("Storage data imported");
      } catch (error) {
        toast.error(`Failed to import: ${error instanceof Error ? error.message : "Invalid JSON file"}`);
      }
    };
    input.click();
  };

  const handleLatencyChange = (value: LatencyProfile) => {
    setLatency(value);
    setSimulationConfig({ latency: value });
    toast.success(`Latency profile set to "${value}"`);
  };

  const handleErrorsChange = (value: ErrorMode) => {
    setErrors(value);
    setSimulationConfig({ errors: value });
    toast.success(`Error mode set to "${value}"`);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Demo Tools
        </CardTitle>
        <CardDescription>
          Development-only tools for managing demo scenarios and simulation settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>DEV ONLY</strong> - These tools are for development and demo purposes only. Do not use in production.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {currentPreset && (
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm font-medium">Current Preset: {currentPreset}</p>
            </div>
          )}
          
          <div>
            <Label htmlFor="preset">Scenario Preset</Label>
            <Select value={selectedPreset} onValueChange={(v) => setSelectedPreset(v as PresetName)}>
              <SelectTrigger id="preset">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="collector">Collector (many favorites + verify history)</SelectItem>
                <SelectItem value="investor">Investor (high value items + watchlist)</SelectItem>
                <SelectItem value="dealer">Dealer (many drafts + submissions)</SelectItem>
                <SelectItem value="empty">Empty (demo empty states)</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-2 flex gap-2">
              <Button
                onClick={handleApplyPreset}
                disabled={isApplying}
                variant={confirmPreset ? "destructive" : "default"}
              >
                {confirmPreset ? "Confirm Apply" : "Apply Preset"}
              </Button>
              {confirmPreset && (
                <Button
                  onClick={() => setConfirmPreset(false)}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <Label htmlFor="demo-mode">Demo Mode</Label>
                <p className="text-xs text-muted-foreground">
                  Fixed 5s latency, zero errors (stable for demos)
                </p>
              </div>
              <Button
                id="demo-mode"
                variant={demoMode ? "default" : "outline"}
                size="sm"
                onClick={handleToggleDemoMode}
              >
                {demoMode ? "On" : "Off"}
              </Button>
            </div>

            {!demoMode && (
              <>
                <div>
                  <Label htmlFor="latency">Latency Profile</Label>
                  <Select value={latency} onValueChange={handleLatencyChange}>
                    <SelectTrigger id="latency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast">Fast (0-150ms)</SelectItem>
                      <SelectItem value="normal">Normal (200-600ms)</SelectItem>
                      <SelectItem value="slow">Slow (1200-2500ms)</SelectItem>
                      <SelectItem value="verify">Verify (fixed 5s)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="errors">Error Mode</Label>
                  <Select value={errors} onValueChange={handleErrorsChange}>
                    <SelectTrigger id="errors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off">Off (0%)</SelectItem>
                      <SelectItem value="low">Low (1-3%)</SelectItem>
                      <SelectItem value="medium">Medium (5-8%)</SelectItem>
                      <SelectItem value="force">Force (100% next call)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label>Storage Actions</Label>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleExport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
              <Button onClick={handleImport} variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import JSON
              </Button>
              <Button
                onClick={handleReset}
                disabled={isResetting}
                variant={confirmReset ? "destructive" : "outline"}
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {confirmReset ? "Confirm Reset" : "Reset All"}
              </Button>
              {confirmReset && (
                <Button
                  onClick={() => setConfirmReset(false)}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

