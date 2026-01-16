"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/shared/DataTable';
import { Search, Plus, Trash2 } from 'lucide-react';
import { DeleteConfirmModal } from '@/components/shared/DeleteConfirmModal';
import { toast } from 'sonner';

export default function TeamPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/payload/collections/team?limit=1000&sort=order');
        const response = await res.json();
        setTeam(response.docs || []);
      } catch (err) {
        console.error('Failed to fetch team:', err);
        setError('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchTeam();
    }
  }, [mounted]);

  const filteredTeam = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return team.filter(
      (t) =>
        t.name?.toLowerCase().includes(query) ||
        t.role?.toLowerCase().includes(query)
    );
  }, [team, searchQuery]);

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      try {
        await fetch(`/api/payload/collections/team/${deleteConfirmId}`, {
          method: 'DELETE',
        });
        const res = await fetch('/api/payload/collections/team?limit=1000');
        const response = await res.json();
        setTeam(response.docs || []);
        toast.success('Team member deleted successfully');
      } catch (err) {
        console.error('Failed to delete team member:', err);
        toast.error('Failed to delete team member');
      }
    }
    setDeleteConfirmId(null);
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Team Management
          </h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team..."
                className="bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary w-64 text-white placeholder:text-gray-500"
              />
            </div>
            <button
              onClick={() => router.push('/admin/cms/team/new')}
              className="bg-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform text-white"
            >
              <Plus className="w-4 h-4" /> Add Member
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
              <p>Loading team members...</p>
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
                header: 'Subtitle',
                accessor: 'subtitle',
                render: (r) => (
                  <span className="text-gray-400 text-sm">{r.subtitle}</span>
                ),
              },
              {
                header: 'Order',
                accessor: 'order',
                render: (r) => (
                  <span className="text-xs text-gray-400">{r.order || 0}</span>
                ),
              },
            ]}
            data={filteredTeam}
            onDelete={setDeleteConfirmId}
            onEdit={(id) => router.push(`/admin/cms/team/${id}`)}
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
