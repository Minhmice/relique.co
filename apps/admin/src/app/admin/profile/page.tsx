"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storage } from "@/lib/storage";
import type { MockSession } from "@/lib/storage";
import { User, Save } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [session, setSession] = useState<MockSession | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentSession = storage.sessionMock.get();
    setSession(currentSession);
    setDisplayName(currentSession?.displayName || "");
  }, []);

  const handleSave = () => {
    if (!displayName.trim()) {
      toast.error("Display name cannot be empty");
      return;
    }

    storage.sessionMock.set({
      displayName: displayName.trim(),
      createdAt: session?.createdAt || Date.now(),
    });

    setSession(storage.sessionMock.get());
    toast.success("Profile updated successfully");
  };

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account Information
          </CardTitle>
          <CardDescription>
            Update your display name and account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
            />
          </div>

          <div className="space-y-2">
            <Label>Account Created</Label>
            <p className="text-sm text-muted-foreground">
              {session?.createdAt
                ? new Date(session.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <Button onClick={handleSave} className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Export or reset your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1">
              Export Data
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
                  storage.clearAll();
                  window.location.reload();
                }
              }}
              className="flex-1"
            >
              Reset All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

