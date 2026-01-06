"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationItemProps = {
  notification: {
    id: string;
    type: string;
    message: string;
    read: boolean;
    timestamp: number;
  };
  onMarkAsRead: () => void;
};

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "verify_flagged":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "draft_reminder":
        return <FileText className="h-4 w-4 text-yellow-400" />;
      case "suggestion":
        return <Info className="h-4 w-4 text-blue-400" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div
      className={cn(
        "border p-3 flex items-start gap-3",
        !notification.read && "bg-muted/40"
      )}
    >
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        <p className="text-sm">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(notification.timestamp).toLocaleString()}
        </p>
      </div>
      {!notification.read && (
        <Button variant="ghost" size="icon" onClick={onMarkAsRead}>
          <CheckCircle2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

