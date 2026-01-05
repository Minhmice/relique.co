"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DemoToolsButton } from "./DemoToolsButton";
import { DemoToolsDrawer } from "./DemoToolsDrawer";

export function DemoTools() {
  const [isOpen, setIsOpen] = useState(false);
  const showTools = process.env.NEXT_PUBLIC_DEMO_TOOLS === "true";

  if (!showTools) {
    return null;
  }

  return (
    <>
      <DemoToolsButton onClick={() => setIsOpen(true)} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DemoToolsDrawer onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

