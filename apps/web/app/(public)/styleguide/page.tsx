import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BentoCard } from "@/components/sections/BentoCard";
import { BentoFeatureGrid } from "@/components/sections/BentoFeatureGrid";
import { SplitHero } from "@/components/sections/SplitHero";
import { ContentSection } from "@/components/sections/ContentSection";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { ResultTable } from "@/components/shared/ResultTable";
import { getStockImage } from "@/lib/constants";
import { AlertCircle, Package } from "lucide-react";
import teamData from "@/mocks/team.json";

export default function StyleguidePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-h1">Styleguide</h1>
          <p className="text-xl text-muted-foreground">
            Internal component showcase and design system reference
          </p>
        </div>

        <section>
          <h2 className="text-h2 mb-6">Typography Scale</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h1 className="text-h1">Heading 1 (text-h1)</h1>
                <p className="text-caption">Display heading for hero sections</p>
              </div>
              <div>
                <h2 className="text-h2">Heading 2 (text-h2)</h2>
                <p className="text-caption">Section headings</p>
              </div>
              <div>
                <h3 className="text-h3">Heading 3 (text-h3)</h3>
                <p className="text-caption">Subsection headings</p>
              </div>
              <div>
                <h4 className="text-h4">Heading 4 (text-h4)</h4>
                <p className="text-caption">Minor headings</p>
              </div>
              <div>
                <p className="text-body">Body text (text-body) - Default paragraph styling with comfortable line height for readability.</p>
              </div>
              <div>
                <p className="text-caption">Caption text (text-caption) - Smaller text for metadata and secondary information.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-h2 mb-6">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default (Primary)</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🚀</Button>
          </div>
        </section>

        <section>
          <h2 className="text-h2 mb-6">Form Elements</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-input">Input</Label>
                <Input id="demo-input" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-textarea">Textarea</Label>
                <Textarea id="demo-textarea" placeholder="Enter longer text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-select">Select</Label>
                <Select>
                  <SelectTrigger id="demo-select">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-h2 mb-6">Badges & Alerts</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>This is a default alert message.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Destructive Alert</AlertTitle>
              <AlertDescription>This is a destructive alert message.</AlertDescription>
            </Alert>
          </div>
        </section>

        <section>
          <h2 className="text-h2 mb-6">Tabs</h2>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  Content for Tab 1
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  Content for Tab 2
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  Content for Tab 3
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="text-h2 mb-6">Table</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Item 1</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>2024-01-15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Item 2</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>2024-01-16</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        <section>
          <h2 className="text-h2 mb-6">Loading & Empty States</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <LoadingState variant="spinner" message="Loading..." />
            <EmptyState
              title="No items found"
              description="There are no items to display at this time."
              icon={<Package className="h-12 w-12" />}
            />
          </div>
        </section>

        <section>
          <h2 className="text-h2 mb-6">Result Table</h2>
          <ResultTable
            rows={[
              { label: "Product ID", value: "REL-2024-001" },
              { label: "Status", value: "Qualified" },
              { label: "Date", value: "2024-01-15" },
            ]}
          />
        </section>

        <section>
          <h2 className="text-h2 mb-6">Bento Modules</h2>
          <div className="space-y-12">
            <BentoFeatureGrid
              title="Feature Grid"
              subtitle="3-column bento pattern"
              items={[
                {
                  image: getStockImage("memorabilia", 0),
                  title: "Main Feature",
                  description: "Large featured item",
                  cta: { label: "Learn More", href: "#" },
                },
                {
                  title: "Feature 1",
                  description: "Small feature item",
                },
                {
                  title: "Feature 2",
                  description: "Small feature item",
                },
              ]}
            />

            <SplitHero
              title="Split Hero Section"
              description="Text left, media right layout"
              image={getStockImage("hero", 0)}
              imageAlt="Hero image"
              cta={{ label: "Get Started", href: "#" }}
            />

            <ContentSection
              heading="Content Section"
              body="This is a reusable content section component with heading and body text."
            />

            <TeamGrid title="Team Grid" people={teamData.slice(0, 4)} />
          </div>
        </section>

        <section>
          <h2 className="text-h2 mb-6">Skeleton Loading</h2>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </section>
      </div>
    </div>
  );
}

