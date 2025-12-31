import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ListingsPage() {
  const listings = [
    { id: "LST-001", title: "Babe Ruth Autograph", price: 25000, status: "Active", views: 124 },
    { id: "LST-002", title: "Elvis Presley Photo", price: 8500, status: "Active", views: 89 },
    { id: "LST-003", title: "Muhammad Ali Gloves", price: 35000, status: "Sold", views: 256 },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">My Listings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your marketplace listings
            </p>
          </div>
          <Button>Create New Listing</Button>
        </div>

        {listings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No listings yet.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Create your first listing to start selling authenticated items.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Listings</CardTitle>
              <CardDescription>Your marketplace items</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.id}</TableCell>
                      <TableCell>{listing.title}</TableCell>
                      <TableCell>${listing.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className="bg-muted px-2 py-1 text-sm">
                          {listing.status}
                        </span>
                      </TableCell>
                      <TableCell>{listing.views}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

