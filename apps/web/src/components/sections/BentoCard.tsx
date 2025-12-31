import { Media } from "@/components/shared/Media";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  image?: string;
  imageAlt?: string;
  title: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function BentoCard({
  image,
  imageAlt,
  title,
  description,
  cta,
  className,
}: BentoCardProps) {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      {image && (
        <Media
          src={image}
          alt={imageAlt || title}
          variant="card"
          fill
        />
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {cta && (
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

