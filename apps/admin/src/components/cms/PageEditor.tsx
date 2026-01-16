"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PageEditorProps {
  globalSlug: string;
  data: any;
  onSave?: (data: any) => Promise<void>;
}

export function PageEditor({ globalSlug, data, onSave }: PageEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Content Editor</CardTitle>
        <CardDescription>
          For rich text editing, use the Payload admin panel at{' '}
          <a href="/admin" className="text-primary underline" target="_blank">
            /admin
          </a>
          . This component displays the current page structure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-gray-300">
          <p>
            <strong>Global Slug:</strong> {globalSlug}
          </p>
          <p className="text-gray-400">
            Use Payload admin panel for full editing capabilities including rich
            text editors, media uploads, and complex field types.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
