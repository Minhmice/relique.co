import type { GlobalConfig } from 'payload';

export const Legal: GlobalConfig = {
  slug: 'legal',
  label: 'Legal Pages',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Terms of Service',
          fields: [
            {
              name: 'termsLastUpdated',
              type: 'date',
            },
            {
              name: 'termsSections',
              type: 'array',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'richText',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Privacy Policy',
          fields: [
            {
              name: 'privacyLastUpdated',
              type: 'date',
            },
            {
              name: 'privacySections',
              type: 'array',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'richText',
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
