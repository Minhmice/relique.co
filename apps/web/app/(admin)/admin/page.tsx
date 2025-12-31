"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatRow } from "@/components/sections/StatRow";
import { adminService } from "@/lib/services/adminService";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalListings: 0,
    totalPosts: 0,
    totalEvents: 0,
    totalSubmissions: 0,
  });

  useEffect(() => {
    const adminStats = adminService.getStats();
    setStats({
      totalListings: adminStats.totalListings,
      totalPosts: adminStats.totalPosts,
      totalEvents: adminStats.totalEvents,
      totalSubmissions: adminStats.totalSubmissions,
    });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your platform statistics
        </p>
      </div>

      <StatRow
        stats={[
          { value: stats.totalListings, label: "Listings" },
          { value: stats.totalPosts, label: "Posts" },
          { value: stats.totalEvents, label: "Events" },
          { value: stats.totalSubmissions, label: "Submissions" },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
            <CardDescription>Latest marketplace items</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View and manage listings in the Marketplace section
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Posts and events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage posts and events in the Content section
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
