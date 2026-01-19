export interface PolicySection {
  id: string;
  title: string;
  content: Array<{
    type: 'paragraph' | 'subsection' | 'notice';
    text?: string;
    label?: string;
    items?: Array<{
      subtitle: string;
      description: string;
    }>;
  }>;
}

export const policySections: PolicySection[] = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: [
      {
        type: 'paragraph',
        text: 'These Terms and Conditions ("Terms") govern the use of the Relique.co platform ("Platform") for (i) the consignment, listing, and sale of memorabilia and collectibles, and (ii) the provision of authentication and verification services. By submitting items for consignment, requesting authentication services, or engaging in transactions through the Platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms.',
      },
      {
        type: 'notice',
        label: 'Notice of Facilitation',
        text: 'Relique.co operates strictly as a facilitation and service platform. At no time does Relique.co purchase, own, or take title to any consigned items or authenticated goods.',
      },
    ],
  },
  {
    id: 'nature',
    title: '2. Nature of the Platform',
    content: [
      {
        type: 'subsection',
        items: [
          {
            subtitle: '2.1 Facilitation Role:',
            description: 'Relique.co operates solely as a facilitation service. We do not act as a buyer, seller, broker, or owner of any items listed or authenticated on the Platform.',
          },
          {
            subtitle: '2.2 Listing and Visibility:',
            description: 'The Platform provides visibility for consigned items by listing them and making them accessible to prospective buyers. All listings are created based on information supplied by the consignor.',
          },
          {
            subtitle: '2.3 No Ownership or Guarantee:',
            description: 'Relique.co does not guarantee valuation, marketability, condition, authenticity, or quality of any item. Sellers remain solely responsible for the accuracy, condition, legality, and representations of their consigned items.',
          },
        ],
      },
    ],
  },
  {
    id: 'consignment',
    title: '3. Consignment Acceptance',
    content: [
      {
        type: 'subsection',
        items: [
          {
            subtitle: '3.1 Consignment Basis:',
            description: 'All items are accepted strictly on a consignment basis.',
          },
          {
            subtitle: '3.2 Right of Refusal:',
            description: 'Submission of an item does not guarantee acceptance, listing, or sale. Relique.co reserves the right, at its sole discretion, to decline, suspend, or remove any item from consignment.',
          },
          {
            subtitle: '3.3 Seller Obligations:',
            description: 'Sellers must provide accurate descriptions, images, provenance information, and any supporting documentation requested. Any misrepresentation may result in immediate termination.',
          },
        ],
      },
    ],
  },
  {
    id: 'authentication',
    title: '4. Authentication Services',
    content: [
      {
        type: 'subsection',
        items: [
          {
            subtitle: '4.1 Nature of Authentication:',
            description: 'Authentication services provided through the Platform are analytical and probabilistic in nature. Any authentication result represents an assessment based on available data, reference materials, and analytical models at the time of review.',
          },
          {
            subtitle: '4.2 No Absolute Guarantee:',
            description: 'Authentication does not constitute a warranty, certification of absolute authenticity, or guarantee of value. Results should be understood as an opinion based on objective analysis, not a statement of fact.',
          },
          {
            subtitle: '4.3 Scope Limitation:',
            description: 'Relique.co does not authenticate historical events, provenance narratives, or ownership claims beyond the scope of the submitted materials.',
          },
        ],
      },
    ],
  },
  {
    id: 'platform-services',
    title: '5. Platform Services',
    content: [
      {
        type: 'subsection',
        items: [
          {
            subtitle: '5.1 Presentation:',
            description: 'Relique.co facilitates the presentation of items and enables prospective buyers to view listings and submit inquiries.',
          },
          {
            subtitle: '5.2 Logistics Coordination:',
            description: 'Relique.co may coordinate logistics on behalf of the seller, including shipment arrangements and export processing where applicable.',
          },
        ],
      },
    ],
  },
  {
    id: 'fees',
    title: '6. Fees and Payments',
    content: [
      {
        type: 'subsection',
        items: [
          {
            subtitle: '6.1 Service Fees:',
            description: 'All fees, commissions, or charges related to consignment or authentication services will be disclosed prior to acceptance.',
          },
          {
            subtitle: '6.2 Seller Payments:',
            description: 'Proceeds from sales will be remitted to sellers after completion of the transaction, less applicable fees, commissions, and agreed charges.',
          },
        ],
      },
    ],
  },
  {
    id: 'no-returns',
    title: '7. No Returns, No Warranty',
    content: [
      {
        type: 'subsection',
        items: [
          {
            subtitle: '7.1 Final Sale:',
            description: 'All consigned sales are final. No returns, exchanges, or refunds are permitted unless expressly required by applicable law.',
          },
          {
            subtitle: '7.2 No Warranty:',
            description: 'Relique.co provides no warranty, express or implied, regarding the condition, authenticity, or fitness of consigned items.',
          },
        ],
      },
    ],
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    content: [
      {
        type: 'subsection',
        items: [
          {
            subtitle: '8.1 Transit and Handling:',
            description: 'Relique.co is not responsible for loss, damage, theft, or delays occurring during shipping or transit.',
          },
          {
            subtitle: '8.2 Buyer-Seller Disputes:',
            description: 'Relique.co is not liable for disputes between buyers and sellers, including claims of misrepresentation or non-payment.',
          },
          {
            subtitle: '8.3 Authentication Liability:',
            description: 'Relique.co shall not be liable for any reliance placed on authentication results, including financial loss or resale disputes.',
          },
        ],
      },
    ],
  },
  {
    id: 'compliance',
    title: '9. Export and Legal Compliance',
    content: [
      {
        type: 'paragraph',
        text: 'Sellers are responsible for ensuring compliance with all export, import, and trade regulations. While guidance may be provided, financial responsibility for duties remains with the seller.',
      },
    ],
  },
  {
    id: 'termination',
    title: '10. Termination and Withdrawal',
    content: [
      {
        type: 'paragraph',
        text: 'Sellers may withdraw items prior to sale, subject to incurred fees. Relique.co reserves the right to remove listings or terminate services if these Terms are breached.',
      },
    ],
  },
  {
    id: 'governing-law',
    title: '11. Governing Law and Dispute Resolution',
    content: [
      {
        type: 'subsection',
        items: [
          {
            subtitle: '11.1 Governing Law:',
            description: 'These Terms are governed by the laws of Vietnam / United States [Jurisdiction].',
          },
          {
            subtitle: '11.2 Dispute Resolution:',
            description: 'Disputes shall first be addressed through good-faith mediation. If unresolved, disputes shall be submitted to the competent courts of the aforementioned jurisdictions.',
          },
        ],
      },
    ],
  },
  {
    id: 'miscellaneous',
    title: '12. Miscellaneous',
    content: [
      {
        type: 'subsection',
        items: [
          {
            subtitle: '12.1 Amendments:',
            description: 'Relique.co reserves the right to modify these Terms at any time.',
          },
          {
            subtitle: '12.2 Acceptance:',
            description: 'Continued use of the Platform constitutes acceptance of any revised Terms.',
          },
          {
            subtitle: '12.3 Severability:',
            description: 'If any provision is held unenforceable, the remaining provisions remain in full force.',
          },
        ],
      },
    ],
  },
];

export const tableOfContents = policySections.map(section => ({
  id: section.id,
  title: section.title,
}));
