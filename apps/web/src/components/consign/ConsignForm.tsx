"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { UploadManager, type UploadMeta } from "@repo/ui";
import { DraftManager } from "./DraftManager";
import { FormProgress } from "./FormProgress";
import { YourInformationSection } from "./sections/YourInformationSection";
import { ItemDetailsSection } from "./sections/ItemDetailsSection";
import { SignatureInformationSection } from "./sections/SignatureInformationSection";
import { EstimatedValueSection } from "./sections/EstimatedValueSection";
import { ProvenanceSection } from "./sections/ProvenanceSection";
import { AdditionalInformationSection } from "./sections/AdditionalInformationSection";
import { TermsSection } from "./sections/TermsSection";
import { consignSchema, type ConsignFormData } from "@/lib/validations/consignSchema";
import { consignService } from "@/lib/services/consignService";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { toast } from "sonner";
import { Save, Clock } from "lucide-react";

const FORM_STEPS = [
  "Your Information",
  "Item Details",
  "Signature Information",
  "Estimated Value",
  "Provenance & Background",
  "Additional Information",
  "Image Uploads",
  "Terms",
];

export function ConsignForm() {
  const router = useRouter();
  const [files, setFiles] = useState<UploadMeta[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const form = useForm<ConsignFormData>({
    resolver: zodResolver(consignSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      itemDescription: "",
      category: "",
      signedBy: "",
      numberOfSignatures: undefined,
      estimatedValue: undefined,
      provenance: "",
      background: "",
      coaIssuer: "",
      howDidYouHear: "",
      consent: false,
    },
  });

  const formData = form.watch();
  const debouncedFormData = useDebounce(formData, 1000);

  useEffect(() => {
    const loadDraft = async () => {
      const drafts = await consignService.drafts.list();
      const latestDraft = drafts.sort((a, b) => b.timestamp - a.timestamp)[0];
      if (latestDraft && latestDraft.status === "draft") {
        form.reset({
          name: latestDraft.name || "",
          email: latestDraft.email || "",
          phone: latestDraft.phone || "",
          country: latestDraft.country || "",
          itemDescription: latestDraft.itemDescription || "",
          category: latestDraft.category || "",
          signedBy: latestDraft.signedBy || "",
          numberOfSignatures: latestDraft.numberOfSignatures,
          estimatedValue: latestDraft.estimatedValue,
          provenance: latestDraft.provenance || "",
          background: latestDraft.background || "",
          coaIssuer: latestDraft.coaIssuer || "",
          howDidYouHear: latestDraft.howDidYouHear || "",
          consent: false,
        });
        if (latestDraft.files) {
          setFiles(latestDraft.files.map(f => ({
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name: f.name,
            size: f.size,
            type: f.type,
          })));
        }
      }
    };
    loadDraft();
  }, [form]);

  useEffect(() => {
    if (debouncedFormData.name || debouncedFormData.email || debouncedFormData.itemDescription) {
      const saveDraft = async () => {
        await consignService.drafts.save({
          ...debouncedFormData,
          files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
        });
        setLastSaved(new Date());
      };
      saveDraft();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFormData, files]);

  const handleLoadDraft = useCallback((draft: import("@/lib/schemas/consign").ConsignDraft) => {
    form.reset({
      name: draft.name || "",
      email: draft.email || "",
      phone: draft.phone || "",
      country: draft.country || "",
      itemDescription: draft.itemDescription || "",
      category: draft.category || "",
      signedBy: draft.signedBy || "",
      numberOfSignatures: draft.numberOfSignatures,
      estimatedValue: draft.estimatedValue,
      provenance: draft.provenance || "",
      background: draft.background || "",
      coaIssuer: draft.coaIssuer || "",
      howDidYouHear: draft.howDidYouHear || "",
      consent: false,
    });
    if (draft.files) {
      setFiles(draft.files.map(f => ({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: f.name,
        size: f.size,
        type: f.type,
      })));
    }
  }, [form]);

  const handleDiscard = useCallback(() => {
    form.reset();
    setFiles([]);
  }, [form]);

  const onSubmit = async (data: ConsignFormData) => {
    setIsSubmitting(true);
    
    try {
      // Save final draft before submitting
      await consignService.drafts.save({
        ...data,
        files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
      });
      
      const submission = await consignService.submitMock();
      if (submission) {
        toast.success("Consignment form submitted successfully!");
        router.push(`/consign/success?id=${submission.submissionId}`);
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <DraftManager onLoadDraft={handleLoadDraft} onDiscard={handleDiscard} />
      <FormProgress currentStep={currentStep} totalSteps={FORM_STEPS.length} steps={FORM_STEPS} />
      
      {lastSaved && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Your Information</CardTitle>
              <CardDescription>Please provide your contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <YourInformationSection control={form.control} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Item Details</CardTitle>
              <CardDescription>Describe the item you want to consign</CardDescription>
            </CardHeader>
            <CardContent>
              <ItemDetailsSection control={form.control} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Signature Information</CardTitle>
              <CardDescription>Information about signatures on the item</CardDescription>
            </CardHeader>
            <CardContent>
              <SignatureInformationSection control={form.control} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Estimated Value</CardTitle>
              <CardDescription>Your estimated value for this item</CardDescription>
            </CardHeader>
            <CardContent>
              <EstimatedValueSection control={form.control} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Provenance & Background</CardTitle>
              <CardDescription>History and background of the item</CardDescription>
            </CardHeader>
            <CardContent>
              <ProvenanceSection control={form.control} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Additional Information</CardTitle>
              <CardDescription>Any additional information</CardDescription>
            </CardHeader>
            <CardContent>
              <AdditionalInformationSection control={form.control} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Image Uploads</CardTitle>
              <CardDescription>Upload images and documents (max 20 files, 15MB each, total 120MB)</CardDescription>
            </CardHeader>
            <CardContent>
              <UploadManager
                value={files}
                onChange={(newFiles) => {
                  // Validate individual file size (15MB max)
                  const maxFileSize = 15 * 1024 * 1024; // 15MB
                  const oversizedFiles = newFiles.filter(f => f.size > maxFileSize);
                  if (oversizedFiles.length > 0) {
                    toast.error(`Some files exceed 15MB limit: ${oversizedFiles.map(f => f.name).join(", ")}`);
                    return;
                  }
                  
                  // Validate total size (120MB max)
                  const totalSize = newFiles.reduce((sum, f) => sum + f.size, 0);
                  const maxTotalSize = 120 * 1024 * 1024; // 120MB
                  if (totalSize > maxTotalSize) {
                    toast.error("Total file size exceeds 120MB limit");
                    return;
                  }
                  
                  // Validate max files (20 max)
                  if (newFiles.length > 20) {
                    toast.error("Maximum 20 files allowed");
                    return;
                  }
                  
                  setFiles(newFiles);
                }}
                maxFiles={20}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Limits: 20 files max, 15MB per file, 120MB total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Terms & Conditions</CardTitle>
              <CardDescription>Please review and accept our terms</CardDescription>
            </CardHeader>
            <CardContent>
              <TermsSection control={form.control} />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                await consignService.drafts.save({
                  ...form.getValues(),
                  files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
                });
                setLastSaved(new Date());
                toast.success("Draft saved");
              }}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit for Consignment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
