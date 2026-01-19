export interface TeamMember {
  id: string;
  name: string;
  role: string;
  sub: string;
  description: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Do Tuan Kiet",
    role: "Co-founder & Head of SEA Operations",
    sub: "Financial Analyst & Business Consultant at Wander Wealth Partner",
    description: "Tuan Kiet is one of the co-founders of Relique.co and leads the firm's operations across Southeast Asia. As a seasoned finance and investment expert, he brings his vision and extensive experience in capital management, investment analysis, and risk assessment to the firm's board and channels that into Relique's strategies. At the forefront of the company's mission, he is the driving force behind Relique's mission to establish memorabilia as a credible, investable financial asset, seamlessly blending passion, heritage, and tangible value.",
  },
  {
    id: "2",
    name: "Vu Truong Son",
    role: "St. B Ecosystem Founder & Director",
    sub: "Msc Applied A.I at SWISS UEMF University",
    description: "Vu Truong Son is the founder of St. B Sporting Ecosystem - of which the Technology Department - St.B AI - powers Relique.co's Artificial Intelligence authentication technology. He holds dual degrees in International Business Administration and International Finance at Foreign Trade University - one of Vietnam's finest institutions, and a Master's in Applied AI from Swiss UMEF University of Applied Sciences. This, together with years of extensive experience in multiple lines of business positions him exceptionally well to apply advanced technology within a deep and nuanced understanding of the market. St. B's technology underpins Relique.co's commitment to objective, reliable, and scalable authentication.",
  },
  {
    id: "3",
    name: "Doan Trung Phong",
    role: "Head of St.B AI",
    sub: "AI Engineer at VNPAY; Ex Manager and Lecturer at Thang Long University - Faculty of Information Technology",
    description: "As a former University Lecturer with multiple certifications in Machine Learning & Deep Learning from Coursera as well as years of experience in AI-Engineering, he brings to the table an invaluable combination of deep technical expertise and practical innovation. Throughout the years he has been the mind behind various high-stakes applications, most notable among which is a transaction fraud detector for a leading \"big 4\" commercial bank and automated data collector for analysis agents. His work leverages fine-tuned, pre-trained deep learning models, employing techniques such as hyperparameter tuning, transfer learning, and custom loss functions.",
  },
  {
    id: "4",
    name: "Trinh Duc Tan",
    role: "AI Engineer",
    sub: "AI Engineer at TDMK Ltd.",
    description: "Key technical contributor focusing on multi-layered signature comparison and pattern variance assessment.",
  },
  {
    id: "5",
    name: "Nguyen Huy Manh",
    role: "AI Engineer",
    sub: "AI Engineer at Pixta Vietnam",
    description: "Expert in computer vision integration for forensic material analysis and data-driven authenticity metrics.",
  },
];
