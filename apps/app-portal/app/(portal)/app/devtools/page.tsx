"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { applyPreset, getCurrentPreset, resetAllStorage, type PresetName } from "@/lib/presets/loader";
import { storage } from "@/lib/storage";
import { toast } from "sonner";
import { RotateCcw, Download, Upload, Settings } from "lucide-react";

export default function DevToolsPage() {
  const [selectedPreset, setSelectedPreset] = useState<PresetName>("collector");
  const [currentPreset, setCurrentPreset] = useState<PresetName | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    getCurrentPreset().then((preset) => {
      if (preset) setCurrentPreset(preset);
    });
  }, []);

  const handleApplyPreset = async () => {
    setIsApplying(true);
    try {
      await applyPreset(selectedPreset);
      setCurrentPreset(selectedPreset);
      toast.success(`Preset "${selectedPreset}" applied successfully`);
      window.location.reload();
    } catch (error) {
      toast.error(`Failed to apply preset: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsApplying(false);
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
      window.location.reload();
    } catch (error) {
      toast.error(`Failed to reset: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsResetting(false);
    }
  };

  const handleExport = () => {
    try {
      const allData: Record<string, unknown> = {};
      const keys = [
        "relique.v1.session.mock",
        "relique.v1.verify.history",
        "relique.v1.consign.drafts",
        "relique.v1.consign.submissions",
        "relique.v1.marketplace.favorites",
        "relique.v1.portal.views.submissions.columns",
        "relique.v1.portal.views.submissions.saved",
        "relique.v1.portal.recentSearches.submissions",
        "relique.v1.portal.savedFilters.submissions",
        "relique.v1.portal.notifications",
        "relique.v1.portal.alertRules",
        "relique.v1.portal.activityLog",
      ];
      
      keys.forEach((key) => {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            allData[key] = JSON.parse(value);
          } catch {
            allData[key] = value;
          }
        }
      });

      const blob = new Blob([JSON.stringify(allData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `portal-export-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Data exported successfully");
    } catch (error) {
      toast.error(`Failed to export: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const storageKeys = [
    "relique.v1.session.mock",
    "relique.v1.verify.history",
    "relique.v1.consign.drafts",
    "relique.v1.consign.submissions",
    "relique.v1.marketplace.favorites",
    "relique.v1.portal.views.submissions.columns",
    "relique.v1.portal.views.submissions.saved",
    "relique.v1.portal.recentSearches.submissions",
    "relique.v1.portal.savedFilters.submissions",
    "relique.v1.portal.notifications",
    "relique.v1.portal.alertRules",
    "relique.v1.portal.activityLog",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">DevTools</h1>
        <p className="text-muted-foreground mt-2">
          Development utilities for demo setup and data management
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Preset Selector
            </CardTitle>
            <CardDescription>
              Apply demo presets to populate data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Preset</label>
              <select
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value as PresetName)}
                className="w-full h-10 px-3 border border-input bg-background rounded-none text-sm"
              >
                <option value="collector">Collector</option>
                <option value="investor">Investor</option>
                <option value="dealer">Dealer</option>
                <option value="empty">Empty</option>
              </select>
            </div>
            {currentPreset && (
              <p className="text-sm text-muted-foreground">
                Current preset: <strong>{currentPreset}</strong>
              </p>
            )}
            <Button
              onClick={handleApplyPreset}
              disabled={isApplying}
              className="w-full"
            >
              {isApplying ? "Applying..." : "Apply Preset"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Reset Data
            </CardTitle>
            <CardDescription>
              Clear all local storage data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {confirmReset && (
              <div className="p-3 bg-destructive/10 border border-destructive rounded-none">
                <p className="text-sm text-destructive">
                  This will delete all data including:
                </p>
                <ul className="text-xs text-muted-foreground mt-2 list-disc list-inside">
                  <li>Session data</li>
                  <li>Verify history</li>
                  <li>Consign drafts & submissions</li>
                  <li>Favorites</li>
                  <li>Portal views & settings</li>
                  <li>Notifications & activity log</li>
                </ul>
              </div>
            )}
            <Button
              onClick={handleReset}
              disabled={isResetting}
              variant={confirmReset ? "destructive" : "outline"}
              className="w-full"
            >
              {isResetting
                ? "Resetting..."
                : confirmReset
                ? "Confirm Reset"
                : "Reset All Data"}
            </Button>
            {confirmReset && (
              <Button
                onClick={() => setConfirmReset(false)}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Data
            </CardTitle>
            <CardDescription>
              Export all local storage data as JSON
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExport} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export to JSON
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Inspector</CardTitle>
            <CardDescription>
              View all storage keys (read-only)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {storageKeys.map((key) => {
                const value = localStorage.getItem(key);
                const hasValue = value !== null;
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 border rounded-none text-xs"
                  >
                    <code className="text-muted-foreground">{key}</code>
                    <span
                      className={`px-2 py-1 rounded-none ${
                        hasValue
                          ? "bg-green-500/20 text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {hasValue ? "Has data" : "Empty"}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

