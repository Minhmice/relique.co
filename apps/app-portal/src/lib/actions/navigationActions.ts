import type { Action } from "./types";
import {
  LayoutDashboard,
  FileText,
  Heart,
  User,
} from "lucide-react";

export function navigationActions(currentPath?: string): Action[] {
  const actions: Action[] = [
    {
      id: "nav-dashboard",
      label: "Go to Dashboard",
      keywords: ["dashboard", "home", "main"],
      group: "Navigate",
      icon: LayoutDashboard,
      perform: (context) => {
        context?.router?.push("/app");
      },
      contextAware: currentPath === "/app",
    },
    {
      id: "nav-submissions",
      label: "Go to Submissions",
      keywords: ["submissions", "verify", "consign", "records"],
      group: "Navigate",
      icon: FileText,
      perform: (context) => {
        context?.router?.push("/app/submissions");
      },
      contextAware: currentPath?.startsWith("/app/submissions"),
    },
    {
      id: "nav-saved",
      label: "Go to Saved",
      keywords: ["saved", "favorites", "collections"],
      group: "Navigate",
      icon: Heart,
      perform: (context) => {
        context?.router?.push("/app/saved");
      },
      contextAware: currentPath?.startsWith("/app/saved"),
    },
    {
      id: "nav-profile",
      label: "Go to Profile",
      keywords: ["profile", "settings", "preferences"],
      group: "Navigate",
      icon: User,
      perform: (context) => {
        context?.router?.push("/app/profile");
      },
      contextAware: currentPath?.startsWith("/app/profile"),
    },
  ];

  return actions;
}

