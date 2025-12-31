"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { X, FileText } from "lucide-react";
import { consignService } from "@/lib/services/consignService";
import type { ConsignSubmission } from "@/lib/types";

interface DraftManagerProps {
  onLoadDraft: (draft: ConsignSubmission) => void;
  onDiscard: () => void;
}

export function DraftManager({ onLoadDraft, onDiscard }: DraftManagerProps) {
  const [draft, setDraft] = useState<ConsignSubmission | null>(null);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const savedDraft = consignService.getDraft();
    if (savedDraft && savedDraft.status === "draft") {
      setDraft(savedDraft);
    }
  }, []);

  if (!draft || !showAlert) return null;

  return (
    <Alert className="mb-6">
      <FileText className="h-4 w-4" />
      <AlertTitle>Draft Found</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          You have an unsaved draft from{" "}
          {draft.updatedAt
            ? new Date(draft.updatedAt).toLocaleString()
            : "earlier"}
          .
        </p>
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            onClick={() => {
              onLoadDraft(draft);
              setShowAlert(false);
            }}
          >
            Continue Draft
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              consignService.deleteDraft();
              setDraft(null);
              setShowAlert(false);
              onDiscard();
            }}
          >
            Discard
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowAlert(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}

