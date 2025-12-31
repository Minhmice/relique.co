"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { storage } from "@/lib/storage";
import type { Session } from "@/lib/storage";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const currentSession = storage.session.get();
    if (!currentSession) {
      router.push("/login");
      return;
    }
    setSession(currentSession);
    setUserName(currentSession.userName);
  }, [router]);

  const handleUpdateName = () => {
    if (!session) return;
    const updatedSession = { ...session, userName };
    storage.session.set(updatedSession);
    setSession(updatedSession);
    toast.success("Name updated successfully");
  };

  const handleSignOut = () => {
    storage.session.remove();
    toast.success("Signed out successfully");
    router.push("/");
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-h1">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={session.userEmail} disabled />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <div className="flex gap-2">
                <Input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Button onClick={handleUpdateName}>Update</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Login Method</Label>
              <Input
                value={session.loginMethod.replace("-", " ")}
                disabled
                className="capitalize"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark mode
                </p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={handleSignOut}>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

