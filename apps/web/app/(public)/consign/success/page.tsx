import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function ConsignSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center text-center space-y-6">
              <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
              <div className="space-y-2">
                <CardTitle className="text-3xl">Thank You!</CardTitle>
                <CardDescription className="text-base">
                  Your consignment request has been submitted successfully.
                </CardDescription>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Our team will review your submission and contact you within 2-3 business days
                to discuss next steps.
              </p>
              <div className="flex gap-4 pt-4">
                <Button asChild variant="outline">
                  <Link href="/marketplace">Browse Marketplace</Link>
                </Button>
                <Button asChild>
                  <Link href="/consign">Submit Another Item</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

