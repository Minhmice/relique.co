import type { Action } from "./types";
import { FileText, FolderPlus } from "lucide-react";
import { createDeepLink } from "@relique/shared";

export function createActions(): Action[] {
  const actions: Action[] = [
    {
      id: "create-consign",
      label: "New Consign Draft",
      keywords: ["consign", "draft", "new", "create"],
      group: "Create",
      icon: FileText,
      perform: () => {
        const url = createDeepLink("consign", {});
        window.open(url, "_blank");
      },
    },
    {
      id: "create-collection",
      label: "New Collection",
      keywords: ["collection", "folder", "new", "create"],
      group: "Create",
      icon: FolderPlus,
      perform: (context) => {
        context?.router?.push("/app/saved?action=create-collection");
      },
    },
  ];

  return actions;
}

