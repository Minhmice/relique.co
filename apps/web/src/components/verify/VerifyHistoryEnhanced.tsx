"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pin, PinOff, Search, Clock, List, Calendar, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { VerifyHistoryEntry } from "@relique/shared/domain";

interface VerifyHistoryEnhancedProps {
  history: VerifyHistoryEntry[];
  pinnedIds: string[];
  onPin: (productId: string) => void;
  onUnpin: (productId: string) => void;
}

type ViewMode = "timeline" | "list";
type StatusFilter = "all" | "qualified" | "inconclusive" | "disqualified";

export function VerifyHistoryEnhanced({
  history,
  pinnedIds,
  onPin,
  onUnpin,
}: VerifyHistoryEnhancedProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = useMemo(() => {
    let result = [...history];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((entry) => entry.result === statusFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((entry) =>
        entry.productId.toLowerCase().includes(query)
      );
    }

    // Sort by timestamp (newest first), pinned items first
    result.sort((a, b) => {
      const aPinned = pinnedIds.includes(a.productId);
      const bPinned = pinnedIds.includes(b.productId);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return b.timestamp - a.timestamp;
    });

    return result;
  }, [history, statusFilter, searchQuery, pinnedIds]);

  const statusConfig = {
    qualified: {
      label: "Qualified",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    inconclusive: {
      label: "Inconclusive",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    disqualified: {
      label: "Disqualified",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return formatDate(timestamp);
  };

  return (
    <div className="space-y-4">
      {/* Filters & Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Product ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="inconclusive">Inconclusive</SelectItem>
            <SelectItem value="disqualified">Disqualified</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex border divide-x">
          <Button
            variant={viewMode === "timeline" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("timeline")}
            className="rounded-r-none"
          >
            <Clock className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredHistory.length} of {history.length} verifications
        {pinnedIds.length > 0 && ` (${pinnedIds.length} pinned)`}
      </p>

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-4">
            {filteredHistory.map((entry) => {
              const isPinned = pinnedIds.includes(entry.productId);
              const config = statusConfig[entry.result as keyof typeof statusConfig];
              return (
                <div key={`${entry.productId}-${entry.timestamp}`} className="relative pl-10">
                  <div
                    className={cn(
                      "absolute left-2.5 w-3 h-3 rounded-full border-2 bg-background",
                      entry.result === "qualified" && "border-green-500",
                      entry.result === "inconclusive" && "border-yellow-500",
                      entry.result === "disqualified" && "border-red-500"
                    )}
                  />
                  <Card className={cn(isPinned && "border-accent")}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            {isPinned && <Pin className="w-3 h-3 text-accent" />}
                            <span className="font-mono text-sm font-medium">
                              {entry.productId}
                            </span>
                            <Badge className={cn("border-0 text-xs", config.className)}>
                              {config.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{getRelativeTime(entry.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => isPinned ? onUnpin(entry.productId) : onPin(entry.productId)}
                          >
                            {isPinned ? (
                              <PinOff className="w-4 h-4" />
                            ) : (
                              <Pin className="w-4 h-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/verify?code=${encodeURIComponent(entry.productId)}`}>
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-2">
          {filteredHistory.map((entry) => {
            const isPinned = pinnedIds.includes(entry.productId);
            const config = statusConfig[entry.result as keyof typeof statusConfig];
            return (
              <div
                key={`${entry.productId}-${entry.timestamp}`}
                className={cn(
                  "flex items-center justify-between p-3 border bg-card",
                  isPinned && "border-accent"
                )}
              >
                <div className="flex items-center gap-3">
                  {isPinned && <Pin className="w-3 h-3 text-accent" />}
                  <span className="font-mono text-sm">{entry.productId}</span>
                  <Badge className={cn("border-0 text-xs", config.className)}>
                    {config.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {getRelativeTime(entry.timestamp)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => isPinned ? onUnpin(entry.productId) : onPin(entry.productId)}
                  >
                    {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/verify?code=${encodeURIComponent(entry.productId)}`}>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No verifications found matching your filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

