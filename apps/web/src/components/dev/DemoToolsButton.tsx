"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DemoToolsButtonProps {
  onClick: () => void;
  className?: string;
}

export function DemoToolsButton({ onClick, className }: DemoToolsButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      variant="outline"
      className={cn(
        "fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg",
        className
      )}
      aria-label="Open demo tools"
    >
      <Settings className="h-5 w-5" />
    </Button>
  );
}

