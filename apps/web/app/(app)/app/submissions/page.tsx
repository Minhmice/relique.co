"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { consignService } from "@/lib/services/consignService";
import { storage } from "@/lib/storage";
import type { ConsignSubmission } from "@/lib/types";
import type { VerifyHistoryEntry } from "@/lib/storage";
import Link from "next/link";

export default function SubmissionsPage() {
  const [consignSubmissions, setConsignSubmissions] = useState<ConsignSubmission[]>([]);
  const [verifyHistory, setVerifyHistory] = useState<VerifyHistoryEntry[]>([]);

  useEffect(() => {
    const submissions = consignService.list("submitted");
    setConsignSubmissions(submissions);
    
    const history = storage.verifyHistory.get() as VerifyHistoryEntry[];
    setVerifyHistory(history);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-h1">My Submissions</h1>
          <p className="text-muted-foreground mt-2">
            Track your consignments and verification history
          </p>
        </div>

        <Tabs defaultValue="consign" className="space-y-6">
          <TabsList>
            <TabsTrigger value="consign">Consignments ({consignSubmissions.length})</TabsTrigger>
            <TabsTrigger value="verify">Verifications ({verifyHistory.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="consign" className="space-y-4">
            {consignSubmissions.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <EmptyState
                    title="No consignments yet"
                    description="Submit your first item for consignment to get started"
                  />
                  <div className="mt-6 text-center">
                    <Button asChild>
                      <Link href="/consign">Submit for Consignment</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Consignments</CardTitle>
                  <CardDescription>Your submitted consignment requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Item Description</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consignSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-mono text-sm">{submission.id}</TableCell>
                          <TableCell className="max-w-md truncate">
                            {submission.itemDescription || "N/A"}
                          </TableCell>
                          <TableCell>
                            {new Date(submission.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant={submission.status === "submitted" ? "default" : "outline"}>
                              {submission.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="verify" className="space-y-4">
            {verifyHistory.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <EmptyState
                    title="No verifications yet"
                    description="Verify your first item to see results here"
                  />
                  <div className="mt-6 text-center">
                    <Button asChild>
                      <Link href="/verify">Verify an Item</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Verification History</CardTitle>
                  <CardDescription>Your past verification results</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product ID</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {verifyHistory.map((entry, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-mono text-sm">{entry.productId}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                entry.result === "qualified"
                                  ? "default"
                                  : entry.result === "inconclusive"
                                  ? "outline"
                                  : "destructive"
                              }
                            >
                              {entry.result}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
