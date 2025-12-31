import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface TeamGridProps {
  title?: string;
  people: TeamMember[];
  className?: string;
}

export function TeamGrid({ title, people, className }: TeamGridProps) {
  if (people.length === 0) return null;

  return (
    <section className={cn("space-y-8", className)}>
      {title && <h2 className="text-h2 text-center">{title}</h2>}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {people.map((person) => (
          <Card key={person.id}>
            <CardHeader>
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle>{person.name}</CardTitle>
              <CardDescription>{person.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{person.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

