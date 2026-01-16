"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/shared/DataTable';
import { Search, Plus, Trash2, Star } from 'lucide-react';
import { DeleteConfirmModal } from '@/components/shared/DeleteConfirmModal';
import { toast } from 'sonner';

export default function TestimonialsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/payload/collections/testimonials?limit=1000&sort=order');
        const response = await res.json();
        setTestimonials(response.docs || []);
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchTestimonials();
    }
  }, [mounted]);

  const filteredTestimonials = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return testimonials.filter(
      (t) =>
        t.name?.toLowerCase().includes(query) ||
        t.role?.toLowerCase().includes(query) ||
        t.quote?.toLowerCase().includes(query)
    );
  }, [testimonials, searchQuery]);

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      try {
        await fetch(`/api/payload/collections/testimonials/${deleteConfirmId}`, {
          method: 'DELETE',
        });
        const res = await fetch('/api/payload/collections/testimonials?limit=1000');
        const response = await res.json();
        setTestimonials(response.docs || []);
        toast.success('Testimonial deleted successfully');
      } catch (err) {
        console.error('Failed to delete testimonial:', err);
        toast.error('Failed to delete testimonial');
      }
    }
    setDeleteConfirmId(null);
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Testimonials Management
          </h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search testimonials..."
                className="bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary w-64 text-white placeholder:text-gray-500"
              />
            </div>
            <button
              onClick={() => router.push('/admin/cms/testimonials/new')}
              className="bg-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform text-white"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
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
              <p>Loading testimonials...</p>
            </div>
          </div>
        ) : (
          <DataTable
            columns={[
              {
                header: 'Name',
                accessor: 'name',
                render: (r) => (
                  <span className="font-semibold text-white">{r.name}</span>
                ),
              },
              {
                header: 'Role',
                accessor: 'role',
                render: (r) => <span className="text-white">{r.role}</span>,
              },
              {
                header: 'Quote',
                accessor: 'quote',
                render: (r) => (
                  <span className="text-gray-400 text-sm line-clamp-2 max-w-md">
                    {r.quote}
                  </span>
                ),
              },
              {
                header: 'Rating',
                accessor: 'rating',
                render: (r) => (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < r.rating
                            ? 'fill-accent text-accent'
                            : 'text-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                ),
              },
              {
                header: 'Verified',
                accessor: 'verified',
                render: (r) => (
                  <span className="text-xs text-gray-400">
                    {r.verified ? 'Yes' : 'No'}
                  </span>
                ),
              },
            ]}
            data={filteredTestimonials}
            onDelete={setDeleteConfirmId}
            onEdit={(id) => router.push(`/admin/cms/testimonials/${id}`)}
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
