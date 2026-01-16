import type { GlobalConfig } from 'payload';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              defaultValue: 'Relics you can rely on',
            },
            {
              name: 'heroSubtitle',
              type: 'text',
            },
            {
              name: 'heroCtaText',
              type: 'text',
              defaultValue: 'Authenticate Now',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Why Section',
          fields: [
            {
              name: 'whyHeading',
              type: 'text',
            },
            {
              name: 'whyDescription',
              type: 'textarea',
            },
            {
              name: 'whyCtaText',
              type: 'text',
            },
          ],
        },
        {
          label: 'Marketplace Section',
          fields: [
            {
              name: 'marketplaceHeading',
              type: 'text',
              defaultValue: 'Consigned Marketplace',
            },
            {
              name: 'marketplaceDescription',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Dual Blocks',
          fields: [
            {
              name: 'verificationTitle',
              type: 'text',
              defaultValue: 'Verification Services',
            },
            {
              name: 'verificationDescription',
              type: 'textarea',
            },
            {
              name: 'consignmentTitle',
              type: 'text',
              defaultValue: 'Asset Consignment',
            },
            {
              name: 'consignmentDescription',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'The Way Section',
          fields: [
            {
              name: 'theWayCards',
              type: 'array',
              fields: [
                {
                  name: 'id',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
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
      ],
    },
  ],
};
