"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type FilterCategory = "all" | "sports" | "entertainment" | "historical" | "other";

interface MarketplaceFiltersProps {
  selected: FilterCategory;
  onSelect: (category: FilterCategory) => void;
}

const categories: Array<{ value: FilterCategory; label: string }> = [
  { value: "all", label: "All" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "historical", label: "Historical" },
  { value: "other", label: "Other" },
];

export function MarketplaceFilters({
  selected,
  onSelect,
}: MarketplaceFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge
          key={category.value}
          variant={selected === category.value ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-colors",
            selected === category.value && "bg-primary text-primary-foreground"
          )}
          onClick={() => onSelect(category.value)}
        >
          {category.label}
        </Badge>
      ))}
    </div>
  );
}

