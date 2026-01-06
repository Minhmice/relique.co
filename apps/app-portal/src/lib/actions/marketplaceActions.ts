import type { Action } from "./types";
import { Heart, ShoppingBag } from "lucide-react";
import { marketplaceService } from "@/lib/services/marketplaceService";
import { createDeepLink } from "@relique/shared";

export async function marketplaceActions(): Promise<Action[]> {
  const favorites = await marketplaceService.getFavorites();
  
  const actions: Action[] = [
    {
      id: "marketplace-browse",
      label: "Browse Marketplace",
      keywords: ["marketplace", "browse", "items", "shop"],
      group: "Marketplace",
      icon: ShoppingBag,
      perform: () => {
        const url = createDeepLink("marketplace", { slug: "" });
        window.open(url.replace("/marketplace/", "/marketplace"), "_blank");
      },
    },
  ];

  if (favorites.length > 0) {
    actions.push({
      id: "marketplace-saved",
      label: "View Saved Items",
      keywords: ["saved", "favorites", "marketplace"],
      group: "Marketplace",
      icon: Heart,
      perform: (context) => {
        context?.router?.push("/app/saved");
      },
    });
  }

  return actions;
}

