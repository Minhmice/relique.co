"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PortalSidebar } from '@/components/shell/PortalSidebar';
import StatsGrid from '@/components/dashboard/StatsGrid';
import DataTable from '@/components/shared/DataTable';
import { 
  MarketplaceStatus, 
  VerificationStatus,
  AuditLog,
  MarketplaceItem,
  VerifyRecord
} from '@/lib/types';
import { 
  Search, 
  Bell, 
  Plus, 
  Download,
  Terminal,
  Trash2,
  CheckCircle2,
  Archive,
  X,
  Lock,
  Star,
  Layout,
  ShoppingBag,
  ShieldCheck,
  User,
  Clock,
  Eye,
  Settings,
  Activity,
  FileEdit,
  GripVertical,
  ArrowUp,
  ArrowDown,
  ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { marketplaceAPIService } from '@/lib/services/api/marketplaceService';

const MOCK_CHART_DATA = [
  { name: 'Jan', val: 400 },
  { name: 'Feb', val: 300 },
  { name: 'Mar', val: 600 },
  { name: 'Apr', val: 800 },
  { name: 'May', val: 500 },
  { name: 'Jun', val: 900 },
];

const INITIAL_VERIFY_RECORDS: VerifyRecord[] = [
  { id: 'v1', pid: 'RLQ-9382-A821', name: 'Bulls Jersey 1998', signatures: 1, result: VerificationStatus.QUALIFIED, date: '2024-03-12' },
  { id: 'v2', pid: 'RLQ-1120-B552', name: 'Lakers Floor Piece', signatures: 0, result: VerificationStatus.INCONCLUSIVE, date: '2024-03-11' },
  { id: 'v3', pid: 'RLQ-0092-C119', name: 'Signed Glove', signatures: 1, result: VerificationStatus.DISQUALIFIED, date: '2024-03-10' },
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'L1', actor: 'Admin', action: 'LOGIN', entity: 'Session', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 'L2', actor: 'Admin', action: 'PUBLISH', entity: 'MarketplaceItem #1', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: 'L3', actor: 'Admin', action: 'CREATE', entity: 'VerifyRecord #v1', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
];

const tabNames: Record<string, string> = {
  'dashboard': 'Global Overview',
  'items': 'Marketplace Management',
  'featured': 'Featured Carousel Manager',
  'verify': 'Verification Records',
  'subs-auth': 'Authenticate Submissions',
  'subs-consign': 'Consign Submissions',
  'messages': 'Contact Inquiries',
  'logs': 'Security Audit Trail',
  'settings': 'System Configurations'
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Data States
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [verifyRecords, setVerifyRecords] = useState<VerifyRecord[]>(INITIAL_VERIFY_RECORDS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Fetch marketplace items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await marketplaceAPIService.list({ pageSize: 1000 });
        setItems(response.items);
      } catch (err) {
        console.error('Failed to fetch marketplace items:', err);
        setError('Failed to load marketplace items');
        // Keep empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchItems();
    }
  }, [mounted]);

  // --- Audit Utility ---
  const addAuditLog = (actor: string, action: string, entity: string) => {
    const newLog: AuditLog = {
      id: `L-${Date.now()}`,
      actor,
      action,
      entity,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // --- Reordering Logic for Carousel ---
  const moveFeatured = async (index: number, direction: 'up' | 'down') => {
    const featured = items.filter(i => i.is_featured).sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0));
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === featured.length - 1)) return;
    
    const newFeatured = [...featured];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Type guard: ensure both elements exist before swapping
    const currentItem = newFeatured[index];
    const targetItem = newFeatured[targetIndex];
    if (!currentItem || !targetItem) return;
    
    [newFeatured[index], newFeatured[targetIndex]] = [targetItem, currentItem];
    
    try {
      // Update all featured items with new order
      await Promise.all(newFeatured.map((item, idx) => 
        marketplaceAPIService.update(item.id, { ...item, featured_order: idx + 1 })
      ));
      
      // Refresh items
      const response = await marketplaceAPIService.list({ pageSize: 1000 });
      setItems(response.items);
      addAuditLog('Admin', 'REORDER', 'Featured Carousel');
    } catch (err) {
      console.error('Failed to reorder featured items:', err);
      setError('Failed to reorder featured items');
    }
  };

  const toggleFeatured = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const newState = !item.is_featured;
    try {
      await marketplaceAPIService.update(id, {
        ...item,
        is_featured: newState,
        featured_order: newState ? items.filter(i => i.is_featured).length + 1 : null,
      });
      
      // Refresh items
      const response = await marketplaceAPIService.list({ pageSize: 1000 });
      setItems(response.items);
      addAuditLog('Admin', newState ? 'FEATURE' : 'UNFEATURE', item.title);
    } catch (err) {
      console.error('Failed to update featured status:', err);
      setError('Failed to update featured status');
    }
  };

  // --- Enhanced Status Colors & Icons ---
  const getStatusPill = (status: string) => {
    const s = status.toLowerCase();
    
    if (s === 'published') {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-success/30 bg-success/10 text-success shadow-[0_0_12px_rgba(16,185,129,0.15)]">
          <CheckCircle2 className="w-3 h-3" />
          {status}
        </div>
      );
    }
    
    if (s === 'draft') {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-white/5 text-gray-400">
          <FileEdit className="w-3 h-3" />
          {status}
        </div>
      );
    }

    if (s === 'archived' || s === 'disqualified' || s === 'closed') {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-destructive/30 bg-destructive/10 text-destructive">
          <Archive className="w-3 h-3" />
          {status}
        </div>
      );
    }
    
    if (s === 'in_review' || s === 'inconclusive') {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-warning/30 bg-warning/10 text-warning">
          <Clock className="w-3 h-3" />
          {status}
        </div>
      );
    }

    if (s === 'qualified') {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-accent/30 bg-accent/10 text-accent">
          <ShieldCheck className="w-3 h-3" />
          {status}
        </div>
      );
    }

  return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-gray-500/10 text-gray-400">
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        {status.replace('_', ' ')}
      </div>
    );
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId === 'bulk') {
      try {
        await Promise.all(selectedItemIds.map(id => marketplaceAPIService.delete(id)));
        const response = await marketplaceAPIService.list({ pageSize: 1000 });
        setItems(response.items);
        addAuditLog('Admin', 'BULK_DELETE', `${selectedItemIds.length} items`);
        setSelectedItemIds([]);
      } catch (err) {
        console.error('Failed to delete items:', err);
        setError('Failed to delete items');
      }
    } else if (deleteConfirmId) {
      const itemToDelete = items.find(i => i.id === deleteConfirmId) || verifyRecords.find(i => i.id === deleteConfirmId);
      const entityName = itemToDelete ? (itemToDelete as any).title || (itemToDelete as any).pid : deleteConfirmId;
      
      try {
        if (items.find(i => i.id === deleteConfirmId)) {
          await marketplaceAPIService.delete(deleteConfirmId);
          const response = await marketplaceAPIService.list({ pageSize: 1000 });
          setItems(response.items);
        } else {
          setVerifyRecords(prev => prev.filter(i => i.id !== deleteConfirmId));
        }
        addAuditLog('Admin', 'DELETE', entityName);
      } catch (err) {
        console.error('Failed to delete item:', err);
        setError('Failed to delete item');
      }
    }
    setDeleteConfirmId(null);
  };

  const handleLogout = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      await supabase.auth.signOut();
      addAuditLog('Admin', 'LOGOUT', 'Session Management');
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Failed to logout:', err);
      router.push('/login');
    }
  };

  const filteredItemsSearch = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return items.filter(i => i.title.toLowerCase().includes(query) || i.athlete.toLowerCase().includes(query) || i.category.toLowerCase().includes(query));
  }, [items, searchQuery]);

  const featuredItems = useMemo(() => {
    return items.filter(i => i.is_featured).sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0));
  }, [items]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
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
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0"><Activity className="w-4 h-4 text-accent" /></div>
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

      case 'featured':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
      <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Carousel Manager</h2>
                <p className="text-gray-400 mt-1">Reorder and manage featured assets displayed on the home page.</p>
              </div>
              <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg flex items-center gap-3">
                <Layout className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-widest">{featuredItems.length} Featured Items</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <GripVertical className="w-4 h-4" /> Live Order
                </h3>
                <div className="space-y-3">
                  {featuredItems.map((item, idx) => (
                    <div key={item.id} className="bg-surface border border-border p-4 rounded-xl flex items-center gap-4 group hover:border-primary/50 transition-all shadow-lg">
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => moveFeatured(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 hover:bg-white/10 rounded disabled:opacity-20 transition-colors text-white"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => moveFeatured(idx, 'down')}
                          disabled={idx === featuredItems.length - 1}
                          className="p-1 hover:bg-white/10 rounded disabled:opacity-20 transition-colors text-white"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-border shrink-0">
                        <ShoppingBag className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white truncate">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.athlete} • {item.category}</p>
                      </div>
                      <button 
                        onClick={() => toggleFeatured(item.id)}
                        className="text-gray-500 hover:text-destructive p-2 rounded-lg hover:bg-destructive/10 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {featuredItems.length === 0 && (
                    <div className="border-2 border-dashed border-border rounded-xl p-12 text-center text-gray-500">
                      No items currently featured. Go to Marketplace to add items.
                    </div>
                  )}
                </div>
      </div>

              <div className="bg-surface border border-border rounded-2xl p-6 h-fit sticky top-24">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-accent" /> Selection Explorer
                </h3>
                <div className="relative group mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-accent transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Quick search catalog..." 
                    className="w-full bg-bg-0 border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-accent text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.filter(i => !i.is_featured).map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-border transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/5 border border-border flex items-center justify-center">
                          <Plus className="w-4 h-4 text-gray-700 group-hover:text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-300">{item.title}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.athlete}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleFeatured(item.id)}
                        className="bg-accent/10 hover:bg-accent text-accent hover:text-black p-1.5 rounded transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'items':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">Marketplace Items</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search items..." className="bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary w-64 text-white placeholder:text-gray-500" />
                </div>
                <button className="bg-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform text-white"><Plus className="w-4 h-4" /> Add Item</button>
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
                  <p>Loading marketplace items...</p>
                </div>
              </div>
            ) : (
              <DataTable 
                columns={[
                  { header: 'Title', accessor: 'title', render: (r) => <span className="font-semibold text-white">{r.title}</span> },
                  { header: 'Athlete', accessor: 'athlete', render: (r) => <span className="text-white">{r.athlete}</span> },
                  { header: 'Status', accessor: 'status', render: (r: any) => getStatusPill(r.status) },
                  { header: 'Featured', accessor: 'is_featured', render: (r: any) => r.is_featured ? <Star className="w-4 h-4 fill-accent text-accent" /> : <Star className="w-4 h-4 text-gray-700" /> },
                  { header: 'Price', accessor: 'price_usd', render: (r: any) => <span className="font-mono text-gray-300 tracking-tighter font-bold">${r.price_usd.toLocaleString()}</span> }
                ]} 
                data={filteredItemsSearch} 
                onDelete={setDeleteConfirmId} 
                onEdit={(id) => console.log('Edit', id)} 
              />
            )}
          </div>
        );

      case 'verify':
        const verifyCols = [
          { header: 'Product ID', accessor: 'pid', render: (r: any) => <span className="font-mono text-primary font-bold tracking-wider">{r.pid}</span> },
          { header: 'Item Name', accessor: 'name', render: (r: any) => <span className="text-white">{r.name}</span> },
          { header: 'Sigs', accessor: 'signatures', render: (r: any) => <span className="text-white">{r.signatures}</span> },
          { header: 'Result', accessor: 'result', render: (r: any) => getStatusPill(r.result) },
          { header: 'Date', accessor: 'date', render: (r: any) => <span className="text-white">{r.date}</span> }
        ];
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">Verification Records</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search PID..." className="bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary w-64 text-white placeholder:text-gray-500" />
                </div>
                <button className="bg-accent text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-accent/20 transition-transform hover:scale-105"><Plus className="w-4 h-4" /> New Certificate</button>
              </div>
            </div>
            <DataTable columns={verifyCols} data={verifyRecords} onDelete={setDeleteConfirmId} />
          </div>
        );

      case 'logs':
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

      case 'settings':
        return (
          <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold tracking-tight text-white">System Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><User className="w-5 h-5 text-primary" /> Admin Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500 mb-1.5 block tracking-widest">Display Name</label>
                    <input type="text" defaultValue="Relique Admin" className="w-full bg-white/5 border border-border rounded-lg px-4 py-2 text-sm text-white focus:border-primary focus:outline-none transition-all" />
                  </div>
                  <button className="bg-primary px-4 py-2 rounded-lg text-sm font-bold w-full hover:bg-primary/80 transition-all shadow-lg shadow-primary/10 text-white">Update Profile</button>
                </div>
              </div>
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><Lock className="w-5 h-5 text-accent" /> Security</h3>
                <div className="space-y-4">
        <div>
                    <label className="text-xs font-bold uppercase text-gray-500 mb-1.5 block tracking-widest">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-border rounded-lg px-4 py-2 text-sm text-white focus:border-accent focus:outline-none transition-all placeholder:text-gray-500" />
                  </div>
                  <button className="bg-white/10 border border-border px-4 py-2 rounded-lg text-sm font-bold w-full hover:bg-white/20 transition-all text-white">Change Password</button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <Terminal className="w-12 h-12 mb-4 opacity-20" />
            <h3 className="text-lg font-medium text-gray-400">Section Under Development</h3>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-bg-0 text-white overflow-hidden selection:bg-primary/30">
      <PortalSidebar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
      }} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
             <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-3">
               <span className="w-1 h-4 bg-primary rounded-full shadow-[0_0_8px_rgba(0,85,255,1)]"></span>
               {tabNames[activeTab] || 'Section Active'}
             </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative"><Bell className="w-5 h-5" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-surface animate-pulse"></span></button>
            <div className="h-8 w-[1px] bg-border mx-2"></div>
            <div className="flex items-center gap-3 pl-2 group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Relique Admin</p>
                <button onClick={handleLogout} className="text-[10px] text-gray-500 hover:text-destructive uppercase font-bold tracking-widest block transition-colors mt-0.5">Terminate Session</button>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20 cursor-pointer group-hover:scale-105 transition-transform">RA</div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-transparent to-surface/20">
          {renderContent()}
        </div>
      </main>

      {/* Unified Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-destructive/30 w-full max-w-sm rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6 mx-auto"><Trash2 className="text-destructive w-8 h-8" /></div>
            <h3 className="text-xl font-bold text-center text-white">Confirm Deletion</h3>
            <p className="text-gray-400 text-sm text-center mt-3 leading-relaxed">Are you sure? This action is irreversible and will be logged in the system audit trail.</p>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 bg-white/5 border border-border py-3 rounded-xl font-bold text-sm text-gray-300 hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={handleConfirmDelete} className="flex-1 bg-destructive py-3 rounded-xl font-bold text-sm text-white hover:bg-destructive/90 transition-all shadow-lg shadow-destructive/20">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
