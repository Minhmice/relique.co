"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatRow } from "@/components/sections/StatRow";
import { storage } from "@/lib/storage";
import { consignService } from "@/lib/services/consignService";
import type { Session } from "@/lib/storage";
import type { VerifyHistoryEntry } from "@/lib/storage";

const FAVORITES_KEY = "relique_favorites";

function getFavoritesCount(): number {
  if (typeof window === "undefined") return 0;
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data).length : 0;
}

export default function AppDashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [stats, setStats] = useState({
    favorites: 0,
    consignments: 0,
    verifications: 0,
  });

  useEffect(() => {
    const currentSession = storage.session.get();
    setSession(currentSession);

    const favorites = getFavoritesCount();
    const consignments = consignService.list("submitted").length;
    const verifyHistory = (storage.verifyHistory.get() as VerifyHistoryEntry[]).length;

    setStats({
      favorites,
      consignments,
      verifications: verifyHistory,
    });
  }, []);

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-h1">
            Welcome back, {session.userName}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your submissions, listings, and verifications
          </p>
        </div>

        <StatRow
          stats={[
            { value: stats.favorites, label: "Saved Items" },
            { value: stats.consignments, label: "Consignments" },
            { value: stats.verifications, label: "Verifications" },
          ]}
        />

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/verify">Verify an Item</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/consign">Submit for Consignment</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/app/saved">View Saved Items</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/app/submissions">View Submissions</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{session.userEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Login Method:</span>
                <span className="capitalize">{session.loginMethod.replace("-", " ")}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {stats.verifications > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verifications:</span>
                    <span>{stats.verifications}</span>
                  </div>
                )}
                {stats.consignments > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Consignments:</span>
                    <span>{stats.consignments}</span>
                  </div>
                )}
                {stats.favorites > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saved Items:</span>
                    <span>{stats.favorites}</span>
                  </div>
                )}
                {stats.verifications === 0 && stats.consignments === 0 && stats.favorites === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No activity yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
