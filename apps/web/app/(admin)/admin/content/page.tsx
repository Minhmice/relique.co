"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/sections/DataTable";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminService } from "@/lib/services/adminService";
import type { Post, Event } from "@/lib/types";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminContentPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [postsData, eventsData] = await Promise.all([
      adminService.content.posts.list(),
      adminService.content.events.list(),
    ]);
    setPosts(postsData);
    setEvents(eventsData);
  };

  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await adminService.content.posts.delete(id);
      await loadData();
      toast.success("Post deleted");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await adminService.content.events.delete(id);
      await loadData();
      toast.success("Event deleted");
    }
  };

  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const postData = {
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      image: formData.get("image") as string,
      featured: formData.get("featured") === "on",
      tags: (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean),
      author: formData.get("author") as string || undefined,
      publishedAt: formData.get("publishedAt") as string || new Date().toISOString(),
    };

    if (editingPost) {
      await adminService.content.posts.update(editingPost.id, postData);
      toast.success("Post updated");
    } else {
      await adminService.content.posts.create(postData);
      toast.success("Post created");
    }

    setIsPostDialogOpen(false);
    setEditingPost(null);
    await loadData();
  };

  const handleSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const eventData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string || undefined,
      location: formData.get("location") as string,
      type: formData.get("type") as "appearance" | "auction" | "exhibition" | "other" || undefined,
      featured: formData.get("featured") === "on",
    };

    if (editingEvent) {
      await adminService.content.events.update(editingEvent.id, eventData);
      toast.success("Event updated");
    } else {
      await adminService.content.events.create(eventData);
      toast.success("Event created");
    }

    setIsEventDialogOpen(false);
    setEditingEvent(null);
    await loadData();
  };

  const postColumns = [
    { key: "title", label: "Title", sortable: true },
    { key: "featured", label: "Featured", sortable: true, render: (value: boolean) => value ? "Yes" : "No" },
    { key: "publishedAt", label: "Published", sortable: true, render: (value: string) => new Date(value).toLocaleDateString() },
  ];

  const eventColumns = [
    { key: "title", label: "Title", sortable: true },
    { key: "date", label: "Date", sortable: true, render: (value: string) => new Date(value).toLocaleDateString() },
    { key: "location", label: "Location", sortable: true },
    { key: "featured", label: "Featured", sortable: true, render: (value: boolean) => value ? "Yes" : "No" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage posts and events
        </p>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
          <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingPost(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingPost ? "Edit" : "Create"} Post</DialogTitle>
                  <DialogDescription>
                    {editingPost ? "Update" : "Add"} a new post
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input id="title" name="title" defaultValue={editingPost?.title} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea id="excerpt" name="excerpt" defaultValue={editingPost?.excerpt} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea id="content" name="content" rows={10} defaultValue={editingPost?.content} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL *</Label>
                      <Input id="image" name="image" defaultValue={editingPost?.image} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input id="author" name="author" defaultValue={editingPost?.author} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input id="tags" name="tags" defaultValue={editingPost?.tags?.join(", ")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="publishedAt">Published Date</Label>
                      <Input id="publishedAt" name="publishedAt" type="datetime-local" defaultValue={editingPost?.publishedAt ? new Date(editingPost.publishedAt).toISOString().slice(0, 16) : ""} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="featured" name="featured" defaultChecked={editingPost?.featured} />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <DataTable
            data={posts}
            columns={postColumns}
            searchable
            actions={(row) => (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditingPost(row); setIsPostDialogOpen(true); }}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePost(row.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          />
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingEvent(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingEvent ? "Edit" : "Create"} Event</DialogTitle>
                  <DialogDescription>
                    {editingEvent ? "Update" : "Add"} a new event
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitEvent} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input id="title" name="title" defaultValue={editingEvent?.title} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea id="description" name="description" defaultValue={editingEvent?.description} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL *</Label>
                      <Input id="image" name="image" defaultValue={editingEvent?.image} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input id="date" name="date" type="date" defaultValue={editingEvent?.date} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" name="time" type="time" defaultValue={editingEvent?.time} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input id="location" name="location" defaultValue={editingEvent?.location} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select id="type" name="type" defaultValue={editingEvent?.type} className="w-full h-10 px-3 border border-input bg-background">
                      <option value="">None</option>
                      <option value="appearance">Appearance</option>
                      <option value="auction">Auction</option>
                      <option value="exhibition">Exhibition</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="featured" name="featured" defaultChecked={editingEvent?.featured} />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <DataTable
            data={events}
            columns={eventColumns}
            searchable
            actions={(row) => (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditingEvent(row); setIsEventDialogOpen(true); }}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(row.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

