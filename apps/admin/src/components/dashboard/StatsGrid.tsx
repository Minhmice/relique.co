"use client";

import React from 'react';
import { TrendingUp, Users, ShoppingCart, Shield } from 'lucide-react';

const StatsGrid: React.FC = () => {
  const stats = [
    { label: 'New Authenticates', value: '24', change: '+12%', icon: Shield, color: 'text-primary' },
    { label: 'Pending Consigns', value: '08', change: '-5%', icon: ShoppingCart, color: 'text-accent' },
    { label: 'Recent Messages', value: '15', change: '+2', icon: Users, color: 'text-warning' },
    { label: 'Active Items', value: '142', change: '+8%', icon: TrendingUp, color: 'text-success' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface border border-border p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
              {stat.change}
            </span>
          </div>
          <h4 className="text-gray-400 text-sm font-medium">{stat.label}</h4>
          <p className="text-3xl font-bold mt-1 group-hover:text-primary transition-colors text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;

