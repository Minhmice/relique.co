"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

export default function PagesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [globals, setGlobals] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadGlobals = async () => {
      try {
        const [homePage, contactPage, aboutPage, legal, siteSettings, strategicPartner] =
          await Promise.all([
            fetch('/api/payload/globals/home-page').then(r => r.json()),
            fetch('/api/payload/globals/contact-page').then(r => r.json()),
            fetch('/api/payload/globals/about-page').then(r => r.json()),
            fetch('/api/payload/globals/legal').then(r => r.json()),
            fetch('/api/payload/globals/site-settings').then(r => r.json()),
            fetch('/api/payload/globals/strategic-partner').then(r => r.json()),
          ]);

        setGlobals({
          'home-page': homePage,
          'contact-page': contactPage,
          'about-page': aboutPage,
          legal,
          'site-settings': siteSettings,
          'strategic-partner': strategicPartner,
        });
      } catch (error) {
        console.error('Failed to load globals:', error);
        toast.error('Failed to load pages');
      } finally {
        setLoading(false);
      }
    };

    loadGlobals();
  }, []);

  const handleSave = async (slug: string) => {
    try {
      setSaving(slug);
      await fetch(`/api/payload/globals/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(globals[slug]),
      });
      toast.success('Page saved successfully');
    } catch (error) {
      console.error('Failed to save page:', error);
      toast.error('Failed to save page');
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
          Pages Management
        </h2>
        <p className="text-gray-400">
          Edit global page content including homepage, about, contact, legal pages, and site settings
        </p>
      </div>

      <Tabs defaultValue="home-page" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="home-page">Home Page</TabsTrigger>
          <TabsTrigger value="about-page">About Page</TabsTrigger>
          <TabsTrigger value="contact-page">Contact Page</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="site-settings">Site Settings</TabsTrigger>
          <TabsTrigger value="strategic-partner">Partner</TabsTrigger>
        </TabsList>

        <TabsContent value="home-page" className="mt-6">
          <div className="bg-surface border border-border p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Home Page Content</h3>
              <Button
                onClick={() => handleSave('home-page')}
                disabled={saving === 'home-page'}
                className="bg-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving === 'home-page' ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Use Payload admin panel at /admin to edit rich content fields.
              This page shows current content structure.
            </p>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <strong>Hero Title:</strong> {globals['home-page']?.heroTitle || 'Not set'}
              </div>
              <div>
                <strong>Why Section Heading:</strong>{' '}
                {globals['home-page']?.whyHeading || 'Not set'}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about-page" className="mt-6">
          <div className="bg-surface border border-border p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">About Page Content</h3>
              <Button
                onClick={() => handleSave('about-page')}
                disabled={saving === 'about-page'}
                className="bg-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving === 'about-page' ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
            <p className="text-gray-400 text-sm">
              Edit About page sections in Payload admin panel.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="contact-page" className="mt-6">
          <div className="bg-surface border border-border p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Contact Page Content</h3>
              <Button
                onClick={() => handleSave('contact-page')}
                disabled={saving === 'contact-page'}
                className="bg-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving === 'contact-page' ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <strong>Customer Support Email:</strong>{' '}
                {globals['contact-page']?.customerSupportEmail || 'Not set'}
              </div>
              <div>
                <strong>Partners Email:</strong>{' '}
                {globals['contact-page']?.partnersEmail || 'Not set'}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="legal" className="mt-6">
          <div className="bg-surface border border-border p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Legal Pages</h3>
              <Button
                onClick={() => handleSave('legal')}
                disabled={saving === 'legal'}
                className="bg-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving === 'legal' ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
            <p className="text-gray-400 text-sm">
              Manage Terms of Service and Privacy Policy content.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="site-settings" className="mt-6">
          <div className="bg-surface border border-border p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Site Settings</h3>
              <Button
                onClick={() => handleSave('site-settings')}
                disabled={saving === 'site-settings'}
                className="bg-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving === 'site-settings' ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
            <p className="text-gray-400 text-sm">
              Configure navigation, footer, social media links, and site metadata.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="strategic-partner" className="mt-6">
          <div className="bg-surface border border-border p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Strategic Partner</h3>
              <Button
                onClick={() => handleSave('strategic-partner')}
                disabled={saving === 'strategic-partner'}
                className="bg-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving === 'strategic-partner' ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <strong>Partner Name:</strong>{' '}
                {globals['strategic-partner']?.partnerName || 'Not set'}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-3 rounded-lg">
        <p className="text-sm">
          <strong>Note:</strong> For full editing capabilities including rich text editors,
          use the Payload admin panel at{' '}
          <a
            href="/admin"
            className="underline hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            /admin
          </a>
        </p>
      </div>
    </div>
  );
}
