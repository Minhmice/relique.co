export interface TeamMember {
  id: string;
  name: string;
  role: string;
  sub: string;
  description: string[];
}

// Extended interface with optional fields for enhanced profiles
export interface ExtendedTeamMember extends TeamMember {
  // Core Identity (optional)
  tagline?: string;
  watermark?: string;
  
  // Expertise chips (optional)
  expertiseChips?: string[];
  
  // Expanded content (optional)
  expanded?: {
    experienceSnapshot?: Array<{
      period: string;
      title: string;
      org: string;
      description?: string;
    }>;
  };
  
  // Full bio (optional)
  fullBio?: {
    overview?: string;
    links?: {
      linkedin?: string;
      email?: string;
      profile?: string;
    };
  };
}

export const teamMembers: ExtendedTeamMember[] = [
  {
    id: "3",
    name: "Do Tuan Kiet",
    role: "CO-FOUNDER & HEAD OF SEA OPERATIONS MANAGER AT WWP (WANDER WEALTH PARTNER)",
    sub: "Financial Analyst & Business Consultant at Wander Wealth Partner",
    tagline: "Visionary co-founder establishing memorabilia as a credible investment asset class across USA",
    watermark: "R",
    expertiseChips: [
      "Capital Management",
      "Investment Analysis",
      "Risk Assessment",
      "SEA Operations",
      "Asset Class Development",
      "Strategic Planning",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Now", title: "Co-Founder & Head of SEA Operations", org: "Relique.ch" },
        { period: "Currently", title: "Financial Analyst & Business Consultant", org: "Wander Wealth Partner" },
        { period: "Focus", title: "Capital Strategy & Regional Expansion", org: "USA Markets" },
      ],
    },
    fullBio: {
      overview: "Mr. Do Tuan Kiet is one of the co-founders of Relique.ch and leads the firm's operations across USA. As a seasoned finance and investment expert, he brings his vision and extensive experience in capital management, investment analysis, and risk assessment to the firm's strategic direction.",
      links: {
        linkedin: "https://www.linkedin.com/in/do-tuan-kiet",
      },
    },
    description: [
      "Mr. Do Tuan Kiet is one of the co-founders of Relique.ch and leads the firm's operations across USA. As a seasoned finance and investment expert, he brings his vision and extensive experience in capital management, investment analysis, and risk assessment to the firm's board and channels that into Relique's strategies.",
      "At the forefront of the company's mission, he is the driving force behind Relique's mission to establish memorabilia as a credible, investable financial asset, seamlessly blending passion, heritage, and tangible value.",
    ],
  },
  {
    id: "4",
    name: "Vu Truong Son",
    role: "ST. B ECOSYSTEM FOUNDER & DIRECTOR",
    sub: "MSc Applied A.I at SWISS UEMF University",
    tagline: "AI pioneer bridging advanced technology with market intelligence to power objective authentication",
    watermark: "R",
    expertiseChips: [
      "Applied AI",
      "Authentication Systems",
      "Business Strategy",
      "Technology Leadership",
      "Market Intelligence",
      "Scalable Solutions",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Now", title: "Founder & Director", org: "St. B Sporting Ecosystem" },
        { period: "Academic", title: "MSc Applied AI", org: "Swiss UMEF University" },
        { period: "Focus", title: "AI Authentication Technology", org: "Relique.ch Partnership" },
      ],
    },
    fullBio: {
      overview: "Mr. Vu Truong Son is the founder of St. B Sporting Ecosystem, whose Technology Department—St.B AI—powers Relique.ch's Artificial Intelligence authentication technology. He holds dual degrees in International Business Administration and International Finance from Foreign Trade University, one of Vietnam's finest institutions, and a Master's in Applied AI from Swiss UMEF University of Applied Sciences.",
      links: {
        linkedin: "https://www.linkedin.com/in/vu-truong-son",
      },
    },
    description: [
      "Mr. Vu Truong Son is the founder of St. B Sporting Ecosystem - of which the Technology Department - St.B AI - powers Relique.ch's Artificial Intelligence authentication technology.",
      "He holds dual degrees in International Business Administration and International Finance at Foreign Trade University - one of Vietnam's finest institutions, and a Master's in Applied AI from Swiss UMEF University of Applied Sciences.",
      "This, together with years of extensive experience in multiple lines of business positions him exceptionally well to apply advanced technology within a deep and nuanced understanding of the market. St. B's technology underpins Relique.ch's commitment to objective, reliable, and scalable authentication.",
    ],
  },
  {
    id: "1",
    name: "Rapin Neupane",
    role: "BOARD ADVISOR, HEAD OF INSTITUTIONAL RELATIONS",
    sub: "Digital Marketing Director at Xenatech Nepal Pvt. Ltd.",
    tagline: "Elite sports diplomacy meets institutional access at the highest levels of European football",
    watermark: "R",
    expertiseChips: [
      "Institutional Relations",
      "Sports Diplomacy",
      "Partnership Development",
      "Digital Strategy",
      "European Football Networks",
      "Cross-Border Strategy",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Now", title: "Digital Marketing Director", org: "Xenatech Nepal" },
        { period: "Previously", title: "Head of E-Commerce", org: "Snowy Horizon Treks" },
        { period: "Focus", title: "Founder, Peña Madridista Everest", org: "Elite Football Relations" },
      ],
    },
    fullBio: {
      overview: "Mr. Rapin Neupane brings a rare combination of digital strategy expertise and high-level sports diplomacy to the advisory board of Relique.ch. As founder of Peña Madridista Everest, he has built unprecedented institutional relationships with European football's most prestigious organizations.",
      links: {
        linkedin: "https://www.linkedin.com/in/rapin-neupane",
      },
    },
    description: [
      "Mr. Rapin Neupane brings a rare combination of digital strategy expertise and high-level sports diplomacy to the advisory board of Relique.ch. Graduated from The British College - one of Nepal's top business schools, he currently holds the role of Digital Marketing Director at Xenatech Nepal Pvt. Ltd.",
      "Previously serving as Head of E-Commerce at Snowy Horizon Treks and Expedition, he developed a strong foundation in digital community building and cross-border commercial strategy.",
      "Beyond his professional background in digital leadership, Mr. Neupane's principal value lies in his exceptional ability to build and maintain institutional relationships at the highest levels of European football. As the founder of Peña Madridista Everest, he has successfully established and sustained direct channels of engagement with senior leadership within Spanish football's elite institutions.",
      "His longstanding rapport with key figures—including Real Madrid President Florentino Pérez and Director of Institutional Relations Emilio Butragueño—provides Relique.ch with a distinctive strategic advantage. In his advisory capacity, Mr. Neupane leverages these elite relationships to facilitate high-level dialogue, serves as a critical bridge in supporting institutional access, and unlock exclusive partnership opportunities.",
    ],
  },
  {
    id: "5",
    name: "Doan Trung Phong",
    role: "HEAD OF ST.B AI",
    sub: "AI Engineer at VNPAY; Ex Manager and Lecturer at Thang Long University - Faculty of Information Technology",
    tagline: "Former university lecturer bringing academic rigor and practical AI innovation to high-stakes authentication",
    watermark: "R",
    expertiseChips: [
      "Deep Learning",
      "Machine Learning",
      "Fraud Detection",
      "Transfer Learning",
      "Model Optimization",
      "High-Stakes AI Systems",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Now", title: "Head of St.B AI & AI Engineer", org: "St.B AI / VNPAY" },
        { period: "Previously", title: "Manager & Lecturer", org: "Thang Long University" },
        { period: "Focus", title: "Deep Learning Authentication Models", org: "Relique Technology" },
      ],
    },
    fullBio: {
      overview: "Mr. Doan Trung Phong is a former University Lecturer with multiple certifications in Machine Learning & Deep Learning from Coursera, as well as years of experience in AI Engineering. He brings to the table an invaluable combination of deep technical expertise and practical innovation as Head of St.B AI.",
      links: {
        linkedin: "https://www.linkedin.com/in/doan-trung-phong",
      },
    },
    description: [
      "Mr. Doan Trung Phong is a former University Lecturer with multiple certifications in Machine Learning & Deep Learning from Coursera as well as years of experience in AI-Engineering, he brings to the table an invaluable combination of deep technical expertise and practical innovation.",
      "Throughout the years he has been the mind behind various high-stakes applications, most notable among which is a transaction fraud detector for a leading \"big 4\" commercial bank and automated data collector for analysis agents. His work leverages fine-tuned, pre-trained deep learning models, employing techniques such as hyperparameter tuning, transfer learning, and custom loss functions.",
    ],
  },
  {
    id: "6",
    name: "Trinh Duc Tan",
    role: "AI ENGINEER",
    sub: "AI Engineer at TDMK Ltd.",
    tagline: "Specialist in multi-layered signature comparison and pattern variance forensics",
    watermark: "R",
    expertiseChips: [
      "Signature Comparison",
      "Pattern Recognition",
      "Variance Assessment",
      "Forensic Analysis",
      "AI Engineering",
      "Multi-layer Systems",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Now", title: "AI Engineer", org: "TDMK Ltd. & St.B AI" },
        { period: "Focus", title: "Signature Authentication Systems", org: "Relique Technology" },
        { period: "Specialty", title: "Pattern Variance & Forensics", org: "Multi-layer Analysis" },
      ],
    },
    fullBio: {
      overview: "Mr. Trinh Duc Tan is a key technical contributor to St.B AI's authentication infrastructure, focusing on multi-layered signature comparison and pattern variance assessment. His work ensures that every signature undergoes rigorous forensic-level analysis.",
      links: {
        linkedin: "https://www.linkedin.com/in/trinh-duc-tan",
      },
    },
    description: [
      "Mr. Trinh Duc Tan is a key technical contributor focusing on multi-layered signature comparison and pattern variance assessment.",
    ],
  },
  {
    id: "7",
    name: "Nguyen Huy Manh",
    role: "AI ENGINEER",
    sub: "AI Engineer at Pixta Vietnam",
    tagline: "Computer vision expert powering forensic material analysis and authenticity metrics",
    watermark: "R",
    expertiseChips: [
      "Computer Vision",
      "Forensic Analysis",
      "Material Assessment",
      "Authenticity Metrics",
      "AI Engineering",
      "Data-Driven Systems",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Now", title: "AI Engineer", org: "Pixta Vietnam & St.B AI" },
        { period: "Focus", title: "Computer Vision for Authentication", org: "Relique Technology" },
        { period: "Specialty", title: "Forensic Material Analysis", org: "Visual Verification" },
      ],
    },
    fullBio: {
      overview: "Mr. Nguyen Huy Manh is an expert in computer vision integration for forensic material analysis and data-driven authenticity metrics. His work at St.B AI ensures that Relique's authentication process extends beyond signatures to encompass comprehensive visual and material verification.",
      links: {
        linkedin: "https://www.linkedin.com/in/nguyen-huy-manh",
      },
    },
    description: [
      "Mr. Nguyen Huy Manh is an expert in computer vision integration for forensic material analysis and data-driven authenticity metrics.",
    ],
  },
];
