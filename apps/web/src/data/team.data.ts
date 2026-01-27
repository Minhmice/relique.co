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
    id: "constance",
    name: "Constance Bernasconi",
    role: "CO-FOUNDER & STRATEGIC DIRECTOR",
    sub: "Chief Investment Officer at Confoederatino Partners",
    tagline: "Grounding memorabilia in institutional-grade financial discipline and long-term value preservation",
    watermark: "R",
    expertiseChips: [
      "Global Wealth Management",
      "Strategic Capital Structuring",
      "Valuation Logic",
      "Risk Management",
      "Portfolio Construction",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Current", title: "Chief Investment Officer", org: "Confoederatino Partners" },
        { period: "Previous", title: "Portfolio Manager", org: "UBS" },
        { period: "Education", title: "M.Sc Finance", org: "Uni HSG" },
        { period: "Credential", title: "CFA Level II", org: "Certified Financial Analyst" },
      ],
    },
    fullBio: {
      overview: "Constance provides the financial and investment framework underpinning Relique.ch, ensuring that the company’s approach to memorabilia is grounded in institutional-grade financial discipline.",
      links: {
        email: "constance.a.bernasconi@relique.ch"
      },
    },
    description: [
      "Constance provides the financial and investment framework underpinning Relique.ch, ensuring that the company’s approach to memorabilia is grounded in institutional-grade financial discipline.",
      "As an ex-portfolio manager at UBS, one of Europe’s leading financial institutions, and now the Chief Investment Officer of Confoederatino Partners, a growing Boutique Wealth Management Firm, he brings a sophisticated understanding of global wealth management, risk management, and portfolio construction to the table.",
      "At Relique.ch, Constance applies this expertise to bridge the gap between culturally significant collectibles and credible alternative assets.",
      "He advises on strategic capital structuring, valuation logic, and long-term value preservation, aligning Relique’s offerings with the standards expected by professional investors.",
      "While Relique’s technology ensures objective authentication, Constance ensures that every decision is anchored in financial rigor—positioning Relique not merely as a marketplace, but as a disciplined platform built for sustainable, long-term capital allocation."
    ],
  },
  {
    id: "harvey",
    name: "Harvey Wilder",
    role: "CO-FOUNDER, BOARD ADVISOR",
    sub: "General Partner at Mercer & Co.",
    tagline: "Applying quantitative precision and institutional methodologies to the emerging memorabilia asset class",
    watermark: "R",
    expertiseChips: [
      "Quantitative Analysis",
      "Portfolio Construction",
      "Risk-Adjusted Capital",
      "Valuation Frameworks",
      "Performance Metrics",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Current", title: "General Partner", org: "Mercer & Co." },
        { period: "Education", title: "MBA", org: "Boston College Carroll School of Management" },
        { period: "Education", title: "B.Sc Applied Mathematics & Data Science", org: "UC Berkeley" },
      ],
    },
    fullBio: {
      overview: "Harvey brings the discipline and analytical rigor of top-tier American quants to Relique.ch’s valuation and investment framework. He specializes in portfolio construction, performance analysis, and risk-adjusted capital allocation across sophisticated investment mandates.",
      links: {
        email: "harvey.wilder@relique.ch"
      },
    },
    description: [
      "Harvey brings the discipline and analytical rigor of top-tier American quants to Relique.ch’s valuation and investment framework.",
      "He specializes in portfolio construction, performance analysis, and risk-adjusted capital allocation across sophisticated investment mandates.",
      "Holding a Master of Business Administration from the Boston College Carroll School of Management, Harvey applies quantitative precision and institutional methodologies to the emerging memorabilia asset class.",
      "At Relique.ch, he advises on valuation logic, reporting standards, and performance metrics—helping translate culturally significant sports artifacts into assets that are measurable, comparable, and credible within a global investment context.",
      "His role is pivotal in aligning collector enthusiasm with market reality, ensuring that Relique’s assets meet the expectations of professional investors while maintaining their intrinsic cultural value."
    ],
  },
  {
    id: "kiet",
    name: "Do Tuan Kiet",
    role: "CO-FOUNDER & HEAD OF SEA OPERATIONS",
    sub: "tuan.kiet.do@relique.ch",
    tagline: "Visionary co-founder establishing memorabilia as a credible investment asset class through global expansion",
    watermark: "R",
    expertiseChips: [
      "Capital Management",
      "Investment Analysis",
      "Risk Assessment",
      "Global Operations",
      "Strategic Direction",
      "Institutionalization",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Previous", title: "Operations Manager", org: "Wander Wealth Partners" },
        { period: "Credential", title: "CFA Level II", org: "Certified Financial Analyst" },
        { period: "Education", title: "B.Sc Finance", org: "University of South Florida" },
        { period: "Founder", title: "Owner/Co-founder", org: "Finance Impact Organization" },
      ],
    },
    fullBio: {
      overview: "Tuan Kiet is one of the co-founders of Relique.ch and the strategic lead for the firm’s global operations. As a seasoned authority in the realms of finance and investment, his career is defined by a sophisticated command of capital management, investment analysis, and rigorous risk assessment.",
      links: {
        linkedin: "https://www.linkedin.com/in/do-tuan-kiet",
        email: "tuan.kiet.do@relique.ch"
      },
    },
    description: [
      "Tuan Kiet is one of the co-founders of Relique.ch and the strategic lead for the firm’s global operations.",
      "As a seasoned authority in the realms of finance and investment, Tuan’s career is defined by a sophisticated command of capital management, investment analysis, and rigorous risk assessment.",
      "He serves as a cornerstone of the firm’s board, channeling years of institutional expertise into the agile strategies that define Relique’s market presence.",
      "At the heart of his work is a transformative vision for the alternative investment landscape.",
      "Tuan is the primary architect of Relique’s mission to institutionalize memorabilia, elevating it from mere sentiment to a credible, high-performance financial asset class."
    ],
  },
  {
    id: "son",
    name: "Vu Truong Son",
    role: "SEA REGIONAL COORDINATOR, BOARD ADVISOR",
    sub: "Founder & Director of St.B Ecosystem",
    tagline: "Powering objective authentication with Swiss-standard AI precision and deep market intelligence",
    watermark: "R",
    expertiseChips: [
      "Applied AI",
      "Authentication Technology",
      "International Finance",
      "Sporting Ecosystems",
      "Market Intelligence",
      "Scalable Solutions",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Current", title: "Founder & Director", org: "St.B Ecosystem" },
        { period: "Education", title: "M.Sc Applied AI", org: "Swiss UMEF University" },
        { period: "Education", title: "B.Sc International Business & Finance", org: "Foreign Trade University" },
        { period: "Partnership", title: "Strategic Partner", org: "X-Memorabilia" },
      ],
    },
    fullBio: {
      overview: "Vu Truong Son is the founder of St. B Sporting Ecosystem, whose Artificial Intelligence Department—St.B AI—powers Relique.ch’s authentication technology. He holds dual degrees in International Business Administration and International Finance from Foreign Trade University, and a Master’s in Applied AI from Swiss UMEF University.",
      links: {
        linkedin: "https://www.linkedin.com/in/vu-truong-son",
        email: "son.vu.truong@relique.ch"
      },
    },
    description: [
      "Vu Truong Son is the founder of St. B Sporting Ecosystem - of which the Artificial Intelligence Department - St.B AI - powers Relique.ch’s Artificial Intelligence authentication technology.",
      "He holds dual degrees in International Business Administration and International Finance at Foreign Trade University - one of Vietnam’s finest institutions, and a Master’s in Applied AI from Swiss UMEF University of Applied Sciences.",
      "Widely known as an avid collector of sporting memorabilia, Son brings to the table knowledge and exposure rooted in years of experience as a hobbyist.",
      "His sporting ecosystem, St.B, has recently announced a partnership with a rising and trusted memorabilia company, X-Memorabilia, further strengthening its global network and expertise within the sector.",
      "Together with years of extensive experience in multiple lines of business, Son is exceptionally well positioned to guide the application of advanced technology within the framework of a deep and nuanced understanding of the market, and also act as a bridge for the firm’s expansion, underpinning Relique.ch’s commitment to objective, reliable, and scalable authentication."
    ],
  },
  {
    id: "rapin",
    name: "Rapin Neupane",
    role: "BOARD ADVISOR, HEAD OF INSTITUTIONAL RELATIONS",
    sub: "Digital Marketing Director at Xenatech Nepal Pvt. Ltd",
    tagline: "Facilitating high-level dialogue and exclusive access with European football's elite institutions",
    watermark: "R",
    expertiseChips: [
      "Sports Diplomacy",
      "Institutional Relations",
      "Digital Strategy",
      "European Football Networks",
      "Partnership Development",
      "Cross-Border Strategy",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Current", title: "Digital Marketing Director", org: "Xenatech Nepal Pvt. Ltd" },
        { period: "Previous", title: "Head of E-Commerce", org: "Snowy Horizon Treks and Expedition" },
        { period: "Founder", title: "President", org: "Peña Madridista Everest" },
        { period: "Education", title: "B.Sc Business Administration", org: "The British College" },
      ],
    },
    fullBio: {
      overview: "Rapin Neupane brings a rare combination of digital strategy expertise and high-level sports diplomacy to the advisory board of Relique.ch. As the founder of Peña Madridista Everest, he has successfully established direct channels of engagement with senior leadership within Spanish football’s elite institutions.",
      links: {
        linkedin: "https://www.linkedin.com/in/rapin-neupane",
        email: "rapin.neupane@relique.ch"
      },
    },
    description: [
      "Rapin Neupane brings a rare combination of digital strategy expertise and high-level sports diplomacy to the advisory board of Relique.ch.",
      "Graduated from The British College - one of Nepal's top business schools, he currently holds the role of Digital Marketing Director at Xenatech Nepal Pvt. Ltd. and previously served as Head of E-Commerce at Snowy Horizon Treks and Expedition, where he developed a strong foundation in digital community building and cross-border commercial strategy.",
      "Beyond his professional background in digital leadership, Rapin's principal value lies in his exceptional ability to build and maintain institutional relationships at the highest levels of European football.",
      "As the founder of Peña Madridista Everest, he has successfully established and sustained direct channels of engagement with senior leadership within Spanish football’s elite institutions.",
      "His longstanding rapport with key figures—including Real Madrid President Florentino Pérez and Director of Institutional Relations Emilio Butragueño—provides Relique.ch with a distinctive strategic advantage.",
      "In his advisory capacity, Rapin leverages these elite relationships to facilitate high-level dialogue, serves as a critical bridge in supporting institutional access, and unlock exclusive partnership opportunities."
    ],
  },
  {
    id: "phong",
    name: "Doan Trung Phong",
    role: "HEAD OF ST.B AI",
    sub: "AI Engineer at VNPAY",
    tagline: "Blending academic rigor with industrial innovation to architect high-stakes authentication models",
    watermark: "R",
    expertiseChips: [
      "Deep Learning",
      "Fraud Detection",
      "Transfer Learning",
      "Computer Vision",
      "NLP & LLMs",
      "Model Optimization",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Current", title: "Head of St.B AI", org: "Relique / St.B" },
        { period: "Current", title: "AI Engineer", org: "VNPAY" },
        { period: "Previous", title: "Data Scientist & Lecturer", org: "Thang Long University AI Lab" },
        { period: "Education", title: "B.Sc Computer Science", org: "Thang Long University" },
      ],
    },
    fullBio: {
      overview: "As a former University Lecturer and AI Lab Data Scientist with years of experience in AI Engineering, Phong brings an invaluable combination of deep technical expertise and practical innovation. He acts as the lead architect of the AI Department behind Relique’s Authentication.",
      links: {
        linkedin: "https://www.linkedin.com/in/doan-trung-phong",
        email: "trung.phong.doan@relique.ch"
      },
    },
    description: [
      "As a former University Lecturer and A.I Lab Data Scientist, with years of experience in AI-Engineering on top of that, he brings to the table an invaluable combination of deep technical expertise and practical innovation.",
      "Throughout the years he has been the mind behind various high-stakes applications, most notable among which is a transaction fraud detector for a leading “big 4” commercial bank and automated data collector for analysis agents.",
      "His work leverages fine-tuned, pre-trained deep learning models, employing techniques such as hyperparameter tuning, transfer learning, and custom loss functions, which would all now be transferred onto his work as the lead architecture of the A.I Department behind Relique’s Authentication."
    ],
  },
  {
    id: "tan",
    name: "Trinh Duc Tan",
    role: "AI ENGINEER",
    sub: "AI Engineer at TDMK Company Ltd",
    tagline: "Bridging the gap between academic research and industrial-grade visual inspection systems",
    watermark: "R",
    expertiseChips: [
      "Computer Vision",
      "Forensic Analysis",
      "OCR & Object Detection",
      "Visual Inspection",
      "Deep Learning",
      "Distributed Computing",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Current", title: "AI Engineer", org: "TDMK Company Ltd" },
        { period: "Previous", title: "Researcher & Lecturer", org: "Thang Long University AI Lab" },
        { period: "Award", title: "Vietnam Informatics Olympiad", org: "National Third Prize" },
        { period: "Education", title: "B.Sc Information Technology", org: "Thang Long University" },
      ],
    },
    fullBio: {
      overview: "Tan’s background is defined by the practical application of complex theory, ranging from optimizing distributed computing models to engineering industrial-grade visual inspection systems. He brings a specialized command of computer vision and deep learning to Relique's core authentication protocols.",
      links: {
        linkedin: "https://www.linkedin.com/in/trinh-duc-tan",
        email: "tan.trinh.duc@relique.ch"
      },
    },
    description: [
      "Tan’s background is defined by the practical application of complex theory, ranging from optimizing distributed computing models—research distinguished by Springer Nature—to engineering industrial-grade visual inspection systems at TDMK.",
      "He brings to the team a specialized command of computer vision and deep learning, with proven expertise in implementing OCR, object detection, and hardware-model integration on active production lines.",
      "This distinct ability to bridge the gap between academic research and deployment is now being utilized to engineer the core AI authentication protocols at Relique."
    ],
  },
  {
    id: "manh",
    name: "Nguyen Huy Manh",
    role: "AI ENGINEER",
    sub: "AI Engineer at Pixta Vietnam",
    tagline: "Optimizing performance metrics and risk management protocols through advanced algorithmic modeling",
    watermark: "R",
    expertiseChips: [
      "Time-Series Forecasting",
      "Algorithmic Trading",
      "GenAI Verification",
      "Risk Management Metrics",
      "Large Language Models",
      "Predictive Modeling",
    ],
    expanded: {
      experienceSnapshot: [
        { period: "Current", title: "AI Engineer", org: "Pixta Vietnam" },
        { period: "Previous", title: "Quantitative Researcher", org: "Finspro Company Ltd." },
        { period: "Previous", title: "Data Scientist", org: "Thang Long University AI Lab" },
        { period: "Education", title: "B.Sc Artificial Intelligence", org: "Thang Long University" },
      ],
    },
    fullBio: {
      overview: "Manh’s experience is grounded in the rigorous analysis of high-volatility data, having developed and backtested over 40 algorithmic trading strategies. He utilizes advanced architectures such as RNNs, LSTMs, and Transformers to build automated decision-making systems for Relique.",
      links: {
        linkedin: "https://www.linkedin.com/in/nguyen-huy-manh",
      },
    },
    description: [
      "Manh’s experience is grounded in the rigorous analysis of high-volatility data, having developed and backtested over 40 algorithmic trading strategies for derivative markets during his tenure at Finpros and Thang Long AI Lab.",
      "He possesses sharp expertise in time-series forecasting and predictive modeling, utilizing advanced architectures such as RNNs, LSTMs, and Transformers to build automated, 24/7 decision-making systems.",
      "His work—distinguished by a presentation at the AICI 2025 conference—demonstrates a strong capacity for optimizing performance metrics and risk management protocols, skills he now applies to the challenges at Relique."
    ],
  },
];