"use client";

import * as React from "react";
import { Upload, X, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "../../cn";

export type UploadMeta = {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  note?: string;
  tag?: string;
};

export type UploadManagerProps = {
  value: UploadMeta[];
  onChange: (next: UploadMeta[]) => void;
  maxFiles?: number;
  className?: string;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${units[i]}`;
}

export function UploadManager({ value, onChange, maxFiles = 12, className }: UploadManagerProps) {
  const onPick = (files: FileList | null) => {
    if (!files) return;
    const current = [...value];
    const remaining = Math.max(0, maxFiles - current.length);
    const next = Array.from(files)
      .slice(0, remaining)
      .map((f) => ({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: f.name,
        size: f.size,
        type: f.type,
        previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
      }));
    onChange([...current, ...next]);
  };

  const remove = (id: string) => onChange(value.filter((x) => x.id !== id));

  const move = (id: string, dir: -1 | 1) => {
    const idx = value.findIndex((x) => x.id === id);
    const to = idx + dir;
    if (idx < 0 || to < 0 || to >= value.length) return;
    const next = [...value];
    const [item] = next.splice(idx, 1);
    next.splice(to, 0, item!);
    onChange(next);
  };

  const patch = (id: string, partial: Partial<UploadMeta>) =>
    onChange(value.map((x) => (x.id === id ? { ...x, ...partial } : x)));

  return (
    <div className={cn("space-y-3", className)}>
      <label className="block">
        <span className="sr-only">Upload files</span>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => onPick(e.target.files)}
        />
        <div
          className={cn(
            "border border-dashed border-border rounded-none p-6 bg-background",
            "hover:border-accent transition-colors cursor-pointer"
          )}
        >
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Upload className="h-4 w-4" aria-hidden />
            <span>
              Drag/drop not enabled yet. Click to pick files (max {maxFiles}).
            </span>
          </div>
        </div>
      </label>

      {value.length === 0 ? (
        <p className="text-sm text-muted-foreground">No files selected.</p>
      ) : (
        <div className="space-y-2">
          {value.map((f, idx) => (
            <div key={f.id} className="border rounded-none p-3 bg-background">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex items-start gap-3">
                  {f.previewUrl ? (
                    <img
                      src={f.previewUrl}
                      alt={f.name}
                      className="h-12 w-12 object-cover border border-border rounded-none"
                    />
                  ) : (
                    <div className="h-12 w-12 border border-border bg-muted/20 rounded-none" aria-hidden />
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{f.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatBytes(f.size)} · {f.type || "unknown"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="h-8 w-8 inline-flex items-center justify-center border border-border bg-background hover:border-accent"
                    onClick={() => move(f.id, -1)}
                    aria-label={`Move file ${idx + 1} up`}
                  >
                    <ArrowUp className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="h-8 w-8 inline-flex items-center justify-center border border-border bg-background hover:border-accent"
                    onClick={() => move(f.id, 1)}
                    aria-label={`Move file ${idx + 1} down`}
                  >
                    <ArrowDown className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="h-8 w-8 inline-flex items-center justify-center border border-border bg-background hover:border-accent"
                    onClick={() => remove(f.id)}
                    aria-label={`Remove file ${f.name}`}
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <input
                  className={cn(
                    "h-9 w-full rounded-none border border-input bg-background px-3 text-sm",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                  )}
                  placeholder="Tag (e.g. signature close-up)"
                  value={f.tag ?? ""}
                  onChange={(e) => patch(f.id, { tag: e.target.value })}
                />
                <input
                  className={cn(
                    "h-9 w-full rounded-none border border-input bg-background px-3 text-sm",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                  )}
                  placeholder="Note"
                  value={f.note ?? ""}
                  onChange={(e) => patch(f.id, { note: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


