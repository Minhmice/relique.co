import type { Metadata } from "next";
import policiesData from "@/mocks/policies_terms.json";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Relique Terms of Service and Authentication Protocol",
  openGraph: {
    title: "Terms of Service - Relique",
    description: "Relique Terms of Service and Authentication Protocol",
    type: "website",
  },
};

const sections = [
  "Introduction",
  "Authentication Protocol",
  "Liability",
  "Fees",
  "Intellectual Property",
  "Privacy",
  "Jurisdiction",
];

export default function PoliciesPage() {
  const policies = policiesData as any;

  return (
    <div className="py-24 bg-bgDark min-h-screen">
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primaryBlue mb-8">Table of Contents</h2>
          <ul className="space-y-4">
            {sections.map((s) => (
              <li key={s}>
                <a
                  href={`#${s.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm font-bold uppercase text-textSec hover:text-highlightIce transition-colors"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8 space-y-24">
          <section id="introduction">
            <h1 className="text-3xl font-semibold tracking-tight mb-8">
              Terms of <span className="text-primaryBlue">Service</span>
            </h1>
            <p className="text-textSec text-lg leading-relaxed">
              Welcome to Relique. By accessing our platform, you agree to comply with the following institutional-grade terms and conditions.
            </p>
          </section>

          <section id="authentication-protocol">
            <h2 className="text-xl font-bold mb-6">1. Authentication Protocol</h2>
            <p className="text-textSec leading-relaxed">
              Relique&apos;s analysis is based on current forensic standards. While we strive for 100% accuracy, certification represents the professional consensus of our expert panel.
            </p>
          </section>

          <section id="jurisdiction">
            <h2 className="text-xl font-bold mb-6">12. Jurisdiction</h2>
            <div className="bg-cardDark p-8 border border-white/5 italic text-textSec">
              This agreement is governed by the laws of [Insert Jurisdiction]. All disputes shall be resolved in the courts of [Insert Jurisdiction].
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
