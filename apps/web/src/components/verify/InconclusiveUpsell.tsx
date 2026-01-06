"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Mail } from "lucide-react";
import Link from "next/link";

export function InconclusiveUpsell() {
  return (
    <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <CardTitle>Need More Information?</CardTitle>
        </div>
        <CardDescription>
          This result is inconclusive. Consider these options to get a definitive answer.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            For a more thorough analysis, you can:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
            <li>Submit additional photos or documentation</li>
            <li>Consign the item for professional authentication</li>
            <li>Contact our authentication team for expert review</li>
          </ul>
        </div>
        <div className="flex gap-2 pt-2">
          <Button asChild variant="default">
            <Link href="/consign">
              <FileText className="w-4 h-4 mr-2" />
              Consign Item
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

