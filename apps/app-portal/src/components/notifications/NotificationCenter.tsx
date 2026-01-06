"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";
import { storage } from "@/lib/storage";
import { NotificationItem } from "./NotificationItem";

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: string;
    message: string;
    read: boolean;
    timestamp: number;
  }>>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadNotifications = () => {
      const notifs = storage.portal.notifications.get();
      setNotifications(notifs);
    };
    loadNotifications();

    const handleStorageChange = () => {
      loadNotifications();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    storage.portal.notifications.set(updated);
    setNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    storage.portal.notifications.set(updated);
    setNotifications(updated);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No notifications
            </p>
          ) : (
            notifications
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={() => markAsRead(notification.id)}
                />
              ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

