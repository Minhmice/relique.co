"use client";

import React, { useState, useEffect } from 'react';
import StatsGrid from '@/components/dashboard/StatsGrid';
import { Download, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { AuditLog } from '@/lib/types';

const MOCK_CHART_DATA = [
  { name: 'Jan', val: 400 },
  { name: 'Feb', val: 300 },
  { name: 'Mar', val: 600 },
  { name: 'Apr', val: 800 },
  { name: 'May', val: 500 },
  { name: 'Jun', val: 900 },
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'L1', actor: 'Admin', action: 'LOGIN', entity: 'Session', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 'L2', actor: 'Admin', action: 'PUBLISH', entity: 'MarketplaceItem #1', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: 'L3', actor: 'Admin', action: 'CREATE', entity: 'VerifyRecord #v1', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [auditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
          <p className="text-gray-400 mt-1">Platform-wide health and activity metrics.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all text-white">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-6 text-white">Platform Activity</h3>
          <div className="h-[300px] w-full min-h-[300px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_CHART_DATA}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0055FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0055FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #333', borderRadius: '8px' }} itemStyle={{ color: '#0055FF' }} />
                  <Area type="monotone" dataKey="val" stroke="#0055FF" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div className="bg-surface border border-border p-6 rounded-xl overflow-hidden">
          <h3 className="font-bold text-lg mb-4 text-white">Recent Logs</h3>
          <div className="space-y-4">
            {auditLogs.slice(0, 6).map((log) => (
              <div key={log.id} className="flex gap-3 items-start border-l-2 border-primary/20 pl-4 py-1">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">{log.action} on {log.entity}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5" suppressHydrationWarning>
                    {mounted ? new Date(log.timestamp).toLocaleTimeString() : new Date(log.timestamp).toISOString().split('T')[1]?.split('.')[0] || 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
