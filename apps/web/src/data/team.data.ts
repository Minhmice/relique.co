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
  
  // Credentials (optional)
  credentials?: {
    primaryOrg?: string;
    education?: string;
    region?: string;
    specialization?: string[];
  };
  
  // Expertise chips (optional)
  expertiseChips?: string[];
  
  // Expanded content (optional)
  expanded?: {
    microSummary?: string;
    keyContributions?: string[];
    experienceSnapshot?: Array<{
      period: string;
      title: string;
      org: string;
      description?: string;
    }>;
    focusAreas?: string[];
  };
  
  // Full bio (optional)
  fullBio?: {
    overview?: string;
    timeline?: Array<{
      year: string;
      title: string;
      org: string;
      description: string;
    }>;
    institutionalValue?: string;
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
    role: "CO-FOUNDER & HEAD OF SEA OPERATIONS",
    sub: "Financial Analyst & Business Consultant at Wander Wealth Partner",
    tagline: "Visionary co-founder establishing memorabilia as a credible investment asset class across Southeast Asia",
    watermark: "R",
    credentials: {
      primaryOrg: "Wander Wealth Partner",
      education: "Finance & Investment Management",
      region: "Southeast Asia",
      specialization: ["Capital Management", "Investment Analysis", "Risk Assessment", "Strategic Operations"],
    },
    expertiseChips: [
      "Capital Management",
      "Investment Analysis",
      "Risk Assessment",
      "SEA Operations",
      "Asset Class Development",
      "Strategic Planning",
    ],
    expanded: {
      microSummary: "Co-founder driving Relique's transformation of memorabilia into a credible financial asset class through capital discipline and Southeast Asia expansion.",
      keyContributions: [
        "Co-founded Relique.ch with vision for memorabilia as investable asset class",
        "Leads Southeast Asia operations and regional market development",
        "Establishes investment frameworks blending heritage with tangible value",
      ],
      experienceSnapshot: [
        { period: "Now", title: "Co-Founder & Head of SEA Operations", org: "Relique.ch" },
        { period: "Currently", title: "Financial Analyst & Business Consultant", org: "Wander Wealth Partner" },
        { period: "Focus", title: "Capital Strategy & Regional Expansion", org: "Southeast Asia Markets" },
      ],
    },
    fullBio: {
      overview: "Mr. Do Tuan Kiet is one of the co-founders of Relique.ch and leads the firm's operations across Southeast Asia. As a seasoned finance and investment expert, he brings his vision and extensive experience in capital management, investment analysis, and risk assessment to the firm's strategic direction.",
      timeline: [
        {
          year: "Present",
          title: "Co-Founder & Head of SEA Operations",
          org: "Relique.ch",
          description: "Leading regional expansion and operational strategy across Southeast Asian markets",
        },
        {
          year: "Present",
          title: "Financial Analyst & Business Consultant",
          org: "Wander Wealth Partner",
          description: "Providing capital management advisory and investment analysis for wealth clients",
        },
        {
          year: "2024",
          title: "Co-Founded Relique.ch",
          org: "Switzerland",
          description: "Established vision for memorabilia as credible, investable financial asset class",
        },
      ],
      institutionalValue: "At the forefront of the company's mission, Mr. Do Tuan Kiet is the driving force behind Relique's ambition to establish memorabilia as a credible, investable financial asset, seamlessly blending passion, heritage, and tangible value. His operational leadership ensures that Relique maintains rigorous financial discipline while scaling across high-growth Southeast Asian markets.",
      links: {
        linkedin: "https://www.linkedin.com/in/do-tuan-kiet",
      },
    },
    description: [
      "Mr. Do Tuan Kiet is one of the co-founders of Relique.ch and leads the firm's operations across Southeast Asia. As a seasoned finance and investment expert, he brings his vision and extensive experience in capital management, investment analysis, and risk assessment to the firm's board and channels that into Relique's strategies.",
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
    credentials: {
      primaryOrg: "St. B Sporting Ecosystem",
      education: "MSc Applied AI, Swiss UMEF University | Dual Degrees in Business & Finance, Foreign Trade University",
      region: "Vietnam / Switzerland",
      specialization: ["Applied Artificial Intelligence", "Authentication Technology", "Business Strategy", "Market Analysis"],
    },
    expertiseChips: [
      "Applied AI",
      "Authentication Systems",
      "Business Strategy",
      "Technology Leadership",
      "Market Intelligence",
      "Scalable Solutions",
    ],
    expanded: {
      microSummary: "Son founded St. B Sporting Ecosystem, whose AI technology department powers Relique.ch's authentication engine with Swiss-standard precision and scalability.",
      keyContributions: [
        "Founded St. B Sporting Ecosystem and St.B AI technology division",
        "Developed AI-powered authentication infrastructure for Relique.ch",
        "Combines advanced AI expertise with deep business and market understanding",
      ],
      experienceSnapshot: [
        { period: "Now", title: "Founder & Director", org: "St. B Sporting Ecosystem" },
        { period: "Academic", title: "MSc Applied AI", org: "Swiss UMEF University" },
        { period: "Focus", title: "AI Authentication Technology", org: "Relique.ch Partnership" },
      ],
    },
    fullBio: {
      overview: "Mr. Vu Truong Son is the founder of St. B Sporting Ecosystem, whose Technology Department—St.B AI—powers Relique.ch's Artificial Intelligence authentication technology. He holds dual degrees in International Business Administration and International Finance from Foreign Trade University, one of Vietnam's finest institutions, and a Master's in Applied AI from Swiss UMEF University of Applied Sciences.",
      timeline: [
        {
          year: "Present",
          title: "Founder & Director",
          org: "St. B Sporting Ecosystem",
          description: "Leading ecosystem development and AI technology strategy for sports memorabilia authentication",
        },
        {
          year: "2023",
          title: "MSc Applied Artificial Intelligence",
          org: "Swiss UMEF University of Applied Sciences",
          description: "Advanced studies in AI systems, machine learning, and scalable technology solutions",
        },
        {
          year: "2020",
          title: "Dual Degrees: Business Administration & Finance",
          org: "Foreign Trade University, Vietnam",
          description: "Comprehensive foundation in international business and financial markets",
        },
        {
          year: "2024",
          title: "Technology Partnership",
          org: "Relique.ch",
          description: "St.B AI powers Relique's core authentication infrastructure",
        },
      ],
      institutionalValue: "Mr. Vu Truong Son's unique combination of advanced AI expertise and deep business acumen positions him exceptionally well to apply cutting-edge technology within a nuanced understanding of market dynamics. St. B's technology underpins Relique.ch's commitment to objective, reliable, and scalable authentication—ensuring every piece of memorabilia meets institutional-grade verification standards.",
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
    credentials: {
      primaryOrg: "Xenatech Nepal Pvt. Ltd.",
      education: "Business Studies, The British College",
      region: "Nepal / Europe",
      specialization: ["Institutional Relations", "Sports Diplomacy", "Digital Strategy", "Partnership Development"],
    },
    expertiseChips: [
      "Institutional Relations",
      "Sports Diplomacy",
      "Partnership Development",
      "Digital Strategy",
      "European Football Networks",
      "Cross-Border Strategy",
    ],
    expanded: {
      microSummary: "Rapin bridges elite European football institutions with Relique's mission through unparalleled access to senior leadership at Real Madrid and Spanish football's highest levels.",
      keyContributions: [
        "Direct channels with Real Madrid President Florentino Pérez and senior leadership",
        "Institutional relationship management at European football's elite level",
        "Strategic partnership facilitation for exclusive memorabilia access",
      ],
      experienceSnapshot: [
        { period: "Now", title: "Digital Marketing Director", org: "Xenatech Nepal" },
        { period: "Previously", title: "Head of E-Commerce", org: "Snowy Horizon Treks" },
        { period: "Focus", title: "Founder, Peña Madridista Everest", org: "Elite Football Relations" },
      ],
    },
    fullBio: {
      overview: "Mr. Rapin Neupane brings a rare combination of digital strategy expertise and high-level sports diplomacy to the advisory board of Relique.ch. As founder of Peña Madridista Everest, he has built unprecedented institutional relationships with European football's most prestigious organizations.",
      timeline: [
        {
          year: "Present",
          title: "Digital Marketing Director",
          org: "Xenatech Nepal Pvt. Ltd.",
          description: "Leading digital strategy and brand positioning for technology solutions",
        },
        {
          year: "2020-2023",
          title: "Head of E-Commerce",
          org: "Snowy Horizon Treks and Expedition",
          description: "Built digital community and cross-border commercial strategy infrastructure",
        },
        {
          year: "2015-Present",
          title: "Founder",
          org: "Peña Madridista Everest",
          description: "Established direct engagement channels with Real Madrid senior leadership",
        },
        {
          year: "2018",
          title: "Business Studies Graduate",
          org: "The British College",
          description: "Top business school in Nepal, focus on international business relations",
        },
      ],
      institutionalValue: "His longstanding rapport with key figures—including Real Madrid President Florentino Pérez and Director of Institutional Relations Emilio Butragueño—provides Relique.ch with a distinctive strategic advantage. In his advisory capacity, Mr. Neupane leverages these elite relationships to facilitate high-level dialogue, serves as a critical bridge in supporting institutional access, and unlock exclusive partnership opportunities.",
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
    credentials: {
      primaryOrg: "VNPAY | St.B AI",
      education: "Multiple ML & Deep Learning Certifications (Coursera) | Faculty of Information Technology",
      region: "Vietnam",
      specialization: ["Deep Learning", "Fraud Detection", "Transfer Learning", "Model Fine-tuning"],
    },
    expertiseChips: [
      "Deep Learning",
      "Machine Learning",
      "Fraud Detection",
      "Transfer Learning",
      "Model Optimization",
      "High-Stakes AI Systems",
    ],
    expanded: {
      microSummary: "Phong leads St.B AI's technical team with proven expertise in high-stakes applications including banking fraud detection and fine-tuned deep learning models for authentication.",
      keyContributions: [
        "Developed transaction fraud detector for leading 'big 4' commercial bank",
        "Leads St.B AI technical development and model architecture",
        "Applies transfer learning and custom loss functions for memorabilia authentication",
      ],
      experienceSnapshot: [
        { period: "Now", title: "Head of St.B AI & AI Engineer", org: "St.B AI / VNPAY" },
        { period: "Previously", title: "Manager & Lecturer", org: "Thang Long University" },
        { period: "Focus", title: "Deep Learning Authentication Models", org: "Relique Technology" },
      ],
    },
    fullBio: {
      overview: "Mr. Doan Trung Phong is a former University Lecturer with multiple certifications in Machine Learning & Deep Learning from Coursera, as well as years of experience in AI Engineering. He brings to the table an invaluable combination of deep technical expertise and practical innovation as Head of St.B AI.",
      timeline: [
        {
          year: "Present",
          title: "Head of St.B AI",
          org: "St. B Sporting Ecosystem",
          description: "Leading technical team developing AI-powered authentication infrastructure for Relique.ch",
        },
        {
          year: "Present",
          title: "AI Engineer",
          org: "VNPAY",
          description: "Building high-stakes fraud detection and payment security systems",
        },
        {
          year: "2018-2023",
          title: "Manager and Lecturer",
          org: "Thang Long University - Faculty of Information Technology",
          description: "Taught advanced AI and managed academic research projects",
        },
        {
          year: "2020-2022",
          title: "Lead AI Developer",
          org: "Big 4 Commercial Bank Project",
          description: "Developed transaction fraud detection system using fine-tuned deep learning models",
        },
      ],
      institutionalValue: "Throughout the years, Mr. Doan Trung Phong has been the mind behind various high-stakes applications, most notably a transaction fraud detector for a leading 'big 4' commercial bank and automated data collector for analysis agents. His work leverages fine-tuned, pre-trained deep learning models, employing techniques such as hyperparameter tuning, transfer learning, and custom loss functions—expertise now directly applied to Relique's authentication technology.",
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
    credentials: {
      primaryOrg: "TDMK Ltd. | St.B AI",
      education: "AI Engineering & Computer Science",
      region: "Vietnam",
      specialization: ["Signature Analysis", "Pattern Recognition", "Variance Assessment", "Forensic AI"],
    },
    expertiseChips: [
      "Signature Comparison",
      "Pattern Recognition",
      "Variance Assessment",
      "Forensic Analysis",
      "AI Engineering",
      "Multi-layer Systems",
    ],
    expanded: {
      microSummary: "Tan specializes in the critical technical foundation of signature authentication through multi-layered pattern analysis and variance detection systems.",
      keyContributions: [
        "Develops multi-layered signature comparison algorithms",
        "Implements pattern variance assessment with Swiss-standard precision",
        "Ensures forensic-level accuracy in authentication workflows",
      ],
      experienceSnapshot: [
        { period: "Now", title: "AI Engineer", org: "TDMK Ltd. & St.B AI" },
        { period: "Focus", title: "Signature Authentication Systems", org: "Relique Technology" },
        { period: "Specialty", title: "Pattern Variance & Forensics", org: "Multi-layer Analysis" },
      ],
    },
    fullBio: {
      overview: "Mr. Trinh Duc Tan is a key technical contributor to St.B AI's authentication infrastructure, focusing on multi-layered signature comparison and pattern variance assessment. His work ensures that every signature undergoes rigorous forensic-level analysis.",
      timeline: [
        {
          year: "Present",
          title: "AI Engineer",
          org: "TDMK Ltd.",
          description: "Developing advanced AI systems for pattern recognition and forensic analysis",
        },
        {
          year: "Present",
          title: "Technical Contributor",
          org: "St.B AI",
          description: "Specializing in signature comparison algorithms and variance detection for authentication",
        },
        {
          year: "2024",
          title: "Authentication Systems Development",
          org: "Relique.ch Partnership",
          description: "Building multi-layered signature verification with Swiss-standard precision",
        },
      ],
      institutionalValue: "Mr. Trinh Duc Tan's expertise in multi-layered signature comparison and pattern variance assessment is fundamental to Relique's authentication credibility. His forensic approach ensures that every piece of memorabilia undergoes systematic, objective verification—critical for establishing trust with institutional collectors and investors.",
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
    credentials: {
      primaryOrg: "Pixta Vietnam | St.B AI",
      education: "AI Engineering & Computer Vision",
      region: "Vietnam",
      specialization: ["Computer Vision", "Forensic Analysis", "Material Assessment", "Data-Driven Metrics"],
    },
    expertiseChips: [
      "Computer Vision",
      "Forensic Analysis",
      "Material Assessment",
      "Authenticity Metrics",
      "AI Engineering",
      "Data-Driven Systems",
    ],
    expanded: {
      microSummary: "Manh brings advanced computer vision capabilities to analyze physical materials, surface characteristics, and visual authenticity markers at forensic precision.",
      keyContributions: [
        "Integrates computer vision for forensic material analysis",
        "Develops data-driven authenticity metrics and scoring systems",
        "Ensures visual verification aligns with physical evidence standards",
      ],
      experienceSnapshot: [
        { period: "Now", title: "AI Engineer", org: "Pixta Vietnam & St.B AI" },
        { period: "Focus", title: "Computer Vision for Authentication", org: "Relique Technology" },
        { period: "Specialty", title: "Forensic Material Analysis", org: "Visual Verification" },
      ],
    },
    fullBio: {
      overview: "Mr. Nguyen Huy Manh is an expert in computer vision integration for forensic material analysis and data-driven authenticity metrics. His work at St.B AI ensures that Relique's authentication process extends beyond signatures to encompass comprehensive visual and material verification.",
      timeline: [
        {
          year: "Present",
          title: "AI Engineer",
          org: "Pixta Vietnam",
          description: "Developing computer vision systems for visual content analysis and classification",
        },
        {
          year: "Present",
          title: "Technical Contributor",
          org: "St.B AI",
          description: "Specializing in forensic material analysis and authenticity metrics for memorabilia",
        },
        {
          year: "2024",
          title: "Visual Authentication Systems",
          org: "Relique.ch Partnership",
          description: "Building computer vision models for material verification and authenticity scoring",
        },
      ],
      institutionalValue: "Mr. Nguyen Huy Manh's computer vision expertise enables Relique to verify not just signatures, but the physical materials, aging patterns, and surface characteristics that distinguish authentic memorabilia from counterfeits. His data-driven approach provides objective, measurable authenticity metrics that meet institutional verification standards.",
      links: {
        linkedin: "https://www.linkedin.com/in/nguyen-huy-manh",
      },
    },
    description: [
      "Mr. Nguyen Huy Manh is an expert in computer vision integration for forensic material analysis and data-driven authenticity metrics.",
    ],
  },
];
