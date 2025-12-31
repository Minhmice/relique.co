import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface IconFeatureListProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function IconFeatureList({
  features,
  columns = 3,
  className,
}: IconFeatureListProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-8", gridCols[columns], className)}>
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <div key={idx} className="space-y-4">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}

