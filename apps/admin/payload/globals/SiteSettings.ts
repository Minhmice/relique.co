import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          fields: [
            {
              name: 'headerNavigation',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerDescription',
              type: 'textarea',
            },
            {
              name: 'footerLinks',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'newsletterText',
              type: 'text',
            },
            {
              name: 'newsletterPlaceholder',
              type: 'text',
              defaultValue: 'EMAIL ADDRESS',
            },
            {
              name: 'copyrightText',
              type: 'text',
              defaultValue: '© {year} RELIQUE.CO. ALL RIGHTS RESERVED.',
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Metadata',
          fields: [
            {
              name: 'siteTitle',
              type: 'text',
              defaultValue: 'Relique - Authentic Collectibles',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
            },
            {
              name: 'siteKeywords',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
