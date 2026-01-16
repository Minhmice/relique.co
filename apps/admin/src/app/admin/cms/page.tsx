"use client";

import React, { useEffect, useState } from 'react';
import { FileText, Users, MessageSquare, TrendingUp } from 'lucide-react';

export default function CMSDashboardPage() {
  const [stats, setStats] = useState({
    posts: { total: 0, published: 0 },
    team: 0,
    testimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [postsRes, teamRes, testimonialsRes] = await Promise.all([
          fetch('/api/payload/collections/posts?limit=1000').then(r => r.json()),
          fetch('/api/payload/collections/team?limit=1000').then(r => r.json()),
          fetch('/api/payload/collections/testimonials?limit=1000').then(r => r.json()),
        ]);

        const publishedPosts = postsRes.docs.filter(
          (p: any) => p.status === 'published'
        );

        setStats({
          posts: {
            total: postsRes.totalDocs,
            published: publishedPosts.length,
          },
          team: teamRes.totalDocs,
          testimonials: testimonialsRes.totalDocs,
        });
      } catch (error) {
        console.error('Failed to load CMS stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      label: 'Total Posts',
      value: stats.posts.total,
      subValue: `${stats.posts.published} published`,
      icon: FileText,
      color: 'text-primary',
    },
    {
      label: 'Team Members',
      value: stats.team,
      subValue: 'Active members',
      icon: Users,
      color: 'text-accent',
    },
    {
      label: 'Testimonials',
      value: stats.testimonials,
      subValue: 'Customer reviews',
      icon: MessageSquare,
      color: 'text-warning',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading CMS stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
          Content Management System
        </h2>
        <p className="text-gray-400">
          Manage all website content including posts, pages, team members, and testimonials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface border border-border p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <h4 className="text-gray-400 text-sm font-medium">{stat.label}</h4>
            <p className="text-3xl font-bold mt-1 group-hover:text-primary transition-colors text-white">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 mt-2">{stat.subValue}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/cms/posts"
            className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-center"
          >
            <FileText className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium text-white">Manage Posts</p>
          </a>
          <a
            href="/admin/cms/pages"
            className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-center"
          >
            <FileText className="w-6 h-6 mx-auto mb-2 text-accent" />
            <p className="text-sm font-medium text-white">Edit Pages</p>
          </a>
          <a
            href="/admin/cms/team"
            className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-center"
          >
            <Users className="w-6 h-6 mx-auto mb-2 text-warning" />
            <p className="text-sm font-medium text-white">Team Members</p>
          </a>
          <a
            href="/admin/cms/testimonials"
            className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-center"
          >
            <MessageSquare className="w-6 h-6 mx-auto mb-2 text-success" />
            <p className="text-sm font-medium text-white">Testimonials</p>
          </a>
        </div>
      </div>
    </div>
  );
}
