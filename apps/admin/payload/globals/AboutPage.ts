import type { GlobalConfig } from 'payload';

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Who We Are (4.1)',
          fields: [
            {
              name: 'whoWeAreContent',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Investment Vehicle (4.2)',
          fields: [
            {
              name: 'investmentVehicleContent',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Question of Trust (4.3)',
          fields: [
            {
              name: 'questionOfTrustContent',
              type: 'richText',
              required: true,
            },
            {
              name: 'aiPoweredContent',
              type: 'richText',
            },
          ],
        },
      ],
    },
  ],
};
