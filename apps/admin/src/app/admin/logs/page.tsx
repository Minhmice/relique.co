"use client";

import React, { useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { User } from 'lucide-react';
import type { AuditLog } from '@/lib/types';
import { getStatusPill } from '@/lib/utils/admin';

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'L1', actor: 'Admin', action: 'LOGIN', entity: 'Session', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 'L2', actor: 'Admin', action: 'PUBLISH', entity: 'MarketplaceItem #1', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: 'L3', actor: 'Admin', action: 'CREATE', entity: 'VerifyRecord #v1', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
];

export default function LogsPage() {
  const [auditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold tracking-tight text-white">Audit Trail</h2>
      <DataTable
        columns={[
          { header: 'Timestamp', accessor: 'timestamp', render: (r: any) => <span className="text-gray-500 text-xs">{new Date(r.timestamp).toLocaleString()}</span> },
          { header: 'Actor', accessor: 'actor', render: (r: any) => <div className="flex items-center gap-2 font-bold text-gray-300"><User className="w-3 h-3" /> {r.actor}</div> },
          { header: 'Action', accessor: 'action', render: (r: any) => getStatusPill(r.action) },
          { header: 'Entity', accessor: 'entity', render: (r: any) => <span className="font-mono text-gray-400 text-xs">{r.entity}</span> },
        ]}
        data={auditLogs}
      />
    </div>
  );
}

