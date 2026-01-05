"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FileUpload } from "./FileUpload";
import { DraftManager } from "./DraftManager";
import { FormProgress } from "./FormProgress";
import { ConsignFormFields } from "./ConsignFormFields";
import { consignSchema, type ConsignFormData } from "@/lib/validations/consignSchema";
import { consignService } from "@/lib/services/consignService";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { toast } from "sonner";
import type { ConsignSubmission } from "@/lib/types";
import { Save, Clock } from "lucide-react";

interface FileWithPreview extends File {
  preview?: string;
}

const FORM_STEPS = ["Contact", "Item Info", "Uploads", "Review"];

export function ConsignForm() {
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
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
      estimatedValue: undefined,
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
          estimatedValue: latestDraft.estimatedValue,
          coaIssuer: latestDraft.coaIssuer || "",
          howDidYouHear: latestDraft.howDidYouHear || "",
          consent: false,
        });
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
  }, [debouncedFormData, files]);

  const handleLoadDraft = useCallback((draft: import("@/lib/schemas/consign").ConsignDraft) => {
    form.reset({
      name: draft.name || "",
      email: draft.email || "",
      phone: draft.phone || "",
      country: draft.country || "",
      itemDescription: draft.itemDescription || "",
      category: draft.category || "",
      estimatedValue: draft.estimatedValue,
      coaIssuer: draft.coaIssuer || "",
      howDidYouHear: draft.howDidYouHear || "",
      consent: false,
    });
  }, [form]);

  const handleDiscard = useCallback(() => {
    form.reset();
    setFiles([]);
  }, [form]);

  const onSubmit = async (data: ConsignFormData) => {
    setIsSubmitting(true);
    
    try {
      const submission = await consignService.submitMock();
      if (submission) {
        toast.success("Consignment form submitted successfully!");
        setTimeout(() => {
          router.push("/consign/success");
        }, 2000);
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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
              <CardTitle>Your Information</CardTitle>
              <CardDescription>Please provide your contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ConsignFormFields control={form.control} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Images/Files</CardTitle>
              <CardDescription>Upload images and documents (max 12 files, 8MB each, JPG/PNG/WEBP/PDF)</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                files={files}
                onFilesChange={(newFiles) => {
                  if (newFiles.length > 12) {
                    toast.error("Maximum 12 files allowed");
                    return;
                  }
                  setFiles(newFiles);
                }}
                maxFiles={12}
                maxSizeMB={8}
              />
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
