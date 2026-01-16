"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/shared/DataTable';
import { Search, Plus, Trash2 } from 'lucide-react';
import { DeleteConfirmModal } from '@/components/shared/DeleteConfirmModal';
import { toast } from 'sonner';
import { getStatusPill } from '@/lib/utils/admin';

export default function PostsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/payload/collections/posts?limit=1000&sort=-createdAt');
        const response = await res.json();
        setPosts(response.docs || []);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchPosts();
    }
  }, [mounted]);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return posts.filter(
      (p) =>
        p.title?.toLowerCase().includes(query) ||
        p.slug?.toLowerCase().includes(query) ||
        p.author?.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      try {
        await fetch(`/api/payload/collections/posts/${deleteConfirmId}`, {
          method: 'DELETE',
        });
        const res = await fetch('/api/payload/collections/posts?limit=1000');
        const response = await res.json();
        setPosts(response.docs || []);
        toast.success('Post deleted successfully');
      } catch (err) {
        console.error('Failed to delete post:', err);
        toast.error('Failed to delete post');
      }
    }
    setDeleteConfirmId(null);
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Posts Management
          </h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary w-64 text-white placeholder:text-gray-500"
              />
            </div>
            <button
              onClick={() => router.push('/admin/cms/posts/new')}
              className="bg-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform text-white"
            >
              <Plus className="w-4 h-4" /> Add Post
            </button>
          </div>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading posts...</p>
            </div>
          </div>
        ) : (
          <DataTable
            columns={[
              {
                header: 'Title',
                accessor: 'title',
                render: (r) => (
                  <span className="font-semibold text-white">{r.title}</span>
                ),
              },
              {
                header: 'Author',
                accessor: 'author',
                render: (r) => <span className="text-white">{r.author}</span>,
              },
              {
                header: 'Status',
                accessor: 'status',
                render: (r) => getStatusPill(r.status),
              },
              {
                header: 'Featured',
                accessor: 'featured',
                render: (r) => (
                  <span className="text-xs text-gray-400">
                    {r.featured ? 'Yes' : 'No'}
                  </span>
                ),
              },
              {
                header: 'Published',
                accessor: 'publishedAt',
                render: (r) => (
                  <span className="text-xs text-gray-400">
                    {r.publishedAt
                      ? new Date(r.publishedAt).toLocaleDateString()
                      : '-'}
                  </span>
                ),
              },
            ]}
            data={filteredPosts}
            onDelete={setDeleteConfirmId}
            onEdit={(id) => router.push(`/admin/cms/posts/${id}`)}
          />
        )}
      </div>
      <DeleteConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
