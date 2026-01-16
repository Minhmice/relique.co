import type { GlobalConfig } from 'payload';

export const StrategicPartner: GlobalConfig = {
  slug: 'strategic-partner',
  label: 'Strategic Partner',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Strategic Partner',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'partnerName',
      type: 'text',
      defaultValue: 'ST.B',
    },
    {
      name: 'partnerLogo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};
