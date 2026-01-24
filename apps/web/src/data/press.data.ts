import type { PressArticleCardProps } from "@/components/wrappers/press/PressArticleCard";

export interface PressArticle extends Omit<PressArticleCardProps, "className" | "index"> {}

export const PRESS_ARTICLES: PressArticle[] = [
  {
    href: "https://www.cfainstitute.org/insights/articles/investing-in-sports-memorabilia",
    publisher: "CFA Institute",
    title: "How sports memorabilia is becoming more investable",
    excerpt:
      "Headline-grabbing sales of rare sports memorabilia have captured the attention of investors — including those who are not that interested in sports. At the same time, the increasing availability of data on supply is making it easier to put a value on items.",
    dateLabel: "Mar 7, 2025",
    readTime: "8 min read",
    tag: "Investment Analysis",
    outletVerified: true,
    tone: "featured",
  },
  {
    href: "https://www.forbes.com/councils/forbesfinancecouncil/2024/11/22/the-called-shot-jersey-and-the-rise-of-sports-collectibles-as-high-value-investments/",
    publisher: "Forbes",
    title: "The Called Shot Jersey and the Rise of Sports Collectibles as High-Value Investments",
    excerpt:
      "The record-breaking sale of Babe Ruth's 'Called Shot' jersey highlights how sports memorabilia has evolved into a legitimate asset class. As major auction houses expand into sports collectibles, institutional investors are taking notice of the market's growth potential.",
    dateLabel: "Nov 22, 2024",
    readTime: "6 min read",
    tag: "Finance Council",
    outletVerified: true,
    tone: "neutral",
  },
  {
    href: "https://www.kiplinger.com/investing/sports-memorabilia-arrive-as-an-investing-class",
    publisher: "Kiplinger",
    title: "Sports Memorabilia Arrive as an Investing Class",
    excerpt:
      "Sotheby's entry into sports memorabilia with its first Sports Week auction signals that collectibles have reached blue-chip investment status. The market's CAGR of 21.8% over the next decade and proven returns outpacing the S&P 500 are attracting high-net-worth investors.",
    dateLabel: "Jun 14, 2024",
    readTime: "7 min read",
    tag: "Investing",
    outletVerified: true,
    tone: "neutral",
  },
];
