"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SubmissionsTable, type SubmissionRow } from "@/components/submissions/SubmissionsTable";
import { SubmissionsHeader } from "@/components/submissions/SubmissionsHeader";
import { verifyService } from "@/lib/services/verifyService";
import { consignService } from "@/lib/services/consignService";
import { useSearchParams } from "next/navigation";
import { useSubmissionsColumns } from "@/components/submissions/useSubmissionsColumns";
import { storage } from "@/lib/storage";
import { useStorageSync } from "@/hooks/useStorageSync";
import type { ColumnDef } from "@tanstack/react-table";

function SubmissionsPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "verifications" || tab === "consignments") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    const saved = storage.admin.views.columns.get();
    setColumnVisibility(saved);
  }, []);

  const handleView = (row: SubmissionRow) => {
    // TODO: Open detail drawer
    console.log("View", row);
  };

  const handleDuplicate = (row: SubmissionRow) => {
    // TODO: Duplicate draft
    console.log("Duplicate", row);
  };

  const handleDelete = (row: SubmissionRow) => {
    // TODO: Delete with undo
    console.log("Delete", row);
  };

  const columns = useSubmissionsColumns(handleView, handleDuplicate, handleDelete);

  useEffect(() => {
    const loadSubmissions = async () => {
      setLoading(true);
      const history = await verifyService.history.list();
      const drafts = await consignService.drafts.list();
      const submissionsList = await consignService.submissions.list();

      const rows: SubmissionRow[] = [];

      // Add verify history
      history.forEach((entry) => {
        rows.push({
          id: `verify-${entry.productId}`,
          type: "verify",
          reference: entry.productId,
          itemName: `Item ${entry.productId}`,
          status: entry.result,
          dateUpdated: entry.timestamp,
          data: entry,
        });
      });

      // Add drafts
      drafts.forEach((draft) => {
        rows.push({
          id: `draft-${draft.timestamp}`,
          type: "consign",
          reference: `Draft-${draft.timestamp}`,
          itemName: draft.itemDescription || "Untitled Draft",
          status: "draft",
          dateUpdated: draft.timestamp,
          data: draft,
        });
      });

      // Add submissions
      submissionsList.forEach((submission) => {
        rows.push({
          id: submission.id,
          type: "consign",
          reference: submission.id,
          itemName: submission.itemDescription,
          status: submission.status,
          dateUpdated: new Date(submission.updatedAt).getTime(),
          data: submission,
        });
      });

      // Sort by date
      rows.sort((a, b) => b.dateUpdated - a.dateUpdated);
      setSubmissions(rows);
      setLoading(false);
    };

    loadSubmissions();
  }, []);

  useStorageSync(
    ["relique.v1.verify.history", "relique.v1.consign.drafts", "relique.v1.consign.submissions"],
    () => {
      const reload = async () => {
        const history = await verifyService.history.list();
        const drafts = await consignService.drafts.list();
        const submissionsList = await consignService.submissions.list();

        const rows: SubmissionRow[] = [];

        history.forEach((entry) => {
          rows.push({
            id: `verify-${entry.productId}`,
            type: "verify",
            reference: entry.productId,
            itemName: `Item ${entry.productId}`,
            status: entry.result,
            dateUpdated: entry.timestamp,
            data: entry,
          });
        });

        drafts.forEach((draft) => {
          rows.push({
            id: `draft-${draft.timestamp}`,
            type: "consign",
            reference: `Draft-${draft.timestamp}`,
            itemName: draft.itemDescription || "Untitled Draft",
            status: "draft",
            dateUpdated: draft.timestamp,
            data: draft,
          });
        });

        submissionsList.forEach((submission) => {
          rows.push({
            id: submission.id,
            type: "consign",
            reference: submission.id,
            itemName: submission.itemDescription,
            status: submission.status,
            dateUpdated: new Date(submission.updatedAt).getTime(),
            data: submission,
          });
        });

        rows.sort((a, b) => b.dateUpdated - a.dateUpdated);
        setSubmissions(rows);
      };
      reload();
    }
  );

  const filteredSubmissions = useMemo(() => {
    if (activeTab === "all") return submissions;
    if (activeTab === "verifications") {
      return submissions.filter((s) => s.type === "verify");
    }
    if (activeTab === "consignments") {
      return submissions.filter((s) => s.type === "consign");
    }
    return submissions;
  }, [submissions, activeTab]);

  const handleColumnVisibilityChange = (visibility: Record<string, boolean>) => {
    setColumnVisibility(visibility);
    storage.admin.views.columns.set(visibility);
  };

  const handleExport = () => {
    // TODO: Export CSV/JSON
    console.log("Export", filteredSubmissions);
  };

  return (
    <div className="space-y-4">
      <SubmissionsHeader
        columns={columns}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        onExport={handleExport}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="verifications">Verifications</TabsTrigger>
          <TabsTrigger value="consignments">Consignments</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <SubmissionsTable
            data={filteredSubmissions}
            columns={columns}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={handleColumnVisibilityChange}
            onView={handleView}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SubmissionsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <SubmissionsPageContent />
    </Suspense>
  );
}

