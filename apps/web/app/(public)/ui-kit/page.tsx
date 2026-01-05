"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Container,
  Divider,
  EmptyState,
  ErrorState,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Kbd,
  Media,
  PageHeader,
  Section,
  Stack,
  Surface,
  TextField,
  TextareaField,
  DataTable,
} from "@repo/ui";
import type { ColumnDef } from "@tanstack/react-table";

const demoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type DemoForm = z.infer<typeof demoSchema>;

type Row = { id: string; title: string; status: "draft" | "published"; price: number };
const rows: Row[] = [
  { id: "1", title: "Sample Listing A", status: "published", price: 1200 },
  { id: "2", title: "Sample Listing B", status: "draft", price: 450 },
  { id: "3", title: "Sample Listing C", status: "published", price: 9800 },
];

const columns: ColumnDef<Row>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => `$${Number(getValue() ?? 0).toLocaleString()}`,
  },
];

export default function UiKitCatalogPage() {
  if (process.env.NEXT_PUBLIC_DEMO_TOOLS !== "true") return null;

  const form = useForm<DemoForm>({
    resolver: zodResolver(demoSchema),
    defaultValues: { name: "", message: "" },
  });

  return (
    <div className="space-y-16">
      <Section size="md">
        <Container>
          <PageHeader
            title="UI Kit Catalog"
            description={
              <>
                Dark-only · rounded-0 · single-tone. Press <Kbd keys="Tab" /> to audit focus rings.
              </>
            }
          />
        </Container>
      </Section>

      <Section size="md">
        <Container>
          <Stack>
            <h2 className="text-h2">Media</h2>
            <Media
              src="https://picsum.photos/1200/800?random=ui-kit"
              alt="Demo media"
              ratio="16:9"
              fit="cover"
              overlay={<div className="bg-gradient-to-t from-black/60 to-transparent" />}
              caption="Skeleton + fallback + overlay"
              credit="picsum"
            />
          </Stack>
        </Container>
      </Section>

      <Section size="md">
        <Container>
          <Stack>
            <h2 className="text-h2">States</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <EmptyState title="Empty" description="This is an empty state example." />
              <ErrorState title="Error" description="This is an error state example." />
            </div>
          </Stack>
        </Container>
      </Section>

      <Section size="md">
        <Container>
          <Stack>
            <h2 className="text-h2">Form Kit</h2>
            <Surface className="p-6">
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(() => {
                    // demo only
                  })}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <TextField placeholder="Jane Doe" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <TextareaField placeholder="Write something…" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </Surface>
          </Stack>
        </Container>
      </Section>

      <Section size="md">
        <Container>
          <Stack>
            <h2 className="text-h2">DataTable</h2>
            <DataTable data={rows} columns={columns} />
          </Stack>
        </Container>
      </Section>

      <Container>
        <Divider />
        <p className="text-xs text-muted-foreground mt-4">
          Rounded-0 audit: avoid <code className="font-mono">rounded-*</code> unless explicitly justified.
        </p>
      </Container>
    </div>
  );
}


