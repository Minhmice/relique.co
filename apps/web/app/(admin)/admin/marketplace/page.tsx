"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/sections/DataTable";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { marketplaceService } from "@/lib/services/marketplaceService";
import type { MarketplaceListing } from "@/lib/types";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminMarketplacePage() {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [editingListing, setEditingListing] = useState<MarketplaceListing | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = () => {
    const result = marketplaceService.list({}, { page: 1, limit: 1000 });
    setListings(result.data);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      marketplaceService.delete(id);
      loadListings();
      toast.success("Listing deleted");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const listingData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      image: formData.get("image") as string,
      category: formData.get("category") as string,
      authenticated: formData.get("authenticated") === "on",
      certificate: formData.get("certificate") as string,
      signedBy: formData.get("signedBy") as string || undefined,
      coaIssuer: formData.get("coaIssuer") as string || undefined,
      status: formData.get("status") as "qualified" | "inconclusive" | "disqualified" || undefined,
    };

    if (editingListing) {
      marketplaceService.update(editingListing.id, listingData);
      toast.success("Listing updated");
    } else {
      marketplaceService.create(listingData);
      toast.success("Listing created");
    }

    setIsDialogOpen(false);
    setEditingListing(null);
    loadListings();
  };

  const columns = [
    { key: "title", label: "Title", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "price", label: "Price", sortable: true, render: (value: number) => `$${value.toLocaleString()}` },
    { key: "authenticated", label: "Status", sortable: true, render: (value: boolean) => value ? "Verified" : "Unverified" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1">Marketplace Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage marketplace listings
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingListing(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Listing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingListing ? "Edit" : "Create"} Listing</DialogTitle>
              <DialogDescription>
                {editingListing ? "Update" : "Add"} a new marketplace listing
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" name="title" defaultValue={editingListing?.title} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea id="description" name="description" defaultValue={editingListing?.description} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input id="price" name="price" type="number" defaultValue={editingListing?.price} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input id="category" name="category" defaultValue={editingListing?.category} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL *</Label>
                <Input id="image" name="image" defaultValue={editingListing?.image} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="certificate">Certificate *</Label>
                  <Input id="certificate" name="certificate" defaultValue={editingListing?.certificate} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signedBy">Signed By</Label>
                  <Input id="signedBy" name="signedBy" defaultValue={editingListing?.signedBy} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="coaIssuer">COA Issuer</Label>
                  <Input id="coaIssuer" name="coaIssuer" defaultValue={editingListing?.coaIssuer} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select id="status" name="status" defaultValue={editingListing?.status} className="w-full h-10 px-3 border border-input bg-background">
                    <option value="">None</option>
                    <option value="qualified">Qualified</option>
                    <option value="inconclusive">Inconclusive</option>
                    <option value="disqualified">Disqualified</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="authenticated" name="authenticated" defaultChecked={editingListing?.authenticated} />
                <Label htmlFor="authenticated">Authenticated</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={listings}
        columns={columns}
        searchable
        actions={(row) => (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditingListing(row);
                setIsDialogOpen(true);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(row.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}

