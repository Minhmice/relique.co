import type { Action } from "./types";
import { Download, RotateCcw, Settings } from "lucide-react";
import { storage } from "@/lib/storage";
import { applyPreset, type PresetName } from "@/lib/presets/loader";
import { toast } from "sonner";

const isDevToolsEnabled = process.env.NEXT_PUBLIC_DEMO_TOOLS === "true";

export function utilityActions(): Action[] {
  const actions: Action[] = [
    {
      id: "util-export",
      label: "Export All Data",
      keywords: ["export", "download", "backup", "data"],
      group: "Utilities",
      icon: Download,
      perform: () => {
        const allData: Record<string, unknown> = {};
        const keys = [
          "relique.v1.session.mock",
          "relique.v1.verify.history",
          "relique.v1.consign.drafts",
          "relique.v1.consign.submissions",
          "relique.v1.marketplace.favorites",
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
      },
    },
    {
      id: "util-reset",
      label: "Reset All Data",
      keywords: ["reset", "clear", "delete", "wipe"],
      group: "Utilities",
      icon: RotateCcw,
      perform: () => {
        if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
          storage.clearAll();
          window.location.reload();
        }
      },
    },
  ];

  if (isDevToolsEnabled) {
    actions.push({
      id: "util-devtools",
      label: "Open DevTools",
      keywords: ["devtools", "dev", "tools", "settings"],
      group: "Utilities",
      icon: Settings,
      perform: (context) => {
        context?.router?.push("/app/devtools");
      },
    });

    const presets: PresetName[] = ["collector", "investor", "dealer", "empty"];
    presets.forEach((preset) => {
      actions.push({
        id: `preset-${preset}`,
        label: `Apply Preset: ${preset.charAt(0).toUpperCase() + preset.slice(1)}`,
        keywords: ["preset", preset, "demo", "data"],
        group: "Utilities",
        icon: Settings,
        perform: async () => {
          try {
            await applyPreset(preset);
            toast.success(`Preset "${preset}" applied`);
            window.location.reload();
          } catch (error) {
            toast.error(`Failed to apply preset: ${error instanceof Error ? error.message : "Unknown error"}`);
          }
        },
      });
    });
  }

  return actions;
}

