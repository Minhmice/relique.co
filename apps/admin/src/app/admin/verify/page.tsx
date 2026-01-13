"use client";

import React, { useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Search, Plus } from 'lucide-react';
import type { VerifyRecord } from '@/lib/types';
import { VerificationStatus } from '@/lib/types';
import { getStatusPill } from '@/lib/utils/admin';
import { DeleteConfirmModal } from '@/components/shared/DeleteConfirmModal';
import { toast } from 'sonner';

const INITIAL_VERIFY_RECORDS: VerifyRecord[] = [
  { id: 'v1', pid: 'RLQ-9382-A821', name: 'Bulls Jersey 1998', signatures: 1, result: VerificationStatus.QUALIFIED, date: '2024-03-12' },
  { id: 'v2', pid: 'RLQ-1120-B552', name: 'Lakers Floor Piece', signatures: 0, result: VerificationStatus.INCONCLUSIVE, date: '2024-03-11' },
  { id: 'v3', pid: 'RLQ-0092-C119', name: 'Signed Glove', signatures: 1, result: VerificationStatus.DISQUALIFIED, date: '2024-03-10' },
];

export default function VerifyPage() {
  const [verifyRecords, setVerifyRecords] = useState<VerifyRecord[]>(INITIAL_VERIFY_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const verifyCols = [
    { header: 'Product ID', accessor: 'pid', render: (r: any) => <span className="font-mono text-primary font-bold tracking-wider">{r.pid}</span> },
    { header: 'Item Name', accessor: 'name', render: (r: any) => <span className="text-white">{r.name}</span> },
    { header: 'Sigs', accessor: 'signatures', render: (r: any) => <span className="text-white">{r.signatures}</span> },
    { header: 'Result', accessor: 'result', render: (r: any) => getStatusPill(r.result) },
    { header: 'Date', accessor: 'date', render: (r: any) => <span className="text-white">{r.date}</span> }
  ];

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      const itemToDelete = verifyRecords.find(i => i.id === deleteConfirmId);
      if (itemToDelete) {
        setVerifyRecords(prev => prev.filter(i => i.id !== deleteConfirmId));
        toast.success('Verification record deleted');
      }
    }
    setDeleteConfirmId(null);
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Verification Records</h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search PID..."
                className="bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary w-64 text-white placeholder:text-gray-500"
              />
            </div>
            <button className="bg-accent text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-accent/20 transition-transform hover:scale-105">
              <Plus className="w-4 h-4" /> New Certificate
            </button>
          </div>
        </div>
        <DataTable columns={verifyCols} data={verifyRecords} onDelete={setDeleteConfirmId} />
      </div>
      <DeleteConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

