import type { GlobalConfig } from 'payload';

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      required: true,
      defaultValue: 'Get In Touch',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Inquiry response time: < 24 hours.',
    },
    {
      name: 'customerSupportEmail',
      type: 'email',
      required: true,
      defaultValue: 'customersupport@relique.co',
    },
    {
      name: 'partnersEmail',
      type: 'email',
      required: true,
      defaultValue: 'partners@relique.co',
    },
    {
      name: 'formLabels',
      type: 'group',
      fields: [
        {
          name: 'namePlaceholder',
          type: 'text',
          defaultValue: 'NAME',
        },
        {
          name: 'emailPlaceholder',
          type: 'text',
          defaultValue: 'EMAIL',
        },
        {
          name: 'messagePlaceholder',
          type: 'text',
          defaultValue: 'MESSAGE',
        },
        {
          name: 'submitButtonText',
          type: 'text',
          defaultValue: 'Send Message',
        },
      ],
    },
  ],
};
